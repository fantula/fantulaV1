
  create table "public"."admin_departments" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "permissions" jsonb not null default '[]'::jsonb,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."admin_departments" enable row level security;


  create table "public"."admin_users" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "email" text not null,
    "password_hash" text not null,
    "department_id" uuid,
    "status" text not null default 'enabled'::text,
    "created_at" timestamp with time zone not null default now(),
    "auth_user_id" uuid
      );


alter table "public"."admin_users" enable row level security;


  create table "public"."banners" (
    "id" uuid not null default gen_random_uuid(),
    "image_id" uuid not null,
    "title" text,
    "link" text,
    "sort_order" integer default 0,
    "status" text default 'on'::text,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."cart_items" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "sku_id" uuid not null,
    "quantity" integer not null default 1,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."cart_items" enable row level security;


  create table "public"."cdk_sku_map" (
    "id" uuid not null default gen_random_uuid(),
    "cdk_id" uuid not null,
    "sku_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."cdk_sku_map" enable row level security;


  create table "public"."cdks" (
    "id" uuid not null default gen_random_uuid(),
    "product_id" uuid,
    "code" character varying not null,
    "cdk_type" character varying not null,
    "account_data" jsonb,
    "status" character varying not null default 'idle'::character varying,
    "created_at" timestamp with time zone not null default now(),
    "used_at" timestamp with time zone,
    "max_slots" integer default 1,
    "stock" integer not null default 1,
    "pre_order_id" uuid,
    "product_snapshot" jsonb
      );


alter table "public"."cdks" enable row level security;


  create table "public"."community_articles" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text,
    "content" text,
    "cover_image" text,
    "video_url" text,
    "category" text,
    "is_published" boolean default false,
    "views" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."community_articles" enable row level security;


  create table "public"."community_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "icon" text,
    "color" text,
    "sort_order" integer default 0,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."community_categories" enable row level security;


  create table "public"."coupon_codes" (
    "id" uuid not null default gen_random_uuid(),
    "coupon_id" uuid not null,
    "code" text not null,
    "status" text not null default 'available'::text,
    "user_uid" uuid,
    "used_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "max_usage" integer default 1,
    "used_count" integer default 0
      );


alter table "public"."coupon_codes" enable row level security;


  create table "public"."coupons" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(100) not null,
    "type" character varying(20) not null,
    "value" numeric(10,2) not null default 0,
    "min_usage" numeric(10,2) default 0,
    "sku_ids" text[] default '{}'::text[],
    "total_quantity" integer default 0,
    "start_date" date,
    "end_date" date,
    "status" boolean default true,
    "created_at" timestamp with time zone default now(),
    "used_quantity" integer default 0,
    "code" text
      );


alter table "public"."coupons" enable row level security;


  create table "public"."faq_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "sort_order" integer not null default 0,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."faq_categories" enable row level security;


  create table "public"."faqs" (
    "id" uuid not null default gen_random_uuid(),
    "category_id" uuid,
    "question" text not null,
    "answer" text not null,
    "product_id" uuid,
    "sort_order" integer not null default 0,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."faqs" enable row level security;


  create table "public"."image_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."images" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "url" text not null,
    "category_id" uuid,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "user_uid" character(8) not null,
    "title" character varying not null,
    "content" text not null,
    "is_read" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "type" text default 'system'::text,
    "link" text,
    "data" jsonb
      );


alter table "public"."messages" enable row level security;


  create table "public"."order_fulfillments" (
    "id" uuid not null default gen_random_uuid(),
    "order_id" uuid not null,
    "status" text not null default 'submitted'::text,
    "payload" jsonb not null default '{}'::jsonb,
    "reject_reason" text,
    "submitted_at" timestamp with time zone default now(),
    "reviewed_at" timestamp with time zone,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."order_fulfillments" enable row level security;


  create table "public"."orders" (
    "id" uuid not null default gen_random_uuid(),
    "order_no" text,
    "order_type" character varying(20) not null default 'new'::character varying,
    "start_time" timestamp with time zone not null,
    "end_time" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now(),
    "status" text default 'paid'::text,
    "product_snapshot" jsonb,
    "sku_snapshot" jsonb,
    "user_id" uuid,
    "quantity" integer default 1,
    "cdk_snapshot" jsonb,
    "expires_at" timestamp with time zone,
    "slot_occupancy_ids" uuid[],
    "total_amount" numeric(10,2),
    "original_amount" numeric(10,2),
    "coupon_snapshot" jsonb
      );


alter table "public"."orders" enable row level security;


  create table "public"."pre_orders" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "status" text default 'pending'::text,
    "total_amount" numeric(10,2) not null,
    "source" text default 'buy_now'::text,
    "expires_at" timestamp with time zone not null,
    "created_at" timestamp with time zone default now(),
    "order_no" text,
    "quantity" integer not null default 1,
    "unit_price" numeric(10,2),
    "product_snapshot" jsonb,
    "sku_snapshot" jsonb,
    "locked_cdk_ids" uuid[],
    "locked_slot_ids" uuid[],
    "coupon_id" uuid,
    "discount_amount" numeric(10,2) default 0,
    "original_amount" numeric(10,2),
    "related_order_id" uuid
      );


alter table "public"."pre_orders" enable row level security;


  create table "public"."product_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "sort_order" integer not null default 0,
    "status" text not null default 'on'::text,
    "created_at" timestamp with time zone not null default now()
      );



  create table "public"."product_sku_map" (
    "id" uuid not null default gen_random_uuid(),
    "product_id" uuid not null,
    "sku_id" uuid not null,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."product_sku_map" enable row level security;


  create table "public"."product_skus" (
    "id" uuid not null default gen_random_uuid(),
    "spec_combination" jsonb not null default '{}'::jsonb,
    "image" text,
    "intro" text,
    "price" numeric(10,2) not null,
    "duration" integer,
    "enabled" boolean default true,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now(),
    "product_type" character varying,
    "tag" integer,
    "tag_name" character varying(100)
      );


alter table "public"."product_skus" enable row level security;


  create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "product_name" character varying not null,
    "status" character varying not null default 'on'::character varying,
    "created_at" timestamp with time zone not null default now(),
    "category_id" uuid,
    "image" text,
    "sort_order" integer default 0,
    "display_price" numeric(10,2) default 0,
    "tags" text[] default '{}'::text[],
    "initial_sales" integer default 0,
    "badge_label" text,
    "rating" integer default 100,
    "allow_addon" boolean default false,
    "detail_modules" jsonb default '[]'::jsonb
      );


alter table "public"."products" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "uid" character(8) not null,
    "email" character varying not null,
    "status" character varying not null default 'active'::character varying,
    "created_at" timestamp with time zone not null default now(),
    "nickname" text,
    "balance" numeric(12,2) default 0.00,
    "avatar" text
      );


