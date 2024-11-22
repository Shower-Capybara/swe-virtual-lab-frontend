"use client";
import Image from "next/image";
import React from "react";
import AppButton from "./AppButton";
import { useRouter } from "next/navigation";

type PlatformStatsCardProps = {
  data: { title: string; value: string | number }[];
  image: string;
  title: string;
  link: string;
};

const HomePageCard: React.FC<PlatformStatsCardProps> = ({
  data,
  image,
  title,
  link,
}) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-md p-6 max-w-sm flex flex-col justify-between items-center w-full h-full">
      <div className="w-full">
        <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
        <div className="flex justify-center mb-4">
          <Image
            src={image} // Add your chart image in the public folder
            alt="Chart"
            className="h-20 w-20"
            width={80}
            height={80}
          />
        </div>
        <div className="space-y-4 pb-6">
          {data.map((item, index) => (
            <div className="flex justify-between" key={index}>
              <span className="text-gray-600 text-nowrap pr-6">
                {item.title}
              </span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <AppButton onClick={() => router.push(link)} text="View more..." />
    </div>
  );
};

export default HomePageCard;
