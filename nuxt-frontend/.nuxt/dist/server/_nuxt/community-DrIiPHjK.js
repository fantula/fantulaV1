import { by as getAdminSupabaseClient } from "../server.mjs";
const adminCommunityApi = {
  // Articles
  async getArticles(page = 1, pageSize = 20) {
    const client = getAdminSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, count, error } = await client.from("community_articles").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(from, to);
    return { data, total: count, error };
  },
  async createArticle(article) {
    const client = getAdminSupabaseClient();
    return await client.from("community_articles").insert([article]).select();
  },
  async updateArticle(id, updates) {
    const client = getAdminSupabaseClient();
    return await client.from("community_articles").update(updates).eq("id", id).select();
  },
  async deleteArticle(id) {
    const client = getAdminSupabaseClient();
    return await client.from("community_articles").delete().eq("id", id);
  },
  // Get single article by ID (admin - can fetch drafts)
  async getArticleById(id) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("community_articles").select("*").eq("id", id).single();
    if (error) {
      return { success: false, data: null, msg: error.message };
    }
    return { success: true, data, msg: "" };
  },
  // Categories
  async getCategories() {
    const client = getAdminSupabaseClient();
    return await client.from("community_categories").select("*").order("sort_order", { ascending: true });
  },
  async createCategory(category) {
    const client = getAdminSupabaseClient();
    return await client.from("community_categories").insert([category]).select();
  },
  async updateCategory(id, updates) {
    const client = getAdminSupabaseClient();
    return await client.from("community_categories").update(updates).eq("id", id).select();
  },
  async deleteCategory(id) {
    const client = getAdminSupabaseClient();
    return await client.from("community_categories").delete().eq("id", id);
  }
};
export {
  adminCommunityApi as a
};
//# sourceMappingURL=community-DrIiPHjK.js.map
