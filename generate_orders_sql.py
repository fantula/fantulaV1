
import json
import re

# Read the entire file content
# The file format is a bit mixed with tool output, so we need to extract the JSON array.
# The JSON starts with [{"json_agg": ...
# We'll look for that pattern.

try:
    with open('/Users/dalin/.gemini/antigravity/brain/afa3aefd-5a08-4ebd-bce4-a94762719918/.system_generated/steps/1461/output.txt', 'r') as f:
        content = f.read()
    
    
    # Extract JSON part. It generally
    
    # Check if content is a JSON string (starts and ends with quote)
    # The file seems to be a JSON string of the tool output
    if content.strip().startswith('"'):
        try:
            content = json.loads(content)
        except:
            pass
            
    # Extract JSON part. It generally starts after the <untrusted...> tag
    # But filtering for `[{"json_agg"` is safer.
    start_match = re.search(r'\[{"json_agg":', content)
    if start_match:
        start_idx = start_match.start()
        # Find the end of the JSON. It's usually before the closing </untrusted...> tag
        end_match = re.search(r'</untrusted-data', content[start_idx:])
        if end_match:
            end_idx = start_idx + end_match.start()
            json_str = content[start_idx:end_idx].strip()
        else:
            json_str = content[start_idx:].strip()
            
        data = json.loads(json_str)
        
        # The file contains results for multiple queries.
        # We need to find the one corresponding to 'orders'.
        # Based on my previous manual inspection, 'orders' was the LAST query result.
        # But let's check field names to be sure.
        
        orders = []
        pre_orders = []
        user_coupons = []
        
        for result in data:
            if not result.get('json_agg'):
                continue
            
            rows = result['json_agg']
            if not rows:
                continue
                
            first_row = rows[0]
            if 'order_no' in first_row:
                orders = rows
            elif 'redeemed_code' in first_row: # user_coupons usually has this or coupon_id
                user_coupons = rows
            # Add other checks if needed
            
        # Generate SQL for Orders
        print("-- Insert Orders")
        print("SET session_replication_role = 'replica';")
        # Columns based on server schema inspection:
        # id, order_no, order_type, start_time, end_time, created_at, status, product_snapshot, sku_snapshot, user_id, 
        # quantity, cdk_snapshot, expires_at, slot_occupancy_ids, total_amount, original_amount, coupon_snapshot
        
        print("INSERT INTO public.orders (id, order_no, order_type, created_at, start_time, end_time, status, product_snapshot, sku_snapshot, user_id, quantity, cdk_snapshot, expires_at, slot_occupancy_ids, total_amount, original_amount, coupon_snapshot)")
        print("VALUES")
        
        values_list = []
        for order in orders:
            # Handle timestamps (replace T with space if needed, though Postgres accepts ISO)
            # Handle JSON fields (must be stringified and escaped)
            prod_snap = json.dumps(order.get('product_snapshot'))
            sku_snap_raw = order.get('sku_snapshot', {})
            sku_snap = json.dumps(sku_snap_raw)
            
            # Map columns
            order_type = sku_snap_raw.get('product_type', 'virtual') # Default to virtual if missing
            
            # Use created_at for start_time, and expires_at (or created_at) for end_time if missing
            # This satisfies NOT NULL constraints.
            start_time = order.get('created_at')
            end_time = order.get('expires_at') or start_time
            
            # locked_cdk_ids -> cdk_snapshot (JSONB)
            # Storing as simple list of IDs ["uuid"]
            cdk_snapshot = json.dumps(order.get('locked_cdk_ids', []))
            
            # locked_slot_ids -> slot_occupancy_ids (ARRAY)
            # Postgres array format: {"uuid"}
            # Use json.dumps to handle quotes, then swap [] for {}
            slot_occupancy_ids = json.dumps(order.get('locked_slot_ids', [])).replace('[','{').replace(']','}')

            # coupon_id -> coupon_snapshot (JSONB)
            coupon_snap = 'NULL'
            if order.get('coupon_id'):
                coupon_snap = f"'{json.dumps({'id': order['coupon_id']})}'"
            
            # Map status
            status_map = {
                'converted': 'active',
                'pending': 'pending_delivery',
                'deleted': 'expired'
            }
            status = status_map.get(order['status'], 'expired')
            
            val = f"('{order['id']}', '{order['order_no']}', '{order_type}', '{order['created_at']}', '{start_time}', '{end_time}', '{status}', '{prod_snap}', '{sku_snap}', '{order['user_id']}', {order['quantity']}, '{cdk_snapshot}', '{order['expires_at']}', '{slot_occupancy_ids}', {order['total_amount']}, {order.get('original_amount', 0)}, {coupon_snap})"
            values_list.append(val)
            
        print(",\n".join(values_list))
        print("ON CONFLICT (id) DO NOTHING;")
        print("SET session_replication_role = 'origin';")
        
except Exception as e:
    print(f"Error: {e}")
