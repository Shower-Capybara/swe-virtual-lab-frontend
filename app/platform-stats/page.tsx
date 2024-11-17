"use client";
import AppButton from "@/components/AppButton";
import AppPlainInput from "@/components/AppPlainInput";
import React from "react";
import { Line } from "react-chartjs-2";

const data = [10, 20, 53, 12, 40, 30, 12];

function PlatformStatusPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Platform statistic</h1>
      <div className="w-full flex justify-center align-center gap-x-8 pt-5">
        <div className="flex justify-start items-center gap-x-10">
          <AppPlainInput placeholder="Start date" />
          <AppPlainInput placeholder="End date" />
        </div>
        <div className="flex justify-start items-center gap-x-10">
          <AppButton onClick={() => {}} text="Last Week" />
          <AppButton onClick={() => {}} text="Last Month" />
          <AppButton onClick={() => {}} text="Last 6 Months" />
          <AppButton onClick={() => {}} text="Last Year" />
        </div>
      </div>
      <div className="w-full h-full flex-1 pt-10 flex justify-center items-start">
        <Line
          data={{
            datasets: [{ data }],
            labels: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default PlatformStatusPage;
