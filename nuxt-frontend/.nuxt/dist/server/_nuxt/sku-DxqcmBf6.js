import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
const adminSkuApi = {
  /**
   * 获取所有物理 SKU (用于 SKU 管理页)
   */
  async getAllSkus(params) {
    const client = getSupabaseClient();
    let query = client.from("product_skus").select("*, product_sku_map(product_id)", { count: "exact" }).is("tag", null);
    const { data, error } = await query;
    if (error) return { success: false, error: error.message };
    let skus = data.map((sku) => {
      const mappings = sku.product_sku_map || [];
      return {
        ...sku,
        is_linked: mappings.length > 0,
        linked_count: mappings.length
      };
    });
    if (params?.showUnlinkedOnly) {
      skus = skus.filter((s) => !s.is_linked);
    }
    skus.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return { success: true, skus };
  },
  /**
   * 批量删除 SKU (物理删除)
   * 强制解除关联: CDK映射, 商品映射
   */
  async deleteSkus(ids) {
    const client = getSupabaseClient();
    await client.from("cdk_sku_map").delete().in("sku_id", ids);
    await client.from("product_sku_map").delete().in("sku_id", ids);
    const { error } = await client.from("product_skus").delete().in("id", ids);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
  /**
   * 获取共享 SKU 组
   */
  /**
   * 获取共享 SKU 组
   * 逻辑更改: 直接从 product_skus 表根据 tag 字段聚合，不再依赖 shared_sku_groups 表
   */
  /**
   * 获取使用某共享组的所有商品 (用于查看)
   */
};
export {
  adminSkuApi as a
};
//# sourceMappingURL=sku-DxqcmBf6.js.map
