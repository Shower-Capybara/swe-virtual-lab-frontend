import HomePageCard from "@/components/HomePageCard";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
      <HomePageCard
        link="/platform-stats"
        title="Platform stats"
        image="/chart-icon.png"
        data={[
          { title: "Most popular page", value: "Modeling" },
          { title: "Monthly active users:", value: 96 },
          { title: "Current online", value: 13 },
        ]}
      />
      <HomePageCard
        link="/quiz-stats"
        title="Quiz stats"
        image="/tasks-icon.png"
        data={[
          { title: "Successful submissions:", value: 127 },
          { title: "Average test time:", value: "45 min." },
          { title: "Total quizzes:", value: 257 },
        ]}
      />
      <HomePageCard
        link="/students-stats"
        title="Students stats"
        image="/students-icon.png"
        data={[
          { title: "Total students:", value: 127 },
          {
            title: "Top 3 students:",
            value: "Skok Roman, Mykola Balii, Shevchuk Serhii",
          },
        ]}
      />
    </div>
  );
}
