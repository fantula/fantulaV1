
import json
import re
import os

# Data from tool outputs
cdks_json = """
[{"id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","product_id":null,"code":"{\\\"账号\\\":\\\"111\\\",\\\"密码\\\":\\\"0111\\\"}","cdk_type":"shared","account_data":{"image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"},"status":"idle","created_at":"2026-02-03T11:03:54.952195+00:00","used_at":null,"max_slots":5,"stock":1,"pre_order_id":null,"product_snapshot":{"product_id":"93c38782-8686-429d-843a-64d26654bd26","product_name":"油管合租","product_image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}},{"id":"bdbef8fa-21ba-4eb9-ad29-1a3af39213e9","product_id":null,"code":"445555","cdk_type":"one_time","account_data":{"image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"},"status":"idle","created_at":"2026-02-03T11:05:58.192006+00:00","used_at":null,"max_slots":1,"stock":1,"pre_order_id":null,"product_snapshot":{"product_id":"8b5f8154-5ade-4fae-ad48-55157b3d94da","product_name":"是谁","product_image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}},{"id":"c633bb29-cf0d-4b25-9b90-7205be89581d","product_id":null,"code":"1242424","cdk_type":"one_time","account_data":{"image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"},"status":"idle","created_at":"2026-02-03T11:05:58.192006+00:00","used_at":null,"max_slots":1,"stock":1,"pre_order_id":null,"product_snapshot":{"product_id":"8b5f8154-5ade-4fae-ad48-55157b3d94da","product_name":"是谁","product_image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}},{"id":"0c208917-cdb1-4228-b57d-b1f632f851e2","product_id":null,"code":"{\\\"fields\\\":[\\\"邮箱\\\",\\\"是谁\\\",\\\"发发发\\\"]}","cdk_type":"virtual","account_data":{"image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"},"status":"idle","created_at":"2026-02-03T11:03:26.83157+00:00","used_at":null,"max_slots":1,"stock":992,"pre_order_id":null,"product_snapshot":{"product_id":"6c91ebdf-a28d-46b1-9513-8db14c5b8d32","product_name":"虚拟充值","product_image":"https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}}]
"""

cdk_sku_map_json = """
[{"id":"deca0652-9510-44ae-98dc-110e83818d2e","cdk_id":"0c208917-cdb1-4228-b57d-b1f632f851e2","sku_id":"b4536de5-46ed-404e-9722-cb712542548a","created_at":"2026-02-03T11:03:27.17332+00:00"},{"id":"707794f9-c7c7-463a-918c-c5cf1e113649","cdk_id":"0c208917-cdb1-4228-b57d-b1f632f851e2","sku_id":"783046e6-4fbc-47db-a4df-3c948e347162","created_at":"2026-02-03T11:03:27.17332+00:00"},{"id":"c2be5420-d5da-4471-89d1-2a0fddc6124b","cdk_id":"0c208917-cdb1-4228-b57d-b1f632f851e2","sku_id":"3b78b8cb-a716-4654-b68a-81e136b3d17b","created_at":"2026-02-03T11:03:27.17332+00:00"},{"id":"41eb12d4-efa3-4ae0-94b4-22a8f1dbb5fd","cdk_id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","sku_id":"366cd1cf-b361-4b1c-8919-e729b1ee4df7","created_at":"2026-02-03T11:03:55.183599+00:00"},{"id":"e8fb56eb-e995-45f6-94c0-02f5a507a8d8","cdk_id":"bdbef8fa-21ba-4eb9-ad29-1a3af39213e9","sku_id":"6b694c74-cf1f-4990-84ac-6eaad1a83d59","created_at":"2026-02-03T11:05:58.368143+00:00"},{"id":"192d3071-e612-48d3-8b79-f9eb03c9adbd","cdk_id":"c633bb29-cf0d-4b25-9b90-7205be89581d","sku_id":"6b694c74-cf1f-4990-84ac-6eaad1a83d59","created_at":"2026-02-03T11:05:58.368143+00:00"}]
"""

