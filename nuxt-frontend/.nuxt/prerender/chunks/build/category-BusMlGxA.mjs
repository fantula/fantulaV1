import getSupabaseClient from './supabase-F2pQZHm6.mjs';

const adminCategoryApi = {
  async getCategories() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_categories").select("*").order("sort_order", { ascending: true });
    if (error) {
      return { success: false, categories: [], error: error.message };
    }
    const categories = data || [];
    const categoryIds = categories.map((c) => c.id);
    let countMap = {};
    if (categoryIds.length > 0) {
      const { data: products } = await client.from("products").select("category_id").in("category_id", categoryIds);
      products == null ? void 0 : products.forEach((p) => {
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
  async createCategory(data) {
    var _a, _b;
    const client = getSupabaseClient();
    const { data: category, error } = await client.from("product_categories").insert({
      name: data.name,
      sort_order: (_a = data.sort_order) != null ? _a : 0,
      status: (_b = data.status) != null ? _b : "on"
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, category };
  },
  async updateCategory(id, data) {
    const client = getSupabaseClient();
    const { error } = await client.from("product_categories").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  async deleteCategory(id) {
    const client = getSupabaseClient();
    const { count } = await client.from("products").select("*", { count: "exact", head: true }).eq("category_id", id);
    if (count && count > 0) {
      return { success: false, error: `\u8BE5\u5206\u7C7B\u4E0B\u6709 ${count} \u4E2A\u5546\u54C1\uFF0C\u8BF7\u5148\u79FB\u9664\u6216\u91CD\u65B0\u5206\u914D` };
    }
    const { error } = await client.from("product_categories").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  async batchUpdateSort(items) {
    const client = getSupabaseClient();
    for (const item of items) {
      const { error } = await client.from("product_categories").update({ sort_order: item.sort_order }).eq("id", item.id);
      if (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: true };
  }
};

export { adminCategoryApi as a };
//# sourceMappingURL=category-BusMlGxA.mjs.map
