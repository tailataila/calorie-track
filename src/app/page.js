"use client";

import { useState, useEffect } from "react";
import { FoodEntryGroup } from "./FoodEntryComponents";

export default function Home() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/userentries");
        const data = await response.json();
        setFoodEntries(data);
      } catch (error) {
        console.error("Error fetching food entries:", error);
      }
    }

    fetchData();
  }, []);

  const parseInput = (input) => {
    const match = input.match(/date:\s*(.+),\s*cal:\s*(\d+),\s*meal:\s*(.+)/i);
    if (!match) return null;

    return {
      date: match[1].trim(),
      square: { text: `${match[2].trim()} cal` },
      rectangle: { text: match[3].trim() },
    };
  };

  const handleAddEntry = async () => {
    const parsed = parseInput(inputText);
    if (parsed) {
      try {
        const response = await fetch("/api/userentries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed),
        });
        if (!response.ok) {
          throw new Error("Failed to add entry");
        }

        const result = await response.json();
        console.log("Entry added:", result);

        setFoodEntries([...foodEntries, parsed]);
        setInputText("");
      } catch (error) {
        console.error("Error adding entry:", error);
        alert("Failed to save entry to server.");
      }
    } else {
      alert("Invalid format! Please use 'date: <>, cal: <>, meal: <>' format.");
    }
  };

  const groupedEntriesByDate = foodEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const totalCaloriesByDate = (entries) => {
    return entries.reduce((sum, entry) => {
      return sum + parseInt(entry.square.text.replace(/\D/g, ""));
    }, 0);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col justify-start items-center mt-10">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo + motto */}
            <div className="flex items-center gap-4">
              <img
                src="/calorie-track-logo-dark.png"
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
              <p className="text-xl font-semibold" style={{ color: "#007dc0" }}>
                Your way to healthy living
              </p>
            </div>

            {/* Calendar picker */}
            {/**
            <div className="flex items-center gap-6">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border-2 border-blue-500 px-3 py-2 rounded shadow-lg"
              />
            </div>
             **/}
          </div>
          <div className="w-full h-0.5 bg-black mt-6"></div>
        </div>

        <div className="flex flex-col items-center mt-5">
          {Object.entries(groupedEntriesByDate).map(([date, entries]) => {
            const total = totalCaloriesByDate(entries);
            return (
              <FoodEntryGroup
                key={date}
                date={`${date}${total ? `: ${total} cal total` : ""}`}
                entries={entries}
              />
            );
          })}
        </div>

        {/* Input + Button */}
        <div className="flex items-center gap-2 mt-6 px-5 w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddEntry();
              }
            }}
            placeholder="date: 2025-04-02, cal: 400, meal: Avocado Toast"
            className="flex-1 bg-white border-2 border-green-500 px-4 py-2 rounded-full outline-none shadow-lg"
          />
          <button
            onClick={handleAddEntry}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
