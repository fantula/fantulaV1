
# 🔐 Security Policy & Architecture

> Version: 1.0.0
> Last Updated: 2026-02-14

## 1. Core Philosophy (Zero Trust Frontend)
The fundamental principle of our security architecture is **"The Frontend is Untrusted"**.
We assume that any key, token, or logic exposed in the browser can and will be compromised. Therefore, **no privileged operations** are allowed to originate directly from the client.

## 2. Authentication Architecture

### 2.1 The "Two-Key" System
We utilize Supabase's dual-key system strictly:
- **Anon Key (`public`)**: Exposed to the browser. Safe for public data (e.g., viewing products) and user-specific data (via RLS).
- **Service Role Key (`private`)**: **NEVER** exposed to the browser. Stored only in server-side environment variables. Used securely by Nuxt Server Routes.

### 2.2 Admin Access Control
Admin privileges are NOT determined by the Frontend. They are enforced by:
1.  **Database RLS Policies**: The `admin_users` table and other sensitive tables have policies that strictly block access unless the request comes from a verified Admin.
2.  **Server-Side Verification**: API routes (`server/api/admin/**/*`) verify the session token and check the `admin_users` status before performing any action.

## 3. Data Protection (Row Level Security)
We have enabled RLS on **ALL** tables in the `public` schema.
- **Default Rule**: `DENY ALL` (Implicit).
- **Public Data**: `SELECT` allowed for `anon` role (e.g., Products, Articles).
- **User Data**: `SELECT/INSERT/UPDATE` allowed only for `auth.uid() = user_id`.
- **Admin Data**: Full Access allowed only for users present in `admin_users` table with `status = 'enabled'`.

## 4. Operational Security
- **Environment Variables**: Managed via `.env` (Local) and Platform Config (Production).
- **Strict Mode**: Admin operations (Create User, Ban User, Send OTP) are routed through `server/api/admin` which acts as a secure proxy.

## 5. Incident Response
In case of a suspected breach:
1.  **Rotate Service Key**: Immediate rotation via Supabase Dashboard.
2.  **Audit Logs**: Check `auth.audit_log_entries` (Supabase) and Nuxt Server Logs.
3.  **Kill Sessions**: Use `auth.admin.signOut(uid)` to force logout suspicious users.
