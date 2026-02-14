import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';

const adminRechargeApi = {
  async getTiers() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").select("*").order("sort_order", { ascending: true });
    if (error) {
      return { success: false, data: [], error: error.message };
    }
    return { success: true, data: data || [] };
  },
  async createTier(tierData) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").insert(tierData).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },
  async updateTier(id, tierData) {
    const client = getSupabaseClient();
    const { error } = await client.from("recharge_tiers").update(tierData).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  async deleteTier(id) {
    const client = getSupabaseClient();
    const { error } = await client.from("recharge_tiers").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};

export { adminRechargeApi as a };
//# sourceMappingURL=recharge-CUyORFAR.mjs.map
