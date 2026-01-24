import { by as getAdminSupabaseClient } from './server.mjs';

const adminImageCategoryApi = {
  /**
   * 获取图片分类列表
   */
  async getCategories() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("image_categories").select("*").order("sort_order", { ascending: true });
    if (error) return { success: false, categories: [], error: error.message };
    return { success: true, categories: data || [] };
  },
  /**
   * 创建图片分类
   */
  async createCategory(name) {
    const client = getAdminSupabaseClient();
    const { data: maxOrder } = await client.from("image_categories").select("sort_order").order("sort_order", { ascending: false }).limit(1).single();
    const nextOrder = ((maxOrder == null ? void 0 : maxOrder.sort_order) || 0) + 1;
    const { data: category, error } = await client.from("image_categories").insert({ name, sort_order: nextOrder }).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, category };
  },
  /**
   * 删除图片分类
   */
  async deleteCategory(id) {
    const client = getAdminSupabaseClient();
    const { count } = await client.from("images").select("*", { count: "exact", head: true }).eq("category_id", id);
    if (count && count > 0) {
      return { success: false, error: "\u8BE5\u5206\u7C7B\u4E0B\u6709\u56FE\u7247\uFF0C\u65E0\u6CD5\u5220\u9664" };
    }
    const { error } = await client.from("image_categories").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const adminImageApi = {
  /**
   * 获取图片列表
   */
  async getImages(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("images").select(`
            *,
            category:image_categories(*)
        `);
    if (params == null ? void 0 : params.category_id) query = query.eq("category_id", params.category_id);
    if (params == null ? void 0 : params.keyword) query = query.ilike("name", `%${params.keyword}%`);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) return { success: false, images: [], error: error.message };
    return { success: true, images: data || [] };
  },
  /**
   * 创建图片记录
   */
  async createImage(data) {
    const client = getAdminSupabaseClient();
    const { data: image, error } = await client.from("images").insert(data).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, image };
  },
  /**
   * 更新图片信息
   */
  async updateImage(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("images").update(data).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 删除图片（单个）
   */
  async deleteImage(id) {
    return this.deleteImages([id]);
  },
  /**
   * 批量删除图片
   */
  async deleteImages(ids) {
    if (!ids.length) return { success: true };
    const client = getAdminSupabaseClient();
    const { data: images, error: fetchError } = await client.from("images").select("url").in("id", ids);
    if (fetchError) return { success: false, error: fetchError.message };
    const filePaths = images.map((img) => {
      try {
        const url = new URL(img.url);
        return url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;
      } catch {
        const parts = img.url.split("/");
        return parts.slice(-2).join("/");
      }
    }).filter(Boolean);
    if (filePaths.length > 0) {
      try {
        const { getAdminAuthToken } = await import('./server.mjs').then((n) => n.cm);
        const token = await getAdminAuthToken();
        if (token) {
          const { EDGE_FUNCTIONS_URL } = await import('./server.mjs').then((n) => n.cn);
          const response = await fetch(`${EDGE_FUNCTIONS_URL}/delete-r2`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ paths: filePaths })
          });
          if (!response.ok) {
            const result = await response.json();
            console.error("Failed to delete files from R2:", result.error);
          }
        }
      } catch (e) {
        console.error("R2 delete request failed:", e);
      }
    }
    const { error } = await client.from("images").delete().in("id", ids);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const adminBannerApi = {
  /**
   * 获取轮播图列表
   */
  async getBanners() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("banners").select(`
                *,
                image:images(*)
            `).order("sort_order", { ascending: true });
    if (error) return { success: false, banners: [], error: error.message };
    return { success: true, banners: data || [] };
  },
  /**
   * 添加轮播图
   */
  async createBanner(data) {
    const client = getAdminSupabaseClient();
    const { data: banner, error } = await client.from("banners").insert({
      ...data,
      status: "on"
    }).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, banner };
  },
  /**
   * 更新轮播图状态/排序
   */
  async updateBanner(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("banners").update(data).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 删除轮播图
   */
  async deleteBanner(id) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("banners").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const adminSettingsApi = {
  /**
   * 获取 R2 配置
   */
  async getR2Settings() {
    const client = getAdminSupabaseClient();
    try {
      const { data, error } = await client.from("system_settings").select("key, value").in("key", ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "R2_PUBLIC_BASE_URL"]);
      if (error) {
        return {
          success: true,
          settings: {
            R2_ACCOUNT_ID: "",
            R2_ACCESS_KEY_ID: "",
            R2_SECRET_ACCESS_KEY: "",
            R2_BUCKET_NAME: "fantula2601",
            R2_PUBLIC_BASE_URL: "https://img.fantula.com"
          }
        };
      }
      const settings = {
        R2_ACCOUNT_ID: "",
        R2_ACCESS_KEY_ID: "",
        R2_SECRET_ACCESS_KEY: "",
        R2_BUCKET_NAME: "fantula2601",
        R2_PUBLIC_BASE_URL: "https://img.fantula.com"
      };
      data == null ? void 0 : data.forEach((item) => {
        settings[item.key] = item.value;
        if (item.key === "R2_SECRET_ACCESS_KEY" && item.value) {
          settings[item.key] = item.value.slice(0, 4) + "****" + item.value.slice(-4);
        }
      });
      return { success: true, settings };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },
  /**
   * 更新 R2 配置
   */
  async updateR2Settings(settings) {
    const client = getAdminSupabaseClient();
    try {
      const updates = Object.entries(settings).filter(([_, value]) => value !== void 0 && value !== "").map(([key, value]) => ({
        key,
        value,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }));
      if (updates.length === 0) {
        return { success: true };
      }
      const { error } = await client.from("system_settings").upsert(updates, { onConflict: "key" });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

export { adminImageApi as a, adminSettingsApi as b, adminImageCategoryApi as c, adminBannerApi as d };
//# sourceMappingURL=media-C2x210Ez.mjs.map
