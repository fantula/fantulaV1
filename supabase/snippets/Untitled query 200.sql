-- 1. 安全添加工单号字段 (Ticket No)
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS ticket_no TEXT;
-- 2. 补全历史数据 (使用您认可的 format: T- + ID前缀)
-- 这样旧数据看起来和之前前端显示的一致，平滑过渡
UPDATE tickets 
SET ticket_no = 'T-' || UPPER(SUBSTRING(id::text, 1, 8)) 
WHERE ticket_no IS NULL;
-- 3. 添加唯一约束 (保证工单号不重复)
ALTER TABLE tickets ADD CONSTRAINT tickets_ticket_no_key UNIQUE (ticket_no);
-- 4. 创建自动生成函数 (针对新工单)
CREATE OR REPLACE FUNCTION set_ticket_no()
RETURNS TRIGGER AS $$
BEGIN
    -- 如果插入时没有指定 ticket_no，则自动生成
    IF NEW.ticket_no IS NULL THEN
        -- 生成规则: T- + 8位随机大写HEX (既专业又不会像 UUID 那么长)
        -- 使用 md5(random) 确保足够的随机性
        NEW.ticket_no := 'T-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- 5. 绑定触发器
DROP TRIGGER IF EXISTS trigger_set_ticket_no ON tickets;
CREATE TRIGGER trigger_set_ticket_no
BEFORE INSERT ON tickets
FOR EACH ROW
EXECUTE FUNCTION set_ticket_no();