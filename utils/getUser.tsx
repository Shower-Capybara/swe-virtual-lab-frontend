import { User } from "@/types";
import { headers } from "next/headers";

export async function getUser(): Promise<User | null> {
  const userHeader = (await headers()).get("x-user");
  return userHeader ? (JSON.parse(userHeader) as User) : null;
}
