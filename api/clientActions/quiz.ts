import { ActionResult, QuizDetails, QuizItem } from "@/types";
import { jsonHeaders } from "@/utils/jsonHeaders";

export async function getList(
  token: string,
  skip: number,
  take: number
): Promise<ActionResult<QuizItem[]>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/quizes?limit=${take}&skip=${skip}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }
  );
  if (!res.ok) {
    return {
      data: null,
      error: "Failed to fetch quizzes.",
    };
  }
  const data: QuizItem[] = await res.json();

  return {
    error: null,
    data,
  };
}

export async function getDetail(
  token: string,
  id: number | string
): Promise<ActionResult<QuizDetails>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/quizes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }
  );
  if (!res.ok) {
    return {
      data: null,
      error: `Failed to fetch quiz ${id} details.`,
    };
  }
  const data: QuizDetails = await res.json();

  return {
    error: null,
    data,
  };
}
