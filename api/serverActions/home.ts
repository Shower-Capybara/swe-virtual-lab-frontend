import {
  ActionResult,
  PlatformHomeStats,
  QuizzesHomeStats,
  StudentsHomeStats,
} from "@/types";
import { jsonHeaders } from "@/utils/jsonHeaders";

export async function fetchHomePageQuizzesData(
  token: string
): Promise<ActionResult<QuizzesHomeStats>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/quizes/stats`,
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
      error: "Something went wrong while fetching quizes stats",
    };
  }
  const data: QuizzesHomeStats = await res.json();

  return {
    error: null,
    data,
  };
}

export async function fetchHomePageStudentsData(
  token: string
): Promise<ActionResult<StudentsHomeStats>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/students/stats`,
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
      error: "Something went wrong while fetching students stats",
    };
  }
  const data: StudentsHomeStats = await res.json();
  return {
    error: null,
    data,
  };
}

export async function fetchHomePagePlatformData(
  token: string
): Promise<ActionResult<PlatformHomeStats>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/platform_stats`,
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
      error: "Something went wrong while fetching platform stats",
    };
  }
  const data: PlatformHomeStats = await res.json();
  return {
    error: null,
    data,
  };
}
