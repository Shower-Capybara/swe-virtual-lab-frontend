import { ActionResult } from "@/types";

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
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers,
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
