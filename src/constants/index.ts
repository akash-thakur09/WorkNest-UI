export const ROLES = {
  ADMIN: 'Admin',
  HR: 'HR',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee',
} as const;

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/',
  REGISTER: '/register',
  PROFILE: '/profile',
  APPLY_LEAVE: '/apply-leave',
  LEAVE_REQUESTS: '/leave-requests',
  DEPARTMENTS: '/departments',
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LEAVE: 'Leave',
  HALF_DAY: 'Half Day',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;
