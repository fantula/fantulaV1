import { o as getSupabaseClient } from './server.mjs';

const ticketApi = {
  // 1. Create Ticket
  async create(orderId, title, content, priority, attachments = []) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_ticket", {
      p_order_id: orderId,
      p_title: title,
      p_content: content,
      p_priority: priority,
      p_attachments: attachments
    });
    if (error) return { success: false, error: error.message };
    const res = data;
    if (!res.success) return { success: false, error: res.error };
    return { success: true, ticketId: res.ticket_id };
  },
  // 2. Get My Tickets
  async getList(status = "all") {
    const client = getSupabaseClient();
    let query = client.from("tickets").select("*, orders(order_no, product_snapshot), ticket_messages(content)").order("created_at", { ascending: false });
    if (status !== "all") {
      query = query.eq("status", status);
    }
    const { data, error } = await query;
    if (error) return { success: false, data: [], error: error.message };
    const processed = (data == null ? void 0 : data.map((t) => {
      var _a, _b;
      return {
        ...t,
        last_message: ((_b = (_a = t.ticket_messages) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) || ""
      };
    })) || [];
    return { success: true, data: processed };
  },
  // 3. Get Detail with Messages
  async getDetail(ticketId) {
    const client = getSupabaseClient();
    const { data: ticket, error: tErr } = await client.from("tickets").select("*, orders(id, order_no, product_snapshot)").eq("id", ticketId).single();
    if (tErr) return { success: false, error: tErr.message };
    const { data: messages, error: mErr } = await client.from("ticket_messages").select("*, sender_id, is_admin").eq("ticket_id", ticketId).order("created_at", { ascending: true });
    if (mErr) return { success: false, error: mErr.message };
    return {
      success: true,
      data: {
        ...ticket,
        replies: (messages == null ? void 0 : messages.map((m) => ({
          id: m.id,
          sender: m.is_admin ? "admin" : "user",
          content: m.content,
          attachments: m.attachments,
          time: m.created_at
        }))) || []
      }
    };
  },
  // 4. Client Reply
  async reply(ticketId, content, attachments = []) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("send_ticket_message", {
      p_ticket_id: ticketId,
      p_content: content,
      p_attachments: attachments
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};

export { ticketApi as t };
//# sourceMappingURL=ticket-C_WDl8fm.mjs.map
