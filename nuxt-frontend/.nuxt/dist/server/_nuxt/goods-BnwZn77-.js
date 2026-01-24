import { k as callEdgeFunction, o as getSupabaseClient } from "../server.mjs";
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
const goodsApi = {
  /**
   * 获取商品列表 - 使用 Supabase 查询
   * @param params 查询参数
   */
  async getGoodsList(params) {
    const client = getSupabaseClient();
    let query = client.from("products").select("*", { count: "exact" }).eq("status", "on");
    if (params.categoryId && params.categoryId !== "all") {
      query = query.eq("category_id", params.categoryId);
    }
    if (params.keyword) {
      query = query.ilike("product_name", `%${params.keyword}%`);
    }
    const sortField = params.sortBy === "price" ? "display_price" : params.sortBy === "sales" ? "initial_sales" : "sort_order";
    query = query.order(sortField, { ascending: params.sortOrder !== "desc" });
    const page = params.page || 1;
    const limit = params.limit || 12;
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) {
      return { code: 500, msg: error.message, data: { list: [], total: 0, page, limit, totalPage: 0 }, success: false };
    }
    const list = (data || []).map((item) => ({
      id: item.id,
      title: item.product_name,
      product_name: item.product_name,
      coverImage: item.image || "",
      image: item.image || "",
      description: "",
      price: Number(item.display_price) || 0,
      display_price: Number(item.display_price) || 0,
      sales: item.initial_sales || 0,
      initial_sales: item.initial_sales || 0,
      rating: item.rating || 100,
      status: item.status === "on" ? 1 : 0,
      badge_label: item.badge_label,
      tags: (item.tags || []).join(","),
      category_id: item.category_id
    }));
    const total = count || 0;
    const totalPage = Math.ceil(total / limit);
    return {
      code: 0,
      msg: "success",
      data: { list, total, page, limit, totalPage },
      success: true
    };
  },
  /**
   * 获取商品详情 - 使用 Supabase 直接查询（优化后，消除冷启动延迟）
   * 库存由 checkSkuAvailability() 单独异步获取
   * @param id 商品ID
   */
  async getGoodsDetail(id) {
    try {
      const client = getSupabaseClient();
      const { data: product, error: productError } = await client.from("products").select("*").eq("id", id).single();
      if (productError || !product) {
        return { code: 404, msg: productError?.message || "商品不存在", data: null, success: false };
      }
      const { data: skuMappings, error: skuError } = await client.from("product_sku_map").select("sku:product_skus(*)").eq("product_id", id).order("sort_order", { ascending: true });
      if (skuError) {
        console.error("获取 SKU 列表失败:", skuError);
      }
      const skuList = (skuMappings || []).map((m) => m.sku).filter(Boolean);
      const skus = (skuList || []).map((sku) => {
        const combination = sku.spec_combination;
        const firstSpec = Object.entries(combination)[0] || [];
        return {
          id: sku.id,
          spec_name: firstSpec[0] || "",
          spec_value: firstSpec[1] || "",
          spec_combination: combination,
          price: Number(sku.price),
          stock: 0,
          // 库存由 checkSkuAvailability 单独获取
          image: sku.image,
          intro: sku.intro,
          duration: sku.duration
        };
      });
      const specGroups = [];
      const groups = {};
      skus.forEach((sku) => {
        const combination = sku.spec_combination || {};
        Object.entries(combination).forEach(([name, value]) => {
          if (!groups[name]) groups[name] = /* @__PURE__ */ new Set();
          groups[name].add(value);
        });
      });
      Object.keys(groups).forEach((name) => {
        specGroups.push({ name, values: Array.from(groups[name]) });
      });
      const goods = {
        id: product.id,
        title: product.product_name,
        product_name: product.product_name,
        coverImage: product.image || "",
        image: product.image || "",
        description: product.description || "",
        price: Number(product.display_price) || (skus[0]?.price || 0),
        display_price: Number(product.display_price) || 0,
        sales: product.initial_sales || 0,
        initial_sales: product.initial_sales || 0,
        rating: product.rating || 100,
        status: product.status === "on" ? 1 : 0,
        badge_label: product.badge_label,
        tags: (product.tags || []).join(","),
        skus,
        detail_modules: product.detail_modules || [],
        specGroups,
        allow_addon: product.allow_addon === true
      };
      return { code: 0, msg: "success", data: goods, success: true };
    } catch (err) {
      console.error("获取商品详情失败:", err);
      return { code: 500, msg: "获取商品详情失败", data: null, success: false };
    }
  },
  /**
   * 获取热门商品
   * @param limit 数量限制
   */
  getHotGoods(limit = 8) {
    return http.get("/product/goods", { limit, isHot: true });
  },
  /**
   * 获取推荐商品
   * @param limit 数量限制
   */
  getRecommendGoods(limit = 8) {
    return http.get("/product/goods", { limit, isRecommend: true });
  },
  /**
   * 获取商品分类列表
   */
  async getCategories() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_categories").select("*").eq("status", "on").order("sort_order", { ascending: true });
    if (error) {
      return { code: 500, msg: error.message, data: [], success: false };
    }
    const adaptedData = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      sort: item.sort_order,
      status: item.status === "on" ? 1 : 0
    }));
    return { code: 0, msg: "success", data: adaptedData, success: true };
  },
  /**
   * 搜索商品
   * @param params 搜索参数
   */
  searchGoods(params) {
    return http.get("/product/goods", params);
  },
  /**
   * 获取商品SKU信息
   * @param goodsCode 商品编码
   */
  getGoodsSkuInfo(goodsCode) {
    return http.get(`/product/goods/getSkuInfo/${goodsCode}`);
  },
  /**
   * 通过Unicode获取SKU详细信息
   * @param unicode SKU唯一码
   */
  getSkuByUnicode(unicode) {
    return http.get(`/product/goods/getSkuByUnicode/${unicode}`);
  },
  /**
   * 查询SKU剩余库存
   * @param skuUnicode SKU唯一码
   */
  getSkuResidue(skuUnicode) {
    return http.get(`/product/goods/getSkuResidue/${skuUnicode}`);
  },
  /**
   * 获取商品实时库存 (调用 Edge Function)
   * @param id 商品ID
   */
  async getProductStock(id) {
    const { data, error } = await callEdgeFunction("products", {
      method: "GET",
      params: { id: String(id) }
    });
    if (error) {
      console.error("获取库存失败:", error);
      return { code: 500, msg: error, data: 0, success: false };
    }
    return { code: 0, msg: "success", data: data?.stock ?? 0, success: true };
  }
};
export {
  goodsApi as g
};
//# sourceMappingURL=goods-BnwZn77-.js.map
