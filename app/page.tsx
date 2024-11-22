import {
  fetchHomePagePlatformData,
  fetchHomePageQuizzesData,
  fetchHomePageStudentsData,
} from "@/api/serverActions/home";
import HomePageCard from "@/components/HomePageCard";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function Home() {
  const token = await getCookie("swl_token", { cookies: () => cookies() });

  const [platformData, quizzesData, studentsData] = await Promise.all([
    fetchHomePagePlatformData(token!),
    fetchHomePageQuizzesData(token!),
    fetchHomePageStudentsData(token!),
  ]);
  // console.log(platformData, quizzesData, studentsData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
      <div className="flex justify-center items-center p-6">
        <HomePageCard
          link="/platform-stats"
          title="Platform stats"
          image="/chart-icon.png"
          data={[
            {
              title: "Most popular page",
              value: platformData.data?.most_popular_page || "-",
            },
            {
              title: "Monthly active users:",
              value: platformData.data?.monthly_active_users_count || "-",
            },
            {
              title: "Current online",
              value:
                platformData.data?.current_online_users_count !== undefined
                  ? platformData.data.current_online_users_count
                  : "-",
            },
          ]}
        />
      </div>
      <div className="flex justify-center items-center p-6">
        <HomePageCard
          link="/quiz-stats"
          title="Quiz stats"
          image="/tasks-icon.png"
          data={[
            {
              title: "Successful submissions:",
              value: quizzesData.data?.successful_submissions_count || "-",
            },
            {
              title: "Average test time:",
              value: quizzesData.data?.avg_time_spent_sec
                ? `${(quizzesData.data?.avg_time_spent_sec / 60).toFixed(
                    1
                  )} min.`
                : "-",
            },
            {
              title: "Total quizzes:",
              value: quizzesData.data?.quizzes_count || "-",
            },
          ]}
        />
      </div>
      <div className="flex justify-center items-center p-6">
        <HomePageCard
          link="/students-stats"
          title="Students stats"
          image="/students-icon.png"
          data={[
            {
              title: "Total students:",
              value: studentsData.data?.total_students || "-",
            },
            {
              title: "Top 3 students:",
              value: studentsData.data?.top_students
                ? studentsData.data.top_students
                    .slice(0, 3)
                    .map((item) => item.name)
                    .join(", ")
                : "-",
            },
          ]}
        />
      </div>
    </div>
  );
}
