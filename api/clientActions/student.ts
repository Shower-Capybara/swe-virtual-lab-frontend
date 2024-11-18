import { ActionResult, StudentDetails, StudentItem } from "@/types";
import { jsonHeaders } from "@/utils/jsonHeaders";

export async function getList(
  token: string,
  skip: number,
  take: number
): Promise<ActionResult<StudentItem[]>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/students?limit=${take}&skip=${skip}`,
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
      error: "Failed to fetch students.",
    };
  }
  const data: StudentItem[] = await res.json();

  return {
    error: null,
    data,
  };
}

export async function getDetail(
  token: string,
  username: string
): Promise<ActionResult<StudentDetails>> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/students/${username}`,
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
      error: `Failed to fetch student ${username} details.`,
    };
  }
  const data: StudentDetails = await res.json();

  return {
    error: null,
    data,
  };
}
