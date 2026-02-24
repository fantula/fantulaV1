import os
import re

print("Starting bulk remediation...")

# 1. Clean up unused components
# Based on the previous scan output
unused = [
    ("components/admin/SkuEditor.vue", "AdminImageSelector"),
    ("components/admin/cdk/CdkListByType.vue", "AdminDataTable"),
    ("pages/manager_portal/article/categories.vue", "AdminDataDialog"),
    ("pages/manager_portal/article/post.vue", "AdminImagePicker"),
    ("pages/manager_portal/backend-settings/scheduler.vue", "AdminDataTable"),
    ("pages/manager_portal/cdk/cdks.vue", "AdminDataTable"),
    ("pages/manager_portal/cdk/channel-recognition.vue", "AdminDataTable"),
    ("pages/manager_portal/coupons/balance/index.vue", "AdminDataTable"),
    ("pages/manager_portal/coupons/balance/index.vue", "BulkActionBar"),
    ("pages/manager_portal/coupons/balance/index.vue", "CouponCodeDrawer"),
    ("pages/manager_portal/coupons/balance/index.vue", "CouponCodeEditor"),
    ("pages/manager_portal/coupons/balance/index.vue", "CouponCodeGenerator"),
    ("pages/manager_portal/coupons/flat/index.vue", "AdminDataTable"),
    ("pages/manager_portal/coupons/flat/index.vue", "BulkActionBar"),
    ("pages/manager_portal/coupons/flat/index.vue", "CouponCodeDrawer"),
    ("pages/manager_portal/coupons/flat/index.vue", "CouponCodeEditor"),
    ("pages/manager_portal/coupons/flat/index.vue", "CouponCodeGenerator"),
    ("pages/manager_portal/coupons/product/index.vue", "AdminDataTable"),
    ("pages/manager_portal/coupons/product/index.vue", "BulkActionBar"),
    ("pages/manager_portal/coupons/product/index.vue", "CouponCodeDrawer"),
    ("pages/manager_portal/coupons/product/index.vue", "CouponCodeEditor"),
    ("pages/manager_portal/coupons/product/index.vue", "CouponCodeGenerator"),
    ("pages/manager_portal/coupons/product/post.vue", "AdminSkuSelector"),
    ("pages/manager_portal/coupons/stats/index.vue", "AdminDataTable"),
    ("pages/manager_portal/coupons/stats/index.vue", "BulkActionBar"),
    ("pages/manager_portal/help-center/article-categories.vue", "AdminDataDialog"),
    ("pages/manager_portal/help-center/articles/post.vue", "AdminImagePicker"),
    ("pages/manager_portal/help-center/faq-categories.vue", "AdminDataDialog"),
    ("pages/manager_portal/index.vue", "AdminSimpleChart"),
    ("pages/manager_portal/media/banners.vue", "AdminDataDialog"),
    ("pages/manager_portal/media/banners.vue", "AdminImagePicker"),
    ("pages/manager_portal/messages/batch-send.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/cdkey/index.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/cdkey/index.vue", "OrderDetailDialog"),
    ("pages/manager_portal/orders/preorders/index.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/preorders/index.vue", "BulkActionBar"),
    ("pages/manager_portal/orders/recharge/index.vue", "AdminDataDialog"),
    ("pages/manager_portal/orders/recharge/index.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/recharge/index.vue", "OrderDetailDialog"),
    ("pages/manager_portal/orders/refund/index.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/share/index.vue", "AdminDataTable"),
    ("pages/manager_portal/orders/share/index.vue", "OrderDetailDialog"),
    ("pages/manager_portal/products/categories.vue", "AdminDataDialog"),
    ("pages/manager_portal/products/categories.vue", "AdminDataTable"),
    ("pages/manager_portal/products/edit.vue", "AdminImageSelector"),
    ("pages/manager_portal/products/edit.vue", "TagInputGroup"),
    ("pages/manager_portal/products/index.vue", "AdminDataTable"),
    ("pages/manager_portal/products/index.vue", "BulkActionBar"),
    ("pages/manager_portal/products/shared-sku.vue", "AdminDataDialog"),
    ("pages/manager_portal/products/shared-sku.vue", "AdminDataTable"),
    ("pages/manager_portal/products/shared-sku.vue", "LinkedProductDrawer"),
    ("pages/manager_portal/products/shared-sku.vue", "SkuEditor"),
    ("pages/manager_portal/products/skus.vue", "AdminDataTable"),
    ("pages/manager_portal/products/specs/[id].vue", "AdminSkuEditor"),
    ("pages/manager_portal/recharge/orders.vue", "AdminDataTable"),
    ("pages/manager_portal/recharge/tiers.vue", "AdminDataDialog"),
    ("pages/manager_portal/tickets/index.vue", "AdminDataTable"),
    ("pages/manager_portal/tickets/index.vue", "TicketChatModal"),
]

base_dir = '/Users/dalin/fantula/nuxt-frontend/'

for rel_path, comp in unused:
    full_path = os.path.join(base_dir, rel_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to remove import statement for that component
        # match `import CompName from '...'`
        new_content = re.sub(rf'import\s+{comp}\s+from\s+[\'"].*?[\'"]\s*;?\n?', '', content)
        if new_content != content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                print(f"Removed unused {comp} from {rel_path}")

# 2. Add import.meta.dev to unprotected console log
logs_to_fix = [
    "components/admin/CouponCodeGenerator.vue",
    "components/admin/base/ContactImageUploader.vue",
    "components/admin/cdk/CdkListByType.vue",
    "components/admin/product/LinkedProductDrawer.vue",
    "composables/admin/useAdminCdkList.ts",
    "composables/admin/useAdminContactConfig.ts",
    "composables/admin/useAdminDialog.ts",
    "composables/admin/useAdminPreOrderList.ts",
    "composables/admin/useAdminScheduler.ts",
]

for rel_path in logs_to_fix:
    full_path = os.path.join(base_dir, rel_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        changed = False
        for i, line in enumerate(lines):
            # If it's pure console.error or console.warn without if (import.meta.dev)
            if re.search(r'console\.(error|warn)\(', line) and 'import.meta.dev' not in line and not line.strip().startswith('//'):
                indent = line[:len(line) - len(line.lstrip())]
                new_line = line.replace('console.', 'if (import.meta.dev) console.')
                lines[i] = new_line
                changed = True
        
        if changed:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            print(f"Protected console logs in {rel_path}")

# 3. Remove dead commented code in users/accounts
users_account_path = os.path.join(base_dir, "pages/manager_portal/users/accounts/index.vue")
if os.path.exists(users_account_path):
    with open(users_account_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Let's cleanly remove line 155 context
    new_lines = []
    for line in lines:
        if line.strip().startswith('// if (!payload.'): continue
        if line.strip().startswith('//     ElMessage'): continue
        if line.strip().startswith('//     return'): continue
        if line.strip() == '// }': continue
        new_lines.append(line)
        
    with open(users_account_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        print(f"Removed dead comment block in users/accounts/index.vue")

print("Bulk remediation finished.")
