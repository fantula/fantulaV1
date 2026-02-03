import getSupabaseClient, { callEdgeFunction } from "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "../server.mjs";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "vue/server-renderer";
const supabaseAuthApi = {
  /**
   * POST /auth/login
   * 邮箱验证码登录，不存在则自动注册
   */
  async sendLoginOtp(email) {
    const { data, error } = await callEdgeFunction("auth-login", {
      method: "POST",
      body: { email },
      requireAuth: false
    });
    if (error) {
      return { success: false, message: error };
    }
    return { success: true, message: data?.message || "验证码已发送" };
  },
  /**
   * 使用 Supabase Auth 验证 OTP
   */
  async verifyOtp(email, token) {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.verifyOtp({
      email,
      token,
      type: "email"
    });
    if (error) {
      return { success: false, message: error.message };
    }
    if (data.user) {
      const { data: profile } = await client.from("profiles").select("uid, email, status, created_at").eq("id", data.user.id).single();
      if (profile) {
        return {
          success: true,
          message: "登录成功",
          user: {
            id: data.user.id,
            uid: profile.uid,
            email: profile.email,
            status: profile.status,
            created_at: profile.created_at
          }
        };
      }
    }
    return { success: true, message: "登录成功" };
  },
  /**
   * POST /auth/logout
   */
  async logout() {
    const client = getSupabaseClient();
    await client.auth.signOut();
    return { success: true };
  },
  /**
   * 获取当前用户信息
   */
  async getCurrentUser() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return null;
    const { data: profile } = await client.from("profiles").select("uid, email, status, created_at").eq("id", user.id).single();
    if (!profile) return null;
    return {
      id: user.id,
      uid: profile.uid,
      email: profile.email,
      status: profile.status,
      created_at: profile.created_at
    };
  }
};
const supabaseProductApi = {
  /**
   * GET /products
   * 获取商品列表
   */
  async getProducts() {
    const { data, error } = await callEdgeFunction("products", {
      method: "GET",
      requireAuth: false
    });
    if (error) {
      return { success: false, products: [] };
    }
    return { success: true, products: data?.products || [] };
  },
  /**
   * GET /products/:id
   * 获取单个商品详情
   */
  async getProduct(id) {
    const { data, error } = await callEdgeFunction("products", {
      method: "GET",
      params: { id },
      requireAuth: false
    });
    if (error) {
      return { success: false, product: null };
    }
    return { success: true, product: data };
  },
  /**
   * 检查 SKU 是否可购买（调用数据库函数 get_sku_stock）
   * @param skuId SKU ID
   * @returns available: 是否可购买, availableCount: 可用数量
   */
  async checkSkuAvailability(skuId) {
    const client = getSupabaseClient();
    try {
      const { data, error } = await client.rpc("get_sku_stock", { p_sku_id: skuId }).single();
      if (error || !data) {
        console.error("检查 SKU 可购买性失败:", error);
        return { available: false, availableCount: 0 };
      }
      return {
        available: data.in_stock,
        availableCount: data.stock_count
      };
    } catch (err) {
      console.error("检查 SKU 可购买性异常:", err);
      return { available: false, availableCount: 0 };
    }
  }
};
const supabaseCategoryApi = {
  /**
   * 获取启用的分类列表（客户端展示用）
   * 直接查询数据库，只返回 status='on' 的分类
   */
  async getCategories() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("product_categories").select("*").eq("status", "on").order("sort_order", { ascending: true });
    if (error) {
      console.error("获取分类失败:", error);
      return { success: false, categories: [] };
    }
    return { success: true, categories: data || [] };
  },
  /**
   * 获取指定分类下的商品
   */
  async getProductsByCategory(categoryId) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("products").select("*").eq("category_id", categoryId).eq("status", "on").order("created_at", { ascending: false });
    if (error) {
      console.error("获取分类商品失败:", error);
      return { success: false, products: [] };
    }
    return { success: true, products: data || [] };
  }
};
const supabaseCdkApi = {
  /**
   * POST /cdk/allocate
   * CDK 分配（由 order-create 内部调用，一般不直接使用）
   */
  async allocate(productId) {
    const { data, error } = await callEdgeFunction("cdk-allocate", {
      method: "POST",
      body: { product_id: productId },
      requireAuth: true
    });
    if (error) {
      return { success: false, cdk: null, error };
    }
    return { success: true, cdk: data?.cdk || null };
  },
  /**
   * POST /cdk/release
   * CDK 释放（仅账号合租型和虚拟充值型）
   */
  async release(cdkId) {
    const { data, error } = await callEdgeFunction("cdk-release", {
      method: "POST",
      body: { cdk_id: cdkId },
      requireAuth: true
    });
    if (error) {
      return { success: false, message: error };
    }
    return { success: true, message: data?.message || "CDK 已释放" };
  }
};
const supabaseOrderApi = {
  /**
   * POST /order/create
   * 创建订单
   * 核心原则：每一次支付 = 一笔订单
   */
  async createOrder(productId, durationDays) {
    const { data, error } = await callEdgeFunction("order-create", {
      method: "POST",
      body: {
        product_id: productId,
        duration_days: durationDays
      },
      requireAuth: true
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, order: data?.order };
  },
  /**
   * POST /order/renew
   * 续费订单
   * 严格遵循文档 4.3：
   * - 必须生成新订单 B（order_type = renew）
   * - 原订单 A 的 end_time 叠加新时长
   */
  async renewOrder(orderId, durationDays) {
    const { data, error } = await callEdgeFunction("order-renew", {
      method: "POST",
      body: {
        order_id: orderId,
        duration_days: durationDays
      },
      requireAuth: true
    });
    if (error) {
      return { success: false, error };
    }
    return {
      success: true,
      message: data?.message,
      renew_order_id: data?.renew_order_id,
      original_order_id: data?.original_order_id,
      original_new_end_time: data?.original_new_end_time,
      renew_period: data?.renew_period
    };
  },
  /**
   * GET /order/list
   * 获取用户订单列表
   */
  async getOrderList(params) {
    const queryParams = {};
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.offset) queryParams.offset = String(params.offset);
    const { data, error } = await callEdgeFunction("order-list", {
      method: "GET",
      params: queryParams,
      requireAuth: true
    });
    if (error) {
      return { success: false, orders: [], total: 0 };
    }
    return {
      success: true,
      orders: data?.orders || [],
      total: data?.total || 0
    };
  }
};
const supabaseAdminApi = {
  /**
   * POST /admin/message/send
   * 发送系统消息
   * 规则：用户不存在则禁止发送
   */
  async sendMessage(userUid, title, content) {
    const { data, error } = await callEdgeFunction("admin-message-send", {
      method: "POST",
      body: {
        user_uid: userUid,
        title,
        content
      },
      requireAuth: true
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, message_id: data?.message_id };
  }
};
const supabasePreOrderApi = {
  /**
   * 创建预订单（锁定资源）
   * 新版本：直接传 sku_id 和 quantity
   */
  async createPreOrder(skuId, quantity = 1, source = "buy_now") {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_pre_order", {
      p_sku_id: skuId,
      p_quantity: quantity,
      p_source: source
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return {
        success: false,
        code: data.code,
        error: data.error
      };
    }
    return {
      success: true,
      pre_order_id: data.pre_order_id,
      order_no: data.order_no,
      total_amount: data.total_amount,
      expires_at: data.expires_at
    };
  },
  /**
   * 查询预订单详情
   */
  async getPreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true, pre_order: data.pre_order };
  },
  /**
   * 应用优惠券到预订单
   * 并持久化更新预订单金额
   */
  async applyCouponToPreOrder(preOrderId, couponId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("apply_coupon_to_pre_order", {
      p_pre_order_id: preOrderId,
      p_coupon_id: couponId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const result = data;
    if (result.success) {
      return {
        success: true,
        total_amount: result.total_amount,
        discount_amount: result.discount_amount
      };
    } else {
      return { success: false, error: result.error || "应用优惠券失败" };
    }
  },
  /**
   * 确认预订单并支付
   */
  async confirmPreOrder(preOrderId, payMethod, couponId) {
    const client = getSupabaseClient();
    const payload = {
      p_pre_order_id: preOrderId,
      p_pay_method: payMethod
    };
    if (couponId) {
      payload.p_coupon_id = couponId;
    }
    const { data, error } = await client.rpc("confirm_pre_order", payload);
    if (error) return { success: false, error: error.message };
    const result = data;
    if (result.success) {
      return {
        success: true,
        order_no: result.order_no,
        order_id: result.order_id,
        total_amount: result.total_amount
      };
    } else {
      return { success: false, error: result.error || "支付失败" };
    }
  },
  /**
   * 取消预订单（释放资源）
   */
  async cancelPreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("cancel_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 删除预订单（仅限已过期或已完成/取消）
   */
  async deletePreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("delete_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 过期预订单（释放资源 + 真实删除）
   * 用于倒计时归零时调用
   */
  async expirePreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("expire_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 获取用户所有预订单（包括待支付、已过期等）
   */
  async getPreOrders(status) {
    const client = getSupabaseClient();
    let query = client.from("pre_orders").select("*").order("created_at", { ascending: false });
    if (status) {
      query = query.eq("status", status);
    }
    const { data, error } = await query;
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },
  /**
   * 获取用户待支付预订单
   */
  async getPendingPreOrders() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("pre_orders").select("*").eq("status", "pending").gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).order("created_at", { ascending: false });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }
};
const supabaseFaqApi = {
  /**
   * 获取常见问题分类列表
   */
  async getCategories() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("faq_categories").select("id, name").eq("is_active", true).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, categories: [] };
    }
    return { success: true, categories: data || [] };
  },
  /**
   * 获取常见问题列表
   * @param categoryId 可选分类ID
   */
  async getFaqs(categoryId) {
    const client = getSupabaseClient();
    let query = client.from("faqs").select("*").eq("is_active", true);
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }
    query = query.order("sort_order", { ascending: true });
    const { data, error } = await query;
    if (error) {
      return { success: false, faqs: [] };
    }
    return { success: true, faqs: data || [] };
  },
  /**
   * 获取指定商品绑定的 FAQ
   */
  async getFaqsByProduct(productId) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("faqs").select("*").eq("is_active", true).eq("product_id", productId).order("sort_order", { ascending: true });
    if (error) {
      return { success: false, faqs: [] };
    }
    return { success: true, faqs: data || [] };
  },
  /**
   * 搜索 FAQ
   */
  async searchFaqs(keyword) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("faqs").select(`
                *,
                category:faq_categories(name)
            `).eq("is_active", true).ilike("question", `%${keyword}%`).order("sort_order", { ascending: true }).limit(10);
    if (error) {
      return { success: false, faqs: [] };
    }
    return { success: true, faqs: data || [] };
  }
};
const supabaseApi = {
  auth: supabaseAuthApi,
  product: supabaseProductApi,
  category: supabaseCategoryApi,
  cdk: supabaseCdkApi,
  order: supabaseOrderApi,
  admin: supabaseAdminApi,
  preOrder: supabasePreOrderApi,
  faq: supabaseFaqApi
};
export {
  supabaseApi as default,
  supabaseAdminApi,
  supabaseApi,
  supabaseAuthApi,
  supabaseCategoryApi,
  supabaseCdkApi,
  supabaseFaqApi,
  supabaseOrderApi,
  supabasePreOrderApi,
  supabaseProductApi
};
//# sourceMappingURL=supabase-fcLPkUp1.js.map
