
# 🛂 Admin Authentication & Management Flow

## 1. Login Flow (Server-Side)
The login process is secured by separating credential exchange from token storage.

1.  **Client Request**:
    - User enters Email/Password.
    - `POST /api/admin/auth/login` (Note: Client does NOT call Supabase directly).
2.  **Server Processing**:
    - **Step 1: AuthN**: Server calls `supabase.auth.signInWithPassword`.
    - **Step 2: AuthZ**: Server checks `admin_users` table to ensure the user has `status = 'enabled'`.
    - **Step 3: Session**: Server returns the Session Access Token.
3.  **Client Storage**:
    - Token is stored in `useCookie` (HttpOnly recommended, or secure store).

## 2. User Management Flow (Privileged)

### Creating an Admin/User
1.  **Client Request**: `POST /api/admin/users/create` with JSON payload.
2.  **Server Verification**:
    - Verify `Authorization` header contains a valid Admin Token.
    - Check if Caller is an active Admin.
3.  **Execution (Service Role)**:
    - `adminClient.auth.admin.createUser()` is called using the **Service Key**.
    - This bypasses `captcha` and `email_confirm` limitations (if configured).
4.  **Data Consistency**:
    - A transaction-like flow ensures both `auth.users` and `admin_users` records are created.
    - If DB insertion fails, the Auth User is rolled back (deleted).

### Deleting a User
1.  **Client Request**: `POST /api/admin/users/delete`.
2.  **Server Processing**:
    - Validates Admin permissions.
    - calls `adminClient.auth.admin.deleteUser(uid)`.
    - **Cascade Delete**: Database `ON DELETE CASCADE` automatically cleans up:
      - `public.profiles`
      - `public.orders`
      - `auth.identities`
      - `admin_users` (if applicable)

## 3. Error Handling
- **Database Errors**: mapped to user-friendly messages (e.g., "Email already exists").
- **Auth Errors**: 401 (Invalid Credentials) / 403 (Forbidden/Not Admin).