slot_occupancies_json = """
[{"id":"67cad845-d766-4bb3-8f5f-bf26ac3e13f8","cdk_id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","slot_index":5,"order_id":null,"status":"idle","occupied_at":"2026-02-03T11:03:55.566238+00:00","released_at":null,"pre_order_id":null,"user_id":null},{"id":"227f0d00-5b61-45ae-a3a4-c74bfd378c07","cdk_id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","slot_index":1,"order_id":"22d15088-1d6e-4681-a110-69ac076743d0","status":"using","occupied_at":"2026-02-03T11:03:55.566238+00:00","released_at":null,"pre_order_id":null,"user_id":"f7da1828-4d22-413b-9b9a-70f86cd8dd5c"},{"id":"1f58bc30-5087-4422-90c9-a44280ad0124","cdk_id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","slot_index":2,"order_id":"ce521be9-3cb2-4bfa-87f8-9359f01b08c0","status":"using","occupied_at":"2026-02-03T11:03:55.566238+00:00","released_at":null,"pre_order_id":null,"user_id":"f7da1828-4d22-413b-9b9a-70f86cd8dd5c"},{"id":"90d89694-1c99-4bde-9549-7cb6462dfad2","cdk_id":"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98","slot_index":3,"order_id":null,"status\":\"idle\",\"occupied_at\":\"2026-02-03T11:03:55.566238+00:00\",\"released_at\":null,\"pre_order_id\":null,\"user_id\":null},{\"id\":\"3cd87c01-e2bf-4659-828d-e69256f93726\",\"cdk_id\":\"c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98\",\"slot_index\":4,\"order_id\":null,\"status\":\"idle\",\"occupied_at\":\"2026-02-03T11:03:55.566238+00:00\",\"released_at\":null,\"pre_order_id\":null,\"user_id\":null}]
"""

cdks = json.loads(cdks_json)
cdk_sku_map = json.loads(cdk_sku_map_json)
slot_occupancies = json.loads(slot_occupancies_json)

print("-- Insert Inventory Data")
print("SET session_replication_role = 'replica';")

# 1. CDKs
if cdks:
    print("\n-- Insert CDKs")
    print("INSERT INTO public.cdks (id, product_id, code, cdk_type, account_data, status, created_at, used_at, max_slots, stock, pre_order_id, product_snapshot)")
    print("VALUES")
    values = []
    for row in cdks:
        acc_data = json.dumps(row.get('account_data'))
        prod_snap = json.dumps(row.get('product_snapshot'))
        
        # product_id can be null
        prod_id = f"'{row['product_id']}'" if row.get('product_id') else 'NULL'
        used_at = f"'{row['used_at']}'" if row.get('used_at') else 'NULL'
        pre_order = f"'{row['pre_order_id']}'" if row.get('pre_order_id') else 'NULL'
        
        val = f"('{row['id']}', {prod_id}, '{row['code']}', '{row['cdk_type']}', '{acc_data}', '{row['status']}', '{row['created_at']}', {used_at}, {row.get('max_slots', 1)}, {row.get('stock', 0)}, {pre_order}, '{prod_snap}')"
        values.append(val)
    print(",\n".join(values))
    print("ON CONFLICT (id) DO NOTHING;")

# 2. CDK SKU Map
if cdk_sku_map:
    print("\n-- Insert CDK SKU Map")
    print("INSERT INTO public.cdk_sku_map (id, cdk_id, sku_id, created_at)")
    print("VALUES")
    values = []
    for row in cdk_sku_map:
        val = f"('{row['id']}', '{row['cdk_id']}', '{row['sku_id']}', '{row['created_at']}')"
        values.append(val)
    print(",\n".join(values))
    print("ON CONFLICT (id) DO NOTHING;")

# 3. Slot Occupancies
if slot_occupancies:
    print("\n-- Insert Slot Occupancies")
    print("INSERT INTO public.slot_occupancies (id, cdk_id, slot_index, order_id, status, occupied_at, released_at, pre_order_id, user_id)")
    print("VALUES")
    values = []
    for row in slot_occupancies:
        order_id = f"'{row['order_id']}'" if row.get('order_id') else 'NULL'
        released_at = f"'{row['released_at']}'" if row.get('released_at') else 'NULL'
        pre_order = f"'{row['pre_order_id']}'" if row.get('pre_order_id') else 'NULL'
        user_id = f"'{row['user_id']}'" if row.get('user_id') else 'NULL'
        
        val = f"('{row['id']}', '{row['cdk_id']}', {row['slot_index']}, {order_id}, '{row['status']}', '{row['occupied_at']}', {released_at}, {pre_order}, {user_id})"
        values.append(val)
    print(",\n".join(values))
    print("ON CONFLICT (id) DO NOTHING;")

print("\nSET session_replication_role = 'origin';")
