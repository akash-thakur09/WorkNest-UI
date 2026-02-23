# 🚀 Quick Reference - WorkNest UI Improvements

## 🔥 What Changed (TL;DR)

### Security Fixed ✅
- Added route protection with `<PrivateRoute>`
- Implemented role-based access control (RBAC)
- Centralized auth state in AuthContext

### UX Improved ✅
- Replaced `alert()` with `<ErrorMessage>` toast
- Added `<LoadingSpinner>` for async operations
- Added form validation and loading states

### Code Quality ✅
- Created constants file for type safety
- Added custom `useApi` hook
- Fixed logic bugs (announcement filtering)
- Enhanced error handling in axios

---

## 📦 New Components

```tsx
// Route Protection
<PrivateRoute allowedRoles={['Admin', 'HR']}>
  <YourComponent />
</PrivateRoute>

// Error Messages
{error && <ErrorMessage message={error} onClose={() => setError("")} />}

// Loading Spinners
<LoadingSpinner size="md" fullScreen />

// Empty States
<EmptyState 
  icon={<FaInbox />}
  title="No items found"
  description="Try adjusting your filters"
/>
```

---

## 🎯 New Hooks

```tsx
// API calls with loading/error states
const { data, error, isLoading, execute } = useApi<ResponseType>();

useEffect(() => {
  execute(() => fetchData());
}, []);

// Auth hook (existing, now improved)
const { user, isAuthenticated, login, logout, loading } = useAuth();
```

---

## 🔧 Constants Usage

```tsx
import { ROLES, ROUTES, STORAGE_KEYS, ATTENDANCE_STATUS } from '@/constants';

// Instead of: if (user.role === 'Admin')
if (user.role === ROLES.ADMIN) { }

// Instead of: navigate('/home')
navigate(ROUTES.HOME);

// Instead of: localStorage.getItem('token')
localStorage.getItem(STORAGE_KEYS.TOKEN);
```

---

## 🧪 Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '@/components/PrivateRoute';

it('redirects when not authenticated', () => {
  renderWithAuth(
    <PrivateRoute><div>Protected</div></PrivateRoute>,
    { isAuthenticated: false, loading: false }
  );
  expect(screen.getByText(/Redirected/)).toBeInTheDocument();
});
```

---

## 📝 Before & After Examples

### Login Page
```tsx
// ❌ Before
const handleLogin = (e) => {
  loginService({ email, password })
    .then(response => {
      login(response.user);
      localStorage.setItem("token", response.token);
      navigate("/home");
    })
    .catch(error => {
      alert("Login failed");
    });
}

// ✅ After
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await loginService({ email, password });
    login(response.user, response.token); // Handles storage internally
    navigate(ROUTES.HOME);
  } catch (error: any) {
    setError(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
}
```

### Route Protection
```tsx
// ❌ Before
<Route path="/home" element={<HomePage />} />

// ✅ After
<Route path="/home" element={
  <PrivateRoute>
    <HomePage />
  </PrivateRoute>
} />

<Route path="/leave-requests" element={
  <PrivateRoute allowedRoles={['Admin', 'HR', 'Manager']}>
    <LeaveRequests />
  </PrivateRoute>
} />
```

### Getting User Role
```tsx
// ❌ Before
const role = localStorage.getItem('role') || "Employee";

// ✅ After
const { user } = useAuth();
const role = user?.role || ROLES.EMPLOYEE;
```

---

## 🎨 UI Patterns

### Loading State
```tsx
{isLoading ? (
  <LoadingSpinner size="md" fullScreen />
) : (
  <YourContent />
)}
```

### Error State
```tsx
{error && (
  <ErrorMessage 
    message={error} 
    onClose={() => setError("")} 
  />
)}
```

### Empty State
```tsx
{items.length === 0 ? (
  <EmptyState 
    title="No items"
    description="Get started by adding your first item"
  />
) : (
  <ItemList items={items} />
)}
```

---

## 🔐 Auth Flow

```
1. User submits login form
   ↓
2. LoginPage calls loginService()
   ↓
3. On success: login(user, token)
   ↓
4. AuthContext stores in localStorage
   ↓
5. Navigate to /home
   ↓
6. PrivateRoute checks isAuthenticated
   ↓
7. If true: render HomePage
   If false: redirect to /
```

---

## 🛠️ Development Commands

```bash
# Run dev server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Build for production
npm run build
```

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `src/components/PrivateRoute.tsx` | Route protection with RBAC |
| `src/components/ErrorMessage.tsx` | Toast error notifications |
| `src/components/LoadingSpinner.tsx` | Loading indicators |
| `src/components/EmptyState.tsx` | Empty state UI |
| `src/hooks/useApi.ts` | API call hook with state |
| `src/hooks/useAuth.ts` | Auth context hook |
| `src/context/AuthContext.tsx` | Auth state management |
| `src/constants/index.ts` | Type-safe constants |
| `src/config/env.ts` | Environment validation |
| `src/services/axiosInstance.ts` | HTTP client config |

---

## 🎯 Common Tasks

### Add a new protected route
```tsx
// In App.tsx
<Route path="/new-page" element={
  <PrivateRoute allowedRoles={['Admin']}>
    <NewPage />
  </PrivateRoute>
} />
```

### Add a new constant
```tsx
// In src/constants/index.ts
export const MY_CONSTANT = {
  VALUE_1: 'value1',
  VALUE_2: 'value2',
} as const;
```

### Make an API call with loading/error
```tsx
const { data, error, isLoading, execute } = useApi<MyDataType>();

useEffect(() => {
  execute(() => myApiService());
}, []);

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
return <div>{data?.name}</div>;
```

---

## ⚠️ Important Notes

1. **Never access localStorage directly** - Use AuthContext
2. **Always use constants** - No magic strings
3. **Add loading states** - For all async operations
4. **Handle errors gracefully** - Use ErrorMessage component
5. **Protect routes** - Wrap with PrivateRoute
6. **Test critical paths** - Especially auth and RBAC

---

## 🆘 Troubleshooting

### "Missing environment variable" error
- Check `.env` file has `VITE_API_URL`
- Restart dev server after changing `.env`

### Routes not protected
- Ensure PrivateRoute is imported and used
- Check AuthContext is providing correct values

### TypeScript errors with constants
- Import from `@/constants` or `../constants`
- Use `as const` for constant objects

### Tests failing
- Check mock setup in test files
- Ensure AuthContext is provided in tests
- Use `renderWithAuth` helper for auth-dependent components

---

## 📞 Need Help?

Check these files for examples:
- `src/pages/Common/LoginPage.tsx` - Form handling
- `src/components/PrivateRoute.tsx` - Route protection
- `__test__/components/PrivateRoute.test.tsx` - Testing patterns
- `IMPROVEMENTS.md` - Detailed explanations
- `REVIEW_SUMMARY.md` - Complete overview