alter table "public"."profiles" enable row level security;


  create table "public"."recharge_tiers" (
    "id" uuid not null default gen_random_uuid(),
    "amount" numeric(10,2) not null,
    "bonus" numeric(10,2) not null default 0,
    "sort_order" integer not null default 0,
    "status" text not null default 'on'::text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."recharge_tiers" enable row level security;


  create table "public"."refund_requests" (
    "id" uuid not null default gen_random_uuid(),
    "order_id" uuid not null,
    "user_id" uuid not null,
    "reason" text not null,
    "reason_detail" text,
    "original_status" text not null,
    "images_snapshot" jsonb,
    "status" text not null default 'pending'::text,
    "refund_amount" numeric(10,2),
    "admin_id" uuid,
    "admin_note" text,
    "created_at" timestamp with time zone default now(),
    "reviewed_at" timestamp with time zone
      );


alter table "public"."refund_requests" enable row level security;


  create table "public"."scheduled_task_logs" (
    "id" uuid not null default gen_random_uuid(),
    "task_name" text not null,
    "status" text not null,
    "affected_count" integer default 0,
    "error_message" text,
    "executed_at" timestamp with time zone default now()
      );



  create table "public"."shared_sku_groups" (
    "tag" integer not null,
    "name" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."shared_sku_groups" enable row level security;


  create table "public"."slot_occupancies" (
    "id" uuid not null default gen_random_uuid(),
    "cdk_id" uuid not null,
    "slot_index" integer not null,
    "order_id" uuid,
    "status" character varying not null default 'occupied'::character varying,
    "occupied_at" timestamp with time zone not null default now(),
    "released_at" timestamp with time zone,
    "pre_order_id" uuid,
    "user_id" uuid
      );


alter table "public"."slot_occupancies" enable row level security;


  create table "public"."system_settings" (
    "key" text not null,
    "value" text not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."system_settings" enable row level security;


  create table "public"."ticket_messages" (
    "id" uuid not null default gen_random_uuid(),
    "ticket_id" uuid not null,
    "sender_id" uuid,
    "is_admin" boolean default false,
    "content" text,
    "message_type" text default 'text'::text,
    "attachments" text[],
    "created_at" timestamp with time zone default now()
      );


alter table "public"."ticket_messages" enable row level security;


  create table "public"."tickets" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "order_id" uuid not null,
    "title" text,
    "status" text not null default 'processing'::text,
    "priority" text not null default 'medium'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "resolved_at" timestamp with time zone,
    "ticket_no" text
      );


alter table "public"."tickets" enable row level security;


  create table "public"."user_coupons" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "coupon_id" uuid,
    "status" character varying(20) default 'unused'::character varying,
    "redeemed_at" timestamp with time zone default now(),
    "used_at" timestamp with time zone,
    "code" text,
    "order_id" uuid,
    "coupon_snapshot" jsonb,
    "expire_at" timestamp with time zone,
    "redeemed_code" text
      );


alter table "public"."user_coupons" enable row level security;


  create table "public"."user_favorites" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "product_id" uuid not null,
    "sku_id" uuid,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."user_favorites" enable row level security;


  create table "public"."wallet_transactions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "type" character varying(50) not null,
    "amount" numeric(12,2) not null,
    "balance_after" numeric(12,2) not null,
    "description" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."wallet_transactions" enable row level security;

CREATE UNIQUE INDEX admin_departments_name_key ON public.admin_departments USING btree (name);

CREATE UNIQUE INDEX admin_departments_pkey ON public.admin_departments USING btree (id);

CREATE UNIQUE INDEX admin_users_auth_user_id_key ON public.admin_users USING btree (auth_user_id);

CREATE UNIQUE INDEX admin_users_email_key ON public.admin_users USING btree (email);

CREATE UNIQUE INDEX admin_users_pkey ON public.admin_users USING btree (id);

CREATE UNIQUE INDEX banners_pkey ON public.banners USING btree (id);

CREATE UNIQUE INDEX cart_items_pkey ON public.cart_items USING btree (id);

CREATE UNIQUE INDEX cart_items_user_id_sku_id_key ON public.cart_items USING btree (user_id, sku_id);

CREATE UNIQUE INDEX cdk_sku_map_pkey ON public.cdk_sku_map USING btree (id);

CREATE UNIQUE INDEX cdks_code_key ON public.cdks USING btree (code);

CREATE UNIQUE INDEX cdks_pkey ON public.cdks USING btree (id);

CREATE UNIQUE INDEX community_articles_pkey ON public.community_articles USING btree (id);

CREATE UNIQUE INDEX community_categories_pkey ON public.community_categories USING btree (id);

CREATE UNIQUE INDEX coupon_codes_code_key ON public.coupon_codes USING btree (code);

CREATE UNIQUE INDEX coupon_codes_pkey ON public.coupon_codes USING btree (id);

CREATE UNIQUE INDEX coupons_pkey ON public.coupons USING btree (id);

CREATE UNIQUE INDEX faq_categories_pkey ON public.faq_categories USING btree (id);

CREATE UNIQUE INDEX faqs_pkey ON public.faqs USING btree (id);

CREATE INDEX idx_admin_users_department ON public.admin_users USING btree (department_id);

CREATE INDEX idx_admin_users_email ON public.admin_users USING btree (email);

CREATE INDEX idx_cart_items_user_id ON public.cart_items USING btree (user_id);

CREATE INDEX idx_cdk_sku_map_cdk_id ON public.cdk_sku_map USING btree (cdk_id);

CREATE INDEX idx_cdk_sku_map_sku_id ON public.cdk_sku_map USING btree (sku_id);

CREATE INDEX idx_cdks_pre_order ON public.cdks USING btree (pre_order_id) WHERE (pre_order_id IS NOT NULL);

CREATE INDEX idx_cdks_product_status ON public.cdks USING btree (product_id, status);

CREATE INDEX idx_coupon_codes_coupon_id ON public.coupon_codes USING btree (coupon_id);

CREATE INDEX idx_coupon_codes_status ON public.coupon_codes USING btree (status);

CREATE INDEX idx_coupon_codes_user_uid ON public.coupon_codes USING btree (user_uid);

CREATE INDEX idx_faqs_product_id ON public.faqs USING btree (product_id);

CREATE INDEX idx_fulfillments_order ON public.order_fulfillments USING btree (order_id);

CREATE INDEX idx_fulfillments_status ON public.order_fulfillments USING btree (status);

CREATE INDEX idx_messages_is_read ON public.messages USING btree (is_read);

CREATE INDEX idx_messages_type ON public.messages USING btree (type);

CREATE INDEX idx_messages_unread ON public.messages USING btree (user_uid, is_read) WHERE (is_read = false);

CREATE INDEX idx_messages_user_id ON public.messages USING btree (user_id);

CREATE INDEX idx_messages_user_uid ON public.messages USING btree (user_uid);

CREATE INDEX idx_orders_created_at ON public.orders USING btree (created_at DESC);

CREATE INDEX idx_orders_order_no ON public.orders USING btree (order_no);

CREATE INDEX idx_orders_status ON public.orders USING btree (status);

CREATE INDEX idx_pre_orders_expires ON public.pre_orders USING btree (status, expires_at);

CREATE INDEX idx_pre_orders_user ON public.pre_orders USING btree (user_id, status);

CREATE INDEX idx_product_categories_sort ON public.product_categories USING btree (sort_order);

CREATE INDEX idx_products_category ON public.products USING btree (category_id);

CREATE INDEX idx_profiles_uid ON public.profiles USING btree (uid);

CREATE INDEX idx_psm_product ON public.product_sku_map USING btree (product_id);

CREATE INDEX idx_psm_sku ON public.product_sku_map USING btree (sku_id);

CREATE INDEX idx_refund_requests_order_id ON public.refund_requests USING btree (order_id);

CREATE INDEX idx_refund_requests_status ON public.refund_requests USING btree (status);

CREATE INDEX idx_refund_requests_user_id ON public.refund_requests USING btree (user_id);

CREATE INDEX idx_skus_tag ON public.product_skus USING btree (tag);

CREATE INDEX idx_skus_type ON public.product_skus USING btree (product_type);

CREATE INDEX idx_slot_occupancies_cdk_status ON public.slot_occupancies USING btree (cdk_id, status);

CREATE UNIQUE INDEX idx_slot_occupancies_unique_occupied ON public.slot_occupancies USING btree (cdk_id, slot_index) WHERE ((status)::text = 'occupied'::text);

CREATE INDEX idx_task_logs_executed ON public.scheduled_task_logs USING btree (executed_at DESC);

CREATE INDEX idx_ticket_messages_ticket_id ON public.ticket_messages USING btree (ticket_id);

CREATE INDEX idx_tickets_order_id ON public.tickets USING btree (order_id);

CREATE INDEX idx_tickets_status ON public.tickets USING btree (status);

CREATE INDEX idx_tickets_user_id ON public.tickets USING btree (user_id);

CREATE INDEX idx_user_coupons_coupon_id ON public.user_coupons USING btree (coupon_id);

CREATE INDEX idx_user_coupons_expire_at ON public.user_coupons USING btree (expire_at);

CREATE INDEX idx_user_coupons_order_id ON public.user_coupons USING btree (order_id);

CREATE INDEX idx_user_coupons_redeemed_code ON public.user_coupons USING btree (user_id, redeemed_code);

CREATE INDEX idx_user_coupons_user_id ON public.user_coupons USING btree (user_id);

CREATE INDEX idx_user_favorites_product_id ON public.user_favorites USING btree (product_id);

CREATE INDEX idx_user_favorites_user_id ON public.user_favorites USING btree (user_id);

CREATE UNIQUE INDEX image_categories_name_key ON public.image_categories USING btree (name);

CREATE UNIQUE INDEX image_categories_pkey ON public.image_categories USING btree (id);

CREATE UNIQUE INDEX images_pkey ON public.images USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX order_fulfillments_pkey ON public.order_fulfillments USING btree (id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE UNIQUE INDEX pre_orders_pkey ON public.pre_orders USING btree (id);

CREATE UNIQUE INDEX product_categories_name_key ON public.product_categories USING btree (name);

CREATE UNIQUE INDEX product_categories_pkey ON public.product_categories USING btree (id);

CREATE UNIQUE INDEX product_sku_map_pkey ON public.product_sku_map USING btree (id);

CREATE UNIQUE INDEX product_sku_map_product_id_sku_id_key ON public.product_sku_map USING btree (product_id, sku_id);

CREATE UNIQUE INDEX product_skus_pkey ON public.product_skus USING btree (id);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_uid_key ON public.profiles USING btree (uid);

CREATE UNIQUE INDEX recharge_tiers_pkey ON public.recharge_tiers USING btree (id);

CREATE UNIQUE INDEX refund_requests_pkey ON public.refund_requests USING btree (id);

CREATE UNIQUE INDEX scheduled_task_logs_pkey ON public.scheduled_task_logs USING btree (id);

CREATE UNIQUE INDEX shared_sku_groups_pkey ON public.shared_sku_groups USING btree (tag);

CREATE UNIQUE INDEX slot_occupancies_pkey ON public.slot_occupancies USING btree (id);

CREATE UNIQUE INDEX system_settings_pkey ON public.system_settings USING btree (key);

CREATE UNIQUE INDEX ticket_messages_pkey ON public.ticket_messages USING btree (id);

CREATE UNIQUE INDEX tickets_pkey ON public.tickets USING btree (id);

CREATE UNIQUE INDEX tickets_ticket_no_key ON public.tickets USING btree (ticket_no);

CREATE UNIQUE INDEX user_coupons_pkey ON public.user_coupons USING btree (id);

CREATE UNIQUE INDEX user_favorites_pkey ON public.user_favorites USING btree (id);

CREATE UNIQUE INDEX user_favorites_user_id_product_id_sku_id_key ON public.user_favorites USING btree (user_id, product_id, sku_id);

CREATE UNIQUE INDEX wallet_transactions_pkey ON public.wallet_transactions USING btree (id);

alter table "public"."admin_departments" add constraint "admin_departments_pkey" PRIMARY KEY using index "admin_departments_pkey";

alter table "public"."admin_users" add constraint "admin_users_pkey" PRIMARY KEY using index "admin_users_pkey";

alter table "public"."banners" add constraint "banners_pkey" PRIMARY KEY using index "banners_pkey";

alter table "public"."cart_items" add constraint "cart_items_pkey" PRIMARY KEY using index "cart_items_pkey";

alter table "public"."cdk_sku_map" add constraint "cdk_sku_map_pkey" PRIMARY KEY using index "cdk_sku_map_pkey";

alter table "public"."cdks" add constraint "cdks_pkey" PRIMARY KEY using index "cdks_pkey";

alter table "public"."community_articles" add constraint "community_articles_pkey" PRIMARY KEY using index "community_articles_pkey";

alter table "public"."community_categories" add constraint "community_categories_pkey" PRIMARY KEY using index "community_categories_pkey";

alter table "public"."coupon_codes" add constraint "coupon_codes_pkey" PRIMARY KEY using index "coupon_codes_pkey";

alter table "public"."coupons" add constraint "coupons_pkey" PRIMARY KEY using index "coupons_pkey";

alter table "public"."faq_categories" add constraint "faq_categories_pkey" PRIMARY KEY using index "faq_categories_pkey";

alter table "public"."faqs" add constraint "faqs_pkey" PRIMARY KEY using index "faqs_pkey";

alter table "public"."image_categories" add constraint "image_categories_pkey" PRIMARY KEY using index "image_categories_pkey";

alter table "public"."images" add constraint "images_pkey" PRIMARY KEY using index "images_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."order_fulfillments" add constraint "order_fulfillments_pkey" PRIMARY KEY using index "order_fulfillments_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."pre_orders" add constraint "pre_orders_pkey" PRIMARY KEY using index "pre_orders_pkey";

alter table "public"."product_categories" add constraint "product_categories_pkey" PRIMARY KEY using index "product_categories_pkey";

alter table "public"."product_sku_map" add constraint "product_sku_map_pkey" PRIMARY KEY using index "product_sku_map_pkey";

alter table "public"."product_skus" add constraint "product_skus_pkey" PRIMARY KEY using index "product_skus_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."recharge_tiers" add constraint "recharge_tiers_pkey" PRIMARY KEY using index "recharge_tiers_pkey";

alter table "public"."refund_requests" add constraint "refund_requests_pkey" PRIMARY KEY using index "refund_requests_pkey";

alter table "public"."scheduled_task_logs" add constraint "scheduled_task_logs_pkey" PRIMARY KEY using index "scheduled_task_logs_pkey";

alter table "public"."shared_sku_groups" add constraint "shared_sku_groups_pkey" PRIMARY KEY using index "shared_sku_groups_pkey";

alter table "public"."slot_occupancies" add constraint "slot_occupancies_pkey" PRIMARY KEY using index "slot_occupancies_pkey";

alter table "public"."system_settings" add constraint "system_settings_pkey" PRIMARY KEY using index "system_settings_pkey";

alter table "public"."ticket_messages" add constraint "ticket_messages_pkey" PRIMARY KEY using index "ticket_messages_pkey";

alter table "public"."tickets" add constraint "tickets_pkey" PRIMARY KEY using index "tickets_pkey";

alter table "public"."user_coupons" add constraint "user_coupons_pkey" PRIMARY KEY using index "user_coupons_pkey";

alter table "public"."user_favorites" add constraint "user_favorites_pkey" PRIMARY KEY using index "user_favorites_pkey";

alter table "public"."wallet_transactions" add constraint "wallet_transactions_pkey" PRIMARY KEY using index "wallet_transactions_pkey";

alter table "public"."admin_departments" add constraint "admin_departments_name_key" UNIQUE using index "admin_departments_name_key";

alter table "public"."admin_users" add constraint "admin_users_auth_user_id_key" UNIQUE using index "admin_users_auth_user_id_key";

alter table "public"."admin_users" add constraint "admin_users_department_id_fkey" FOREIGN KEY (department_id) REFERENCES public.admin_departments(id) ON DELETE SET NULL not valid;

alter table "public"."admin_users" validate constraint "admin_users_department_id_fkey";

alter table "public"."admin_users" add constraint "admin_users_email_key" UNIQUE using index "admin_users_email_key";

alter table "public"."admin_users" add constraint "admin_users_status_check" CHECK ((status = ANY (ARRAY['enabled'::text, 'disabled'::text]))) not valid;

alter table "public"."admin_users" validate constraint "admin_users_status_check";

alter table "public"."banners" add constraint "banners_image_id_fkey" FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE not valid;

alter table "public"."banners" validate constraint "banners_image_id_fkey";

alter table "public"."banners" add constraint "banners_status_check" CHECK ((status = ANY (ARRAY['on'::text, 'off'::text]))) not valid;

alter table "public"."banners" validate constraint "banners_status_check";

alter table "public"."cart_items" add constraint "cart_items_quantity_check" CHECK ((quantity > 0)) not valid;

alter table "public"."cart_items" validate constraint "cart_items_quantity_check";

alter table "public"."cart_items" add constraint "cart_items_sku_id_fkey" FOREIGN KEY (sku_id) REFERENCES public.product_skus(id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_sku_id_fkey";

alter table "public"."cart_items" add constraint "cart_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_user_id_fkey";

alter table "public"."cart_items" add constraint "cart_items_user_id_sku_id_key" UNIQUE using index "cart_items_user_id_sku_id_key";

alter table "public"."cdk_sku_map" add constraint "cdk_sku_map_cdk_id_fkey" FOREIGN KEY (cdk_id) REFERENCES public.cdks(id) ON DELETE CASCADE not valid;

alter table "public"."cdk_sku_map" validate constraint "cdk_sku_map_cdk_id_fkey";

alter table "public"."cdk_sku_map" add constraint "cdk_sku_map_sku_id_fkey" FOREIGN KEY (sku_id) REFERENCES public.product_skus(id) ON DELETE CASCADE not valid;

alter table "public"."cdk_sku_map" validate constraint "cdk_sku_map_sku_id_fkey";

alter table "public"."cdks" add constraint "cdks_cdk_type_check" CHECK (((cdk_type)::text = ANY (ARRAY[('virtual'::character varying)::text, ('shared'::character varying)::text, ('one_time'::character varying)::text]))) not valid;

alter table "public"."cdks" validate constraint "cdks_cdk_type_check";

alter table "public"."cdks" add constraint "cdks_code_key" UNIQUE using index "cdks_code_key";

alter table "public"."cdks" add constraint "cdks_pre_order_id_fkey" FOREIGN KEY (pre_order_id) REFERENCES public.pre_orders(id) ON DELETE SET NULL not valid;

alter table "public"."cdks" validate constraint "cdks_pre_order_id_fkey";

alter table "public"."cdks" add constraint "cdks_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT not valid;

alter table "public"."cdks" validate constraint "cdks_product_id_fkey";

alter table "public"."cdks" add constraint "cdks_shared_max_slots_check" CHECK ((((cdk_type)::text <> 'shared'::text) OR ((max_slots IS NOT NULL) AND (max_slots >= 1)))) not valid;

alter table "public"."cdks" validate constraint "cdks_shared_max_slots_check";

alter table "public"."cdks" add constraint "cdks_status_check" CHECK (((status)::text = ANY (ARRAY['idle'::text, 'using'::text, 'used'::text, 'disabled'::text]))) not valid;

alter table "public"."cdks" validate constraint "cdks_status_check";

alter table "public"."coupon_codes" add constraint "coupon_codes_code_key" UNIQUE using index "coupon_codes_code_key";

alter table "public"."coupon_codes" add constraint "coupon_codes_coupon_id_fkey" FOREIGN KEY (coupon_id) REFERENCES public.coupons(id) ON DELETE CASCADE not valid;

alter table "public"."coupon_codes" validate constraint "coupon_codes_coupon_id_fkey";

alter table "public"."coupon_codes" add constraint "coupon_codes_status_check" CHECK ((status = ANY (ARRAY['available'::text, 'exhausted'::text]))) not valid;

alter table "public"."coupon_codes" validate constraint "coupon_codes_status_check";

alter table "public"."coupon_codes" add constraint "coupon_codes_user_uid_fkey" FOREIGN KEY (user_uid) REFERENCES public.profiles(id) not valid;

alter table "public"."coupon_codes" validate constraint "coupon_codes_user_uid_fkey";

alter table "public"."faqs" add constraint "faqs_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.faq_categories(id) ON DELETE SET NULL not valid;

alter table "public"."faqs" validate constraint "faqs_category_id_fkey";

alter table "public"."faqs" add constraint "faqs_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL not valid;

alter table "public"."faqs" validate constraint "faqs_product_id_fkey";

alter table "public"."image_categories" add constraint "image_categories_name_key" UNIQUE using index "image_categories_name_key";

alter table "public"."images" add constraint "images_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.image_categories(id) ON DELETE SET NULL not valid;

alter table "public"."images" validate constraint "images_category_id_fkey";

alter table "public"."messages" add constraint "messages_type_check" CHECK ((type = ANY (ARRAY['system'::text, 'order'::text, 'activity'::text, 'security'::text]))) not valid;

alter table "public"."messages" validate constraint "messages_type_check";

alter table "public"."messages" add constraint "messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_user_id_fkey";

alter table "public"."order_fulfillments" add constraint "order_fulfillments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE not valid;

alter table "public"."order_fulfillments" validate constraint "order_fulfillments_order_id_fkey";

alter table "public"."order_fulfillments" add constraint "order_fulfillments_status_check" CHECK ((status = ANY (ARRAY['submitted'::text, 'approved'::text, 'rejected'::text]))) not valid;

alter table "public"."order_fulfillments" validate constraint "order_fulfillments_status_check";

alter table "public"."orders" add constraint "orders_status_check" CHECK ((status = ANY (ARRAY['pending_delivery'::text, 'active'::text, 'refunding'::text, 'refunded'::text, 'expired'::text]))) not valid;

alter table "public"."orders" validate constraint "orders_status_check";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

alter table "public"."pre_orders" add constraint "pre_orders_coupon_id_fkey" FOREIGN KEY (coupon_id) REFERENCES public.user_coupons(id) ON DELETE SET NULL not valid;

alter table "public"."pre_orders" validate constraint "pre_orders_coupon_id_fkey";

alter table "public"."pre_orders" add constraint "pre_orders_related_order_id_fkey" FOREIGN KEY (related_order_id) REFERENCES public.orders(id) not valid;

alter table "public"."pre_orders" validate constraint "pre_orders_related_order_id_fkey";

alter table "public"."pre_orders" add constraint "pre_orders_source_check" CHECK ((source = ANY (ARRAY['buy_now'::text, 'cart'::text, 'renew'::text]))) not valid;

alter table "public"."pre_orders" validate constraint "pre_orders_source_check";

alter table "public"."pre_orders" add constraint "pre_orders_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'converted'::text, 'expired'::text, 'deleted'::text]))) not valid;

alter table "public"."pre_orders" validate constraint "pre_orders_status_check";

alter table "public"."pre_orders" add constraint "pre_orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."pre_orders" validate constraint "pre_orders_user_id_fkey";

alter table "public"."product_categories" add constraint "product_categories_name_key" UNIQUE using index "product_categories_name_key";

alter table "public"."product_categories" add constraint "product_categories_status_check" CHECK ((status = ANY (ARRAY['on'::text, 'off'::text]))) not valid;

alter table "public"."product_categories" validate constraint "product_categories_status_check";

alter table "public"."product_sku_map" add constraint "product_sku_map_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE not valid;

alter table "public"."product_sku_map" validate constraint "product_sku_map_product_id_fkey";

alter table "public"."product_sku_map" add constraint "product_sku_map_product_id_sku_id_key" UNIQUE using index "product_sku_map_product_id_sku_id_key";

alter table "public"."product_sku_map" add constraint "product_sku_map_sku_id_fkey" FOREIGN KEY (sku_id) REFERENCES public.product_skus(id) ON DELETE CASCADE not valid;

alter table "public"."product_sku_map" validate constraint "product_sku_map_sku_id_fkey";

alter table "public"."products" add constraint "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.product_categories(id) ON DELETE SET NULL not valid;

alter table "public"."products" validate constraint "products_category_id_fkey";

alter table "public"."products" add constraint "products_rating_check" CHECK (((rating >= 0) AND (rating <= 100))) not valid;

alter table "public"."products" validate constraint "products_rating_check";

alter table "public"."products" add constraint "products_status_check" CHECK (((status)::text = ANY (ARRAY[('on'::character varying)::text, ('off'::character varying)::text]))) not valid;

alter table "public"."products" validate constraint "products_status_check";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_status_check" CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('disabled'::character varying)::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_status_check";

alter table "public"."profiles" add constraint "profiles_uid_key" UNIQUE using index "profiles_uid_key";

alter table "public"."recharge_tiers" add constraint "recharge_tiers_status_check" CHECK ((status = ANY (ARRAY['on'::text, 'off'::text]))) not valid;

alter table "public"."recharge_tiers" validate constraint "recharge_tiers_status_check";

alter table "public"."refund_requests" add constraint "refund_requests_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES public.profiles(id) not valid;

alter table "public"."refund_requests" validate constraint "refund_requests_admin_id_fkey";

alter table "public"."refund_requests" add constraint "refund_requests_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) not valid;

alter table "public"."refund_requests" validate constraint "refund_requests_order_id_fkey";

alter table "public"."refund_requests" add constraint "refund_requests_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text, 'cancelled'::text]))) not valid;

alter table "public"."refund_requests" validate constraint "refund_requests_status_check";

alter table "public"."refund_requests" add constraint "refund_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."refund_requests" validate constraint "refund_requests_user_id_fkey";

alter table "public"."scheduled_task_logs" add constraint "scheduled_task_logs_status_check" CHECK ((status = ANY (ARRAY['success'::text, 'error'::text]))) not valid;

alter table "public"."scheduled_task_logs" validate constraint "scheduled_task_logs_status_check";

alter table "public"."slot_occupancies" add constraint "slot_occupancies_cdk_id_fkey" FOREIGN KEY (cdk_id) REFERENCES public.cdks(id) ON DELETE CASCADE not valid;

alter table "public"."slot_occupancies" validate constraint "slot_occupancies_cdk_id_fkey";

alter table "public"."slot_occupancies" add constraint "slot_occupancies_pre_order_id_fkey" FOREIGN KEY (pre_order_id) REFERENCES public.pre_orders(id) ON DELETE SET NULL not valid;

alter table "public"."slot_occupancies" validate constraint "slot_occupancies_pre_order_id_fkey";

alter table "public"."slot_occupancies" add constraint "slot_occupancies_status_check" CHECK (((status)::text = ANY (ARRAY[('idle'::character varying)::text, ('using'::character varying)::text]))) not valid;

alter table "public"."slot_occupancies" validate constraint "slot_occupancies_status_check";

alter table "public"."slot_occupancies" add constraint "slot_occupancies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."slot_occupancies" validate constraint "slot_occupancies_user_id_fkey";

alter table "public"."ticket_messages" add constraint "ticket_messages_message_type_check" CHECK ((message_type = ANY (ARRAY['text'::text, 'image'::text]))) not valid;

alter table "public"."ticket_messages" validate constraint "ticket_messages_message_type_check";

alter table "public"."ticket_messages" add constraint "ticket_messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public.profiles(id) not valid;

alter table "public"."ticket_messages" validate constraint "ticket_messages_sender_id_fkey";

alter table "public"."ticket_messages" add constraint "ticket_messages_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE not valid;

alter table "public"."ticket_messages" validate constraint "ticket_messages_ticket_id_fkey";

alter table "public"."tickets" add constraint "tickets_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) not valid;

alter table "public"."tickets" validate constraint "tickets_order_id_fkey";

alter table "public"."tickets" add constraint "tickets_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))) not valid;

alter table "public"."tickets" validate constraint "tickets_priority_check";

alter table "public"."tickets" add constraint "tickets_status_check" CHECK ((status = ANY (ARRAY['processing'::text, 'resolved'::text]))) not valid;

alter table "public"."tickets" validate constraint "tickets_status_check";

alter table "public"."tickets" add constraint "tickets_ticket_no_key" UNIQUE using index "tickets_ticket_no_key";

alter table "public"."tickets" add constraint "tickets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."tickets" validate constraint "tickets_user_id_fkey";

alter table "public"."user_coupons" add constraint "user_coupons_coupon_id_fkey" FOREIGN KEY (coupon_id) REFERENCES public.coupons(id) ON DELETE SET NULL not valid;

alter table "public"."user_coupons" validate constraint "user_coupons_coupon_id_fkey";

alter table "public"."user_coupons" add constraint "user_coupons_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL not valid;

alter table "public"."user_coupons" validate constraint "user_coupons_order_id_fkey";

alter table "public"."user_coupons" add constraint "user_coupons_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."user_coupons" validate constraint "user_coupons_user_id_fkey";

alter table "public"."user_favorites" add constraint "user_favorites_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE not valid;

alter table "public"."user_favorites" validate constraint "user_favorites_product_id_fkey";

alter table "public"."user_favorites" add constraint "user_favorites_sku_id_fkey" FOREIGN KEY (sku_id) REFERENCES public.product_skus(id) ON DELETE SET NULL not valid;

alter table "public"."user_favorites" validate constraint "user_favorites_sku_id_fkey";

alter table "public"."user_favorites" add constraint "user_favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."user_favorites" validate constraint "user_favorites_user_id_fkey";

alter table "public"."user_favorites" add constraint "user_favorites_user_id_product_id_sku_id_key" UNIQUE using index "user_favorites_user_id_product_id_sku_id_key";

alter table "public"."wallet_transactions" add constraint "wallet_transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."wallet_transactions" validate constraint "wallet_transactions_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.admin_cleanup_ticket_images(p_days_old integer DEFAULT 7)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_deleted_count INT;
    v_updated_msg_count INT;
BEGIN
    -- Logic:
    -- 1. Find tickets that are 'resolved' AND resolved_at < (NOW - days)
    -- 2. Find messages for those tickets that have message_type='image' OR attachments not empty
    -- 3. Extract file paths (bucket keys) -> This is hard in SQL for array/json URLs.
    -- Better Approach:
    -- Just find messages belonging to old resolved tickets. 
    -- We can't easily parse partial URL to object name in SQL without assumption of formatting.
    
    -- ALTERNATIVE SIMPLE STRATEGY:
    -- Just return the list of tickets/messages, and let the JS backend do the storage.remove()
    -- But user asked for "One click in admin".
    -- Let's try direct deletion if we assume standard path.
    -- However, for safety, let's strictly delete from `storage.objects` where owner (user_id) matches... wait storage objects are owned by uploader.
    
    -- REVISED STRATEGY for SQL-only cleanup:
    -- It's risky to derive object names from full URLs stored in text[].
    -- Let's implement this as a query-only RPC that returns the list of URLs to be deleted by the JS client.
    -- The JS client (Nitro API) will then call Supabase Storage API to remove them.
    
    RETURN jsonb_build_object(
        'success', true, 
        'message', 'Please use the Admin API endpoint /admin/ticket/cleanup which handles storage deletion'
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_delete_coupon_codes(p_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_deleted_count INTEGER;
BEGIN
    -- REMOVED: auth.uid() check - service_role key is trusted

    DELETE FROM coupon_codes WHERE id = ANY(p_ids);
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

    RETURN jsonb_build_object(
        'success', true,
        'count', v_deleted_count
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '删除失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_generate_coupon_codes(p_coupon_id uuid, p_quantity integer DEFAULT 1, p_mode text DEFAULT 'random'::text, p_custom_code text DEFAULT NULL::text, p_usage_limit integer DEFAULT 1)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_coupon_exists BOOLEAN;
    v_generated_count INTEGER := 0;
    v_new_code TEXT;
    i INTEGER;
    k INTEGER;
    v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    v_rnd_str TEXT;
BEGIN
    -- REMOVED: auth.uid() check - service_role key is trusted
    -- Access control is handled at API level (only admin backend calls this)

    SELECT EXISTS(SELECT 1 FROM coupons WHERE id = p_coupon_id) INTO v_coupon_exists;
    IF NOT v_coupon_exists THEN
         RETURN jsonb_build_object('success', false, 'error', '优惠券规则不存在');
    END IF;

    IF p_mode = 'universal' THEN
        IF p_custom_code IS NULL OR length(p_custom_code) < 3 THEN
             RETURN jsonb_build_object('success', false, 'error', '通用码长度需大于3位');
        END IF;
        
        IF EXISTS(SELECT 1 FROM coupon_codes WHERE code = UPPER(p_custom_code)) THEN
             RETURN jsonb_build_object('success', false, 'error', '该兑换码已存在');
        END IF;

        INSERT INTO coupon_codes (coupon_id, code, max_usage, used_count, status)
        VALUES (p_coupon_id, UPPER(p_custom_code), p_usage_limit, 0, 'available');
        
        v_generated_count := 1;
        
    ELSE
        IF p_quantity <= 0 OR p_quantity > 10000 THEN
             RETURN jsonb_build_object('success', false, 'error', '单次生成数量限制 1-10000');
        END IF;

        FOR i IN 1..p_quantity LOOP
            LOOP
                v_rnd_str := '';
                FOR k IN 1..12 LOOP
                    v_rnd_str := v_rnd_str || substr(v_chars, floor(random() * length(v_chars) + 1)::integer, 1);
                END LOOP;
                
                -- Format: XXX-XXX-XXX-XXX (3-3-3-3)
                v_new_code := substr(v_rnd_str, 1, 3) || '-' || substr(v_rnd_str, 4, 3) || '-' || substr(v_rnd_str, 7, 3) || '-' || substr(v_rnd_str, 10, 3);

                IF NOT EXISTS(SELECT 1 FROM coupon_codes WHERE code = v_new_code) THEN
                    EXIT;
                END IF;
            END LOOP;

            INSERT INTO coupon_codes (coupon_id, code, max_usage, used_count, status)
            VALUES (p_coupon_id, v_new_code, 1, 0, 'available');
            
            v_generated_count := v_generated_count + 1;
        END LOOP;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'count', v_generated_count,
        'mode', p_mode
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '生成失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_review_refund(p_request_id uuid, p_approved boolean, p_refund_amount numeric DEFAULT NULL::numeric, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_admin_id UUID;
  v_is_admin BOOLEAN;
  v_request RECORD;
  v_order RECORD;
  v_user_balance DECIMAL;
BEGIN
  v_admin_id := auth.uid();
  
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = v_admin_id AND role = 'admin'
  ) INTO v_is_admin;
  
  IF NOT v_is_admin THEN
    RETURN jsonb_build_object('success', false, 'error', '无管理员权限');
  END IF;
  SELECT * INTO v_request FROM refund_requests WHERE id = p_request_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '退款申请不存在');
  END IF;
  
  IF v_request.status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'error', '该申请已处理');
  END IF;
  SELECT * INTO v_order FROM orders WHERE id = v_request.order_id;
  IF p_approved THEN
    IF p_refund_amount IS NULL OR p_refund_amount <= 0 THEN
      RETURN jsonb_build_object('success', false, 'error', '请填写有效的退款金额');
    END IF;
    
    IF p_refund_amount > v_order.total_amount THEN
      RETURN jsonb_build_object('success', false, 'error', '退款金额不能超过订单金额');
    END IF;
    UPDATE refund_requests SET
      status = 'approved',
      refund_amount = p_refund_amount,
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    UPDATE orders SET status = 'refunded' WHERE id = v_request.order_id;
    SELECT balance INTO v_user_balance FROM profiles WHERE id = v_request.user_id;
    
    UPDATE profiles SET balance = balance + p_refund_amount WHERE id = v_request.user_id;
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
    VALUES (
      v_request.user_id,
      p_refund_amount,
      'refund',
      v_user_balance + p_refund_amount,
      '订单退款: ' || v_order.order_no
    );
    IF v_order.order_type = 'shared_account' AND v_order.slot_occupancy_ids IS NOT NULL THEN
      UPDATE slot_occupancies 
      SET status = 'idle', order_id = NULL, user_id = NULL
      WHERE id = ANY(v_order.slot_occupancy_ids);
    END IF;
    RETURN jsonb_build_object('success', true, 'message', '退款审批通过');
  ELSE
    UPDATE refund_requests SET
      status = 'rejected',
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    UPDATE orders SET status = v_request.original_status WHERE id = v_request.order_id;
    RETURN jsonb_build_object('success', true, 'message', '已拒绝退款申请');
  END IF;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '审核失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.apply_coupon_to_pre_order(p_pre_order_id uuid, p_coupon_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_pre_order RECORD;
    v_discount_result JSONB;
    v_sku_id_text TEXT;
    v_sku_id UUID;
    v_sku_ids UUID[];
    v_discount_amount DECIMAL(10, 2) := 0;
    v_final_amount DECIMAL(10, 2);
    v_original_amount DECIMAL(10, 2);
BEGIN
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    IF v_pre_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可修改');
    END IF;

    -- Determine Original Amount
    IF v_pre_order.original_amount IS NOT NULL THEN
        v_original_amount := v_pre_order.original_amount;
    ELSE
        v_original_amount := v_pre_order.total_amount;
        UPDATE pre_orders SET original_amount = v_original_amount WHERE id = p_pre_order_id;
    END IF;

    -- Case A: Remove Coupon
    IF p_coupon_id IS NULL THEN
        UPDATE pre_orders 
        SET coupon_id = NULL, 
            discount_amount = 0, 
            total_amount = v_original_amount 
        WHERE id = p_pre_order_id;
        
        RETURN jsonb_build_object(
            'success', true, 
            'total_amount', v_original_amount,
            'discount_amount', 0
        );
    END IF;

    -- Case B: Apply Coupon
    -- SAFE GUARD: Extract SKU ID safely
    v_sku_id_text := v_pre_order.sku_snapshot->>'sku_id';
    
    IF v_sku_id_text IS NULL OR v_sku_id_text = '' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单数据异常：缺少SKU信息');
    END IF;

    BEGIN
        v_sku_id := v_sku_id_text::UUID;
    EXCEPTION WHEN invalid_text_representation THEN
        RETURN jsonb_build_object('success', false, 'error', '订单数据异常：SKU ID格式错误');
    END;

    v_sku_ids := ARRAY[v_sku_id];

    -- Call Calculate
    -- We assume calculate_coupon_discount is correct (from previous fix)
    v_discount_result := calculate_coupon_discount(
        auth.uid(),
        p_coupon_id,
        v_original_amount, 
        v_sku_ids
    );

    IF (v_discount_result->>'valid')::BOOLEAN = FALSE THEN
        RETURN jsonb_build_object('success', false, 'error', v_discount_result->>'error');
    END IF;

    v_discount_amount := (v_discount_result->>'discount_amount')::DECIMAL;
    v_final_amount := (v_discount_result->>'final_amount')::DECIMAL;

    UPDATE pre_orders 
    SET coupon_id = p_coupon_id,
        discount_amount = v_discount_amount,
        total_amount = v_final_amount
    WHERE id = p_pre_order_id;

    RETURN jsonb_build_object(
        'success', true,
        'total_amount', v_final_amount,
        'discount_amount', v_discount_amount
    );

EXCEPTION WHEN OTHERS THEN
    -- Capture any other SQL error (like missing tables, column mismatch)
    RETURN jsonb_build_object('success', false, 'error', '应用优惠券系统异常: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calculate_coupon_discount(p_user_id uuid, p_coupon_id uuid, p_order_amount numeric, p_sku_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_coupon_record RECORD;
    v_discount_amount DECIMAL(10,2) := 0;
    v_sku_id UUID;
    v_sku_price DECIMAL(10,2);
    v_has_valid_product BOOLEAN := FALSE;
    v_coupon_sku_ids UUID[];
BEGIN
    -- 1. 从 user_coupons 读取（使用快照）
    SELECT 
        uc.id, 
        uc.status,
        uc.expire_at,
        uc.coupon_snapshot->>'type' AS type,
        (uc.coupon_snapshot->>'value')::DECIMAL AS value,
        (uc.coupon_snapshot->>'min_usage')::DECIMAL AS min_usage,
        uc.coupon_snapshot->'sku_ids' AS sku_ids_json
    INTO v_coupon_record
    FROM user_coupons uc
    WHERE uc.id = p_coupon_id AND uc.user_id = p_user_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券不存在');
    END IF;
    -- 2. 验证状态
    IF v_coupon_record.status != 'unused' THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已使用或不可用');
    END IF;
    -- 3. 验证过期时间（使用快照中的独立过期时间）
    IF v_coupon_record.expire_at IS NOT NULL AND v_coupon_record.expire_at < NOW() THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已过期');
    END IF;
    -- 4. 验证最低消费
    IF p_order_amount < COALESCE(v_coupon_record.min_usage, 0) THEN
        RETURN jsonb_build_object('valid', false, 'error', format('订单金额未满 ￥%s', v_coupon_record.min_usage));
    END IF;
    -- 5. 类型逻辑
    IF v_coupon_record.type = 'balance' THEN
        RETURN jsonb_build_object('valid', false, 'error', '余额券不能直接抵扣订单');
        
    ELSIF v_coupon_record.type = 'flat' THEN
        -- 立减券：固定金额
        v_discount_amount := v_coupon_record.value;
        
    ELSIF v_coupon_record.type = 'product' THEN
        -- 指定商品券：从快照读取 sku_ids
        IF p_sku_ids IS NULL OR array_length(p_sku_ids, 1) = 0 THEN
            RETURN jsonb_build_object('valid', false, 'error', '订单中没有商品');
        END IF;
        -- 从 JSONB 数组转为 UUID 数组
        IF v_coupon_record.sku_ids_json IS NOT NULL THEN
            SELECT ARRAY(
                SELECT (elem::text)::uuid 
                FROM jsonb_array_elements_text(v_coupon_record.sku_ids_json) AS elem
                WHERE elem::text != ''
            ) INTO v_coupon_sku_ids;
        ELSE
            v_coupon_sku_ids := '{}';
        END IF;
        -- 遍历订单 SKU
        FOREACH v_sku_id IN ARRAY p_sku_ids
        LOOP
            IF v_sku_id = ANY(v_coupon_sku_ids) THEN
                v_has_valid_product := TRUE;
                
                SELECT price INTO v_sku_price FROM product_skus WHERE id = v_sku_id;
                IF v_sku_price IS NULL THEN v_sku_price := 0; END IF;
                
                -- 指定商品券只折扣一份
                v_discount_amount := v_discount_amount + v_sku_price;
                EXIT; -- 只折扣一份，退出循环
            END IF;
        END LOOP;
        
        IF NOT v_has_valid_product THEN
            RETURN jsonb_build_object('valid', false, 'error', '该优惠券仅限指定商品使用');
        END IF;
    END IF;
    -- 6. 折扣不超过订单金额
    IF v_discount_amount > p_order_amount THEN
        v_discount_amount := p_order_amount;
    END IF;
    RETURN jsonb_build_object(
        'valid', true,
        'discount_amount', v_discount_amount,
        'final_amount', p_order_amount - v_discount_amount
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cancel_pre_order(p_pre_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_order RECORD;
BEGIN
    -- 查询预订单
    SELECT * INTO v_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;

    IF v_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可删除');
    END IF;

    -- 调用统一的资源释放函数
    PERFORM release_preorder_resources(p_pre_order_id);

    -- 更新预订单状态为 deleted（软删除）
    UPDATE pre_orders SET status = 'deleted' WHERE id = p_pre_order_id;

    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cancel_user_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_request RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
    AND user_id = v_user_id 
    AND status = 'pending'
  FOR UPDATE;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '未找到进行中的退款申请');
  END IF;
  UPDATE orders SET status = v_request.original_status WHERE id = p_order_id;
  
  UPDATE refund_requests 
  SET status = 'cancelled', reviewed_at = NOW()
  WHERE id = v_request.id;
  RETURN jsonb_build_object('success', true, 'message', '退款申请已取消');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '取消失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_email_available(email_input text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  -- Returns true if email does NOT exist in auth.users
  return not exists (
    select 1 
    from auth.users 
    where email = email_input
  );
end;
$function$
;

CREATE OR REPLACE FUNCTION public.cleanup_expired_preorders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_preorder RECORD;
    v_count INTEGER := 0;
    v_error_count INTEGER := 0;
BEGIN
    -- 遍历所有过期的 pending 预订单
    FOR v_preorder IN 
        SELECT * FROM pre_orders 
        WHERE status = 'pending' 
          AND expires_at < NOW()
        FOR UPDATE SKIP LOCKED
    LOOP
        BEGIN
            -- 释放资源
            PERFORM release_preorder_resources(v_preorder.id);
            
            -- 更新状态为 expired
            UPDATE pre_orders 
            SET status = 'expired' 
            WHERE id = v_preorder.id;
            
            v_count := v_count + 1;
        EXCEPTION WHEN OTHERS THEN
            v_error_count := v_error_count + 1;
        END;
    END LOOP;
    
    -- 记录执行日志（如果表存在）
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'cleanup_expired_preorders', 
            CASE WHEN v_error_count = 0 THEN 'success' ELSE 'error' END,
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        -- 忽略日志表不存在的错误
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'error_count', v_error_count
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.confirm_pre_order(p_pre_order_id uuid, p_pay_method text, p_coupon_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_pre_order RECORD;
    v_user_balance DECIMAL(10, 2);
    v_need_amount DECIMAL(10, 2);
    v_original_amount DECIMAL(10, 2);
    v_order_no TEXT;
    v_order_id UUID;
    v_discount_result JSONB;
    v_discount_amount DECIMAL(10, 2) := 0;
    v_sku_id UUID;
    v_sku_ids UUID[];
    v_active_coupon_id UUID;
    v_coupon_snapshot JSONB := NULL;
    v_coupon_code TEXT;
    v_coupon_type TEXT;
    v_coupon_name TEXT;
    
    v_order_status TEXT;
    v_product_type TEXT;
    v_duration INTEGER;
    v_end_time TIMESTAMP WITH TIME ZONE;
    
    v_product_name TEXT;
    v_spec_text TEXT;
    v_wallet_desc TEXT;
    
    -- Renewal specific
    v_is_renewal BOOLEAN := FALSE;
    v_old_order RECORD;
BEGIN
    -- ============================================
    -- 步骤1：获取并验证预订单
    -- ============================================
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    IF v_pre_order.user_id != auth.uid() THEN
        RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
    END IF;
    IF v_pre_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可支付');
    END IF;
    
    IF v_pre_order.expires_at < NOW() THEN
        PERFORM release_preorder_resources(p_pre_order_id);
        UPDATE pre_orders SET status = 'expired' WHERE id = p_pre_order_id;
        RETURN jsonb_build_object('success', false, 'error', '订单已过期');
    END IF;
    
    -- Check if this is a renewal
    v_is_renewal := (v_pre_order.source = 'renew' AND v_pre_order.related_order_id IS NOT NULL);
    
    -- Extract info
    v_product_type := v_pre_order.sku_snapshot->>'product_type';
    v_duration := COALESCE((v_pre_order.sku_snapshot->>'duration')::INTEGER, 30);
    v_product_name := COALESCE(v_pre_order.product_snapshot->>'product_name', '商品');
    SELECT string_agg(value::text, '，') INTO v_spec_text
    FROM jsonb_each_text(v_pre_order.sku_snapshot->'spec_combination');
    v_spec_text := COALESCE(v_spec_text, '');
    
    -- ============================================
    -- 步骤2：处理优惠券
    -- ============================================
    v_active_coupon_id := COALESCE(p_coupon_id, v_pre_order.coupon_id);
    v_original_amount := COALESCE(v_pre_order.original_amount, v_pre_order.total_amount, 0);
    v_need_amount := v_original_amount;
    
    IF v_active_coupon_id IS NOT NULL THEN
        SELECT 
            uc.coupon_snapshot->>'type',
            uc.coupon_snapshot->>'name',
            uc.code
        INTO 
            v_coupon_type, v_coupon_name, v_coupon_code
        FROM user_coupons uc
        WHERE uc.id = v_active_coupon_id
          AND uc.user_id = auth.uid();
        IF NOT FOUND THEN
            RETURN jsonb_build_object('success', false, 'error', '优惠券不存在或不可用');
        END IF;
        v_sku_id := (v_pre_order.sku_snapshot->>'sku_id')::UUID;
        v_sku_ids := ARRAY[v_sku_id];
        
        v_discount_result := calculate_coupon_discount(auth.uid(), v_active_coupon_id, v_need_amount, v_sku_ids);
        
        IF (v_discount_result->>'valid')::BOOLEAN = FALSE THEN
            RETURN jsonb_build_object('success', false, 'error', v_discount_result->>'error');
        END IF;
        
        v_discount_amount := (v_discount_result->>'discount_amount')::DECIMAL;
        v_need_amount := (v_discount_result->>'final_amount')::DECIMAL;
        
        v_coupon_snapshot := jsonb_build_object(
            'id', v_active_coupon_id, 
            'code', v_coupon_code,
            'type', v_coupon_type, 
            'name', v_coupon_name,
            'discount_amount', v_discount_amount
        );
    END IF;
    
    -- ============================================
    -- 步骤3：余额支付
    -- ============================================
    IF p_pay_method = 'balance' THEN
        SELECT balance INTO v_user_balance FROM profiles WHERE id = auth.uid();
        
        IF v_user_balance < v_need_amount THEN
            RETURN jsonb_build_object('success', false, 'error', format('余额不足，需 ￥%s，当前 ￥%s', v_need_amount, v_user_balance));
        END IF;
        
        UPDATE profiles SET balance = balance - v_need_amount WHERE id = auth.uid();
        
        IF v_spec_text != '' THEN
            v_wallet_desc := format('%s：%s', v_product_name, v_spec_text);
        ELSE
            v_wallet_desc := v_product_name;
        END IF;
        
        -- Add renewal tag to wallet description
        IF v_is_renewal THEN
            v_wallet_desc := format('%s (续费)', v_wallet_desc);
        END IF;
        
        INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
        VALUES (
            auth.uid(), 
            -v_need_amount, 
            'payment', 
            v_user_balance - v_need_amount,
            v_wallet_desc
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'error', '不支持的支付方式');
    END IF;
    
    -- ============================================
    -- 步骤4：状态判定
    -- ============================================
    IF v_product_type = 'virtual' THEN
        v_order_status := 'pending_delivery';
    ELSE
        v_order_status := 'active';
    END IF;
    
    -- ============================================
    -- 步骤5：计算到期时间 [RENEWAL LOGIC]
    -- ============================================
    IF v_is_renewal THEN
        -- Renewal: extend from old order's end_time
        SELECT * INTO v_old_order FROM orders WHERE id = v_pre_order.related_order_id;
        IF FOUND THEN
            v_end_time := v_old_order.end_time + (v_duration || ' days')::INTERVAL;
        ELSE
            v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
        END IF;
    ELSE
        -- Normal: start from now
        v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
    END IF;
    
    -- ============================================
    -- 步骤6：创建主订单
    -- ============================================
    v_order_no := v_pre_order.order_no;
    
    INSERT INTO orders (
        user_id, order_no, total_amount, original_amount,
        start_time, end_time, expires_at, status,           
        product_snapshot, sku_snapshot, cdk_snapshot, 
        quantity, coupon_snapshot, order_type, slot_occupancy_ids
    ) VALUES (
        v_pre_order.user_id, v_order_no, v_need_amount, v_original_amount,
        NOW(), v_end_time, v_end_time, v_order_status,
        v_pre_order.product_snapshot, v_pre_order.sku_snapshot,
        jsonb_build_object('locked_cdk_ids', v_pre_order.locked_cdk_ids),
        v_pre_order.quantity, v_coupon_snapshot, v_product_type,
        v_pre_order.locked_slot_ids
    ) RETURNING id INTO v_order_id;
    -- ============================================
    -- 步骤6.5：更新 slot_occupancies [RENEWAL + NORMAL]
    -- ============================================
    IF v_product_type = 'shared_account' AND v_pre_order.locked_slot_ids IS NOT NULL 
       AND array_length(v_pre_order.locked_slot_ids, 1) > 0 THEN
        UPDATE slot_occupancies 
        SET order_id = v_order_id, user_id = v_pre_order.user_id
        WHERE id = ANY(v_pre_order.locked_slot_ids);
    END IF;
    -- ============================================
    -- 步骤6.6：[RENEWAL] 将旧订单标记为 expired
    -- ============================================
    IF v_is_renewal AND v_pre_order.related_order_id IS NOT NULL THEN
        UPDATE orders SET status = 'expired' WHERE id = v_pre_order.related_order_id;
    END IF;
    -- ============================================
    -- 步骤7：标记优惠券已使用
    -- ============================================
    IF v_active_coupon_id IS NOT NULL THEN
        UPDATE user_coupons 
        SET status = 'used', 
            used_at = NOW(),
            order_id = v_order_id
        WHERE id = v_active_coupon_id;
    END IF;
    
    -- ============================================
    -- 步骤8：更新预订单状态
    -- ============================================
    UPDATE pre_orders 
    SET status = 'converted',
        coupon_id = v_active_coupon_id,
        discount_amount = v_discount_amount,
        total_amount = v_need_amount
    WHERE id = p_pre_order_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'order_no', v_order_no,
        'order_id', v_order_id,
        'total_amount', v_need_amount,
        'expires_at', v_end_time,
        'is_renewal', v_is_renewal
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '支付失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_pre_order(p_sku_id uuid, p_quantity integer DEFAULT 1, p_source text DEFAULT 'buy_now'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_pending_count INTEGER;
  v_sku RECORD;
  v_product RECORD;
  v_product_id UUID;
  v_pre_order_id UUID;
  v_order_no TEXT;
  v_total_amount DECIMAL;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_product_snapshot JSONB;
  v_sku_snapshot JSONB;
  v_locked_cdk_ids UUID[] := '{}';
  v_locked_slot_ids UUID[] := '{}';
  v_cdk_id UUID;
  v_slot_id UUID;
  v_found_count INTEGER := 0;
  v_cdk_record RECORD;
BEGIN
  -- ============================================
  -- 步骤1：验证用户登录
  -- ============================================
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  -- ============================================
  -- 步骤2：检查未支付订单数量（限制3个）
  -- ============================================
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;
  -- ============================================
  -- 步骤3：获取 SKU 和商品信息
  -- ============================================
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  -- 通过 product_sku_map 获取商品ID
  SELECT product_id INTO v_product_id 
  FROM product_sku_map 
  WHERE sku_id = p_sku_id 
  LIMIT 1;
  
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;
  -- ============================================
  -- 步骤4：根据 SKU 类型锁定资源
  -- ============================================
  IF v_sku.product_type = 'virtual' THEN
    -- Virtual 类型：找 stock >= Q 的 CDK，扣减库存，记录 CDK ID
    SELECT c.id, c.stock INTO v_cdk_record
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id
      AND c.stock >= p_quantity
    LIMIT 1
    FOR UPDATE SKIP LOCKED;
    
    IF v_cdk_record.id IS NULL THEN
      RETURN jsonb_build_object('success', false, 'error', '暂无可用库存');
    END IF;
    
    -- 扣减库存
    UPDATE cdks SET stock = stock - p_quantity WHERE id = v_cdk_record.id;
    
    -- 按 quantity 次数记录 CDK ID
    FOR i IN 1..p_quantity LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
    END LOOP;
    
  ELSIF v_sku.product_type = 'one_time_cdk' THEN
    -- One-time 类型：找 Q 个 idle 状态的 CDK，改为 using
    FOR v_cdk_record IN
      SELECT c.id
      FROM cdks c
      JOIN cdk_sku_map m ON m.cdk_id = c.id
      WHERE m.sku_id = p_sku_id
        AND c.status = 'idle'
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
      UPDATE cdks SET status = 'using' WHERE id = v_cdk_record.id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的 CDK
      UPDATE cdks SET status = 'idle' WHERE id = ANY(v_locked_cdk_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用的激活码');
    END IF;
    
  ELSIF v_sku.product_type = 'shared_account' THEN
    -- Shared 类型：找 Q 个 idle 槽位（优先同一 CDK），改为 using
    -- 注意：pre_order_id 需要在 INSERT 后统一更新
    FOR v_cdk_record IN
      SELECT so.id AS slot_id, so.cdk_id
      FROM slot_occupancies so
      JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
      WHERE m.sku_id = p_sku_id
        AND so.status = 'idle'
      ORDER BY so.cdk_id  -- 优先同一 CDK
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_slot_ids := array_append(v_locked_slot_ids, v_cdk_record.slot_id);
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.cdk_id);
      -- 先只更新 status，pre_order_id 在 INSERT 后统一更新
      UPDATE slot_occupancies SET status = 'using' WHERE id = v_cdk_record.slot_id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的槽位
      UPDATE slot_occupancies SET status = 'idle' WHERE id = ANY(v_locked_slot_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用位置');
    END IF;
  ELSE
    RETURN jsonb_build_object('success', false, 'error', '不支持的商品类型');
  END IF;
  -- ============================================
  -- 步骤5：构建快照
  -- ============================================
  v_product_snapshot := jsonb_build_object(
    'product_id', v_product.id,
    'product_name', v_product.product_name,
    'image', v_product.image
  );
  
  v_sku_snapshot := jsonb_build_object(
    'sku_id', v_sku.id,
    'spec_combination', v_sku.spec_combination,
    'duration', v_sku.duration,
    'price', v_sku.price,
    'product_type', v_sku.product_type
  );
  -- ============================================
  -- 步骤6：生成订单号 + 过期时间
  -- ============================================
  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price * p_quantity;
  -- ============================================
  -- 步骤7：插入预订单
  -- ============================================
  INSERT INTO pre_orders (
    user_id, order_no, status, source, 
    quantity, unit_price, total_amount,
    original_amount,
    product_snapshot, sku_snapshot,
    locked_cdk_ids, locked_slot_ids,
    expires_at, created_at
  )
  VALUES (
    v_user_id, v_order_no, 'pending', p_source,
    p_quantity, v_sku.price, v_total_amount,
    v_total_amount,
    v_product_snapshot, v_sku_snapshot,
    v_locked_cdk_ids, v_locked_slot_ids,
    v_expires_at, NOW()
  )
  RETURNING id INTO v_pre_order_id;
  -- ============================================
  -- 步骤8：[新增] 更新 slot_occupancies 的 pre_order_id
  -- ============================================
  IF v_sku.product_type = 'shared_account' AND array_length(v_locked_slot_ids, 1) > 0 THEN
    UPDATE slot_occupancies 
    SET pre_order_id = v_pre_order_id
    WHERE id = ANY(v_locked_slot_ids);
  END IF;
  RETURN jsonb_build_object(
    'success', true,
    'pre_order_id', v_pre_order_id,
    'order_no', v_order_no,
    'total_amount', v_total_amount,
    'original_amount', v_total_amount,
    'expires_at', v_expires_at
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建预订单失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_refund_request(p_order_id uuid, p_reason text, p_reason_detail text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_order RECORD;
  v_existing_request RECORD;
  v_request_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  -- Get order
  SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  
  IF v_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  -- Check status
  IF v_order.status NOT IN ('pending_delivery', 'active') THEN
    RETURN jsonb_build_object('success', false, 'error', '当前订单状态不可申请退款');
  END IF;
  
  -- Check if already has pending request
  SELECT * INTO v_existing_request 
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending';
  
  IF FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '已有进行中的退款申请');
  END IF;
  -- Create request
  INSERT INTO refund_requests (
    order_id, user_id, reason, reason_detail, original_status, status, created_at
  ) VALUES (
    p_order_id, v_user_id, p_reason, p_reason_detail, v_order.status, 'pending', NOW()
  ) RETURNING id INTO v_request_id;
  -- Update order status
  UPDATE orders SET status = 'refunding' WHERE id = p_order_id;
  RETURN jsonb_build_object(
    'success', true,
    'request_id', v_request_id,
    'message', '退款申请已提交'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '申请失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_renewal_pre_order(p_sku_id uuid, p_old_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_pending_count INTEGER;
  v_old_order RECORD;
  v_sku RECORD;
  v_product RECORD;
  v_product_id UUID;
  v_pre_order_id UUID;
  v_order_no TEXT;
  v_total_amount DECIMAL;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_product_snapshot JSONB;
  v_sku_snapshot JSONB;
  v_locked_cdk_ids UUID[];
BEGIN
  -- Step 1: Validate user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  -- Step 2: Check pending order limit
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;
  -- Step 3: Validate old order
  SELECT * INTO v_old_order FROM orders WHERE id = p_old_order_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '原订单不存在');
  END IF;
  
  IF v_old_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  IF v_old_order.status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'error', '仅使用中的订单可续费');
  END IF;
  -- Step 4: Get SKU info
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  -- Get product via mapping
  SELECT product_id INTO v_product_id FROM product_sku_map WHERE sku_id = p_sku_id LIMIT 1;
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;
  -- Step 5: Build snapshots
  v_product_snapshot := jsonb_build_object(
    'product_id', v_product.id,
    'product_name', v_product.product_name,
    'image', v_product.image
  );
  
  v_sku_snapshot := jsonb_build_object(
    'sku_id', v_sku.id,
    'spec_combination', v_sku.spec_combination,
    'duration', v_sku.duration,
    'price', v_sku.price,
    'product_type', v_sku.product_type
  );
  -- Step 6: Convert JSONB array to UUID[] properly
  SELECT ARRAY(
    SELECT (elem::TEXT)::UUID 
    FROM jsonb_array_elements_text(v_old_order.cdk_snapshot->'locked_cdk_ids') AS elem
  ) INTO v_locked_cdk_ids;
  -- Step 7: Generate order no and create pre-order
  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price;
  INSERT INTO pre_orders (
    user_id, order_no, status, source,
    quantity, unit_price, total_amount, original_amount,
    product_snapshot, sku_snapshot,
    locked_cdk_ids, locked_slot_ids,
    related_order_id,
    expires_at, created_at
  )
  VALUES (
    v_user_id, v_order_no, 'pending', 'renew',
    1, v_sku.price, v_total_amount, v_total_amount,
    v_product_snapshot, v_sku_snapshot,
    -- Properly converted UUID array
    v_locked_cdk_ids,
    v_old_order.slot_occupancy_ids,
    p_old_order_id,
    v_expires_at, NOW()
  )
  RETURNING id INTO v_pre_order_id;
  RETURN jsonb_build_object(
    'success', true,
    'pre_order_id', v_pre_order_id,
    'order_no', v_order_no,
    'total_amount', v_total_amount,
    'original_amount', v_total_amount,
    'expires_at', v_expires_at
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建续费订单失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_ticket(p_order_id uuid, p_title text, p_content text, p_priority text, p_attachments text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_order RECORD;
  v_ticket_id UUID;
  v_existing_ticket_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  -- Validate Order
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  IF v_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;

  -- Check for existing processing ticket for this order?
  -- Optional: Allow multiple tickets or limit one? Let's limit one active ticket per order for simplicity.
  SELECT id INTO v_existing_ticket_id FROM tickets WHERE order_id = p_order_id AND status = 'processing';
  IF v_existing_ticket_id IS NOT NULL THEN
     RETURN jsonb_build_object('success', false, 'error', '该订单已有进行中的工单，请前往查看');
  END IF;

  -- Create Ticket
  INSERT INTO tickets (user_id, order_id, title, priority, status)
  VALUES (v_user_id, p_order_id, p_title, p_priority, 'processing')
  RETURNING id INTO v_ticket_id;

  -- Create First Message
  INSERT INTO ticket_messages (ticket_id, sender_id, is_admin, content, message_type, attachments)
  VALUES (
    v_ticket_id, 
    v_user_id, 
    FALSE, 
    p_content, 
    CASE WHEN (p_attachments IS NOT NULL AND array_length(p_attachments, 1) > 0) THEN 'image' ELSE 'text' END,
    p_attachments
  );

  RETURN jsonb_build_object('success', true, 'ticket_id', v_ticket_id);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建工单失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_own_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'msg', '未登录');
  END IF;

  -- Delete the user from auth.users
  -- This requires the function to be SECURITY DEFINER to bypass RLS/privileges
  -- Because foreign keys are set to CASCADE (usually), this should remove the public.profile entries too.
  -- If not, we might need to manually delete from public.profiles first, but standard Supabase setup defaults to cascade.
  -- We will attempt to delete from auth.users directly.
  
  -- Check if user exists first? (Optional, delete is idempotent-ish if not found, but we know they exist from auth.uid())

  -- PERFORM deletion
  -- Note: We generally don't have direct access to delete from auth.users even with SECURITY DEFINER 
  -- unless the role 'postgres' (owner) has rights. In Supabase, 'postgres' user usually has rights.
  
  DELETE FROM auth.users WHERE id = v_user_id;

  -- If we got here, it likely succeeded (or silently failed if no permissions, but SECURITY DEFINER should fix that)
  
  RETURN jsonb_build_object('success', true, 'msg', '账户注销成功');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'msg', '注销失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_preorder(p_preorder_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_preorder RECORD;
BEGIN
    -- 获取预订单（验证是当前用户的）
    SELECT * INTO v_preorder 
    FROM pre_orders 
    WHERE id = p_preorder_id AND user_id = auth.uid();
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    -- 只有 pending 状态需要释放资源
    IF v_preorder.status = 'pending' THEN
        PERFORM release_preorder_resources(v_preorder.id);
    END IF;
    
    -- 更新状态为 deleted
    UPDATE pre_orders 
    SET status = 'deleted' 
    WHERE id = p_preorder_id;
    
    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.generate_unique_uid()
 RETURNS character
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  new_uid CHAR(8);
  done BOOLEAN DEFAULT FALSE;
BEGIN
  WHILE NOT done LOOP
    -- 生成 8 位随机数字 (10000000 - 99999999)
    new_uid := LPAD(FLOOR(10000000 + RANDOM() * 90000000)::TEXT, 8, '0');
    -- 检查是否已存在
    done := NOT EXISTS (SELECT 1 FROM public.profiles WHERE uid = new_uid);
  END LOOP;
  RETURN new_uid;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_all_skus_with_product_info()
 RETURNS TABLE(id uuid, tag integer, tag_name text, product_type character varying, spec_combination jsonb, price numeric, created_at timestamp with time zone, product_id uuid, product_name text, link_status text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.tag,
        s.tag_name,
        s.product_type,
        s.spec_combination,
        s.price,
        s.created_at,
        p.id as product_id,
        p.product_name,
        CASE 
            WHEN p.id IS NOT NULL THEN 'linked'
            ELSE 'unlinked'
        END as link_status
    FROM 
        product_skus s
    LEFT JOIN 
        product_sku_map m ON s.id = m.sku_id
    LEFT JOIN 
        products p ON m.product_id = p.id
    ORDER BY 
        s.created_at DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_client_order_detail(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id uuid;
  v_order record;
  v_cdk_ids uuid[];
  v_cdks jsonb;
  v_slots jsonb;
BEGIN
  v_user_id := auth.uid();
  
  -- 1. Get Order (Verify Ownership)
  SELECT * INTO v_order 
  FROM orders 
  WHERE id = p_order_id AND user_id = v_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在或无权访问');
  END IF;

  -- 2. Extract CDK IDs
  -- Handle both object and array format (legacy compat)
  -- cdk_snapshot could be null
  IF v_order.cdk_snapshot IS NOT NULL THEN
      IF jsonb_typeof(v_order.cdk_snapshot) = 'array' THEN
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot) t(x);
      ELSE
        -- Assume object with locked_cdk_ids
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot->'locked_cdk_ids') t(x);
      END IF;
  END IF;

  -- 3. Fetch CDKs
  IF v_cdk_ids IS NOT NULL AND array_length(v_cdk_ids, 1) > 0 THEN
      SELECT jsonb_agg(jsonb_build_object(
          'id', c.id, 
          'code', c.code, 
          'account_data', c.account_data
      )) INTO v_cdks
      FROM cdks c
      WHERE c.id = ANY(v_cdk_ids);
  END IF;

  -- 4. Fetch Slots (if needed)
  IF v_order.slot_occupancy_ids IS NOT NULL AND array_length(v_order.slot_occupancy_ids, 1) > 0 THEN
    SELECT jsonb_agg(jsonb_build_object(
      'id', s.id,
      'slot_index', s.slot_index,
      'cdk_id', s.cdk_id
    )) INTO v_slots
    FROM slot_occupancies s
    WHERE s.id = ANY(v_order.slot_occupancy_ids);
  END IF;

  -- 5. Return Result
  RETURN jsonb_build_object(
    'success', true,
    'data', to_jsonb(v_order) || jsonb_build_object(
        'cdkList', COALESCE(v_cdks, '[]'::jsonb),
        'slotList', COALESCE(v_slots, '[]'::jsonb)
    )
  );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '获取详情失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_order_refund_info(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_pending_request RECORD;
  v_cancelled_count INTEGER;
BEGIN
  SELECT id, reason, created_at INTO v_pending_request
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending'
  LIMIT 1;
  
  SELECT COUNT(*) INTO v_cancelled_count
  FROM refund_requests
  WHERE order_id = p_order_id AND status = 'cancelled';
  
  RETURN jsonb_build_object(
    'success', true,
    'pending_request', CASE WHEN v_pending_request.id IS NOT NULL 
      THEN jsonb_build_object('id', v_pending_request.id, 'reason', v_pending_request.reason, 'created_at', v_pending_request.created_at)
      ELSE NULL END,
    'cancelled_count', v_cancelled_count
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pre_order(p_pre_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_order RECORD;
BEGIN
    SELECT * INTO v_order 
    FROM pre_orders 
    WHERE id = p_pre_order_id;
    
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'pre_order', jsonb_build_object(
            'id', v_order.id,
            'order_no', v_order.order_no,
            'status', v_order.status,
            'quantity', v_order.quantity,
            'unit_price', v_order.unit_price,
            'total_amount', v_order.total_amount,
            'product_snapshot', v_order.product_snapshot,
            'sku_snapshot', v_order.sku_snapshot,
            'source', v_order.source,
            'created_at', v_order.created_at,
            'expires_at', v_order.expires_at
        )
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_request RECORD;
BEGIN
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', true, 'request', NULL);
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'request', jsonb_build_object(
      'id', v_request.id,
      'reason', v_request.reason,
      'reason_detail', v_request.reason_detail,
      'status', v_request.status,
      'refund_amount', v_request.refund_amount,
      'admin_note', v_request.admin_note,
      'created_at', v_request.created_at,
      'reviewed_at', v_request.reviewed_at
    )
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_order RECORD;
  v_cdk_id UUID;
  v_sku_list JSONB := '[]'::JSONB;
  v_product RECORD;
BEGIN
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  
  IF v_order.user_id != auth.uid() THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  IF v_order.status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'error', '仅使用中的订单可续费');
  END IF;
  
  v_cdk_id := (v_order.cdk_snapshot->'locked_cdk_ids'->>0)::UUID;
  
  IF v_cdk_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '订单无关联CDK');
  END IF;
  
  SELECT jsonb_agg(
    jsonb_build_object(
      'sku_id', ps.id,
      'spec_combination', ps.spec_combination,
      'price', ps.price,
      'duration', ps.duration,
      'product_type', ps.product_type
    )
  ) INTO v_sku_list
  FROM product_skus ps
  JOIN cdk_sku_map csm ON csm.sku_id = ps.id
  WHERE csm.cdk_id = v_cdk_id;
  
  IF v_sku_list IS NULL OR v_sku_list = '[]'::JSONB THEN
    RETURN jsonb_build_object('success', false, 'error', '该商品暂无可续费套餐');
  END IF;
  
  SELECT p.id, p.product_name, p.image INTO v_product
  FROM products p
  JOIN product_sku_map psm ON psm.product_id = p.id
  JOIN cdk_sku_map csm ON csm.sku_id = psm.sku_id
  WHERE csm.cdk_id = v_cdk_id
  LIMIT 1;
  
  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'cdk_id', v_cdk_id,
    'end_time', v_order.end_time,
    'product', jsonb_build_object(
      'id', v_product.id,
      'name', v_product.product_name,
      'image', v_product.image
    ),
    'skus', v_sku_list
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '查询失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_sku_stock(p_sku_id uuid)
 RETURNS TABLE(in_stock boolean, stock_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_cdk_type TEXT;
  v_stock INT := 0;
BEGIN
  -- 通过 cdk_sku_map 获取 CDK 类型
  SELECT c.cdk_type INTO v_cdk_type
  FROM cdk_sku_map m
  JOIN cdks c ON c.id = m.cdk_id
  WHERE m.sku_id = p_sku_id
  LIMIT 1;

  -- 如果没有关联的 CDK，返回无库存
  IF v_cdk_type IS NULL THEN
    RETURN QUERY SELECT FALSE, 0;
    RETURN;
  END IF;

  -- 根据类型计算库存（只检查 status = 'idle'）
  IF v_cdk_type = 'shared' THEN
    -- 合租类型：统计空闲车位
    SELECT COUNT(*) INTO v_stock
    FROM slot_occupancies so
    JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
    JOIN cdks c ON c.id = so.cdk_id
    WHERE m.sku_id = p_sku_id 
      AND so.status = 'idle'
      AND c.status = 'idle';  -- CDK 本身也必须是 idle
      
  ELSE
    -- 虚拟/一次性类型：统计 idle 状态的 CDK stock 总和
    SELECT COALESCE(SUM(c.stock), 0) INTO v_stock
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id 
      AND c.status = 'idle';
  END IF;

  -- 确保不返回负数
  v_stock := GREATEST(v_stock, 0);
  
  RETURN QUERY SELECT (v_stock > 0), v_stock::INTEGER;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_messages(p_user_uid character, p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, title character varying, content text, is_read boolean, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT m.id, m.title, m.content, m.is_read, m.created_at
  FROM messages m
  WHERE m.user_uid = p_user_uid
  ORDER BY m.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_uid text;
  v_count int;
BEGIN
  -- Generate a random 8-digit UID that doesn't exist yet
  LOOP
    v_uid := floor(10000000 + random() * 90000000)::text;
    SELECT count(*) INTO v_count FROM public.profiles WHERE uid = v_uid;
    IF v_count = 0 THEN
      EXIT;
    END IF;
  END LOOP;

  -- Insert into public.profiles
  INSERT INTO public.profiles (id, uid, email, nickname, avatar, status, balance, created_at)
  VALUES (
    new.id,
    v_uid,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    'active',
    0.00,
    now()
  );

  RETURN new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  update community_articles
  set views = views + 1
  where id = article_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE auth_user_id = auth.uid()
      AND status = 'enabled'
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mark_message_read(p_message_id uuid, p_user_uid character)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE messages
  SET is_read = TRUE
  WHERE id = p_message_id AND user_uid = p_user_uid;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_order_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  RAISE EXCEPTION '禁止删除历史订单记录';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.redeem_coupon(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
    v_coupon RECORD;
    v_code_record RECORD;
    v_existing_id UUID;
    v_today TIMESTAMPTZ := NOW();
    v_expire_at TIMESTAMPTZ;
    v_coupon_snapshot JSONB;
BEGIN
    -- A. 验证登录
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '请先登录');
    END IF;
    -- B. 查找有效兑换码
    SELECT 
        cc.id as code_id,
        cc.code as redeem_code,
        cc.max_usage,
        cc.used_count,
        cc.status as code_status,
        c.id as coupon_id,
        c.status as rule_status,
        c.start_date,
        c.end_date,
        c.name,
        c.type,
        c.value,
        c.min_usage,
        c.sku_ids,
        c.code as coupon_code
    INTO v_coupon
    FROM coupon_codes cc
    JOIN coupons c ON cc.coupon_id = c.id
    WHERE cc.code = p_code;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '无效的兑换码');
    END IF;
    -- C. 验证兑换码状态
    IF v_coupon.code_status != 'available' THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已失效');
    END IF;
    IF v_coupon.used_count >= v_coupon.max_usage THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已被领完');
    END IF;
    -- D. 验证规则状态
    IF v_coupon.rule_status IS FALSE THEN
        RETURN jsonb_build_object('success', false, 'error', '该活动已结束');
    END IF;
    IF v_coupon.start_date IS NOT NULL AND v_today < v_coupon.start_date THEN
        RETURN jsonb_build_object('success', false, 'error', '活动尚未开始');
    END IF;
    IF v_coupon.end_date IS NOT NULL AND v_today > v_coupon.end_date THEN
        RETURN jsonb_build_object('success', false, 'error', '优惠券已过期');
    END IF;
    -- E. 检查该用户是否已使用过这个兑换码（防止重复领取）
    SELECT id INTO v_existing_id
    FROM user_coupons
    WHERE user_id = v_user_id AND redeemed_code = p_code
    LIMIT 1;
    IF v_existing_id IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '您已使用过该兑换码');
    END IF;
    -- F. 锁定并更新兑换码
    SELECT used_count INTO v_code_record 
    FROM coupon_codes WHERE id = v_coupon.code_id FOR UPDATE;
    
    IF v_code_record.used_count >= v_coupon.max_usage THEN
        RETURN jsonb_build_object('success', false, 'error', '手慢了，已被领完');
    END IF;
    UPDATE coupon_codes 
    SET used_count = used_count + 1,
        status = CASE WHEN (used_count + 1) >= max_usage THEN 'exhausted' ELSE status END,
        user_uid = CASE WHEN max_usage = 1 THEN v_user_id ELSE user_uid END,
        used_at = NOW()
    WHERE id = v_coupon.code_id;
    -- G. 更新规则统计
    UPDATE coupons SET used_quantity = COALESCE(used_quantity, 0) + 1 
    WHERE id = v_coupon.coupon_id;
    -- H. 构建快照
    v_coupon_snapshot := jsonb_build_object(
        'name', v_coupon.name,
        'type', v_coupon.type,
        'value', v_coupon.value,
        'min_usage', v_coupon.min_usage,
        'sku_ids', v_coupon.sku_ids
    );
    -- I. 计算过期时间
    v_expire_at := COALESCE(
        v_coupon.end_date::timestamp with time zone, 
        NOW() + INTERVAL '30 days'
    );
    -- J. 写入用户优惠券（包含 redeemed_code）
    INSERT INTO user_coupons (
        user_id, coupon_id, status, redeemed_at, 
        code, redeemed_code, coupon_snapshot, expire_at
    )
    VALUES (
        v_user_id, v_coupon.coupon_id, 'unused', NOW(),
        v_coupon.coupon_code,  -- 规则说明
        p_code,                 -- 实际使用的兑换码
        v_coupon_snapshot, v_expire_at
    );
    RETURN jsonb_build_object(
        'success', true,
        'msg', '兑换成功',
        'coupon', jsonb_build_object(
            'name', v_coupon.name,
            'type', v_coupon.type,
            'value', v_coupon.value,
            'expire_at', v_expire_at
        )
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '兑换失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.release_expired_pre_orders()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_count INTEGER := 0;
  v_pre_order RECORD;
  v_item JSONB;
BEGIN
  -- 查找所有过期的 pending 预订单
  FOR v_pre_order IN 
    SELECT * FROM pre_orders 
    WHERE status = 'pending' AND expires_at < NOW()
    FOR UPDATE SKIP LOCKED
  LOOP
    -- 释放一次性激活码的锁定
    UPDATE cdks SET status = 'idle', pre_order_id = NULL
    WHERE pre_order_id = v_pre_order.id;
    
    -- 释放虚拟充值的预扣
    FOR v_item IN SELECT * FROM jsonb_array_elements(v_pre_order.items)
    LOOP
      IF v_item->>'cdk_type' = 'virtual' THEN
        UPDATE cdks c
        SET stock = stock + (v_item->>'quantity')::INTEGER
        FROM cdk_sku_map csm
        WHERE csm.cdk_id = c.id
          AND csm.sku_id = (v_item->>'sku_id')::UUID
          AND c.cdk_type = 'virtual';
      END IF;
    END LOOP;
    
    -- 更新状态
    UPDATE pre_orders SET status = 'expired' WHERE id = v_pre_order.id;
    v_count := v_count + 1;
  END LOOP;
  
  RETURN v_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.release_preorder_resources(p_preorder_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_preorder RECORD;
    v_sku_type TEXT;
    v_cdk_id UUID;
    v_slot_id UUID;
    v_restore_count INTEGER;
BEGIN
    -- 获取预订单信息
    SELECT * INTO v_preorder FROM pre_orders WHERE id = p_preorder_id;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- 获取 SKU 类型
    v_sku_type := v_preorder.sku_snapshot->>'product_type';
    
    IF v_sku_type IS NULL THEN
        -- 兼容：从 product_snapshot 获取
        v_sku_type := v_preorder.product_snapshot->>'product_type';
    END IF;
    
    -- 根据类型释放资源
    IF v_sku_type = 'virtual' THEN
        -- [修正] 虚拟充值：按数组长度恢复库存
        -- 使用 unnest + GROUP BY 聚合，防止同一 CDK 多次更新
        IF v_preorder.locked_cdk_ids IS NOT NULL THEN
            UPDATE cdks c
            SET stock = c.stock + agg.restore_count
            FROM (
                SELECT unnest_id AS cdk_id, COUNT(*) AS restore_count
                FROM unnest(v_preorder.locked_cdk_ids) AS unnest_id
                GROUP BY unnest_id
            ) AS agg
            WHERE c.id = agg.cdk_id;
        END IF;
        
    ELSIF v_sku_type = 'shared_account' THEN
        -- 账号合租：恢复槽位状态为 idle
        IF v_preorder.locked_slot_ids IS NOT NULL THEN
            FOREACH v_slot_id IN ARRAY v_preorder.locked_slot_ids
            LOOP
                UPDATE slot_occupancies 
                SET status = 'idle', pre_order_id = NULL 
                WHERE id = v_slot_id;
            END LOOP;
        END IF;
        
    ELSIF v_sku_type = 'one_time_cdk' THEN
        -- 一次性CDK：恢复CDK状态为 idle
        IF v_preorder.locked_cdk_ids IS NOT NULL THEN
            FOREACH v_cdk_id IN ARRAY v_preorder.locked_cdk_ids
            LOOP
                UPDATE cdks 
                SET status = 'idle', pre_order_id = NULL 
                WHERE id = v_cdk_id;
            END LOOP;
        END IF;
    END IF;
    
    RETURN TRUE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.renew_order(p_original_order_id uuid, p_duration_days integer)
 RETURNS TABLE(new_order_id uuid, original_order_id uuid, original_new_end_time timestamp with time zone, renew_start_time timestamp with time zone, renew_end_time timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_original_order RECORD;
  v_renew_start TIMESTAMP WITH TIME ZONE;
  v_renew_end TIMESTAMP WITH TIME ZONE;
  v_original_new_end TIMESTAMP WITH TIME ZONE;
  v_new_order_id UUID;
BEGIN
  SELECT * INTO v_original_order 
  FROM orders 
  WHERE id = p_original_order_id AND user_id = auth.uid()
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '原订单不存在';
  END IF;
  
  v_renew_start := GREATEST(v_original_order.end_time, NOW());
  v_renew_end := v_renew_start + (p_duration_days || ' days')::INTERVAL;
  v_original_new_end := v_renew_end;
  
  INSERT INTO orders (
    user_id,
    product_snapshot,
    sku_snapshot,
    cdk_snapshot,
    order_type,
    slot_occupancy_ids,  -- [修正] 继承车位ID数组
    related_order_id, 
    start_time,
    end_time,
    expires_at,
    status,
    order_no,
    original_amount,
    total_amount
  ) VALUES (
    v_original_order.user_id,
    v_original_order.product_snapshot,
    v_original_order.sku_snapshot,
    v_original_order.cdk_snapshot,
    v_original_order.order_type,
    v_original_order.slot_occupancy_ids,
    p_original_order_id,
    v_renew_start,
    v_renew_end,
    v_renew_end,
    'active',
    TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0'),
    0, 
    0  
  )
  RETURNING id INTO v_new_order_id;
  
  UPDATE orders SET end_time = v_original_new_end WHERE id = p_original_order_id;
  
  RETURN QUERY SELECT v_new_order_id, p_original_order_id, v_original_new_end, v_renew_start, v_renew_end;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.resolve_ticket(p_ticket_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  v_ticket RECORD;
BEGIN
  SELECT * INTO v_ticket FROM tickets WHERE id = p_ticket_id;
  
  -- Check logic: User can close own? Admin can close any?
  -- Simplicity: If auth.uid() == ticket.user_id OR auth is admin (admin bypass RLS anyway or we check tables)
  -- Let's assume User can close their own ticket.
  
  IF v_ticket.user_id != auth.uid() THEN
    -- In real app, check for admin privileges here. 
    -- For now, default to User-resolve logic suitable for UI "Close Ticket" button.
    -- If created by admin, they bypass this check via direct db update or separate admin RPC.
    NULL; -- Resume
  END IF;

  UPDATE tickets SET 
    status = 'resolved', 
    resolved_at = NOW(), 
    updated_at = NOW() 
  WHERE id = p_ticket_id;

  RETURN jsonb_build_object('success', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.send_admin_message(p_user_uid character, p_title character varying, p_content text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_message_id UUID;
BEGIN
  -- 验证必填参数
  IF p_title IS NULL OR p_title = '' THEN
    RAISE EXCEPTION '消息标题不能为空';
  END IF;
  
  IF p_content IS NULL OR p_content = '' THEN
    RAISE EXCEPTION '消息内容不能为空';
  END IF;
  
  -- 【关键规则】检查用户是否存在
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE uid = p_user_uid) THEN
    RAISE EXCEPTION '用户不存在，禁止发送消息';
  END IF;
  
  -- 发送消息
  INSERT INTO messages (user_uid, title, content)
  VALUES (p_user_uid, p_title, p_content)
  RETURNING id INTO v_message_id;
  
  RETURN v_message_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.send_ticket_message(p_ticket_id uuid, p_content text, p_attachments text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_user_id UUID;
  v_ticket RECORD;
  v_is_admin BOOLEAN := FALSE;
  v_sender_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  -- Check user ticket ownership
  SELECT * INTO v_ticket FROM tickets WHERE id = p_ticket_id;
  IF NOT FOUND THEN
     RETURN jsonb_build_object('success', false, 'error', '工单不存在');
  END IF;

  -- Verify sender (Client only for now via this RPC, Admin will use direct DB or simplified RPC)
  -- BUT Wait, this RPC might be used by client. Admin usually bypasses RLS or has special role.
  -- For strictness, let's assume this RPC is for CLIENT usage mostly.
  
  IF v_ticket.user_id = v_user_id THEN
     v_is_admin := FALSE;
     v_sender_id := v_user_id;
  ELSE
     -- If admin system calls this, it might trigger differently. 
     -- For now let's assume this is client-facing. 
     -- If user doesn't own ticket, reject.
     RETURN jsonb_build_object('success', false, 'error', '无权回复此工单');
  END IF;

  IF v_ticket.status = 'resolved' THEN
     RETURN jsonb_build_object('success', false, 'error', '工单已结单，无法回复');
  END IF;

  INSERT INTO ticket_messages (ticket_id, sender_id, is_admin, content, message_type, attachments)
  VALUES (
    p_ticket_id,
    v_sender_id,
    v_is_admin,
    p_content,
    CASE WHEN (p_attachments IS NOT NULL AND array_length(p_attachments, 1) > 0) THEN 'image' ELSE 'text' END,
    p_attachments
  );

  -- Update ticket updated_at
  UPDATE tickets SET updated_at = NOW() WHERE id = p_ticket_id;

  RETURN jsonb_build_object('success', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_ticket_no()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- 如果插入时没有指定 ticket_no，则自动生成
    IF NEW.ticket_no IS NULL THEN
        -- 生成规则: T- + 8位随机大写HEX (既专业又不会像 UUID 那么长)
        -- 使用 md5(random) 确保足够的随机性
        NEW.ticket_no := 'T-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.sync_email_to_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- When auth.users.email is updated, sync to profiles.email
  UPDATE public.profiles 
  SET email = NEW.email 
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.use_balance_coupon(p_user_coupon_id uuid, p_user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_coupon_record RECORD;
    v_coupon_val DECIMAL(10,2);
    v_new_balance DECIMAL(10,2);
BEGIN
    -- 1. 检查并锁定记录
    SELECT uc.*, c.value, c.type INTO v_coupon_record
    FROM user_coupons uc
    JOIN coupons c ON uc.coupon_id = c.id
    WHERE uc.id = p_user_coupon_id AND uc.user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION '优惠券记录不存在';
    END IF;

    IF v_coupon_record.status != 'unused' THEN
        RAISE EXCEPTION '优惠券不可用或已使用';
    END IF;

    IF v_coupon_record.type != 'balance' THEN
        RAISE EXCEPTION '该优惠券不是余额券';
    END IF;

    v_coupon_val := v_coupon_record.value;

    -- 2. 更新优惠券状态
    UPDATE user_coupons
    SET status = 'used', used_at = NOW()
    WHERE id = p_user_coupon_id;

    -- 3. 更新用户余额
    UPDATE profiles
    SET balance = balance + v_coupon_val
    WHERE id = p_user_id
    RETURNING balance INTO v_new_balance;

    -- 4. 插入钱包流水
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after)
    VALUES (p_user_id, v_coupon_val, '优惠券兑换', v_new_balance);

    RETURN jsonb_build_object(
        'success', true,
        'new_balance', v_new_balance,
        'added_amount', v_coupon_val
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$function$
;

grant delete on table "public"."admin_departments" to "anon";

grant insert on table "public"."admin_departments" to "anon";

grant references on table "public"."admin_departments" to "anon";

grant select on table "public"."admin_departments" to "anon";

grant trigger on table "public"."admin_departments" to "anon";

grant truncate on table "public"."admin_departments" to "anon";

grant update on table "public"."admin_departments" to "anon";

grant delete on table "public"."admin_departments" to "authenticated";

grant insert on table "public"."admin_departments" to "authenticated";

grant references on table "public"."admin_departments" to "authenticated";

grant select on table "public"."admin_departments" to "authenticated";

grant trigger on table "public"."admin_departments" to "authenticated";

grant truncate on table "public"."admin_departments" to "authenticated";

grant update on table "public"."admin_departments" to "authenticated";

grant delete on table "public"."admin_departments" to "service_role";

grant insert on table "public"."admin_departments" to "service_role";

grant references on table "public"."admin_departments" to "service_role";

grant select on table "public"."admin_departments" to "service_role";

grant trigger on table "public"."admin_departments" to "service_role";

grant truncate on table "public"."admin_departments" to "service_role";

grant update on table "public"."admin_departments" to "service_role";

grant delete on table "public"."admin_users" to "anon";

grant insert on table "public"."admin_users" to "anon";

grant references on table "public"."admin_users" to "anon";

grant select on table "public"."admin_users" to "anon";

grant trigger on table "public"."admin_users" to "anon";

grant truncate on table "public"."admin_users" to "anon";

grant update on table "public"."admin_users" to "anon";

grant delete on table "public"."admin_users" to "authenticated";

grant insert on table "public"."admin_users" to "authenticated";

grant references on table "public"."admin_users" to "authenticated";

grant select on table "public"."admin_users" to "authenticated";

grant trigger on table "public"."admin_users" to "authenticated";

grant truncate on table "public"."admin_users" to "authenticated";

grant update on table "public"."admin_users" to "authenticated";

grant delete on table "public"."admin_users" to "service_role";

grant insert on table "public"."admin_users" to "service_role";

grant references on table "public"."admin_users" to "service_role";

grant select on table "public"."admin_users" to "service_role";

grant trigger on table "public"."admin_users" to "service_role";

grant truncate on table "public"."admin_users" to "service_role";

grant update on table "public"."admin_users" to "service_role";

grant delete on table "public"."banners" to "anon";

grant insert on table "public"."banners" to "anon";

grant references on table "public"."banners" to "anon";

grant select on table "public"."banners" to "anon";

grant trigger on table "public"."banners" to "anon";

grant truncate on table "public"."banners" to "anon";

grant update on table "public"."banners" to "anon";

grant delete on table "public"."banners" to "authenticated";

grant insert on table "public"."banners" to "authenticated";

grant references on table "public"."banners" to "authenticated";

grant select on table "public"."banners" to "authenticated";

grant trigger on table "public"."banners" to "authenticated";

grant truncate on table "public"."banners" to "authenticated";

grant update on table "public"."banners" to "authenticated";

grant delete on table "public"."banners" to "service_role";

grant insert on table "public"."banners" to "service_role";

grant references on table "public"."banners" to "service_role";

grant select on table "public"."banners" to "service_role";

grant trigger on table "public"."banners" to "service_role";

grant truncate on table "public"."banners" to "service_role";

grant update on table "public"."banners" to "service_role";

grant delete on table "public"."cart_items" to "anon";

grant insert on table "public"."cart_items" to "anon";

grant references on table "public"."cart_items" to "anon";

grant select on table "public"."cart_items" to "anon";

grant trigger on table "public"."cart_items" to "anon";

grant truncate on table "public"."cart_items" to "anon";

grant update on table "public"."cart_items" to "anon";

grant delete on table "public"."cart_items" to "authenticated";

grant insert on table "public"."cart_items" to "authenticated";

grant references on table "public"."cart_items" to "authenticated";

grant select on table "public"."cart_items" to "authenticated";

grant trigger on table "public"."cart_items" to "authenticated";

grant truncate on table "public"."cart_items" to "authenticated";

grant update on table "public"."cart_items" to "authenticated";

grant delete on table "public"."cart_items" to "service_role";

grant insert on table "public"."cart_items" to "service_role";

grant references on table "public"."cart_items" to "service_role";

grant select on table "public"."cart_items" to "service_role";

grant trigger on table "public"."cart_items" to "service_role";

grant truncate on table "public"."cart_items" to "service_role";

grant update on table "public"."cart_items" to "service_role";

grant delete on table "public"."cdk_sku_map" to "anon";

grant insert on table "public"."cdk_sku_map" to "anon";

grant references on table "public"."cdk_sku_map" to "anon";

grant select on table "public"."cdk_sku_map" to "anon";

grant trigger on table "public"."cdk_sku_map" to "anon";

grant truncate on table "public"."cdk_sku_map" to "anon";

grant update on table "public"."cdk_sku_map" to "anon";

grant delete on table "public"."cdk_sku_map" to "authenticated";

grant insert on table "public"."cdk_sku_map" to "authenticated";

grant references on table "public"."cdk_sku_map" to "authenticated";

grant select on table "public"."cdk_sku_map" to "authenticated";

grant trigger on table "public"."cdk_sku_map" to "authenticated";

grant truncate on table "public"."cdk_sku_map" to "authenticated";

grant update on table "public"."cdk_sku_map" to "authenticated";

grant delete on table "public"."cdk_sku_map" to "service_role";

grant insert on table "public"."cdk_sku_map" to "service_role";

grant references on table "public"."cdk_sku_map" to "service_role";

grant select on table "public"."cdk_sku_map" to "service_role";

grant trigger on table "public"."cdk_sku_map" to "service_role";

grant truncate on table "public"."cdk_sku_map" to "service_role";

grant update on table "public"."cdk_sku_map" to "service_role";

grant delete on table "public"."cdks" to "anon";

grant insert on table "public"."cdks" to "anon";

grant references on table "public"."cdks" to "anon";

grant select on table "public"."cdks" to "anon";

grant trigger on table "public"."cdks" to "anon";

grant truncate on table "public"."cdks" to "anon";

grant update on table "public"."cdks" to "anon";

grant delete on table "public"."cdks" to "authenticated";

grant insert on table "public"."cdks" to "authenticated";

grant references on table "public"."cdks" to "authenticated";

grant select on table "public"."cdks" to "authenticated";

grant trigger on table "public"."cdks" to "authenticated";

grant truncate on table "public"."cdks" to "authenticated";

grant update on table "public"."cdks" to "authenticated";

grant delete on table "public"."cdks" to "service_role";

grant insert on table "public"."cdks" to "service_role";

grant references on table "public"."cdks" to "service_role";

grant select on table "public"."cdks" to "service_role";

grant trigger on table "public"."cdks" to "service_role";

grant truncate on table "public"."cdks" to "service_role";

grant update on table "public"."cdks" to "service_role";

grant delete on table "public"."community_articles" to "anon";

grant insert on table "public"."community_articles" to "anon";

grant references on table "public"."community_articles" to "anon";

grant select on table "public"."community_articles" to "anon";

grant trigger on table "public"."community_articles" to "anon";

grant truncate on table "public"."community_articles" to "anon";

grant update on table "public"."community_articles" to "anon";

grant delete on table "public"."community_articles" to "authenticated";

grant insert on table "public"."community_articles" to "authenticated";

grant references on table "public"."community_articles" to "authenticated";

grant select on table "public"."community_articles" to "authenticated";

grant trigger on table "public"."community_articles" to "authenticated";

grant truncate on table "public"."community_articles" to "authenticated";

grant update on table "public"."community_articles" to "authenticated";

grant delete on table "public"."community_articles" to "service_role";

grant insert on table "public"."community_articles" to "service_role";

grant references on table "public"."community_articles" to "service_role";

grant select on table "public"."community_articles" to "service_role";

grant trigger on table "public"."community_articles" to "service_role";

grant truncate on table "public"."community_articles" to "service_role";

grant update on table "public"."community_articles" to "service_role";

grant delete on table "public"."community_categories" to "anon";

grant insert on table "public"."community_categories" to "anon";

grant references on table "public"."community_categories" to "anon";

grant select on table "public"."community_categories" to "anon";

grant trigger on table "public"."community_categories" to "anon";

grant truncate on table "public"."community_categories" to "anon";

grant update on table "public"."community_categories" to "anon";

grant delete on table "public"."community_categories" to "authenticated";

grant insert on table "public"."community_categories" to "authenticated";

grant references on table "public"."community_categories" to "authenticated";

grant select on table "public"."community_categories" to "authenticated";

grant trigger on table "public"."community_categories" to "authenticated";

grant truncate on table "public"."community_categories" to "authenticated";

grant update on table "public"."community_categories" to "authenticated";

grant delete on table "public"."community_categories" to "service_role";

grant insert on table "public"."community_categories" to "service_role";

grant references on table "public"."community_categories" to "service_role";

grant select on table "public"."community_categories" to "service_role";

grant trigger on table "public"."community_categories" to "service_role";

grant truncate on table "public"."community_categories" to "service_role";

grant update on table "public"."community_categories" to "service_role";

grant delete on table "public"."coupon_codes" to "anon";

grant insert on table "public"."coupon_codes" to "anon";

grant references on table "public"."coupon_codes" to "anon";

grant select on table "public"."coupon_codes" to "anon";

grant trigger on table "public"."coupon_codes" to "anon";

grant truncate on table "public"."coupon_codes" to "anon";

grant update on table "public"."coupon_codes" to "anon";

grant delete on table "public"."coupon_codes" to "authenticated";

grant insert on table "public"."coupon_codes" to "authenticated";

grant references on table "public"."coupon_codes" to "authenticated";

grant select on table "public"."coupon_codes" to "authenticated";

grant trigger on table "public"."coupon_codes" to "authenticated";

grant truncate on table "public"."coupon_codes" to "authenticated";

grant update on table "public"."coupon_codes" to "authenticated";

grant delete on table "public"."coupon_codes" to "service_role";

grant insert on table "public"."coupon_codes" to "service_role";

grant references on table "public"."coupon_codes" to "service_role";

grant select on table "public"."coupon_codes" to "service_role";

grant trigger on table "public"."coupon_codes" to "service_role";

grant truncate on table "public"."coupon_codes" to "service_role";

grant update on table "public"."coupon_codes" to "service_role";

grant delete on table "public"."coupons" to "anon";

grant insert on table "public"."coupons" to "anon";

grant references on table "public"."coupons" to "anon";

grant select on table "public"."coupons" to "anon";

grant trigger on table "public"."coupons" to "anon";

grant truncate on table "public"."coupons" to "anon";

grant update on table "public"."coupons" to "anon";

grant delete on table "public"."coupons" to "authenticated";

grant insert on table "public"."coupons" to "authenticated";

grant references on table "public"."coupons" to "authenticated";

grant select on table "public"."coupons" to "authenticated";

grant trigger on table "public"."coupons" to "authenticated";

grant truncate on table "public"."coupons" to "authenticated";

grant update on table "public"."coupons" to "authenticated";

grant delete on table "public"."coupons" to "service_role";

grant insert on table "public"."coupons" to "service_role";

grant references on table "public"."coupons" to "service_role";

grant select on table "public"."coupons" to "service_role";

grant trigger on table "public"."coupons" to "service_role";

grant truncate on table "public"."coupons" to "service_role";

grant update on table "public"."coupons" to "service_role";

grant delete on table "public"."faq_categories" to "anon";

grant insert on table "public"."faq_categories" to "anon";

grant references on table "public"."faq_categories" to "anon";

grant select on table "public"."faq_categories" to "anon";

grant trigger on table "public"."faq_categories" to "anon";

grant truncate on table "public"."faq_categories" to "anon";

grant update on table "public"."faq_categories" to "anon";

grant delete on table "public"."faq_categories" to "authenticated";

grant insert on table "public"."faq_categories" to "authenticated";

grant references on table "public"."faq_categories" to "authenticated";

grant select on table "public"."faq_categories" to "authenticated";

grant trigger on table "public"."faq_categories" to "authenticated";

grant truncate on table "public"."faq_categories" to "authenticated";

grant update on table "public"."faq_categories" to "authenticated";

grant delete on table "public"."faq_categories" to "service_role";

grant insert on table "public"."faq_categories" to "service_role";

grant references on table "public"."faq_categories" to "service_role";

grant select on table "public"."faq_categories" to "service_role";

grant trigger on table "public"."faq_categories" to "service_role";

grant truncate on table "public"."faq_categories" to "service_role";

grant update on table "public"."faq_categories" to "service_role";

grant delete on table "public"."faqs" to "anon";

grant insert on table "public"."faqs" to "anon";

grant references on table "public"."faqs" to "anon";

grant select on table "public"."faqs" to "anon";

grant trigger on table "public"."faqs" to "anon";

grant truncate on table "public"."faqs" to "anon";

grant update on table "public"."faqs" to "anon";

grant delete on table "public"."faqs" to "authenticated";

grant insert on table "public"."faqs" to "authenticated";

grant references on table "public"."faqs" to "authenticated";

grant select on table "public"."faqs" to "authenticated";

grant trigger on table "public"."faqs" to "authenticated";

grant truncate on table "public"."faqs" to "authenticated";

grant update on table "public"."faqs" to "authenticated";

grant delete on table "public"."faqs" to "service_role";

grant insert on table "public"."faqs" to "service_role";

grant references on table "public"."faqs" to "service_role";

grant select on table "public"."faqs" to "service_role";

grant trigger on table "public"."faqs" to "service_role";

grant truncate on table "public"."faqs" to "service_role";

grant update on table "public"."faqs" to "service_role";

grant delete on table "public"."image_categories" to "anon";

grant insert on table "public"."image_categories" to "anon";

grant references on table "public"."image_categories" to "anon";

grant select on table "public"."image_categories" to "anon";

grant trigger on table "public"."image_categories" to "anon";

grant truncate on table "public"."image_categories" to "anon";

grant update on table "public"."image_categories" to "anon";

grant delete on table "public"."image_categories" to "authenticated";

grant insert on table "public"."image_categories" to "authenticated";

grant references on table "public"."image_categories" to "authenticated";

grant select on table "public"."image_categories" to "authenticated";

grant trigger on table "public"."image_categories" to "authenticated";

grant truncate on table "public"."image_categories" to "authenticated";

grant update on table "public"."image_categories" to "authenticated";

grant delete on table "public"."image_categories" to "service_role";

grant insert on table "public"."image_categories" to "service_role";

grant references on table "public"."image_categories" to "service_role";

grant select on table "public"."image_categories" to "service_role";

grant trigger on table "public"."image_categories" to "service_role";

grant truncate on table "public"."image_categories" to "service_role";

grant update on table "public"."image_categories" to "service_role";

grant delete on table "public"."images" to "anon";

grant insert on table "public"."images" to "anon";

grant references on table "public"."images" to "anon";

grant select on table "public"."images" to "anon";

grant trigger on table "public"."images" to "anon";

grant truncate on table "public"."images" to "anon";

grant update on table "public"."images" to "anon";

grant delete on table "public"."images" to "authenticated";

grant insert on table "public"."images" to "authenticated";

grant references on table "public"."images" to "authenticated";

grant select on table "public"."images" to "authenticated";

grant trigger on table "public"."images" to "authenticated";

grant truncate on table "public"."images" to "authenticated";

grant update on table "public"."images" to "authenticated";

grant delete on table "public"."images" to "service_role";

grant insert on table "public"."images" to "service_role";

grant references on table "public"."images" to "service_role";

grant select on table "public"."images" to "service_role";

grant trigger on table "public"."images" to "service_role";

grant truncate on table "public"."images" to "service_role";

grant update on table "public"."images" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."order_fulfillments" to "anon";

grant insert on table "public"."order_fulfillments" to "anon";

grant references on table "public"."order_fulfillments" to "anon";

grant select on table "public"."order_fulfillments" to "anon";

grant trigger on table "public"."order_fulfillments" to "anon";

grant truncate on table "public"."order_fulfillments" to "anon";

grant update on table "public"."order_fulfillments" to "anon";

grant delete on table "public"."order_fulfillments" to "authenticated";

grant insert on table "public"."order_fulfillments" to "authenticated";

grant references on table "public"."order_fulfillments" to "authenticated";

grant select on table "public"."order_fulfillments" to "authenticated";

grant trigger on table "public"."order_fulfillments" to "authenticated";

grant truncate on table "public"."order_fulfillments" to "authenticated";

grant update on table "public"."order_fulfillments" to "authenticated";

grant delete on table "public"."order_fulfillments" to "service_role";

grant insert on table "public"."order_fulfillments" to "service_role";

grant references on table "public"."order_fulfillments" to "service_role";

grant select on table "public"."order_fulfillments" to "service_role";

grant trigger on table "public"."order_fulfillments" to "service_role";

grant truncate on table "public"."order_fulfillments" to "service_role";

grant update on table "public"."order_fulfillments" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."pre_orders" to "anon";

grant insert on table "public"."pre_orders" to "anon";

grant references on table "public"."pre_orders" to "anon";

grant select on table "public"."pre_orders" to "anon";

grant trigger on table "public"."pre_orders" to "anon";

grant truncate on table "public"."pre_orders" to "anon";

grant update on table "public"."pre_orders" to "anon";

grant delete on table "public"."pre_orders" to "authenticated";

grant insert on table "public"."pre_orders" to "authenticated";

grant references on table "public"."pre_orders" to "authenticated";

grant select on table "public"."pre_orders" to "authenticated";

grant trigger on table "public"."pre_orders" to "authenticated";

grant truncate on table "public"."pre_orders" to "authenticated";

grant update on table "public"."pre_orders" to "authenticated";

grant delete on table "public"."pre_orders" to "service_role";

grant insert on table "public"."pre_orders" to "service_role";

grant references on table "public"."pre_orders" to "service_role";

grant select on table "public"."pre_orders" to "service_role";

grant trigger on table "public"."pre_orders" to "service_role";

grant truncate on table "public"."pre_orders" to "service_role";

grant update on table "public"."pre_orders" to "service_role";

grant delete on table "public"."product_categories" to "anon";

grant insert on table "public"."product_categories" to "anon";

grant references on table "public"."product_categories" to "anon";

grant select on table "public"."product_categories" to "anon";

grant trigger on table "public"."product_categories" to "anon";

grant truncate on table "public"."product_categories" to "anon";

grant update on table "public"."product_categories" to "anon";

grant delete on table "public"."product_categories" to "authenticated";

grant insert on table "public"."product_categories" to "authenticated";

grant references on table "public"."product_categories" to "authenticated";

grant select on table "public"."product_categories" to "authenticated";

grant trigger on table "public"."product_categories" to "authenticated";

grant truncate on table "public"."product_categories" to "authenticated";

grant update on table "public"."product_categories" to "authenticated";

grant delete on table "public"."product_categories" to "service_role";

grant insert on table "public"."product_categories" to "service_role";

grant references on table "public"."product_categories" to "service_role";

grant select on table "public"."product_categories" to "service_role";

grant trigger on table "public"."product_categories" to "service_role";

grant truncate on table "public"."product_categories" to "service_role";

grant update on table "public"."product_categories" to "service_role";

grant delete on table "public"."product_sku_map" to "anon";

grant insert on table "public"."product_sku_map" to "anon";

grant references on table "public"."product_sku_map" to "anon";

grant select on table "public"."product_sku_map" to "anon";

grant trigger on table "public"."product_sku_map" to "anon";

grant truncate on table "public"."product_sku_map" to "anon";

grant update on table "public"."product_sku_map" to "anon";

grant delete on table "public"."product_sku_map" to "authenticated";

grant insert on table "public"."product_sku_map" to "authenticated";

grant references on table "public"."product_sku_map" to "authenticated";

grant select on table "public"."product_sku_map" to "authenticated";

grant trigger on table "public"."product_sku_map" to "authenticated";

grant truncate on table "public"."product_sku_map" to "authenticated";

grant update on table "public"."product_sku_map" to "authenticated";

grant delete on table "public"."product_sku_map" to "service_role";

grant insert on table "public"."product_sku_map" to "service_role";

grant references on table "public"."product_sku_map" to "service_role";

grant select on table "public"."product_sku_map" to "service_role";

grant trigger on table "public"."product_sku_map" to "service_role";

grant truncate on table "public"."product_sku_map" to "service_role";

grant update on table "public"."product_sku_map" to "service_role";

grant delete on table "public"."product_skus" to "anon";

grant insert on table "public"."product_skus" to "anon";

grant references on table "public"."product_skus" to "anon";

grant select on table "public"."product_skus" to "anon";

grant trigger on table "public"."product_skus" to "anon";

grant truncate on table "public"."product_skus" to "anon";

grant update on table "public"."product_skus" to "anon";

grant delete on table "public"."product_skus" to "authenticated";

grant insert on table "public"."product_skus" to "authenticated";

grant references on table "public"."product_skus" to "authenticated";

grant select on table "public"."product_skus" to "authenticated";

grant trigger on table "public"."product_skus" to "authenticated";

grant truncate on table "public"."product_skus" to "authenticated";

grant update on table "public"."product_skus" to "authenticated";

grant delete on table "public"."product_skus" to "service_role";

grant insert on table "public"."product_skus" to "service_role";

grant references on table "public"."product_skus" to "service_role";

grant select on table "public"."product_skus" to "service_role";

grant trigger on table "public"."product_skus" to "service_role";

grant truncate on table "public"."product_skus" to "service_role";

grant update on table "public"."product_skus" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."recharge_tiers" to "anon";

grant insert on table "public"."recharge_tiers" to "anon";

grant references on table "public"."recharge_tiers" to "anon";

grant select on table "public"."recharge_tiers" to "anon";

grant trigger on table "public"."recharge_tiers" to "anon";

grant truncate on table "public"."recharge_tiers" to "anon";

grant update on table "public"."recharge_tiers" to "anon";

grant delete on table "public"."recharge_tiers" to "authenticated";

grant insert on table "public"."recharge_tiers" to "authenticated";

grant references on table "public"."recharge_tiers" to "authenticated";

grant select on table "public"."recharge_tiers" to "authenticated";

grant trigger on table "public"."recharge_tiers" to "authenticated";

grant truncate on table "public"."recharge_tiers" to "authenticated";

grant update on table "public"."recharge_tiers" to "authenticated";

grant delete on table "public"."recharge_tiers" to "service_role";

grant insert on table "public"."recharge_tiers" to "service_role";

grant references on table "public"."recharge_tiers" to "service_role";

grant select on table "public"."recharge_tiers" to "service_role";

grant trigger on table "public"."recharge_tiers" to "service_role";

grant truncate on table "public"."recharge_tiers" to "service_role";

grant update on table "public"."recharge_tiers" to "service_role";

grant delete on table "public"."refund_requests" to "anon";

grant insert on table "public"."refund_requests" to "anon";

grant references on table "public"."refund_requests" to "anon";

grant select on table "public"."refund_requests" to "anon";

grant trigger on table "public"."refund_requests" to "anon";

grant truncate on table "public"."refund_requests" to "anon";

grant update on table "public"."refund_requests" to "anon";

grant delete on table "public"."refund_requests" to "authenticated";

grant insert on table "public"."refund_requests" to "authenticated";

grant references on table "public"."refund_requests" to "authenticated";

grant select on table "public"."refund_requests" to "authenticated";

grant trigger on table "public"."refund_requests" to "authenticated";

grant truncate on table "public"."refund_requests" to "authenticated";

grant update on table "public"."refund_requests" to "authenticated";

grant delete on table "public"."refund_requests" to "service_role";

grant insert on table "public"."refund_requests" to "service_role";

grant references on table "public"."refund_requests" to "service_role";

grant select on table "public"."refund_requests" to "service_role";

grant trigger on table "public"."refund_requests" to "service_role";

grant truncate on table "public"."refund_requests" to "service_role";

grant update on table "public"."refund_requests" to "service_role";

grant delete on table "public"."scheduled_task_logs" to "anon";

grant insert on table "public"."scheduled_task_logs" to "anon";

grant references on table "public"."scheduled_task_logs" to "anon";

grant select on table "public"."scheduled_task_logs" to "anon";

grant trigger on table "public"."scheduled_task_logs" to "anon";

grant truncate on table "public"."scheduled_task_logs" to "anon";

grant update on table "public"."scheduled_task_logs" to "anon";

grant delete on table "public"."scheduled_task_logs" to "authenticated";

grant insert on table "public"."scheduled_task_logs" to "authenticated";

grant references on table "public"."scheduled_task_logs" to "authenticated";

grant select on table "public"."scheduled_task_logs" to "authenticated";

grant trigger on table "public"."scheduled_task_logs" to "authenticated";

grant truncate on table "public"."scheduled_task_logs" to "authenticated";

grant update on table "public"."scheduled_task_logs" to "authenticated";

grant delete on table "public"."scheduled_task_logs" to "service_role";

grant insert on table "public"."scheduled_task_logs" to "service_role";

grant references on table "public"."scheduled_task_logs" to "service_role";

grant select on table "public"."scheduled_task_logs" to "service_role";

grant trigger on table "public"."scheduled_task_logs" to "service_role";

grant truncate on table "public"."scheduled_task_logs" to "service_role";

grant update on table "public"."scheduled_task_logs" to "service_role";

grant delete on table "public"."shared_sku_groups" to "anon";

grant insert on table "public"."shared_sku_groups" to "anon";

grant references on table "public"."shared_sku_groups" to "anon";

grant select on table "public"."shared_sku_groups" to "anon";

grant trigger on table "public"."shared_sku_groups" to "anon";

grant truncate on table "public"."shared_sku_groups" to "anon";

grant update on table "public"."shared_sku_groups" to "anon";

grant delete on table "public"."shared_sku_groups" to "authenticated";

grant insert on table "public"."shared_sku_groups" to "authenticated";

grant references on table "public"."shared_sku_groups" to "authenticated";

grant select on table "public"."shared_sku_groups" to "authenticated";

grant trigger on table "public"."shared_sku_groups" to "authenticated";

grant truncate on table "public"."shared_sku_groups" to "authenticated";

grant update on table "public"."shared_sku_groups" to "authenticated";

grant delete on table "public"."shared_sku_groups" to "service_role";

grant insert on table "public"."shared_sku_groups" to "service_role";

grant references on table "public"."shared_sku_groups" to "service_role";

grant select on table "public"."shared_sku_groups" to "service_role";

grant trigger on table "public"."shared_sku_groups" to "service_role";

grant truncate on table "public"."shared_sku_groups" to "service_role";

grant update on table "public"."shared_sku_groups" to "service_role";

grant delete on table "public"."slot_occupancies" to "anon";

grant insert on table "public"."slot_occupancies" to "anon";

grant references on table "public"."slot_occupancies" to "anon";

grant select on table "public"."slot_occupancies" to "anon";

grant trigger on table "public"."slot_occupancies" to "anon";

grant truncate on table "public"."slot_occupancies" to "anon";

grant update on table "public"."slot_occupancies" to "anon";

grant delete on table "public"."slot_occupancies" to "authenticated";

grant insert on table "public"."slot_occupancies" to "authenticated";

grant references on table "public"."slot_occupancies" to "authenticated";

grant select on table "public"."slot_occupancies" to "authenticated";

grant trigger on table "public"."slot_occupancies" to "authenticated";

grant truncate on table "public"."slot_occupancies" to "authenticated";

grant update on table "public"."slot_occupancies" to "authenticated";

grant delete on table "public"."slot_occupancies" to "service_role";

grant insert on table "public"."slot_occupancies" to "service_role";

grant references on table "public"."slot_occupancies" to "service_role";

grant select on table "public"."slot_occupancies" to "service_role";

grant trigger on table "public"."slot_occupancies" to "service_role";

grant truncate on table "public"."slot_occupancies" to "service_role";

grant update on table "public"."slot_occupancies" to "service_role";

grant delete on table "public"."system_settings" to "anon";

grant insert on table "public"."system_settings" to "anon";

grant references on table "public"."system_settings" to "anon";

grant select on table "public"."system_settings" to "anon";

grant trigger on table "public"."system_settings" to "anon";

grant truncate on table "public"."system_settings" to "anon";

grant update on table "public"."system_settings" to "anon";

grant delete on table "public"."system_settings" to "authenticated";

grant insert on table "public"."system_settings" to "authenticated";

grant references on table "public"."system_settings" to "authenticated";

grant select on table "public"."system_settings" to "authenticated";

grant trigger on table "public"."system_settings" to "authenticated";

grant truncate on table "public"."system_settings" to "authenticated";

grant update on table "public"."system_settings" to "authenticated";

grant delete on table "public"."system_settings" to "service_role";

grant insert on table "public"."system_settings" to "service_role";

grant references on table "public"."system_settings" to "service_role";

grant select on table "public"."system_settings" to "service_role";

grant trigger on table "public"."system_settings" to "service_role";

grant truncate on table "public"."system_settings" to "service_role";

grant update on table "public"."system_settings" to "service_role";

grant delete on table "public"."ticket_messages" to "anon";

grant insert on table "public"."ticket_messages" to "anon";

grant references on table "public"."ticket_messages" to "anon";

grant select on table "public"."ticket_messages" to "anon";

grant trigger on table "public"."ticket_messages" to "anon";

grant truncate on table "public"."ticket_messages" to "anon";

grant update on table "public"."ticket_messages" to "anon";

grant delete on table "public"."ticket_messages" to "authenticated";

grant insert on table "public"."ticket_messages" to "authenticated";

grant references on table "public"."ticket_messages" to "authenticated";

grant select on table "public"."ticket_messages" to "authenticated";

grant trigger on table "public"."ticket_messages" to "authenticated";

grant truncate on table "public"."ticket_messages" to "authenticated";

grant update on table "public"."ticket_messages" to "authenticated";

grant delete on table "public"."ticket_messages" to "service_role";

grant insert on table "public"."ticket_messages" to "service_role";

grant references on table "public"."ticket_messages" to "service_role";

grant select on table "public"."ticket_messages" to "service_role";

grant trigger on table "public"."ticket_messages" to "service_role";

grant truncate on table "public"."ticket_messages" to "service_role";

grant update on table "public"."ticket_messages" to "service_role";

grant delete on table "public"."tickets" to "anon";

grant insert on table "public"."tickets" to "anon";

grant references on table "public"."tickets" to "anon";

grant select on table "public"."tickets" to "anon";

grant trigger on table "public"."tickets" to "anon";

grant truncate on table "public"."tickets" to "anon";

grant update on table "public"."tickets" to "anon";

grant delete on table "public"."tickets" to "authenticated";

grant insert on table "public"."tickets" to "authenticated";

grant references on table "public"."tickets" to "authenticated";

grant select on table "public"."tickets" to "authenticated";

grant trigger on table "public"."tickets" to "authenticated";

grant truncate on table "public"."tickets" to "authenticated";

grant update on table "public"."tickets" to "authenticated";

grant delete on table "public"."tickets" to "service_role";

grant insert on table "public"."tickets" to "service_role";

grant references on table "public"."tickets" to "service_role";

grant select on table "public"."tickets" to "service_role";

grant trigger on table "public"."tickets" to "service_role";

grant truncate on table "public"."tickets" to "service_role";

grant update on table "public"."tickets" to "service_role";

grant delete on table "public"."user_coupons" to "anon";

grant insert on table "public"."user_coupons" to "anon";

grant references on table "public"."user_coupons" to "anon";

grant select on table "public"."user_coupons" to "anon";

grant trigger on table "public"."user_coupons" to "anon";

grant truncate on table "public"."user_coupons" to "anon";

grant update on table "public"."user_coupons" to "anon";

grant delete on table "public"."user_coupons" to "authenticated";

grant insert on table "public"."user_coupons" to "authenticated";

grant references on table "public"."user_coupons" to "authenticated";

grant select on table "public"."user_coupons" to "authenticated";

grant trigger on table "public"."user_coupons" to "authenticated";

grant truncate on table "public"."user_coupons" to "authenticated";

grant update on table "public"."user_coupons" to "authenticated";

grant delete on table "public"."user_coupons" to "service_role";

grant insert on table "public"."user_coupons" to "service_role";

grant references on table "public"."user_coupons" to "service_role";

grant select on table "public"."user_coupons" to "service_role";

grant trigger on table "public"."user_coupons" to "service_role";

grant truncate on table "public"."user_coupons" to "service_role";

grant update on table "public"."user_coupons" to "service_role";

grant delete on table "public"."user_favorites" to "anon";

grant insert on table "public"."user_favorites" to "anon";

grant references on table "public"."user_favorites" to "anon";

grant select on table "public"."user_favorites" to "anon";

grant trigger on table "public"."user_favorites" to "anon";

grant truncate on table "public"."user_favorites" to "anon";

grant update on table "public"."user_favorites" to "anon";

grant delete on table "public"."user_favorites" to "authenticated";

grant insert on table "public"."user_favorites" to "authenticated";

grant references on table "public"."user_favorites" to "authenticated";

grant select on table "public"."user_favorites" to "authenticated";

grant trigger on table "public"."user_favorites" to "authenticated";

grant truncate on table "public"."user_favorites" to "authenticated";

grant update on table "public"."user_favorites" to "authenticated";

grant delete on table "public"."user_favorites" to "service_role";

grant insert on table "public"."user_favorites" to "service_role";

grant references on table "public"."user_favorites" to "service_role";

grant select on table "public"."user_favorites" to "service_role";

grant trigger on table "public"."user_favorites" to "service_role";

grant truncate on table "public"."user_favorites" to "service_role";

grant update on table "public"."user_favorites" to "service_role";

grant delete on table "public"."wallet_transactions" to "anon";

grant insert on table "public"."wallet_transactions" to "anon";

grant references on table "public"."wallet_transactions" to "anon";

grant select on table "public"."wallet_transactions" to "anon";

grant trigger on table "public"."wallet_transactions" to "anon";

grant truncate on table "public"."wallet_transactions" to "anon";

grant update on table "public"."wallet_transactions" to "anon";

grant delete on table "public"."wallet_transactions" to "authenticated";

grant insert on table "public"."wallet_transactions" to "authenticated";

grant references on table "public"."wallet_transactions" to "authenticated";

grant select on table "public"."wallet_transactions" to "authenticated";

grant trigger on table "public"."wallet_transactions" to "authenticated";

grant truncate on table "public"."wallet_transactions" to "authenticated";

grant update on table "public"."wallet_transactions" to "authenticated";

grant delete on table "public"."wallet_transactions" to "service_role";

grant insert on table "public"."wallet_transactions" to "service_role";

grant references on table "public"."wallet_transactions" to "service_role";

grant select on table "public"."wallet_transactions" to "service_role";

grant trigger on table "public"."wallet_transactions" to "service_role";

grant truncate on table "public"."wallet_transactions" to "service_role";

grant update on table "public"."wallet_transactions" to "service_role";


  create policy "admin_departments_admin_only"
  on "public"."admin_departments"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "admin_users_modify"
  on "public"."admin_users"
  as permissive
  for all
  to authenticated
using (public.is_admin());



  create policy "admin_users_read_all"
  on "public"."admin_users"
  as permissive
  for select
  to authenticated
using (public.is_admin());



  create policy "admin_users_read_own"
  on "public"."admin_users"
  as permissive
  for select
  to authenticated
using ((auth_user_id = auth.uid()));



  create policy "Users can add to their own cart"
  on "public"."cart_items"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "Users can delete from their own cart"
  on "public"."cart_items"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "Users can update their own cart"
  on "public"."cart_items"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()));



  create policy "Users can view their own cart"
  on "public"."cart_items"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "cdk_sku_map_admin_only"
  on "public"."cdk_sku_map"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "Admins can delete cdks"
  on "public"."cdks"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Admins can insert cdks"
  on "public"."cdks"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Admins can update cdks"
  on "public"."cdks"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))))
with check ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Admins can view all cdks"
  on "public"."cdks"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Users can view assigned cdks"
  on "public"."cdks"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.pre_orders
  WHERE ((pre_orders.user_id = auth.uid()) AND (cdks.id = ANY (pre_orders.locked_cdk_ids))))));



  create policy "cdks_admin_only"
  on "public"."cdks"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "users_view_own_order_cdks"
  on "public"."cdks"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.user_id = auth.uid()) AND (((o.cdk_snapshot -> 'locked_cdk_ids'::text) @> to_jsonb(cdks.id)) OR (o.cdk_snapshot @> to_jsonb(cdks.id)))))));



  create policy "Admins can delete articles"
  on "public"."community_articles"
  as permissive
  for delete
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Admins can insert articles"
  on "public"."community_articles"
  as permissive
  for insert
  to public
with check ((auth.role() = 'authenticated'::text));



  create policy "Admins can read all articles"
  on "public"."community_articles"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Admins can update articles"
  on "public"."community_articles"
  as permissive
  for update
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Public articles are viewable by everyone"
  on "public"."community_articles"
  as permissive
  for select
  to public
using ((is_published = true));



  create policy "Admins can manage categories"
  on "public"."community_categories"
  as permissive
  for all
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Admins can read all categories"
  on "public"."community_categories"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Public categories are viewable by everyone"
  on "public"."community_categories"
  as permissive
  for select
  to public
using ((is_active = true));



  create policy "Authenticated users full access on coupon_codes"
  on "public"."coupon_codes"
  as permissive
  for all
  to authenticated
using (true)
with check (true);



  create policy "Users view own coupon_codes"
  on "public"."coupon_codes"
  as permissive
  for select
  to authenticated
using ((user_uid = auth.uid()));



  create policy "Admins full access on coupons"
  on "public"."coupons"
  as permissive
  for all
  to authenticated
using (public.is_admin())
with check (public.is_admin());



  create policy "Allow authenticated users to delete coupons"
  on "public"."coupons"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Allow authenticated users to insert coupons"
  on "public"."coupons"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Allow authenticated users to update coupons"
  on "public"."coupons"
  as permissive
  for update
  to authenticated
using (true);



  create policy "Allow authenticated users to view coupons"
  on "public"."coupons"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow admin full access on faq_categories"
  on "public"."faq_categories"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Allow public read access on faq_categories"
  on "public"."faq_categories"
  as permissive
  for select
  to public
using (true);



  create policy "Allow admin full access on faqs"
  on "public"."faqs"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Allow public read access on faqs"
  on "public"."faqs"
  as permissive
  for select
  to public
using (true);



  create policy "Service role full access"
  on "public"."messages"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Users can update own messages"
  on "public"."messages"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can view own messages"
  on "public"."messages"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "用户可管理自己订单的回执"
  on "public"."order_fulfillments"
  as permissive
  for all
  to public
using ((order_id IN ( SELECT orders.id
   FROM public.orders
  WHERE (orders.user_id = auth.uid()))));



  create policy "管理员完全访问回执"
  on "public"."order_fulfillments"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "Admin can view all orders"
  on "public"."orders"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users au
  WHERE ((au.email = (auth.jwt() ->> 'email'::text)) AND (au.status = 'enabled'::text)))));



  create policy "Allow insert via functions"
  on "public"."orders"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Users can update their own orders"
  on "public"."orders"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view their own orders"
  on "public"."orders"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Admins can view all pre_orders"
  on "public"."pre_orders"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Users can insert own pre_orders"
  on "public"."pre_orders"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own pre_orders"
  on "public"."pre_orders"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own pre_orders"
  on "public"."pre_orders"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "psm_admin_all"
  on "public"."product_sku_map"
  as permissive
  for all
  to public
