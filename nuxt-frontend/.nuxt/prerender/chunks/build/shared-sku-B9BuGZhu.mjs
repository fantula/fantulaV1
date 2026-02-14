import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';

const adminSharedSkuApi = {
  async getSharedSkuGroups() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_skus").select("*").not("tag", "is", null).order("tag", { ascending: true }).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, groups: [], error: error.message };
    }
    const groupMap = /* @__PURE__ */ new Map();
    for (const sku of data || []) {
      const tag = sku.tag;
      if (!groupMap.has(tag)) {
        groupMap.set(tag, { tag, tag_name: sku.tag_name || "", skus: [] });
      }
      groupMap.get(tag).skus.push(sku);
    }
    return { success: true, groups: Array.from(groupMap.values()) };
  },
  async getNextTag() {
    var _a;
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_skus").select("tag").not("tag", "is", null).order("tag", { ascending: false }).limit(1);
    if (error) {
      return { success: false, tag: 1, error: error.message };
    }
    return { success: true, tag: (((_a = data == null ? void 0 : data[0]) == null ? void 0 : _a.tag) || 0) + 1 };
  },
  async createSharedSkuGroup(tag, skus, tagName) {
    const client = getSupabaseClient();
    const skuData = skus.map((sku) => ({
      tag,
      tag_name: tagName || null,
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
  async getSkusByTag(tag) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_skus").select("*").eq("tag", tag).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, skus: [], error: error.message };
    }
    return { success: true, skus: data || [] };
  },
  async getProductsBySharedTag(tag) {
    const client = getSupabaseClient();
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
  async updateSharedSkuGroup(tag, skus, tagName) {
    var _a;
    const client = getSupabaseClient();
    const { data: existingSkus } = await client.from("product_skus").select("id").eq("tag", tag);
    let linkedProductIds = [];
    const existingIdsArr = (existingSkus || []).map((s) => s.id);
    if (existingIdsArr.length > 0) {
      const { data: linked } = await client.from("product_sku_map").select("product_id").in("sku_id", existingIdsArr);
      if (linked) linkedProductIds = [...new Set(linked.map((l) => l.product_id))];
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
              newMappings.push({ product_id: pid, sku_id: ns.id, sort_order: (_a = ns.sort_order) != null ? _a : 0 });
            }
          }
          if (newMappings.length > 0) await client.from("product_sku_map").insert(newMappings);
        }
      }
    }
    return { success: true, updated: updatedCount, inserted: insertedCount, deleted: deletedCount };
  },
  async deleteSharedSkuGroup(tag) {
    const client = getSupabaseClient();
    const { data: mappings } = await client.from("product_sku_map").select("id, sku:product_skus!inner(tag)").eq("sku.tag", tag).limit(1);
    if (mappings && mappings.length > 0) {
      return { success: false, count: 0, error: "\u8BE5\u89C4\u683C\u7EC4\u5DF2\u88AB\u5546\u54C1\u5173\u8054\uFF0C\u8BF7\u5148\u89E3\u9664\u5173\u8054" };
    }
    const { count, error } = await client.from("product_skus").delete({ count: "exact" }).eq("tag", tag);
    if (error) {
      return { success: false, count: 0, error: error.message };
    }
    return { success: true, count: count || 0 };
  }
};

export { adminSharedSkuApi as a };
//# sourceMappingURL=shared-sku-B9BuGZhu.mjs.map
