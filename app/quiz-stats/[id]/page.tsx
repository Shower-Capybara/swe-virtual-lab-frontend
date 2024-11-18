"use client";
import { getDetail } from "@/api/clientActions/quiz";
import Table from "@/components/AppTable";
import QuestionDetailsPopup from "@/components/QuestionDetails";
import StatsCard from "@/components/StatsCard";
import { Question } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
function QuizQuestionStatsPage() {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const params = useParams();
  if (!params.id) {
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
    queryKey: ["quizzes_" + params.id!],
    queryFn: () => getDetail(token!, params.id as string),
    enabled: !!token,
  });

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Quiz stats</h1>
      <div className="flex w-full h-full flex-1 flex-col justify-start items-start gap-y-8 pt-5">
        {/* status */}
        <div className="flex w-full flex-1 justify-between items-center gap-x-8">
          <StatsCard
            title="Successful submissions"
            value={data?.data?.successful_submissions_count || 0}
            total={data?.data?.total_submissions_count || 0}
          />
          <StatsCard
            title="Total questions"
            value={data?.data?.questions_count || "-"}
          />
          <StatsCard
            title="Average time on quiz"
            value={
              data?.data?.avg_time_spent_sec
                ? data.data.avg_time_spent_sec.toFixed(1) + "min."
                : 0
            }
          />
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            data={data?.data?.questions ? data.data.questions : []}
            onRowClick={(row) => setActiveQuestion(row as Question)}
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
                key: "correct_answers",
                title: "Correct answers",
              },
              {
                key: "total_answers",
                title: "Total answers",
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
        </div>
      </div>
      {activeQuestion && (
        <QuestionDetailsPopup
          question={activeQuestion}
          onClose={() => {
            setActiveQuestion(null);
          }}
        />
      )}
    </div>
  );
}

export default QuizQuestionStatsPage;
