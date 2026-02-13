import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

const http = {
  get(url, params, config) {
    throw new Error("http.get \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  post(url, data, config) {
    throw new Error("http.post \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  put(url, data, config) {
    throw new Error("http.put \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  delete(url, config) {
    throw new Error("http.delete \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  upload(url, file, config) {
    throw new Error("http.upload \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
  },
  download(url, params, filename) {
    throw new Error("http.download \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u6539\u7528 useHttp() composable");
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
    const adaptedData = (data || []).map((item) => {
      var _a;
      return {
        id: item.id,
        title: item.title || "",
        image: ((_a = item.image) == null ? void 0 : _a.url) || item.url || "/images/banner.png",
        link: item.link || "",
        sort: item.sort_order,
        status: item.status === "on" ? 1 : 0
      };
    });
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
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", data: { list: [] }, success: false };
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
      mappings == null ? void 0 : mappings.forEach((m) => {
        if (m.product) productMap[m.sku_id] = m.product;
      });
    }
    const list = (data || []).map((item) => {
      var _a, _b;
      const product = productMap[item.sku_id];
      return {
        id: item.id,
        skuId: item.sku_id,
        quantity: item.quantity,
        productId: product == null ? void 0 : product.id,
        productName: (product == null ? void 0 : product.product_name) || "\u672A\u77E5\u5546\u54C1",
        productImage: (product == null ? void 0 : product.image) || "/images/shared/logo.png",
        allowAddon: (product == null ? void 0 : product.allow_addon) || false,
        price: ((_a = item.product_skus) == null ? void 0 : _a.price) || 0,
        specName: ((_b = item.product_skus) == null ? void 0 : _b.spec_combination) ? Object.values(item.product_skus.spec_combination).join(" ") : ""
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
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
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
    return { code: 0, msg: "\u5DF2\u52A0\u5165\u8D2D\u7269\u8F66", success: true };
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
    return { code: 0, msg: "\u5DF2\u4ECE\u8D2D\u7269\u8F66\u5220\u9664", success: true };
  },
  /**
   * 清空购物车
   */
  async clearCart() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { error } = await client.from("cart_items").delete().eq("user_id", user.id);
    if (error) {
      console.error("Clear cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u8D2D\u7269\u8F66\u5DF2\u6E05\u7A7A", success: true };
  }
};
const favoriteApi = {
  /**
   * 【优化】获取收藏数据（分类 + 收藏列表）- 合并接口
   */
  async getFavoritesData() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
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
    const categories = [{ id: "all", name: "\u5168\u90E8\u6536\u85CF" }, ...categoriesRes.data || []];
    const favorites = (favoritesRes.data || []).map((item) => {
      var _a, _b, _c, _d, _e, _f;
      return {
        id: item.id,
        productId: item.product_id,
        skuId: item.sku_id,
        productName: ((_a = item.products) == null ? void 0 : _a.product_name) || "\u672A\u77E5\u5546\u54C1",
        productImage: ((_b = item.products) == null ? void 0 : _b.image) || "/images/shared/logo.png",
        categoryId: (_c = item.products) == null ? void 0 : _c.category_id,
        price: ((_d = item.product_skus) == null ? void 0 : _d.price) || ((_e = item.products) == null ? void 0 : _e.display_price) || 0,
        specName: ((_f = item.product_skus) == null ? void 0 : _f.spec_combination) ? Object.values(item.product_skus.spec_combination).join(" ") : "",
        createdAt: item.created_at
      };
    });
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
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { error } = await client.from("user_favorites").insert({
      user_id: user.id,
      product_id: productId,
      sku_id: skuId || null
    });
    if (error) {
      if (error.code === "23505") {
        return { code: 400, msg: "\u5DF2\u7ECF\u6536\u85CF\u8FC7\u4E86", success: false };
      }
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u6536\u85CF\u6210\u529F", success: true };
  },
  /**
   * 删除收藏
   */
  async removeFavorite(favoriteId) {
    const client = getSupabaseClient();
    const { error } = await client.from("user_favorites").delete().eq("id", favoriteId);
    if (error) return { code: 500, msg: error.message, success: false };
    return { code: 0, msg: "\u5DF2\u53D6\u6D88\u6536\u85CF", success: true };
  },
  /**
   * 检查是否已收藏
   */
  async checkFavorite(productId, skuId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", data: false, success: false };
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

export { commonApi as a, common as b, cartApi as c, favoriteApi as f, http as h };
//# sourceMappingURL=common-D9iMPQj0.mjs.map
