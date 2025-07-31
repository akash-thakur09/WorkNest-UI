# React Optimization Guide: useMemo and useCallback

## Overview

This guide demonstrates how to optimize your React application using `useMemo` and `useCallback` hooks to prevent unnecessary re-renders and improve performance.

## Key Concepts

### useMemo
- **Purpose**: Memoizes expensive calculations and prevents recalculation on every render
- **When to use**: For expensive computations, object/array creation, or derived values
- **Syntax**: `useMemo(() => value, [dependencies])`

### useCallback
- **Purpose**: Memoizes functions to prevent recreation on every render
- **When to use**: For event handlers, functions passed as props, or functions in dependency arrays
- **Syntax**: `useCallback(() => function, [dependencies])`

## Optimization Examples from Your Project

### 1. EmployeeDashboard.tsx Optimizations

#### Before:
```typescript
const employeeId = user?.id || ""
const checkInOnClick = () => {
    PostCheckInService(employeeId)
    // ... rest of function
}
const Holidays = [
    { date: "2023-12-25", name: "Christmas" },
    // ... more holidays
]
```

#### After:
```typescript
// Memoize employeeId to prevent unnecessary re-renders
const employeeId = useMemo(() => user?.id || "", [user?.id]);

// Memoize check-in function to prevent recreation
const checkInOnClick = useCallback(() => {
    PostCheckInService(employeeId)
    // ... rest of function
}, [employeeId]);

// Memoize holidays array to prevent recreation on every render
const Holidays = useMemo(() => [
    { date: "2023-12-25", name: "Christmas" },
    // ... more holidays
], []);
```

### 2. AttendanceCalendar.tsx Optimizations

#### Before:
```typescript
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const getDateCell = (day: number) => {
    // ... cell rendering logic
}
```

#### After:
```typescript
// Memoize date calculations to prevent recalculation on every render
const today = useMemo(() => new Date(), []);
const year = useMemo(() => today.getFullYear(), [today]);
const month = useMemo(() => today.getMonth(), [today]);

// Memoize date cell renderer
const getDateCell = useCallback((day: number) => {
    // ... cell rendering logic
}, [year, month, pad, getStatusForDate]);
```

### 3. Navbar.tsx Optimizations

#### Before:
```typescript
const role = user?.role || "Employee";
const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(role)
);
```

#### After:
```typescript
// Memoize role to prevent unnecessary re-renders
const role = useMemo(() => user?.role || "Employee", [user?.role]);

// Memoize filtered nav items to prevent recalculation on every render
const filteredNavItems = useMemo(() => 
    navItems.filter((item) => item.roles.includes(role)), [role]);
```

## Best Practices

### 1. When to Use useMemo

✅ **Good Use Cases:**
- Expensive calculations (sorting, filtering, complex math)
- Object/array creation that doesn't change often
- Derived values from props/state
- API response processing

```typescript
// ✅ Good: Expensive calculation
const expensiveValue = useMemo(() => {
    return data.filter(item => item.active)
               .sort((a, b) => b.priority - a.priority)
               .slice(0, 10);
}, [data]);

// ✅ Good: Object creation
const userConfig = useMemo(() => ({
    theme: user?.preferences?.theme || 'light',
    language: user?.preferences?.language || 'en'
}), [user?.preferences]);
```

❌ **Avoid:**
- Simple calculations
- Values that change on every render
- Over-memoization

```typescript
// ❌ Bad: Simple calculation
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

// ❌ Bad: Always changing value
const currentTime = useMemo(() => new Date().toLocaleTimeString(), []);
```

### 2. When to Use useCallback

✅ **Good Use Cases:**
- Event handlers passed to child components
- Functions in useEffect dependency arrays
- Functions that are expensive to create

```typescript
// ✅ Good: Event handler
const handleClick = useCallback(() => {
    console.log('Button clicked');
}, []);

// ✅ Good: Function in useEffect
const fetchData = useCallback(() => {
    // API call logic
}, [userId]);
```

❌ **Avoid:**
- Simple inline functions
- Functions that don't need to be stable

```typescript
// ❌ Bad: Simple inline function
const handleClick = useCallback(() => setCount(count + 1), [count]);

// Better as:
const handleClick = () => setCount(count + 1);
```

### 3. Dependency Arrays

**Important Rules:**
- Include all values from component scope that the function/calculation uses
- Be careful with object/array dependencies (they create new references)
- Use ESLint exhaustive-deps rule

```typescript
// ✅ Good: Proper dependencies
const filteredData = useMemo(() => 
    data.filter(item => item.category === selectedCategory), 
    [data, selectedCategory]
);

// ❌ Bad: Missing dependency
const filteredData = useMemo(() => 
    data.filter(item => item.category === selectedCategory), 
    [data] // Missing selectedCategory
);
```

## Performance Monitoring

### 1. React DevTools Profiler
- Use the Profiler to identify slow components
- Look for unnecessary re-renders
- Measure render times

### 2. Console Logging
```typescript
// Add console logs to track re-renders
const MyComponent = () => {
    console.log('MyComponent rendered');
    // ... component logic
};
```

### 3. React.memo
Use `React.memo` for components that receive the same props frequently:

```typescript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
    // Component logic
});
```

## Common Patterns

### 1. Memoizing Computed Values
```typescript
const expensiveValue = useMemo(() => {
    return heavyComputation(data);
}, [data]);
```

### 2. Memoizing Event Handlers
```typescript
const handleSubmit = useCallback((formData) => {
    submitForm(formData);
}, [submitForm]);
```

### 3. Memoizing Lists
```typescript
const renderedItems = useMemo(() => 
    items.map(item => <Item key={item.id} data={item} />), 
    [items]
);
```

### 4. Memoizing Objects
```typescript
const config = useMemo(() => ({
    theme: userTheme,
    language: userLanguage,
    notifications: userNotifications
}), [userTheme, userLanguage, userNotifications]);
```

## Advanced Optimization Techniques

### 1. Custom Hooks with Memoization
```typescript
const useExpensiveCalculation = (data) => {
    return useMemo(() => {
        return heavyCalculation(data);
    }, [data]);
};
```

### 2. Context Optimization
```typescript
const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [state, setState] = useState({});
    
    const value = useMemo(() => ({
        state,
        setState
    }), [state]);
    
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};
```

### 3. Conditional Memoization
```typescript
const conditionalValue = useMemo(() => {
    if (shouldCalculate) {
        return expensiveCalculation(data);
    }
    return defaultValue;
}, [shouldCalculate, data]);
```

## Testing Optimizations

### 1. Verify Memoization Works
```typescript
// Add console logs to verify memoization
const expensiveValue = useMemo(() => {
    console.log('Expensive calculation running');
    return heavyComputation(data);
}, [data]);
```

### 2. Performance Testing
```typescript
// Use React DevTools Profiler
// Measure render times before and after optimization
```

## Checklist for Optimization

- [ ] Identify components that re-render unnecessarily
- [ ] Find expensive calculations that can be memoized
- [ ] Look for functions that are recreated on every render
- [ ] Check for object/array creation in render
- [ ] Verify dependency arrays are correct
- [ ] Test performance improvements
- [ ] Use React DevTools to verify optimizations

## Conclusion

Remember:
1. **Don't over-optimize** - only optimize when there's a performance issue
2. **Measure first** - use React DevTools to identify bottlenecks
3. **Test thoroughly** - ensure optimizations don't break functionality
4. **Keep it simple** - sometimes the simplest solution is the best

The optimizations implemented in your project will help reduce unnecessary re-renders and improve the overall performance of your React application. 