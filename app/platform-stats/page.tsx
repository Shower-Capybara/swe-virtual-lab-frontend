"use client";
import { fetchPlatformStatsDailyDistribution } from "@/api/clientActions/platformStats";
import AppButton from "@/components/AppButton";
import AppPlainInput from "@/components/AppPlainInput";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes, getCookie } from "cookies-next";
import { format, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function PlatformStatusPage() {
  const [token, setToken] = useState<CookieValueTypes>();
  const [datesError, setDatesError] = useState<string | null>();
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
        <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-start items-center gap-x-10">
          <AppPlainInput
            placeholder="Start date"
            type="date"
            onkeydown={(e) => e.preventDefault()}
            value={startDate}
            onChange={(e) => setStartDate(e)}
          />
          <AppPlainInput
            placeholder="End date"
            type="date"
            onkeydown={(e) => e.preventDefault()}
            value={endDate}
            onChange={(e) => {
              setEndDate(e);
            }}
          />
          <AppButton
            text="Apply"
            onClick={() => {
              console.log(new Date(startDate), new Date(endDate));

              if (
                new Date(startDate).getTime() - new Date(endDate).getTime() <
                0
              ) {
                setDatesError(null);
                refetch();
              } else {
                setDatesError(
                  "End date should be greater than start date. All dates should be filled."
                );
              }
            }}
          />
        </div>
      </div>
      {datesError !== null && (
        <span className="text-sm text-red-500">{datesError}</span>
      )}
      <div className="w-full h-full flex-1 pt-10 flex justify-center items-start">
        {data?.data && data?.data.length > 0 ? (
          <Line
            data={{
              datasets: [
                {
                  data: data?.data?.map((item) => item.active_users),
                  label: "Active users",
                  backgroundColor: "#FADD39",
                  borderColor: "#FADD39",
                },
                {
                  data: data?.data?.map((item) => item.page_views),
                  label: "Page views",
                },
              ],
              labels: data?.data?.map((item) => item.day),
            }}
          />
        ) : (
          <p>No data for given filters</p>
        )}
      </div>
    </div>
  );
}

export default PlatformStatusPage;
