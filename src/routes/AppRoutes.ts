export const AppRoutes = {
  HOME: '/' as const,
  SIGN_UP: '/signup' as const,
  LOGIN: '/login' as const,
  OVERVIEW: '/overview' as const,
  TASKS: '/tasks' as const,
  TASK: '/tasks/:taskId' as const,
  CALENDAR: '/calendar' as const,
  SETTINGS: '/settings' as const,
  ERROR_PAGE: '/error' as const,
  ERROR_SERVER_PAGE: '/server-error' as const,

  COLOURS: 'colours' as const,
} as const;

export type AppRoutesType = typeof AppRoutes[keyof typeof AppRoutes];