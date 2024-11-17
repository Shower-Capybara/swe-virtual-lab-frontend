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
