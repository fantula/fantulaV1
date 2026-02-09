-- Migration: admin_get_dashboard_stats
-- Synced from cloud Supabase

CREATE OR REPLACE FUNCTION public.admin_get_dashboard_stats()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  today_start timestamptz := date_trunc('day', now());
  yesterday_start timestamptz := date_trunc('day', now() - interval '1 day');
  stats jsonb;
begin
  select jsonb_build_object(
    'today_orders', (select count(*) from orders where created_at >= today_start),
    'yesterday_orders', (select count(*) from orders where created_at >= yesterday_start and created_at < today_start),
    
    'today_sales', coalesce((select sum(total_amount) from orders where created_at >= today_start and status in ('completed', 'active', 'pending_delivery')), 0),
    'yesterday_sales', coalesce((select sum(total_amount) from orders where created_at >= yesterday_start and created_at < today_start and status in ('completed', 'active', 'pending_delivery')), 0),
    
    'total_products', (select count(*) from products),
    'active_products', (select count(*) from products where status = 'on'),
    
    'today_new_users', (select count(*) from profiles where created_at >= today_start),
    'month_new_users', (select count(*) from profiles where created_at >= date_trunc('month', now())),
    
    'cdk_warning_count', (select count(*) from cdks where stock < 10 and status = 'idle'),

    'order_trend', (
      select jsonb_agg(t) from (
        select date_trunc('day', created_at) as date, count(*) as count
        from orders
        where created_at > now() - interval '7 days'
        group by 1 order by 1
      ) t
    ),
    
    'sales_trend', (
      select jsonb_agg(t) from (
        select date_trunc('day', created_at) as date, sum(total_amount) as amount
        from orders
        where created_at > now() - interval '7 days'
        and status in ('completed', 'active', 'pending_delivery')
        group by 1 order by 1
      ) t
    )
  ) into stats;
  
  return stats;
end;
$function$;
