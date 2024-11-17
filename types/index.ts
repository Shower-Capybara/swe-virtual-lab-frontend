export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  created_at: string;
}

export interface ActionResult<T> {
  error: string | null;
  data: T | null;
}

export interface QuizzesHomeStats {
  quizzes_count: number;
  submissions_count: number;
  successful_submissions_count: number;
  avg_time_spent_sec: number;
}

export interface StudentsHomeStats {
  total_students: number;
  top_students: TopStudent[];
}

export interface TopStudent {
  id: number;
  username: string;
  name: string;
  successful_submissions: number;
  total_submissions: number;
}

export interface PlatformHomeStats {
  most_popular_page: string;
  monthly_active_users_count: number;
  current_online_users_count: number;
}

export interface PlatformDistributedStatsEntry {
  day: string;
  page_views: number;
  active_users: number;
}
