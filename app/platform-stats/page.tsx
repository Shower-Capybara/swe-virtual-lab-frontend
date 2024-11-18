"use client";
import { fetchPlatformStatsDailyDistribution } from "@/api/clientActions/platformStats";
import AppButton from "@/components/AppButton";
import AppPlainInput from "@/components/AppPlainInput";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { format, formatISO, parse, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function PlatformStatusPage() {
  const [token, setToken] = useState<CookieValueTypes>();
  useEffect(() => {
    (async () => {
      const l_token = await getCookie("swl_token");
      setToken(l_token);
    })();
  }, []);
  const [startDate, setStartDate] = useState<string>(
    format(subMonths(new Date(), 1), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const { data, refetch } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: () =>
      fetchPlatformStatsDailyDistribution(token!, startDate, endDate),
    enabled: !!token,
  });
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Platform statistic</h1>
      <div className="w-full flex justify-start items-center gap-x-8 pt-5">
        <div className="flex justify-start items-center gap-x-10">
          <AppPlainInput
            placeholder="Start date"
            type="date"
            value={format(startDate, "yyyy-MM-dd")}
            onChange={(e) => setStartDate(e)}
          />
          <AppPlainInput
            placeholder="End date"
            type="date"
            value={format(endDate, "yyyy-MM-dd")}
            onChange={(e) => setEndDate(e)}
          />
          <AppButton
            text="Apply"
            onClick={() => {
              refetch();
            }}
          />
        </div>
      </div>
      <div className="w-full h-full flex-1 pt-10 flex justify-center items-start">
        <Line
          data={{
            datasets: [
              {
                data: data?.data?.map((item) => item.active_users),
                backgroundColor: "#FADD39",
                borderColor: "#FADD39",
              },
              { data: data?.data?.map((item) => item.page_views) },
            ],
            labels: data?.data?.map((item) => item.day),
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
