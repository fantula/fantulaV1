import { by as getAdminSupabaseClient } from './server.mjs';

const adminFaqApi = {
  // --- FAQ Category Management ---
  async getCategories() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("faq_categories").select("*").order("sort_order", { ascending: true });
    if (error) return { success: false, categories: [], error: error.message };
    return { success: true, categories: data || [] };
  },
  async createCategory(data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("faq_categories").insert({
      name: data.name,
      sort_order: data.sort_order,
      is_active: true
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  async updateCategory(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("faq_categories").update(data).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  async deleteCategory(id) {
    const client = getAdminSupabaseClient();
    const { count } = await client.from("faqs").select("*", { count: "exact", head: true }).eq("category_id", id);
    if (count && count > 0) {
      return { success: false, error: `\u65E0\u6CD5\u5220\u9664\uFF1A\u8BE5\u5206\u7C7B\u4E0B\u6709 ${count} \u4E2A\u95EE\u9898\uFF0C\u8BF7\u5148\u79FB\u9664\u95EE\u9898` };
    }
    const { error } = await client.from("faq_categories").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  // --- FAQ Management ---
  async getFaqs(params) {
    const client = getAdminSupabaseClient();
    const page = (params == null ? void 0 : params.page) || 1;
    const pageSize = (params == null ? void 0 : params.page_size) || 20;
    const offset = (page - 1) * pageSize;
    let query = client.from("faqs").select(`
                *,
                category:faq_categories(id, name),
                product:products(id, product_name)
            `, { count: "exact" });
    if (params == null ? void 0 : params.category_id) {
      query = query.eq("category_id", params.category_id);
    }
    if (params == null ? void 0 : params.keyword) {
      query = query.ilike("question", `%${params.keyword}%`);
    }
    query = query.order("sort_order", { ascending: true }).range(offset, offset + pageSize - 1);
    const { data, error, count } = await query;
    if (error) return { success: false, faqs: [], total: 0, error: error.message };
    return { success: true, faqs: data || [], total: count || 0 };
  },
  async getFaqById(id) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("faqs").select(`
                *,
                product:products(id, product_name)
            `).eq("id", id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, faq: data };
  },
  async createFaq(data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("faqs").insert({
      category_id: data.category_id || null,
      question: data.question,
      answer: data.answer,
      product_id: data.product_id || null,
      sort_order: data.sort_order || 0,
      is_active: data.is_active !== false
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  async updateFaq(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("faqs").update({
      category_id: data.category_id || null,
      question: data.question,
      answer: data.answer,
      product_id: data.product_id || null,
      sort_order: data.sort_order,
      is_active: data.is_active
    }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  async deleteFaq(id) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("faqs").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const adminArticleApi = {
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

export { adminFaqApi as a, adminArticleApi as b };
//# sourceMappingURL=help-center-CbrlDHXl.mjs.map
