"use client";
import AppButton from "@/components/AppButton";
import AppSelectInput from "@/components/AppSelectInput";
import Table from "@/components/AppTable";
import StatsCard from "@/components/StatsCard";
import React from "react";

type QuizStats = {
  quizId: number;
  userId: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
};

const mockQuizStats: QuizStats[] = [
  {
    quizId: 101,
    userId: 1,
    totalQuestions: 10,
    correctAnswers: 7,
    timeTaken: 550,
  },
  {
    quizId: 102,
    userId: 2,
    totalQuestions: 12,
    correctAnswers: 9,
    timeTaken: 630,
  },
  {
    quizId: 103,
    userId: 3,
    totalQuestions: 15,
    correctAnswers: 10,
    timeTaken: 700,
  },
  {
    quizId: 104,
    userId: 4,
    totalQuestions: 10,
    correctAnswers: 5,
    timeTaken: 500,
  },
  {
    quizId: 105,
    userId: 5,
    totalQuestions: 10,
    correctAnswers: 8,
    timeTaken: 540,
  },
  {
    quizId: 106,
    userId: 6,
    totalQuestions: 8,
    correctAnswers: 6,
    timeTaken: 420,
  },
  {
    quizId: 107,
    userId: 7,
    totalQuestions: 10,
    correctAnswers: 9,
    timeTaken: 450,
  },
  {
    quizId: 108,
    userId: 8,
    totalQuestions: 10,
    correctAnswers: 4,
    timeTaken: 480,
  },
  {
    quizId: 109,
    userId: 9,
    totalQuestions: 12,
    correctAnswers: 10,
    timeTaken: 600,
  },
  {
    quizId: 110,
    userId: 10,
    totalQuestions: 14,
    correctAnswers: 11,
    timeTaken: 660,
  },
  {
    quizId: 111,
    userId: 11,
    totalQuestions: 10,
    correctAnswers: 6,
    timeTaken: 500,
  },
  {
    quizId: 112,
    userId: 12,
    totalQuestions: 15,
    correctAnswers: 12,
    timeTaken: 720,
  },
  {
    quizId: 113,
    userId: 13,
    totalQuestions: 8,
    correctAnswers: 5,
    timeTaken: 370,
  },
  {
    quizId: 114,
    userId: 14,
    totalQuestions: 10,
    correctAnswers: 7,
    timeTaken: 530,
  },
  {
    quizId: 115,
    userId: 15,
    totalQuestions: 11,
    correctAnswers: 8,
    timeTaken: 560,
  },
];

function QuizStatsPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Quiz stats</h1>
      <div className="flex w-full h-full flex-1 flex-col justify-start items-start gap-y-8 pt-5">
        {/* filters */}
        <div className="flex justify-start items-center gap-x-6">
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
        </div>
        {/* status */}
        <div className="flex w-full flex-1 justify-between items-center gap-x-8">
          <StatsCard title="Submitted quizzes" value={120} total={210} />
          <StatsCard title="Total quizzes" value={210} />
          <StatsCard title="New quizzes" value={120} total={210} />
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            data={mockQuizStats}
            headers={[
              {
                key: "quizId",
                title: "ID",
              },
              {
                key: "userId",
                title: "User Id",
              },
              {
                key: "totalQuestions",
                title: "Total questions",
              },
              {
                key: "correctAnswers",
                title: "Correct answers",
              },
              {
                key: "timeTaken",
                title: "Time taken",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizStatsPage;
