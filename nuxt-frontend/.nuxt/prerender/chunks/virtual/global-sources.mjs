const sources = [
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/"
            },
            {
                "loc": "/pc/faq"
            },
            {
                "loc": "/pc/about"
            },
            {
                "loc": "/pc"
            },
            {
                "loc": "/pc/policy"
            },
            {
                "loc": "/pc/refund"
            },
            {
                "loc": "/pc/company"
            },
            {
                "loc": "/pc/contact"
            },
            {
                "loc": "/pc/join-us"
            },
            {
                "loc": "/pc/privacy"
            },
            {
                "loc": "/pc/profile"
            },
            {
                "loc": "/pc/profile/wallet"
            },
            {
                "loc": "/pc/profile/tickets"
            },
            {
                "loc": "/pc/profile/exchange"
            },
            {
                "loc": "/pc/profile/messages"
            },
            {
                "loc": "/pc/profile/favorites"
            },
            {
                "loc": "/pc/profile/order"
            },
            {
                "loc": "/pc/service"
            },
            {
                "loc": "/mobile/cart"
            },
            {
                "loc": "/mobile/help"
            },
            {
                "loc": "/pc/about-us"
            },
            {
                "loc": "/mobile"
            },
            {
                "loc": "/pc/community"
            },
            {
                "loc": "/pc/advantages"
            },
            {
                "loc": "/pc/disclaimer"
            },
            {
                "loc": "/mobile/channel"
            },
            {
                "loc": "/mobile/profile"
            },
            {
                "loc": "/mobile/profile/wallet"
            },
            {
                "loc": "/mobile/profile/order"
            },
            {
                "loc": "/mobile/profile/account"
            },
            {
                "loc": "/mobile/profile/tickets"
            },
            {
                "loc": "/mobile/profile/messages"
            },
            {
                "loc": "/mobile/profile/favorites"
            },
            {
                "loc": "/mobile/profile/redemption"
            },
            {
                "loc": "/manager_portal/cdk/cdks"
            },
            {
                "loc": "/manager_portal/cdk/keys"
            },
            {
                "loc": "/manager_portal/cdk/post"
            },
            {
                "loc": "/manager_portal/cdk/debug"
            },
            {
                "loc": "/manager_portal/cdk"
            },
            {
                "loc": "/manager_portal/cdk/virtual"
            },
            {
                "loc": "/manager_portal/cdk/accounts"
            },
            {
                "loc": "/manager_portal/cdk/channel-recognition"
            },
            {
                "loc": "/manager_portal"
            },
            {
                "loc": "/manager_portal/login"
            },
            {
                "loc": "/manager_portal/media"
            },
            {
                "loc": "/manager_portal/media/images"
            },
            {
                "loc": "/manager_portal/media/banners"
            },
            {
                "loc": "/manager_portal/users"
            },
            {
                "loc": "/manager_portal/users/accounts"
            },
            {
                "loc": "/manager_portal/users/departments"
            },
            {
                "loc": "/manager_portal/orders"
            },
            {
                "loc": "/manager_portal/orders/cdkey/post"
            },
            {
                "loc": "/manager_portal/orders/share/post"
            },
            {
                "loc": "/manager_portal/orders/cdkey"
            },
            {
                "loc": "/manager_portal/orders/share"
            },
            {
                "loc": "/manager_portal/orders/refund"
            },
            {
                "loc": "/manager_portal/orders/recharge/post"
            },
            {
                "loc": "/manager_portal/orders/recharge"
            },
            {
                "loc": "/manager_portal/orders/preorders"
            },
            {
                "loc": "/manager_portal/coupons"
            },
            {
                "loc": "/manager_portal/coupons/flat/post"
            },
            {
                "loc": "/manager_portal/coupons/flat"
            },
            {
                "loc": "/manager_portal/coupons/stats"
            },
            {
                "loc": "/manager_portal/coupons/balance/post"
            },
            {
                "loc": "/manager_portal/coupons/product/post"
            },
            {
                "loc": "/manager_portal/coupons/balance"
            },
            {
                "loc": "/manager_portal/coupons/product"
            },
            {
                "loc": "/mobile/wechat-callback"
            },
            {
                "loc": "/manager_portal/messages"
            },
            {
                "loc": "/manager_portal/messages/settings"
            },
            {
                "loc": "/manager_portal/messages/batch-send"
            },
            {
                "loc": "/manager_portal/products/edit"
            },
            {
                "loc": "/manager_portal/products/skus"
            },
            {
                "loc": "/manager_portal/products"
            },
            {
                "loc": "/manager_portal/products/categories"
            },
            {
                "loc": "/manager_portal/products/shared-sku"
            },
            {
                "loc": "/manager_portal/recharge"
            },
            {
                "loc": "/manager_portal/recharge/tiers"
            },
            {
                "loc": "/manager_portal/recharge/orders"
            },
            {
                "loc": "/pc/support/refund/create"
            },
            {
                "loc": "/manager_portal/help-center"
            },
            {
                "loc": "/manager_portal/help-center/articles"
            },
            {
                "loc": "/manager_portal/help-center/articles/post"
            },
            {
                "loc": "/manager_portal/help-center/faq/post"
            },
            {
                "loc": "/manager_portal/help-center/faq"
            },
            {
                "loc": "/manager_portal/help-center/faq-categories"
            },
            {
                "loc": "/manager_portal/help-center/article-categories"
            },
            {
                "loc": "/manager_portal/article/post"
            },
            {
                "loc": "/manager_portal/images"
            },
            {
                "loc": "/manager_portal/article"
            },
            {
                "loc": "/manager_portal/banners"
            },
            {
                "loc": "/manager_portal/tickets"
            },
            {
                "loc": "/manager_portal/backend-settings"
            },
            {
                "loc": "/manager_portal/backend-settings/contact"
            },
            {
                "loc": "/manager_portal/backend-settings/storage"
            },
            {
                "loc": "/manager_portal/backend-settings/scheduler"
            },
            {
                "loc": "/manager_portal/backend-settings/notification"
            },
            {
                "loc": "/manager_portal/article/categories"
            },
            {
                "loc": "/manager_portal/tickets/components/TicketChatModal"
            },
            {
                "loc": "/faq"
            },
            {
                "loc": "/about"
            },
            {
                "loc": "/policy"
            },
            {
                "loc": "/refund"
            },
            {
                "loc": "/company"
            },
            {
                "loc": "/contact"
            },
            {
                "loc": "/join-us"
            },
            {
                "loc": "/privacy"
            },
            {
                "loc": "/profile"
            },
            {
                "loc": "/profile/wallet"
            },
            {
                "loc": "/profile/tickets"
            },
            {
                "loc": "/profile/exchange"
            },
            {
                "loc": "/profile/messages"
            },
            {
                "loc": "/profile/favorites"
            },
            {
                "loc": "/profile/order"
            },
            {
                "loc": "/service"
            },
            {
                "loc": "/about-us"
            },
            {
                "loc": "/community"
            },
            {
                "loc": "/advantages"
            },
            {
                "loc": "/disclaimer"
            },
            {
                "loc": "/support/refund/create"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/",
            "/pc",
            "/mobile"
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
