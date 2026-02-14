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
                "loc": "/admin/cdk/cdks"
            },
            {
                "loc": "/admin/cdk/keys"
            },
            {
                "loc": "/admin/cdk/post"
            },
            {
                "loc": "/admin/cdk/debug"
            },
            {
                "loc": "/admin/cdk"
            },
            {
                "loc": "/admin/cdk/virtual"
            },
            {
                "loc": "/admin/cdk/accounts"
            },
            {
                "loc": "/admin/cdk/channel-recognition"
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
                "loc": "/admin"
            },
            {
                "loc": "/admin/login"
            },
            {
                "loc": "/admin/media"
            },
            {
                "loc": "/admin/media/images"
            },
            {
                "loc": "/admin/media/banners"
            },
            {
                "loc": "/admin/users"
            },
            {
                "loc": "/admin/users/accounts"
            },
            {
                "loc": "/admin/users/departments"
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
                "loc": "/admin/orders"
            },
            {
                "loc": "/admin/orders/cdkey"
            },
            {
                "loc": "/admin/orders/share"
            },
            {
                "loc": "/admin/orders/cdkey/detail"
            },
            {
                "loc": "/admin/orders/refund"
            },
            {
                "loc": "/admin/orders/share/detail"
            },
            {
                "loc": "/admin/orders/recharge"
            },
            {
                "loc": "/admin/orders/preorders"
            },
            {
                "loc": "/admin/orders/recharge/detail"
            },
            {
                "loc": "/admin/orders/cancelled-refunds"
            },
            {
                "loc": "/mobile"
            },
            {
                "loc": "/pc/community"
            },
            {
                "loc": "/admin/coupons"
            },
            {
                "loc": "/admin/coupons/flat/post"
            },
            {
                "loc": "/admin/coupons/flat"
            },
            {
                "loc": "/admin/coupons/stats"
            },
            {
                "loc": "/admin/coupons/balance/post"
            },
            {
                "loc": "/admin/coupons/product/post"
            },
            {
                "loc": "/admin/coupons/balance"
            },
            {
                "loc": "/admin/coupons/product"
            },
            {
                "loc": "/pc/advantages"
            },
            {
                "loc": "/pc/disclaimer"
            },
            {
                "loc": "/admin/messages"
            },
            {
                "loc": "/admin/messages/settings"
            },
            {
                "loc": "/admin/messages/batch-send"
            },
            {
                "loc": "/admin/products/edit"
            },
            {
                "loc": "/admin/products/skus"
            },
            {
                "loc": "/admin/products"
            },
            {
                "loc": "/admin/products/categories"
            },
            {
                "loc": "/admin/products/shared-sku"
            },
            {
                "loc": "/admin/recharge"
            },
            {
                "loc": "/admin/recharge/tiers"
            },
            {
                "loc": "/admin/recharge/orders"
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
                "loc": "/admin/help-center"
            },
            {
                "loc": "/admin/help-center/articles"
            },
            {
                "loc": "/admin/help-center/articles/post"
            },
            {
                "loc": "/admin/help-center/faq/post"
            },
            {
                "loc": "/admin/help-center/faq"
            },
            {
                "loc": "/admin/help-center/faq-categories"
            },
            {
                "loc": "/admin/help-center/article-categories"
            },
            {
                "loc": "/admin/article/post"
            },
            {
                "loc": "/admin/images"
            },
            {
                "loc": "/admin/article"
            },
            {
                "loc": "/admin/banners"
            },
            {
                "loc": "/admin/refunds"
            },
            {
                "loc": "/admin/tickets"
            },
            {
                "loc": "/admin/backend-settings"
            },
            {
                "loc": "/admin/backend-settings/contact"
            },
            {
                "loc": "/admin/backend-settings/storage"
            },
            {
                "loc": "/admin/backend-settings/scheduler"
            },
            {
                "loc": "/admin/backend-settings/notification"
            },
            {
                "loc": "/mobile/wechat-callback"
            },
            {
                "loc": "/admin/article/categories"
            },
            {
                "loc": "/pc/support/refund/create"
            },
            {
                "loc": "/admin/tickets/components/TicketChatModal"
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
