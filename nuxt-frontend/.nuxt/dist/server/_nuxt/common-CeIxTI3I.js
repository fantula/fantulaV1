import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
const http = {
  get(url, params, config) {
    throw new Error("http.get 已废弃，请改用 useHttp() composable");
  },
  post(url, data, config) {
    throw new Error("http.post 已废弃，请改用 useHttp() composable");
  },
  put(url, data, config) {
    throw new Error("http.put 已废弃，请改用 useHttp() composable");
  },
  delete(url, config) {
    throw new Error("http.delete 已废弃，请改用 useHttp() composable");
  },
  upload(url, file, config) {
    throw new Error("http.upload 已废弃，请改用 useHttp() composable");
  },
  download(url, params, filename) {
    throw new Error("http.download 已废弃，请改用 useHttp() composable");
  }
};
const commonApi = {
  /**
   * 获取基础配置信息
   */
  getBasicConfig() {
    return http.get("/basic");
  },
  /**
   * 获取常见问题列表
   */
  getQuestionList() {
    return http.get("/question/list");
  },
  /**
   * 文件上传
   * @param file 文件对象
   */
  uploadFile(file) {
    return http.upload("/sys/oss/upload", file);
  },
  /**
   * 获取系统配置
   */
  getSystemConfig() {
    return http.get("/sys/config");
  },
  /**
   * 获取验证码
   * @param uuid 唯一标识
   */
  getCaptcha(uuid) {
    (void 0).open(`/captcha?uuid=${uuid}`, "_blank");
  },
  /**
   * 发送邮件验证码
   * @param email 邮箱地址
   */
  sendEmailCode(email) {
    return http.get("/product/common/code", { email });
  },
  /**
   * 获取轮播图列表 (从 Supabase 获取)
   */
  async getBannerList() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("banners").select(`
        *,
        image:images(url)
      `).eq("status", "on").order("sort_order", { ascending: true });
    if (error) {
      console.error("Fetch banners error:", error);
      return { code: 500, msg: error.message, data: [], success: false };
    }
    const adaptedData = (data || []).map((item) => ({
      id: item.id,
      title: item.title || "",
      image: item.image?.url || item.url || "/images/banner.png",
      link: item.link || "",
      sort: item.sort_order,
      status: item.status === "on" ? 1 : 0
    }));
    return { code: 0, msg: "success", data: adaptedData, success: true };
  },
  /**
   * 获取文章列表（分页）
   * @param params 分页参数
   */
  getArticleList(params = { page: 1, limit: 10 }) {
    return http.get("/product/article/page", params);
  },
  /**
   * 获取文章详情
   * @param id 文章ID
   */
  getArticleDetail(id) {
    return http.get(`/product/article/${id}`);
  }
};
const cartApi = {
  /**
   * 获取购物车列表（动态 JOIN 商品信息）
   */
  async getCartList() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", data: { list: [] }, success: false };
    const { data, error } = await client.from("cart_items").select(`
        id,
        sku_id,
        quantity,
        created_at,
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `).eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch cart error:", error);
      return { code: 500, msg: error.message, data: { list: [] }, success: false };
    }
    const skuIds = (data || []).map((item) => item.sku_id).filter(Boolean);
    let productMap = {};
    if (skuIds.length > 0) {
      const { data: mappings } = await client.from("product_sku_map").select("sku_id, product:products(id, product_name, image, allow_addon)").in("sku_id", skuIds);
      mappings?.forEach((m) => {
        if (m.product) productMap[m.sku_id] = m.product;
      });
    }
    const list = (data || []).map((item) => {
      const product = productMap[item.sku_id];
      return {
        id: item.id,
        skuId: item.sku_id,
        quantity: item.quantity,
        productId: product?.id,
        productName: product?.product_name || "未知商品",
        productImage: product?.image || "/images/shared/logo.png",
        allowAddon: product?.allow_addon || false,
        price: item.product_skus?.price || 0,
        specName: item.product_skus?.spec_combination ? Object.values(item.product_skus.spec_combination).join(" ") : ""
      };
    });
    return { code: 0, msg: "success", data: { list }, success: true };
  },
  /**
   * 添加到购物车（简化版：只需 skuId）
   */
  async addToCart(skuId, quantity = 1) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("cart_items").upsert({
      user_id: user.id,
      sku_id: skuId,
      quantity
    }, {
      onConflict: "user_id, sku_id"
    });
    if (error) {
      console.error("Add to cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "已加入购物车", success: true };
  },
  /**
   * 更新购物车数量
   */
  async updateQuantity(cartItemId, quantity) {
    const client = getSupabaseClient();
    const { error } = await client.from("cart_items").update({ quantity }).eq("id", cartItemId);
    if (error) {
      console.error("Update cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * 从购物车删除
   */
  async removeFromCart(cartItemId) {
    const client = getSupabaseClient();
    const { error } = await client.from("cart_items").delete().eq("id", cartItemId);
    if (error) {
      console.error("Remove from cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "已从购物车删除", success: true };
  },
  /**
   * 清空购物车
   */
  async clearCart() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("cart_items").delete().eq("user_id", user.id);
    if (error) {
      console.error("Clear cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "购物车已清空", success: true };
  }
};
const favoriteApi = {
  /**
   * 【优化】获取收藏数据（分类 + 收藏列表）- 合并接口
   */
  async getFavoritesData() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const [categoriesRes, favoritesRes] = await Promise.all([
      client.from("product_categories").select("id, name").eq("status", "on").order("sort_order"),
      client.from("user_favorites").select(`
        id,
        created_at,
        product_id,
        sku_id,
        products:product_id (
          id,
          product_name,
          image,
          display_price,
          category_id
        ),
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `).eq("user_id", user.id).order("created_at", { ascending: false })
    ]);
    const categories = [{ id: "all", name: "全部收藏" }, ...categoriesRes.data || []];
    const favorites = (favoritesRes.data || []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      skuId: item.sku_id,
      productName: item.products?.product_name || "未知商品",
      productImage: item.products?.image || "/images/shared/logo.png",
      categoryId: item.products?.category_id,
      price: item.product_skus?.price || item.products?.display_price || 0,
      specName: item.product_skus?.spec_combination ? Object.values(item.product_skus.spec_combination).join(" ") : "",
      createdAt: item.created_at
    }));
    return {
      code: 0,
      msg: "success",
      data: { categories, favorites },
      success: true
    };
  },
  /**
   * 添加收藏
   */
  async addFavorite(productId, skuId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("user_favorites").insert({
      user_id: user.id,
      product_id: productId,
      sku_id: skuId || null
    });
    if (error) {
      if (error.code === "23505") {
        return { code: 400, msg: "已经收藏过了", success: false };
      }
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "收藏成功", success: true };
  },
  /**
   * 删除收藏
   */
  async removeFavorite(favoriteId) {
    const client = getSupabaseClient();
    const { error } = await client.from("user_favorites").delete().eq("id", favoriteId);
    if (error) return { code: 500, msg: error.message, success: false };
    return { code: 0, msg: "已取消收藏", success: true };
  },
  /**
   * 检查是否已收藏
   */
  async checkFavorite(productId, skuId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", data: false, success: false };
    let query = client.from("user_favorites").select("id").eq("user_id", user.id).eq("product_id", productId);
    if (skuId) {
      query = query.eq("sku_id", skuId);
    }
    const { data, error } = await query.maybeSingle();
    if (error) return { code: 500, msg: error.message, data: false, success: false };
    return { code: 0, msg: "success", data: !!data, success: true };
  },
  // 兼容旧接口（已废弃）
  getFavorites(userId) {
    return Promise.resolve({ code: 0, data: [], success: true });
  },
  addToFavorites(userId, goodsId) {
    return Promise.resolve({ code: 0, success: true });
  },
  removeFromFavorites(userId, goodsId) {
    return Promise.resolve({ code: 0, success: true });
  }
};
const common = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cartApi,
  commonApi,
  favoriteApi
}, Symbol.toStringTag, { value: "Module" }));
export {
  commonApi as a,
  common as b,
  cartApi as c,
  favoriteApi as f,
  http as h
};
//# sourceMappingURL=common-CeIxTI3I.js.map
