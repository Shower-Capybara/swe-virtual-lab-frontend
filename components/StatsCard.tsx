import React from "react";
import AppCard from "./AppCard";
import { Doughnut } from "react-chartjs-2";

interface Props {
  title: string;
  value: number | string;
  total?: number;
}

const StatsCard = ({ title, value, total }: Props) => {
  return (
    <AppCard>
      <div className="flex justify-start gap-x-6 h-20">
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-lg font-semibold text-nowrap">{title}:</h2>
          <p className="pt-4">{value}</p>
        </div>
        {total !== undefined && (
          <div className="w-full h-full flex justify-end items-center">
            <Doughnut
              data={{
                datasets: [{ data: [value, total] }],
              }}
              options={{
                backgroundColor: ["#F67C00", "#FFD669"],
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </AppCard>
  );
};

export default StatsCard;
