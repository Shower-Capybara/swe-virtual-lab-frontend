// components/EmptyCard.tsx
import React from "react";

const AppCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 w-full">
      {children}
    </div>
  );
};

export default AppCard;
