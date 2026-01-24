import { by as getAdminSupabaseClient } from "../server.mjs";
const adminCdkApi = {
  /**
   * 获取 CDK 列表（包含 SKU 映射关系）
   */
  async getCdks(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("cdks").select(`
                *,
                sku_mappings:cdk_sku_map(id, sku_id, sku:product_skus(id, spec_combination, price, product_type)),
                slot_occupancies(id, slot_index, status)
            `, { count: "exact" });
    if (params?.cdk_type) query = query.eq("cdk_type", params.cdk_type);
    if (params?.status) query = query.eq("status", params.status);
    query = query.order("created_at", { ascending: false });
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) return { success: false, cdks: [], total: 0, error: error.message };
    return { success: true, cdks: data || [], total: count || 0 };
  },
  /**
   * 批量创建 CDK (包含商品快照)
   */
  async createCdks(data) {
    const client = getAdminSupabaseClient();
    if (data.cdk_type === "virtual") {
      const { data: existingMappings } = await client.from("cdk_sku_map").select(`sku_id, cdk:cdks!inner(id, cdk_type)`).in("sku_id", data.sku_ids).eq("cdk.cdk_type", "virtual");
      if (existingMappings && existingMappings.length > 0) {
        return { success: false, count: 0, error: "存在 SKU 已有虚拟库存资源，请在 CDK 列表中编辑现有资源" };
      }
    }
    let cdksToInsert = [];
    const snapshot = data.product_snapshot || null;
    if (data.cdk_type === "shared") {
      cdksToInsert = data.codes.map((code) => ({
        code,
        cdk_type: data.cdk_type,
        max_slots: data.max_slots || 1,
        stock: 1,
        account_data: data.account_data || null,
        status: "idle",
        product_snapshot: snapshot
      }));
    } else if (data.cdk_type === "virtual") {
      cdksToInsert = [{
        code: data.codes[0] || `VIRTUAL-${Date.now()}`,
        cdk_type: data.cdk_type,
        max_slots: 1,
        stock: data.stock || 1,
        account_data: data.account_data || null,
        status: "idle",
        product_snapshot: snapshot
      }];
    } else {
      cdksToInsert = data.codes.map((code) => ({
        code,
        cdk_type: data.cdk_type,
        max_slots: 1,
        stock: 1,
        account_data: data.account_data || null,
        status: "idle",
        product_snapshot: snapshot
      }));
    }
    const { data: createdCdks, error: cdkError } = await client.from("cdks").insert(cdksToInsert).select("id");
    if (cdkError) return { success: false, count: 0, error: cdkError.message };
    const mappings = [];
    for (const cdk of createdCdks || []) {
      for (const skuId of data.sku_ids) {
        mappings.push({ cdk_id: cdk.id, sku_id: skuId });
      }
    }
    if (mappings.length > 0) {
      const { error: mapError } = await client.from("cdk_sku_map").insert(mappings);
      if (mapError) {
        console.error("CDK SKU 映射创建失败:", mapError);
        return { success: true, count: createdCdks?.length || 0, error: `CDK 已创建但 SKU 映射失败: ${mapError.message}` };
      }
    }
    if (data.cdk_type === "shared" && createdCdks && createdCdks.length > 0) {
      const maxSlots = Math.min(Math.max(data.max_slots || 1, 1), 10);
      const slotRecords = [];
      for (const cdk of createdCdks) {
        for (let i = 1; i <= maxSlots; i++) {
          slotRecords.push({ cdk_id: cdk.id, slot_index: i, status: "idle" });
        }
      }
      if (slotRecords.length > 0) {
        const { error: slotError } = await client.from("slot_occupancies").insert(slotRecords);
        if (slotError) {
          console.error("槽位记录创建失败:", slotError);
          return { success: true, count: createdCdks?.length || 0, error: `CDK 已创建但槽位创建失败: ${slotError.message}` };
        }
      }
    }
    return { success: true, count: createdCdks?.length || 0 };
  },
  /**
   * 删除 CDK（仅允许删除 idle 状态）
   */
  async deleteCdk(id) {
    const client = getAdminSupabaseClient();
    const { data: cdk } = await client.from("cdks").select("status").eq("id", id).single();
    if (cdk?.status !== "idle") return { success: false, error: "只能删除未使用的 CDK" };
    const { count: orderCount } = await client.from("order_deliveries").select("*", { count: "exact", head: true }).eq("cdk_id", id);
    if (orderCount && orderCount > 0) return { success: false, error: `无法删除：有 ${orderCount} 笔订单关联到此 CDK` };
    const { error } = await client.from("cdks").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 批量删除 CDK
   */
  async deleteCdks(ids) {
    if (!ids.length) return { success: true, count: 0 };
    const client = getAdminSupabaseClient();
    const { error, count } = await client.from("cdks").delete({ count: "exact" }).in("id", ids).eq("status", "idle");
    if (error) return { success: false, count: 0, error: error.message };
    return { success: true, count: count || 0 };
  },
  /**
   * CDK 上架
   */
  async enableCdk(id) {
    const client = getAdminSupabaseClient();
    const { data: cdk } = await client.from("cdks").select("status").eq("id", id).single();
    if (cdk?.status !== "disabled") return { success: false, error: "只能上架已下架的 CDK" };
    const { error } = await client.from("cdks").update({ status: "idle" }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * CDK 下架
   */
  async disableCdk(id) {
    const client = getAdminSupabaseClient();
    const { data: cdk } = await client.from("cdks").select("status").eq("id", id).single();
    if (cdk?.status !== "idle") return { success: false, error: "只能下架空闲状态的 CDK" };
    const { error } = await client.from("cdks").update({ status: "disabled" }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 批量上架 CDK
   */
  async enableCdks(ids) {
    if (!ids.length) return { success: true, count: 0 };
    const client = getAdminSupabaseClient();
    const { error, count } = await client.from("cdks").update({ status: "idle" }).in("id", ids).eq("status", "disabled");
    if (error) return { success: false, count: 0, error: error.message };
    return { success: true, count: count || 0 };
  },
  /**
   * 批量下架 CDK
   */
  async disableCdks(ids) {
    if (!ids.length) return { success: true, count: 0 };
    const client = getAdminSupabaseClient();
    const { error, count } = await client.from("cdks").update({ status: "disabled" }).in("id", ids).eq("status", "idle");
    if (error) return { success: false, count: 0, error: error.message };
    return { success: true, count: count || 0 };
  },
  /**
   * 获取单个 CDK 详情
   */
  async getCdkById(id) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("cdks").select(`*, sku_mappings:cdk_sku_map(id, sku_id, sku:product_skus(id, spec_combination, price, product_type))`).eq("id", id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, cdk: data };
  },
  /**
   * 更新 CDK
   */
  async updateCdk(id, data) {
    const client = getAdminSupabaseClient();
    const { data: currentCdk } = await client.from("cdks").select("cdk_type, max_slots").eq("id", id).single();
    if (!currentCdk) return { success: false, error: "CDK 不存在" };
    if (currentCdk.cdk_type === "shared" && data.max_slots !== void 0) {
      const newMaxSlots = Math.min(Math.max(data.max_slots, 1), 10);
      const oldMaxSlots = currentCdk.max_slots || 1;
      const { count: occupiedCount } = await client.from("slot_occupancies").select("*", { count: "exact", head: true }).eq("cdk_id", id).eq("status", "occupied");
      if (newMaxSlots < (occupiedCount || 0)) {
        return { success: false, error: `不能减少到 ${newMaxSlots}，当前已使用 ${occupiedCount} 个车位` };
      }
      const { count: existingSlotCount } = await client.from("slot_occupancies").select("*", { count: "exact", head: true }).eq("cdk_id", id);
      if (!existingSlotCount || existingSlotCount === 0) {
        const allSlots = [];
        for (let i = 0; i < newMaxSlots; i++) allSlots.push({ cdk_id: id, slot_index: i, status: "idle" });
        if (allSlots.length > 0) await client.from("slot_occupancies").insert(allSlots);
      } else if (newMaxSlots > oldMaxSlots) {
        const newSlots = [];
        for (let i = oldMaxSlots; i < newMaxSlots; i++) newSlots.push({ cdk_id: id, slot_index: i, status: "idle" });
        if (newSlots.length > 0) await client.from("slot_occupancies").insert(newSlots);
      }
      if (newMaxSlots < oldMaxSlots) {
        await client.from("slot_occupancies").delete().eq("cdk_id", id).gte("slot_index", newMaxSlots).eq("status", "idle");
      }
      data.max_slots = newMaxSlots;
    }
    const updateData = {};
    if (data.max_slots !== void 0) updateData.max_slots = data.max_slots;
    if (data.code !== void 0) updateData.code = data.code;
    if (data.account_data !== void 0) updateData.account_data = data.account_data;
    if (data.stock !== void 0) updateData.stock = data.stock;
    if (data.product_snapshot !== void 0) updateData.product_snapshot = data.product_snapshot;
    if (Object.keys(updateData).length === 0) return { success: false, error: "没有可更新的数据" };
    const { error } = await client.from("cdks").update(updateData).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 获取 CDK 的 SKU 绑定列表
   */
  async getCdkSkuMappings(cdkId) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("cdk_sku_map").select(`id, sku_id, sku:product_skus(id, spec_combination, price, product_type), created_at`).eq("cdk_id", cdkId);
    if (error) return { success: false, mappings: [], error: error.message };
    return { success: true, mappings: data || [] };
  },
  /**
   * 添加 CDK ↔ SKU 绑定
   */
  async addCdkSkuMapping(cdkId, skuId) {
    const client = getAdminSupabaseClient();
    console.log("[addCdkSkuMapping] params:", { cdkId, skuId });
    const { data: existing } = await client.from("cdk_sku_map").select("id").eq("cdk_id", cdkId).eq("sku_id", skuId).maybeSingle();
    if (existing) {
      console.log("[addCdkSkuMapping] Already exists, skipping");
      return { success: true };
    }
    const { error: insertError } = await client.from("cdk_sku_map").insert({ cdk_id: cdkId, sku_id: skuId });
    console.log("[addCdkSkuMapping] Insert result:", { insertError });
    if (insertError) return { success: false, error: insertError.message };
    return { success: true };
  },
  /**
   * 删除 CDK ↔ SKU 绑定
   */
  async removeCdkSkuMapping(mappingId) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("cdk_sku_map").delete().eq("id", mappingId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
export {
  adminCdkApi as a
};
//# sourceMappingURL=cdk-ObzrOMzo.js.map
