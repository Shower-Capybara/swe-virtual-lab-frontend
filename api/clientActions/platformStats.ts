import { PlatformDistributedStatsEntry } from "@/types";
import { jsonHeaders } from "@/utils/jsonHeaders";

export async function fetchPlatformStatsDailyDistribution(
  token: string,
  startDate: string,
  endDate: string
) {
  const headers = Object.fromEntries(jsonHeaders.entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/platform_stats/daily_distribution?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }
  );
  console.log(res);

  if (!res.ok) {
    return {
      data: null,
      error: "Something went wrong while fetching quizes stats",
    };
  }
  const data: PlatformDistributedStatsEntry[] = await res.json();

  return {
    error: null,
    data,
  };
}
