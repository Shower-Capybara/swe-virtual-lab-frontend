"use client";
import Table from "@/components/AppTable";
import StatsCard from "@/components/StatsCard";
import React from "react";

type User = {
  userId: number;
  name: string;
  email: string;
  age: number;
  location: string;
};

const mockUsers: User[] = [
  {
    userId: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    location: "New York",
  },
  {
    userId: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    age: 34,
    location: "Los Angeles",
  },
  {
    userId: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    age: 22,
    location: "Chicago",
  },
  {
    userId: 4,
    name: "David Lee",
    email: "david.lee@example.com",
    age: 29,
    location: "San Francisco",
  },
  {
    userId: 5,
    name: "Eva Green",
    email: "eva.green@example.com",
    age: 41,
    location: "Austin",
  },
  {
    userId: 6,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    age: 55,
    location: "Miami",
  },
  {
    userId: 7,
    name: "Grace Davis",
    email: "grace.davis@example.com",
    age: 38,
    location: "Seattle",
  },
  {
    userId: 8,
    name: "Henry Wilson",
    email: "henry.wilson@example.com",
    age: 30,
    location: "Denver",
  },
  {
    userId: 9,
    name: "Isla Carter",
    email: "isla.carter@example.com",
    age: 24,
    location: "Boston",
  },
  {
    userId: 10,
    name: "Jack Thompson",
    email: "jack.thompson@example.com",
    age: 36,
    location: "Los Angeles",
  },
  {
    userId: 11,
    name: "Karen Scott",
    email: "karen.scott@example.com",
    age: 50,
    location: "New York",
  },
  {
    userId: 12,
    name: "Liam Rodriguez",
    email: "liam.rodriguez@example.com",
    age: 27,
    location: "Houston",
  },
  {
    userId: 13,
    name: "Megan Evans",
    email: "megan.evans@example.com",
    age: 33,
    location: "Philadelphia",
  },
  {
    userId: 14,
    name: "Nathan Perez",
    email: "nathan.perez@example.com",
    age: 42,
    location: "San Diego",
  },
  {
    userId: 15,
    name: "Olivia Moore",
    email: "olivia.moore@example.com",
    age: 31,
    location: "Atlanta",
  },
];

function StudentStatsPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-semibold">Students stats</h1>
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
          <StatsCard title="Submitted quizzes" value={120} total={210} />
          <StatsCard title="Total quizzes" value={210} />
          <StatsCard title="New quizzes" value={120} total={210} />
        </div>
        {/* table */}
        <div className="w-full h-fit">
          <Table
            data={mockUsers}
            headers={[
              {
                key: "name",
                title: "Name",
              },
              {
                key: "userId",
                title: "ID",
              },
              {
                key: "email",
                title: "E-mail",
              },
              {
                key: "age",
                title: "Age",
              },
              {
                key: "location",
                title: "Location",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentStatsPage;
