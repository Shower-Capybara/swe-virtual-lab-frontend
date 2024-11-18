"use client";
import { getDetail } from "@/api/clientActions/student";
import Table from "@/components/AppTable";
import StatsCard from "@/components/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
function StudentDetailsStatsPage() {
  const params = useParams();
  if (!params.username) {
    notFound();
  }
  const [token, setToken] = useState<CookieValueTypes>();
  useEffect(() => {
    (async () => {
      const l_token = await getCookie("swl_token");
      setToken(l_token);
    })();
  }, []);
  const { data } = useQuery({
    queryKey: ["students_" + params.username!],
    queryFn: () => getDetail(token!, params.username as string),
    enabled: !!token,
  });

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">
        {data?.data?.name || "Student's"} stats
      </h1>
      <div className="flex w-full h-full flex-1 flex-col justify-start items-start gap-y-8 pt-5">
        {/* status */}
        <div className="flex w-full flex-1 justify-between items-center gap-x-8">
          <StatsCard
            title="Successful submissions"
            value={data?.data?.successful_submissions || 0}
            total={data?.data?.total_submissions || 0}
          />
          <StatsCard
            title="Total submissions"
            value={data?.data?.total_submissions || "-"}
          />
          <StatsCard
            title="Average time on quiz"
            value={
              data?.data?.total_time_spent_sec
                ? data.data.total_time_spent_sec + "sec."
                : 0
            }
          />
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            data={data?.data?.quizes ? data.data.quizes : []}
            headers={[
              {
                key: "id",
                title: "ID",
              },
              {
                key: "successful_submissions_count",
                title: "successful_submissions_count",
              },
              {
                key: "total_submissions_count",
                title: "total_submissions_count",
              },
              {
                key: "avg_spent_time_seconds",
                title: "avg_spent_time_seconds",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentDetailsStatsPage;
