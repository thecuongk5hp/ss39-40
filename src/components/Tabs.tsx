import React, { useState } from "react";

interface TabsProps {
  setFilter: (filter: "all" | "completed" | "incomplete") => void;
}

export default function Tabs({ setFilter }: TabsProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "completed" | "incomplete"
  >("all");

  const handleTabClick = (filter: "all" | "completed" | "incomplete") => {
    setActiveTab(filter);
    setFilter(filter);
  };

  return (
    <ul className="nav nav-tabs mb-4 pb-2">
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleTabClick("all")}
        >
          Tất cả
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => handleTabClick("completed")}
        >
          Đã hoàn thành
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${activeTab === "incomplete" ? "active" : ""}`}
          onClick={() => handleTabClick("incomplete")}
        >
          Chưa hoàn thành
        </button>
      </li>
    </ul>
  );
}