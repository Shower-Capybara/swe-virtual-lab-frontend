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

export interface QuizItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  questions_count: number;
  total_submissions_count: number;
  successful_submissions_count: number;
  avg_time_spent_sec: number;
}

export interface QuizDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  questions_count: number;
  total_submissions_count: number;
  successful_submissions_count: number;
  avg_time_spent_sec: number;
  questions: Question[];
}

export interface Question {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  total_answers: number;
  correct_answers: number;
  avg_time_spent_sec: number;
}

export interface StudentItem {
  username: string;
  name: string;
  successful_submissions: number;
  total_submissions: number;
  total_time_spent_sec: number;
}

export interface StudentDetails {
  username: string;
  name: string;
  successful_submissions: number;
  total_submissions: number;
  total_time_spent_sec: number;
  quizes: {
    id: number;
    title: string;
    successful_submissions_count: number;
    total_submissions_count: number;
    avg_spent_time_seconds: number;
  }[];
}
