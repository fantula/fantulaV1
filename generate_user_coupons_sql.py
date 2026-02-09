
import json
import re
import os

try:
    with open('/Users/dalin/.gemini/antigravity/brain/afa3aefd-5a08-4ebd-bce4-a94762719918/.system_generated/steps/1461/output.txt', 'r') as f:
        content = f.read()
    
    # Check if content is a JSON string (starts and ends with quote)
    if content.strip().startswith('"'):
        try:
            content = json.loads(content)
        except:
            pass
            
    # Extract JSON part.
    start_match = re.search(r'\[{"json_agg":', content)
    if start_match:
        start_idx = start_match.start()
        end_match = re.search(r'</untrusted-data', content[start_idx:])
        if end_match:
            end_idx = start_idx + end_match.start()
            json_str = content[start_idx:end_idx].strip()
        else:
            json_str = content[start_idx:].strip()
            
        data = json.loads(json_str)
        
        user_coupons = []
        
        for result in data:
            if not result.get('json_agg'):
                continue
            
            rows = result['json_agg']
            if not rows:
                continue
                
            first_row = rows[0]
            # Identify user_coupons by fields
            if 'redeemed_code' in first_row or 'coupon_snapshot' in first_row:
                user_coupons = rows
                break
            
        # Generate SQL
        print("-- Insert User Coupons")
        print("SET session_replication_role = 'replica';")
        print("INSERT INTO public.user_coupons (id, user_id, coupon_id, status, redeemed_at, used_at, code, order_id, coupon_snapshot, expire_at, redeemed_code)")
        print("VALUES")
        
        values_list = []
        for uc in user_coupons:
            coupon_snap = json.dumps(uc.get('coupon_snapshot'))
            
            used_at = f"'{uc['used_at']}'" if uc.get('used_at') else 'NULL'
            order_id = f"'{uc['order_id']}'" if uc.get('order_id') else 'NULL'
            expire_at = f"'{uc['expire_at']}'" if uc.get('expire_at') else 'NULL'
            
            val = f"('{uc['id']}', '{uc['user_id']}', '{uc['coupon_id']}', '{uc['status']}', '{uc['redeemed_at']}', {used_at}, '{uc.get('code','')}', {order_id}, '{coupon_snap}', {expire_at}, '{uc.get('redeemed_code','')}')"
            values_list.append(val)
            
        if values_list:
            print(",\n".join(values_list))
            print("ON CONFLICT (id) DO NOTHING;")
        else:
            print("-- No user coupons found to insert")
            
        print("SET session_replication_role = 'origin';")
        
except Exception as e:
    print(f"Error: {e}")