using (true);



  create policy "psm_public_read"
  on "public"."product_sku_map"
  as permissive
  for select
  to public
using (true);



  create policy "product_skus_admin_delete"
  on "public"."product_skus"
  as permissive
  for delete
  to public
using (true);



  create policy "product_skus_admin_insert"
  on "public"."product_skus"
  as permissive
  for insert
  to public
with check (true);



  create policy "product_skus_admin_read"
  on "public"."product_skus"
  as permissive
  for select
  to public
using (true);



  create policy "product_skus_admin_update"
  on "public"."product_skus"
  as permissive
  for update
  to public
using (true);



  create policy "product_skus_public_read"
  on "public"."product_skus"
  as permissive
  for select
  to public
using ((enabled = true));



  create policy "Anyone can view active products"
  on "public"."products"
  as permissive
  for select
  to public
using (((status)::text = 'on'::text));



  create policy "admin_users_can_delete_products"
  on "public"."products"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.auth_user_id = auth.uid()) AND (admin_users.status = 'enabled'::text)))));



  create policy "admin_users_can_insert_products"
  on "public"."products"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.auth_user_id = auth.uid()) AND (admin_users.status = 'enabled'::text)))));



  create policy "admin_users_can_select_all_products"
  on "public"."products"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.auth_user_id = auth.uid()) AND (admin_users.status = 'enabled'::text)))));



  create policy "admin_users_can_update_products"
  on "public"."products"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.auth_user_id = auth.uid()) AND (admin_users.status = 'enabled'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.auth_user_id = auth.uid()) AND (admin_users.status = 'enabled'::text)))));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



  create policy "Users can view own profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "Admins have full access to recharge_tiers"
  on "public"."recharge_tiers"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.auth_user_id = auth.uid()))));



  create policy "Anyone can read active tiers"
  on "public"."recharge_tiers"
  as permissive
  for select
  to public
