import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';

const adminTicketApi = {
  // 1. Get List
  async getList(params) {
    const client = getSupabaseClient();
    const { page, pageSize, status } = params;
    let query = client.from("tickets").select("*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)", { count: "exact" }).order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    const { data, error, count } = await query;
    if (error) return { success: false, data: [], total: 0, error: error.message };
    return { success: true, data, total: count || 0 };
  },
  // 1.5 Get Detail
  async getDetail(ticketId) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("tickets").select("*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)").eq("id", ticketId).single();
    if (error) return { success: false, data: null, error: error.message };
    return { success: true, data };
  },
  // 2. Get Messages for a Ticket
  async getMessages(ticketId) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("ticket_messages").select("*, profiles(email)").eq("ticket_id", ticketId).order("created_at", { ascending: true });
    if (error) return { success: false, data: [], error: error.message };
    return { success: true, data };
  },
  // 3. Admin Reply
  async reply(ticketId, content, attachments = []) {
    const client = getSupabaseClient();
    const { error } = await client.from("ticket_messages").insert({
      ticket_id: ticketId,
      sender_id: null,
      // Null = System/Admin
      is_admin: true,
      content,
      message_type: attachments.length > 0 ? "image" : "text",
      attachments
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  // 4. Resolve Ticket
  async resolve(ticketId) {
    const client = getSupabaseClient();
    const { error } = await client.from("tickets").update({ status: "resolved", resolved_at: /* @__PURE__ */ new Date(), updated_at: /* @__PURE__ */ new Date() }).eq("id", ticketId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  // 5. Cleanup Images (One-Click) - 使用 R2 Edge Function
  async cleanupImages(daysOld = 7, token) {
    const client = getSupabaseClient();
    const dateLimit = /* @__PURE__ */ new Date();
    dateLimit.setDate(dateLimit.getDate() - daysOld);
    const { data: tickets } = await client.from("tickets").select("id").eq("status", "resolved").lt("resolved_at", dateLimit.toISOString());
    if (!tickets || tickets.length === 0) return { success: true, count: 0 };
    const ticketIds = tickets.map((t) => t.id);
    const { data: messages } = await client.from("ticket_messages").select("id, attachments").in("ticket_id", ticketIds).not("attachments", "is", null);
    if (!messages || messages.length === 0) return { success: true, count: 0 };
    const filesToDelete = [];
    messages.forEach((msg) => {
      if (Array.isArray(msg.attachments)) {
        msg.attachments.forEach((url) => {
          try {
            const urlObj = new URL(url);
            const path = urlObj.pathname.startsWith("/") ? urlObj.pathname.substring(1) : urlObj.pathname;
            if (path) {
              filesToDelete.push(decodeURIComponent(path));
            }
          } catch (e) {
            if (url && !url.startsWith("http")) {
              filesToDelete.push(url);
            }
          }
        });
      }
    });
    if (filesToDelete.length === 0) return { success: true, count: 0 };
    try {
      const { EDGE_FUNCTIONS_URL } = await import('./supabase-Ds8OQlZJ.mjs');
      if (!token) {
        return { success: false, count: 0, error: "\u8BF7\u5148\u767B\u5F55\u540E\u53F0\u7BA1\u7406\u5458\u8D26\u53F7" };
      }
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/delete-r2`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ paths: filesToDelete })
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        return { success: false, count: 0, error: result.error || "\u5220\u9664\u5931\u8D25" };
      }
      return { success: true, count: result.deleted || 0 };
    } catch (e) {
      console.error("Cleanup error:", e);
      return { success: false, count: 0, error: e.message || "\u6E05\u7406\u5931\u8D25" };
    }
  }
};

export { adminTicketApi as a };
//# sourceMappingURL=ticket-D4JFVklQ.mjs.map
