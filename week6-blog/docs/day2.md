# DAY 2: Custom Hooks for Data Fetching

# WHAT I DID:
- Created useFetch hook for GET requests
- Created usePost hook for POST/PUT
- Created useDelete hook for DELETE
- Refactored components to use hooks

# BENEFITS:
- No repetitive useState/useEffect
- Consistent error handling
- Reusable across components
- Cleaner component code

# HOOKS CREATED:
- useFetch(url) → {data, loading, error, refetch}
- usePost(url) → {execute, loading, error}
- useDelete(url) → {execute, loading, error}

