import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the swl_token cookie from the request
  const swlToken = req.cookies.get("swl_token");

  // If there's no swl_token, allow access to login or redirect
  if (!swlToken) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.next(); // Allow login route
    }
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  // Fetch user info (replace with actual API or user-fetching logic)
  const userRes = await fetch("https://your-api.com/user", {
    headers: {
      Authorization: `Bearer ${swlToken}`,
    },
  });

  // If the user is not authenticated, remove the swl_token cookie and redirect to login
  if (userRes.status === 401) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("swl_token");
    return response;
  }

  // If the user is authenticated, add user to the request context
  const user = await userRes.json();

  const response = NextResponse.next();
  response.headers.set("x-user", JSON.stringify(user)); // Pass user data as a custom header
  return response;
}

export const config = {
  matcher: ["/"], // Add routes that need user authentication
};
