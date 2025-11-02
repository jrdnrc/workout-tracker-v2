export const ROUTES = {
  DASHBOARD: '/',
  SPLITS: '/splits',
  TEMPLATES: '/templates',
  EXERCISES: '/exercises',
  WORKOUTS: '/workouts',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
] as const;

export const ERROR_MESSAGES = {
  CREATE_FAILED: 'Failed to create',
  DELETE_FAILED: 'Failed to delete',
  UPDATE_FAILED: 'Failed to update',
  NETWORK_ERROR: 'Network error. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please try again.',
} as const;

