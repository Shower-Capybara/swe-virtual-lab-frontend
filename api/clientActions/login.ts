import { ActionResult, User } from "@/types";
import { jsonHeaders } from "@/utils/jsonHeaders";
import { deleteCookie, getCookie } from "cookies-next";

export async function submitLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<
  ActionResult<{
    access_token: string;
  }>
> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: jsonHeaders,
    }
  );
  const data: {
    access_token: string;
  } = await res.json();
  if (res.ok) {
    return {
      error: null,
      data,
    };
  } else {
    return {
      data: null,
      error: "Error logging in. Please try again later",
    };
  }
}

export async function refreshUser(): Promise<User | null> {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const token = await getCookie("swl_token");
  // Fetch user info (replace with actual API or user-fetching logic)
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }
  );

  // If the user is not authenticated, remove the swl_token cookie and redirect to login
  if (userRes.status === 401) {
    deleteCookie("swl_token");
    return null;
  }

  if (!userRes.ok) {
    deleteCookie("swl_token");
    return null;
  }

  // If the user is authenticated, add user to the request context
  const user = await userRes.json();
  return user;
}