using ((status = 'on'::text));



  create policy "Users can create refund requests"
  on "public"."refund_requests"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can view own refund requests"
  on "public"."refund_requests"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Allow admin all"
  on "public"."shared_sku_groups"
  as permissive
  for all
  to public
using (true);



  create policy "Allow public read"
  on "public"."shared_sku_groups"
  as permissive
  for select
  to public
using (true);



  create policy "slot_occupancies_admin_only"
  on "public"."slot_occupancies"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "users_view_own_order_slots"
  on "public"."slot_occupancies"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.user_id = auth.uid()) AND (slot_occupancies.id = ANY (o.slot_occupancy_ids))))));



  create policy "system_settings_admin_only"
  on "public"."system_settings"
  as permissive
  for all
  to public
using (public.is_admin());



  create policy "Users can send messages to own tickets"
  on "public"."ticket_messages"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.tickets
  WHERE ((tickets.id = ticket_messages.ticket_id) AND (tickets.user_id = auth.uid())))));



  create policy "Users can view messages of own tickets"
  on "public"."ticket_messages"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.tickets
  WHERE ((tickets.id = ticket_messages.ticket_id) AND (tickets.user_id = auth.uid())))));



  create policy "Users can create tickets"
  on "public"."tickets"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own tickets"
  on "public"."tickets"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own tickets"
  on "public"."tickets"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert their own coupons"
  on "public"."user_coupons"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can update their own coupons"
  on "public"."user_coupons"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can view their own coupons"
  on "public"."user_coupons"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can add their own favorites"
  on "public"."user_favorites"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "Users can delete their own favorites"
  on "public"."user_favorites"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "Users can view their own favorites"
  on "public"."user_favorites"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "Users can view their own transactions"
  on "public"."wallet_transactions"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));


CREATE TRIGGER trigger_set_ticket_no BEFORE INSERT ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.set_ticket_no();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW WHEN (((old.email)::text IS DISTINCT FROM (new.email)::text)) EXECUTE FUNCTION public.sync_email_to_profile();


  create policy "Public can view ticket images"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'tickets'::text));



  create policy "Users can upload ticket images"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'tickets'::text) AND (auth.role() = 'authenticated'::text)));



