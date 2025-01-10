import { motion } from "framer-motion";
import { Code2, Trophy } from "lucide-react";
import React, { useState } from "react";
import Contest from "../pages/Programming  Community/Contest/MainLayout";
import Question_Answer from "../pages/Programming  Community/MainLayout";

const ProgrammingCommunityTabs = () => {
  const [activeTab, setActiveTab] = useState("qa");

 

  const tabs = [
    {
      id: "qa",
      label: "Q&A",
      icon: <Code2 className="w-5 h-5" />,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      content: <Question_Answer />,
    },
    {
      id: "contest",
      label: "Contest",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      content: <Contest />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
        {/* Tab Navigation */}
        <div className="relative mb-8">
          <div className="flex justify-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-3 rounded-lg transition-all duration-300
                  ${activeTab === tab.id ? tab.color : "bg-gray-200"}
                  ${activeTab === tab.id ? "text-white" : "text-gray-600"}
                  ${activeTab !== tab.id && "hover:bg-gray-300"}
                  flex items-center space-x-2 font-medium
                `}>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeBg"
                    className="absolute inset-0 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgrammingCommunityTabs;
