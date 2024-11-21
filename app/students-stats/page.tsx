"use client";
import { getList } from "@/api/clientActions/student";
import { fetchHomePageStudentsData } from "@/api/serverActions/home";
import AppButton from "@/components/AppButton";
import Table from "@/components/AppTable";
import StatsCard from "@/components/StatsCard";
import { StudentItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function StudentStatsPage() {
  const router = useRouter();
  const [isLoadMoreShown, setIsLoadMoreShown] = useState<boolean>(true);
  const [token, setToken] = useState<CookieValueTypes>();
  useEffect(() => {
    (async () => {
      const l_token = await getCookie("swl_token");
      setToken(l_token);
    })();
  }, []);
  const skip = 0;
  const [take, setTake] = useState<number>(10);
  const { data, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: () => getList(token!, skip, take),
    enabled: !!token,
  });
  const { data: stats } = useQuery({
    queryKey: ["agg_students"],
    queryFn: () => fetchHomePageStudentsData(token!),
    enabled: !!token,
  });
  useEffect(() => {
    if (data?.data && take > data.data.length) {
      setIsLoadMoreShown(false);
    } else {
      setIsLoadMoreShown(true);
    }
  }, [data, take]);
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Students stats</h1>
      <div className="flex w-full h-full flex-1 flex-col justify-start items-start gap-y-8 pt-5">
        {/* status */}
        <div className="flex w-full flex-1 justify-between items-center gap-x-8">
          <StatsCard
            title="Top Students"
            value={
              stats?.data?.top_students.map((x) => x.name).join(", ") || "-"
            }
          />
          <StatsCard
            title="Total Students"
            value={stats?.data?.total_students || "-"}
          />
          {/* <StatsCard
            title="Average time on quiz"
            value={
              stats?.data?.avg_time_spent_sec
                ? stats.data.avg_time_spent_sec.toFixed(1) + "min."
                : 0
            }
          /> */}
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            dataKey="username"
            onRowClick={(username) =>
              router.push(`/students-stats/${username}`)
            }
            data={data?.data ? data.data : []}
            headers={[
              {
                key: "name",
                title: "Name",
              },
              {
                key: "username",
                title: "Username",
              },
              {
                key: "successful_submissions",
                title: "Successful Submissions",
              },
              {
                key: "total_submissions",
                title: "Total Submissions",
              },
              {
                key: "total_time_spent_sec",
                title: "Total time spent",
                render: (row: StudentItem) => (
                  <span>
                    {row.total_time_spent_sec
                      ? (row.total_time_spent_sec / 60).toFixed(1) + " min."
                      : "0"}
                  </span>
                ),
              },
            ]}
          />
          {isLoadMoreShown && (
            <AppButton
              text="Load more"
              onClick={() => {
                setTake((prev) => prev + 10);
                setTimeout(() => {
                  refetch();
                }, 100);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentStatsPage;
