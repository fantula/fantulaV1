import { by as getAdminSupabaseClient } from "../server.mjs";
import { a as adminCdkApi } from "./cdk-ObzrOMzo.js";
import { a as adminImageCategoryApi, b as adminImageApi, c as adminSettingsApi, d as adminBannerApi } from "./media-C2x210Ez.js";
import { a as adminOrderApi } from "./order-kd-ypcFy.js";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
const adminCouponApi = {
  /**
   * 获取优惠券规则列表
   */
  async getCoupons(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("coupons").select("*", { count: "exact" });
    if (params?.type) query = query.eq("type", params.type);
    if (params?.status !== void 0) query = query.eq("status", params.status);
    query = query.order("created_at", { ascending: false });
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) return { success: false, coupons: [], total: 0, error: error.message };
    return { success: true, coupons: data || [], total: count || 0 };
  },
  /**
   * 获取单个优惠券详情
   */
  async getCouponById(id) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("coupons").select("*").eq("id", id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, coupon: data };
  },
  /**
   * 创建优惠券规则
   */
  async createCoupon(data) {
    const client = getAdminSupabaseClient();
    const payload = {
      name: data.name,
      type: data.type,
      value: data.value,
      sku_ids: data.sku_ids || data.product_ids || [],
      min_usage: data.min_usage || 0,
      total_quantity: data.total_quantity || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      status: data.status !== void 0 ? data.status : true
    };
    const { data: coupon, error } = await client.from("coupons").insert(payload).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, coupon };
  },
  /**
   * 更新优惠券规则
   */
  async updateCoupon(id, data) {
    const client = getAdminSupabaseClient();
    const payload = { ...data };
    if (payload.product_ids) {
      payload.sku_ids = payload.product_ids;
      delete payload.product_ids;
    }
    const { error } = await client.from("coupons").update(payload).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 生成优惠券码
   */
  async generateCouponCodes(couponId, quantity = 1, mode = "random", customCode, usageLimit) {
    const client = getAdminSupabaseClient();
    const payload = { p_coupon_id: couponId, p_quantity: quantity, p_mode: mode };
    if (mode === "universal") {
      payload.p_custom_code = customCode;
      payload.p_usage_limit = usageLimit;
    }
    const { data, error } = await client.rpc("admin_generate_coupon_codes", payload);
    if (error) return { success: false, error: error.message };
    const res = data;
    if (res.success) return { success: true, count: res.count };
    return { success: false, error: res.error };
  },
  /**
   * 删除优惠券规则
   */
  async deleteCoupon(id) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("coupons").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 获取某优惠券的实例码列表
   */
  async getCouponCodes(couponId, params) {
    const client = getAdminSupabaseClient();
    const page = params?.page || 1;
    const pageSize = params?.size || 20;
    const offset = (page - 1) * pageSize;
    let query = client.from("coupon_codes").select("*", { count: "exact" }).eq("coupon_id", couponId);
    if (params?.status) query = query.eq("status", params.status);
    query = query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    const { data, error, count } = await query;
    if (error) return { success: false, codes: [], total: 0, error: error.message };
    return { success: true, codes: data || [], total: count || 0 };
  },
  /**
   * 切换状态
   */
  async toggleStatus(id, status) {
    return this.updateCoupon(id, { status });
  },
  /**
   * 批量删除兑换码
   */
  async deleteCouponCodes(ids) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.rpc("admin_delete_coupon_codes", { p_ids: ids });
    if (error) return { success: false, error: error.message };
    const res = data;
    if (res.success) return { success: true, count: res.count };
    return { success: false, error: res.error };
  },
  /**
   * 获取优惠券使用统计
   */
  async getCouponStats(params) {
    const client = getAdminSupabaseClient();
    const page = params.page;
    const pageSize = params.pageSize;
    const offset = (page - 1) * pageSize;
    let query = client.from("coupon_codes").select(`
                id,
                code,
                status,
                used_at,
                user_uid,
                order_id,
                coupon:coupons(name, type, value)
            `, { count: "exact" }).neq("status", "available");
    if (params.code) query = query.ilike("code", `%${params.code}%`);
    if (params.userUid) {
      query = query.eq("user_uid", params.userUid);
    }
    query = query.order("used_at", { ascending: false }).range(offset, offset + pageSize - 1);
    const { data, error, count } = await query;
    if (error) return { success: false, data: [], total: 0, error: error.message };
    const formattedData = (data || []).map((item) => ({
      id: item.id,
      user_uid: item.user_uid,
      used_at: item.used_at,
      created_at: item.created_at,
      order_id: item.order_id,
      code: item.code,
      status: item.status,
      coupon_name: item.coupon?.name,
      coupon_type: item.coupon?.type,
      value: item.coupon?.value
    }));
    return { success: true, data: formattedData, total: count || 0 };
  },
  /**
   * 批量删除使用记录
   */
  async deleteCouponUsages(ids) {
    const client = getAdminSupabaseClient();
    const { error, count } = await client.from("coupon_codes").delete().in("id", ids);
    if (error) return { success: false, error: error.message };
    return { success: true, count: count || ids.length };
  },
  /**
   * 更新优惠券说明（code 字段）
   */
  async updateCouponCode(id, code) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("coupons").update({ code }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const adminProductApi = {
  /**
   * 获取商品列表（管理员视角，支持分页和服务端筛选）
   * @param params 筛选和分页参数
   */
  async getProducts(params) {
    const client = getAdminSupabaseClient();
    const page = params?.page || 1;
    const pageSize = params?.page_size || 20;
    const offset = (page - 1) * pageSize;
    let query = client.from("products").select("*", { count: "exact" });
    if (params?.category_id) {
      query = query.eq("category_id", params.category_id);
    }
    if (params?.status) {
      query = query.eq("status", params.status);
    }
    if (params?.keyword) {
      query = query.ilike("product_name", `%${params.keyword}%`);
    }
    query = query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    const { data, error, count } = await query;
    if (error) {
      return { success: false, products: [], total: 0, error: error.message };
    }
    const products = data || [];
    const productIds = products.map((p) => p.id);
    let skuCountMap = {};
    let skuDetailsMap = {};
    if (productIds.length > 0) {
      const { data: skuMapData } = await client.from("product_sku_map").select("product_id, sku:product_skus (tag, tag_name, spec_combination)").in("product_id", productIds);
      skuMapData?.forEach((item) => {
        const pid = item.product_id;
        skuCountMap[pid] = (skuCountMap[pid] || 0) + 1;
        if (!skuDetailsMap[pid]) skuDetailsMap[pid] = [];
        const sku = item.sku;
        if (sku) {
          let label = "";
          if (sku.tag_name) label = `🔖 ${sku.tag_name}`;
          else if (sku.spec_combination && Object.values(sku.spec_combination).length > 0) {
            label = Object.values(sku.spec_combination).join(" / ");
          } else {
            label = "默认规格";
          }
          if (label && !skuDetailsMap[pid].includes(label)) {
            skuDetailsMap[pid].push(label);
          }
        }
      });
    }
    const productsWithSkuCount = products.map((product) => ({
      ...product,
      sku_count: skuCountMap[product.id] || 0,
      sku_details: skuDetailsMap[product.id] || []
    }));
    return { success: true, products: productsWithSkuCount, total: count || 0 };
  },
  /**
   * 获取单个商品详情（用于编辑）
   */
  async getProductById(id) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("products").select("*, category:product_categories(id, name)").eq("id", id).single();
    if (error || !data) {
      return { success: false, error: error?.message || "商品不存在" };
    }
    return { success: true, product: data };
  },
  /**
   * 创建商品
   */
  async createProduct(data) {
    const client = getAdminSupabaseClient();
    const { data: product, error } = await client.from("products").insert({
      product_name: data.product_name,
      category_id: data.category_id,
      image: data.image,
      sort_order: data.sort_order || 0,
      display_price: data.display_price || 0,
      tags: data.tags || [],
      initial_sales: data.initial_sales || 0,
      badge_label: data.badge_label,
      rating: data.rating || 100,
      allow_addon: data.allow_addon || false,
      detail_modules: data.detail_modules || [],
      status: data.status || "on"
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, product };
  },
  /**
   * 更新商品（注意：product_type 不可修改）
   */
  async updateProduct(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("products").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 切换商品状态
   */
  async toggleStatus(id, status) {
    return this.updateProduct(id, { status });
  },
  /**
   * 删除商品（支持批量）
   * 只删除 products 表和 product_sku_map 映射，保留 product_skus
   * @param ids 商品ID数组
   */
  async deleteProducts(ids) {
    const client = getAdminSupabaseClient();
    await client.from("product_sku_map").delete().in("product_id", ids);
    const { error } = await client.from("products").delete().in("id", ids);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  // createProductSpecs 已废弃，规格现在直接包含在 product_skus 的 spec_combination 中
  /**
   * 创建商品 SKU 组合
   * @param productId 商品ID
   * @param skus SKU 数组（每条需指定 product_type）
   */
  async createProductSkus(productId, skus) {
    const client = getAdminSupabaseClient();
    const skuData = skus.map((sku) => ({
      product_type: sku.product_type,
      spec_combination: sku.spec_combination,
      image: sku.image || null,
      intro: sku.intro || null,
      price: sku.price,
      duration: sku.duration || null,
      sort_order: sku.sort_order,
      tag: sku.tag || null
    }));
    const { data: createdSkus, error: skuError } = await client.from("product_skus").insert(skuData).select("id");
    if (skuError) {
      return { success: false, error: skuError.message };
    }
    const mappings = (createdSkus || []).map((sku, index) => ({
      product_id: productId,
      sku_id: sku.id,
      sort_order: skus[index]?.sort_order || index
    }));
    if (mappings.length > 0) {
      const { error: mapError } = await client.from("product_sku_map").insert(mappings);
      if (mapError) {
        console.error("SKU 映射创建失败:", mapError);
        return { success: true, count: createdSkus?.length || 0, skuIds: createdSkus?.map((s) => s.id), error: `SKU 已创建但映射失败: ${mapError.message}` };
      }
    }
    return { success: true, count: createdSkus?.length || 0, skuIds: createdSkus?.map((s) => s.id) };
  },
  /**
   * 智能更新商品 SKU（更新已有、删除移除、插入新增）
   * @param productId 商品ID
   * @param skus SKU 数组（含 id 的为更新，不含的为新增）
   */
  /**
   * 更新商品 SKU 配置（支持自定义模式和共享模式）
   * @param productId 商品ID
   * @param options 配置选项
   */
  async updateProductSkus(productId, options) {
    const client = getAdminSupabaseClient();
    if (options.mode === "shared") {
      if (!options.sharedTag) return { success: false, error: "缺少共享规格组 Tag" };
      const { data: sharedSkus, error: fetchError } = await client.from("product_skus").select("id, sort_order").eq("tag", options.sharedTag);
      if (fetchError) return { success: false, error: fetchError.message };
      if (!sharedSkus || sharedSkus.length === 0) return { success: false, error: "该共享组没有 SKU" };
      const { error: delError } = await client.from("product_sku_map").delete().eq("product_id", productId);
      if (delError) return { success: false, error: delError.message };
      const mappings = sharedSkus.map((sku) => ({
        product_id: productId,
        sku_id: sku.id,
        sort_order: sku.sort_order
      }));
      const { error: mapError } = await client.from("product_sku_map").insert(mappings);
      if (mapError) return { success: false, error: mapError.message };
      return { success: true };
    }
    const { data: currentMappings } = await client.from("product_sku_map").select("sku_id, sku:product_skus!inner(tag)").eq("product_id", productId);
    const currentSkuIds = new Set((currentMappings || []).map((m) => m.sku_id));
    const newSkus = options.skus || [];
    const newSkuIds = new Set(newSkus.filter((s) => s.id).map((s) => s.id));
    const toRemoveIds = [...currentSkuIds].filter((id) => !newSkuIds.has(id));
    if (toRemoveIds.length > 0) {
      await client.from("product_sku_map").delete().eq("product_id", productId).in("sku_id", toRemoveIds);
    }
    const toUpdate = newSkus.filter((s) => s.id && currentSkuIds.has(s.id));
    for (const sku of toUpdate) {
      await client.from("product_skus").update({
        product_type: sku.product_type,
        spec_combination: sku.spec_combination,
        image: sku.image || null,
        intro: sku.intro || null,
        price: sku.price,
        duration: sku.duration || null,
        sort_order: sku.sort_order
      }).eq("id", sku.id).is("tag", null);
    }
    const toInsert = newSkus.filter((s) => !s.id);
    if (toInsert.length > 0) {
      const insertData = toInsert.map((sku) => ({
        product_type: sku.product_type,
        // 自定义 SKU 必须携带类型
        spec_combination: sku.spec_combination,
        image: sku.image || null,
        intro: sku.intro || null,
        price: sku.price,
        duration: sku.duration || null,
        sort_order: sku.sort_order,
        tag: null
        // 私有 SKU
      }));
      const { data: createdSkus, error: createError } = await client.from("product_skus").insert(insertData).select("id");
      if (createError) return { success: false, error: createError.message };
      const newMappings = (createdSkus || []).map((sku, idx) => ({
        product_id: productId,
        sku_id: sku.id,
        sort_order: toInsert[idx].sort_order
      }));
      if (newMappings.length > 0) {
        await client.from("product_sku_map").insert(newMappings);
      }
    }
    return { success: true };
  },
  /**
   * 获取商品完整数据（含规格和SKU）
   * 通过 product_sku_map 映射表查询
   * @param productId 商品ID
   */
  async getProductWithSkus(productId) {
    const client = getAdminSupabaseClient();
    const { data: product, error: productError } = await client.from("products").select("*").eq("id", productId).single();
    if (productError) {
      return { success: false, error: productError.message };
    }
    const { data: skuMappings, error: skuError } = await client.from("product_sku_map").select("*, product_skus(*)").eq("product_id", productId).order("sort_order", { ascending: true });
    console.log("[getProductWithSkus] productId:", productId);
    console.log("[getProductWithSkus] skuMappings:", skuMappings);
    console.log("[getProductWithSkus] skuError:", skuError);
    if (skuError) {
      console.error("SKU query error:", skuError);
      return { success: false, error: skuError.message };
    }
    const skus = (skuMappings || []).map((m) => m.product_skus).filter(Boolean);
    console.log("[getProductWithSkus] extracted skus:", skus);
    const specsMap = /* @__PURE__ */ new Map();
    if (skus && skus.length > 0) {
      skus.forEach((sku) => {
        if (sku.spec_combination) {
          Object.entries(sku.spec_combination).forEach(([key, value]) => {
            if (!specsMap.has(key)) {
              specsMap.set(key, /* @__PURE__ */ new Set());
            }
            specsMap.get(key)?.add(String(value));
          });
        }
      });
    }
    const specs = Array.from(specsMap.entries()).map(([name, valuesSet]) => ({
      id: name,
      name,
      sort_order: 0,
      values: Array.from(valuesSet).map((v, i) => ({
        id: v,
        value: v,
        sort_order: i
      }))
    }));
    return { success: true, product, specs, skus: skus || [] };
  },
  /**
   * @deprecated 请使用 product_sku_map 管理 SKU 关联
   */
  async clearProductSpecsAndSkus(productId) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("product_sku_map").delete().eq("product_id", productId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 批量获取 SKU 详情（用于回显）
   */
  async getSkusByIds(ids) {
    if (!ids.length) return { success: true, skus: [] };
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("product_sku_map").select(`
                sku_id,
                product:products(id, product_name),
                sku:product_skus(*)
            `).in("sku_id", ids);
    if (error) return { success: false, error: error.message };
    const skus = data?.map((item) => ({
      ...item.sku,
      productId: item.product?.id,
      productName: item.product?.product_name
    })) || [];
    return { success: true, skus };
  }
};
const adminUserApi = {
  /**
   * 获取用户列表
   */
  async getUsers(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("profiles").select("*", { count: "exact" });
    if (params?.status) {
      query = query.eq("status", params.status);
    }
    query = query.order("created_at", { ascending: false });
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      return { success: false, users: [], total: 0, error: error.message };
    }
    return { success: true, users: data || [], total: count || 0 };
  },
  /**
   * 根据 UID 查询用户
   */
  async getUserByUid(uid) {
    const client = getAdminSupabaseClient();
    console.log("[getUserByUid] Querying profiles for UID:", uid);
    const { data, error } = await client.from("profiles").select("*").eq("uid", uid).single();
    if (error) {
      console.error("[getUserByUid] Error:", error.message, error.code, error.details);
      return { success: false, error: `用户不存在 (${error.code}: ${error.message})` };
    }
    console.log("[getUserByUid] Found user:", data);
    return { success: true, user: data };
  },
  /**
   * 禁用/启用用户
   */
  async toggleStatus(id, status) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("profiles").update({ status }).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
const adminMessageApi = {
  /**
   * 获取消息列表
   */
  async getMessages(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("messages").select("*", { count: "exact" });
    if (params?.user_uid) {
      query = query.eq("user_uid", params.user_uid);
    }
    query = query.order("created_at", { ascending: false });
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      return { success: false, messages: [], total: 0, error: error.message };
    }
    return { success: true, messages: data || [], total: count || 0 };
  },
  /**
   * 发送消息（增强版：支持 type, link, 自动解析 user_id）
   */
  async sendMessage(userUid, title, content, type = "system", link) {
    const client = getAdminSupabaseClient();
    const { data: profile, error: profileError } = await client.from("profiles").select("id, uid").eq("uid", userUid).single();
    if (profileError || !profile) {
      return { success: false, error: "用户不存在，禁止发送消息" };
    }
    const { data, error } = await client.from("messages").insert({
      user_id: profile.id,
      // UUID for RLS
      user_uid: userUid,
      // Keep for legacy/display
      title,
      content,
      type,
      link: link || null
    }).select("id").single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, message_id: data.id };
  }
};
const adminSharedSkuApi = {
  /**
   * 获取所有共享规格组（按 tag 分组）
   */
  async getSharedSkuGroups() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("product_skus").select("*").not("tag", "is", null).order("tag", { ascending: true }).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, groups: [], error: error.message };
    }
    const groupMap = /* @__PURE__ */ new Map();
    for (const sku of data || []) {
      const tag = sku.tag;
      if (!groupMap.has(tag)) {
        groupMap.set(tag, {
          tag,
          tag_name: sku.tag_name || "",
          // 读取 tag_name
          skus: []
        });
      }
      groupMap.get(tag).skus.push(sku);
    }
    return { success: true, groups: Array.from(groupMap.values()) };
  },
  /**
   * 获取下一个可用的 tag 编号
   */
  async getNextTag() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("product_skus").select("tag").not("tag", "is", null).order("tag", { ascending: false }).limit(1);
    if (error) {
      return { success: false, tag: 1, error: error.message };
    }
    const maxTag = data?.[0]?.tag || 0;
    return { success: true, tag: maxTag + 1 };
  },
  /**
   * 创建共享规格组（只写 product_skus 表）
   */
  async createSharedSkuGroup(tag, skus, tagName) {
    const client = getAdminSupabaseClient();
    const skuData = skus.map((sku) => ({
      tag,
      tag_name: tagName || null,
      // 写入 tag_name
      product_type: sku.product_type,
      spec_combination: sku.spec_combination,
      price: sku.price,
      duration: sku.duration || null,
      intro: sku.intro || null,
      image: sku.image || null,
      sort_order: sku.sort_order
    }));
    const { error } = await client.from("product_skus").insert(skuData);
    if (error) {
      return { success: false, count: 0, error: error.message };
    }
    return { success: true, count: skuData.length };
  },
  /**
   * 获取指定 tag 的规格组详情
   */
  async getSkusByTag(tag) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("product_skus").select("*").eq("tag", tag).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, skus: [], error: error.message };
    }
    return { success: true, skus: data || [] };
  },
  /**
   * 获取使用某共享组的所有商品 (用于查看)
   */
  async getProductsBySharedTag(tag) {
    const client = getAdminSupabaseClient();
    const { data: skus } = await client.from("product_skus").select("id").eq("tag", tag);
    if (!skus || !skus.length) return { success: true, products: [] };
    const skuIds = skus.map((s) => s.id);
    const { data: maps, error: mapError } = await client.from("product_sku_map").select("product_id").in("sku_id", skuIds);
    if (mapError) return { success: false, error: mapError.message };
    if (!maps || !maps.length) return { success: true, products: [] };
    const productIds = [...new Set(maps.map((m) => m.product_id))];
    const { data: products, error: prodError } = await client.from("products").select("id, product_name, image, status").in("id", productIds);
    if (prodError) return { success: false, error: prodError.message };
    return { success: true, products: products || [] };
  },
  /**
   * 更新共享规格组（智能更新：增删改）
   */
  async updateSharedSkuGroup(tag, skus, tagName) {
    const client = getAdminSupabaseClient();
    const { data: existingSkus } = await client.from("product_skus").select("id").eq("tag", tag);
    let linkedProductIds = [];
    const existingIdsArr = (existingSkus || []).map((s) => s.id);
    if (existingIdsArr.length > 0) {
      const { data: linked } = await client.from("product_sku_map").select("product_id").in("sku_id", existingIdsArr);
      if (linked) {
        linkedProductIds = [...new Set(linked.map((l) => l.product_id))];
      }
    }
    const existingIds = new Set(existingIdsArr);
    const keepIds = new Set(skus.filter((s) => s.id).map((s) => s.id));
    const toDelete = [...existingIds].filter((id) => !keepIds.has(id));
    let deletedCount = 0;
    if (toDelete.length > 0) {
      const { count } = await client.from("product_skus").delete({ count: "exact" }).in("id", toDelete);
      deletedCount = count || 0;
    }
    let updatedCount = 0;
    for (const sku of skus.filter((s) => s.id && existingIds.has(s.id))) {
      const { error } = await client.from("product_skus").update({
        tag_name: tagName || null,
        // 同步更新 tag_name
        product_type: sku.product_type,
        spec_combination: sku.spec_combination,
        price: sku.price,
        duration: sku.duration || null,
        intro: sku.intro || null,
        image: sku.image || null,
        sort_order: sku.sort_order
      }).eq("id", sku.id);
      if (!error) updatedCount++;
    }
    const toInsert = skus.filter((s) => !s.id);
    let insertedCount = 0;
    if (toInsert.length > 0) {
      const insertData = toInsert.map((sku) => ({
        tag,
        tag_name: tagName || null,
        // 写入 tag_name
        product_type: sku.product_type,
        spec_combination: sku.spec_combination,
        price: sku.price,
        duration: sku.duration || null,
        intro: sku.intro || null,
        image: sku.image || null,
        sort_order: sku.sort_order
      }));
      const { data: newSkus, error } = await client.from("product_skus").insert(insertData).select("id, sort_order");
      if (!error && newSkus) {
        insertedCount = newSkus.length;
        if (linkedProductIds.length > 0) {
          const newMappings = [];
          for (const pid of linkedProductIds) {
            for (const ns of newSkus) {
              newMappings.push({
                product_id: pid,
                sku_id: ns.id,
                sort_order: ns.sort_order ?? 0
              });
            }
          }
          if (newMappings.length > 0) {
            await client.from("product_sku_map").insert(newMappings);
          }
        }
      }
    }
    return { success: true, updated: updatedCount, inserted: insertedCount, deleted: deletedCount };
  },
  /**
   * 删除共享规格组
   */
  async deleteSharedSkuGroup(tag) {
    const client = getAdminSupabaseClient();
    const { data: mappings } = await client.from("product_sku_map").select("id, sku:product_skus!inner(tag)").eq("sku.tag", tag).limit(1);
    if (mappings && mappings.length > 0) {
      return { success: false, count: 0, error: "该规格组已被商品关联，请先解除关联" };
    }
    const { count, error } = await client.from("product_skus").delete({ count: "exact" }).eq("tag", tag);
    if (error) {
      return { success: false, count: 0, error: error.message };
    }
    return { success: true, count: count || 0 };
  }
};
const adminCategoryApi = {
  /**
   * 获取分类列表（含商品数量，批量查询优化）
   */
  async getCategories() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("product_categories").select("*").order("sort_order", { ascending: true });
    if (error) {
      return { success: false, categories: [], error: error.message };
    }
    const categories = data || [];
    const categoryIds = categories.map((c) => c.id);
    let countMap = {};
    if (categoryIds.length > 0) {
      const { data: products } = await client.from("products").select("category_id").in("category_id", categoryIds);
      products?.forEach((p) => {
        if (p.category_id) {
          countMap[p.category_id] = (countMap[p.category_id] || 0) + 1;
        }
      });
    }
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      product_count: countMap[cat.id] || 0
    }));
    return { success: true, categories: categoriesWithCount };
  },
  /**
   * 创建分类
   */
  async createCategory(data) {
    const client = getAdminSupabaseClient();
    const { data: category, error } = await client.from("product_categories").insert({
      name: data.name,
      sort_order: data.sort_order ?? 0,
      status: data.status ?? "on"
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, category };
  },
  /**
   * 更新分类
   */
  async updateCategory(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("product_categories").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除分类（有商品时禁止删除）
   */
  async deleteCategory(id) {
    const client = getAdminSupabaseClient();
    const { count } = await client.from("products").select("*", { count: "exact", head: true }).eq("category_id", id);
    if (count && count > 0) {
      return { success: false, error: `该分类下有 ${count} 个商品，请先移除或重新分配` };
    }
    const { error } = await client.from("product_categories").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 批量更新分类排序
   */
  async batchUpdateSort(items) {
    const client = getAdminSupabaseClient();
    for (const item of items) {
      const { error } = await client.from("product_categories").update({ sort_order: item.sort_order }).eq("id", item.id);
      if (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: true };
  }
};
const adminDepartmentApi = {
  /**
   * 获取部门列表
   */
  async getDepartments() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("admin_departments").select("*").order("created_at", { ascending: true });
    if (error) {
      return { success: false, departments: [], error: error.message };
    }
    const departmentsWithCount = await Promise.all(
      (data || []).map(async (dept) => {
        const { count } = await client.from("admin_users").select("*", { count: "exact", head: true }).eq("department_id", dept.id);
        return { ...dept, user_count: count || 0 };
      })
    );
    return { success: true, departments: departmentsWithCount };
  },
  /**
   * 创建部门
   */
  async createDepartment(data) {
    const client = getAdminSupabaseClient();
    const { data: department, error } = await client.from("admin_departments").insert({
      name: data.name,
      permissions: data.permissions ?? []
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, department };
  },
  /**
   * 更新部门
   */
  async updateDepartment(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("admin_departments").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除部门（有用户时禁止删除）
   */
  async deleteDepartment(id) {
    const client = getAdminSupabaseClient();
    const { count } = await client.from("admin_users").select("*", { count: "exact", head: true }).eq("department_id", id);
    if (count && count > 0) {
      return { success: false, error: `该部门下有 ${count} 个用户，请先移除或重新分配` };
    }
    const { error } = await client.from("admin_departments").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
const adminBackendUserApi = {
  /**
   * 获取后台用户列表
   */
  async getUsers() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("admin_users").select(`
                *,
                department:admin_departments(id, name, permissions)
            `).order("created_at", { ascending: false });
    if (error) {
      return { success: false, users: [], error: error.message };
    }
    return { success: true, users: data || [] };
  },
  /**
   * 创建后台用户
   */
  async createUser(data) {
    const client = getAdminSupabaseClient();
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(data.password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const password_hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const { data: user, error } = await client.from("admin_users").insert({
      name: data.name,
      email: data.email,
      password_hash,
      department_id: data.department_id ?? null,
      status: data.status ?? "enabled"
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, user };
  },
  /**
   * 更新后台用户
   */
  async updateUser(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("admin_users").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除后台用户
   */
  async deleteUser(id) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("admin_users").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 后台用户登录
   */
  async login(email, password) {
    const client = getAdminSupabaseClient();
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const password_hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const { data, error } = await client.from("admin_users").select(`
                *,
                department:admin_departments(id, name, permissions)
            `).eq("email", email).eq("password_hash", password_hash).eq("status", "enabled").single();
    if (error || !data) {
      return { success: false, error: "邮箱或密码错误，或账号已禁用" };
    }
    return { success: true, user: data };
  }
};
const adminRechargeApi = {
  /**
   * 获取所有充值档位
   */
  async getTiers() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").select("*").order("sort_order", { ascending: true });
    if (error) {
      return { success: false, data: [], error: error.message };
    }
    return { success: true, data: data || [] };
  },
  /**
   * 创建充值档位
   */
  async createTier(tierData) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").insert(tierData).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },
  /**
   * 更新充值档位
   */
  async updateTier(id, tierData) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("recharge_tiers").update(tierData).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除充值档位
   */
  async deleteTier(id) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("recharge_tiers").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
const adminApi = {
  product: adminProductApi,
  cdk: adminCdkApi,
  order: adminOrderApi,
  user: adminUserApi,
  message: adminMessageApi,
  category: adminCategoryApi,
  department: adminDepartmentApi,
  backendUser: adminBackendUserApi,
  image: adminImageApi,
  banner: adminBannerApi,
  imageCategory: adminImageCategoryApi,
  settings: adminSettingsApi,
  coupon: adminCouponApi,
  recharge: adminRechargeApi
};
export {
  adminProductApi as a,
  adminApi as b,
  adminCouponApi as c,
  adminCategoryApi as d,
  adminSharedSkuApi as e,
  adminRechargeApi as f,
  adminMessageApi as g,
  adminUserApi as h
};
//# sourceMappingURL=admin-supabase-nszo-IoU.js.map
