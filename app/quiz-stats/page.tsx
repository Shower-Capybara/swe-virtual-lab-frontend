"use client";
import { getList } from "@/api/clientActions/quiz";
import { fetchHomePageQuizzesData } from "@/api/serverActions/home";
import AppButton from "@/components/AppButton";
import Table from "@/components/AppTable";
import StatsCard from "@/components/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
function QuizStatsPage() {
  const router = useRouter();
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
    queryKey: ["quizzes"],
    queryFn: () => getList(token!, skip, take),
    enabled: !!token,
    staleTime: 10,
  });
  const { data: stats } = useQuery({
    queryKey: ["agg_quizzes"],
    queryFn: () => fetchHomePageQuizzesData(token!),
    enabled: !!token,
  });
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Quiz stats</h1>
      <div className="flex w-full h-full flex-1 flex-col justify-start items-start gap-y-8 pt-5">
        {/* filters */}
        {/* <div className="flex justify-start items-center gap-x-6">
          <AppSelectInput
            options={["option1", "option2", "option3"]}
            placeholder={"Quiz type"}
            onSelect={() => {}}
          />
          <AppSelectInput
            options={["option1", "option2", "option3"]}
            placeholder={"Quiz result"}
            onSelect={() => {}}
          />
          <AppSelectInput
            options={["option1", "option2", "option3"]}
            placeholder={"Quiz author"}
            onSelect={() => {}}
          />
          <AppButton text="Apply" onClick={() => {}} />
          <AppButton text="Clear" onClick={() => {}} />
        </div> */}
        {/* status */}
        <div className="flex w-full flex-1 justify-between items-center gap-x-8">
          <StatsCard
            title="Successfully submitted quizzes"
            value={stats?.data?.successful_submissions_count || 0}
            total={stats?.data?.submissions_count || 0}
          />
          <StatsCard
            title="Total quizzes"
            value={stats?.data?.quizzes_count || "-"}
          />
          <StatsCard
            title="Average time on quiz"
            value={
              stats?.data?.avg_time_spent_sec
                ? stats.data.avg_time_spent_sec.toFixed(1) + "min."
                : 0
            }
          />
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            dataKey="id"
            onRowClick={(id) => router.push(`/quiz-stats/${id}`)}
            data={data?.data ? data.data : []}
            headers={[
              {
                key: "id",
                title: "ID",
              },
              {
                key: "title",
                title: "Title",
              },
              {
                key: "questions_count",
                title: "Questions count",
              },
              {
                key: "total_submissions_count",
                title: "Total submissions",
              },
              {
                key: "successful_submissions_count",
                title: "Successful submissions",
              },
              {
                key: "avg_time_spent_sec",
                title: "Time spent(sec.)",
              },
              {
                key: "created_at",
                title: "Created at",
              },
            ]}
          />
          <AppButton
            text="Load more"
            onClick={() => {
              setTake((prev) => prev + 10);
              setTimeout(() => {
                refetch();
              }, 100);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizStatsPage;
