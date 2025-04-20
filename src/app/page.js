"use client";

import { useState } from "react";

import { FoodEntryGroup } from "./FoodEntryComponents";

export default function Home() {
  const [foodEntries, setFoodEntries] = useState([
    {
      date: "2025-03-31",
      square: { text: "300 cal" },
      rectangle: { text: "Piece of Pizza" },
    },
    {
      date: "2025-03-31",
      square: { text: "650 cal" },
      rectangle: { text: "Ice Cream" },
    },
    {
      date: "2025-03-31",
      square: { text: "100 cal" },
      rectangle: { text: "Apple" },
    },
    {
      date: "2025-04-01",
      square: { text: "250 cal" },
      rectangle: { text: "Donut" },
    },
    {
      date: "2025-04-01",
      square: { text: "650 cal" },
      rectangle: { text: "Raspberry Ice Cream" },
    },
  ]);

  const [inputText, setInputText] = useState("");

  // Parsing function to convert the input text into the correct format
  const parseInput = (input) => {
    const match = input.match(/date:\s*(.+),\s*cal:\s*(\d+),\s*meal:\s*(.+)/i);
    if (!match) return null;

    return {
      date: match[1].trim(),
      square: { text: `${match[2].trim()} cal` },
      rectangle: { text: match[3].trim() },
    };
  };

  // Handle adding the new entry
  const handleAddEntry = () => {
    const parsed = parseInput(inputText); // Parse input
    if (parsed) {
      setFoodEntries([...foodEntries, parsed]); // Add to the state
      setInputText(""); // Clear the input field
    } else {
      alert("Invalid format! Please use 'date: <>, cal: <>, meal: <>' format.");
    }
  };

  // Group entries by date

  const groupedEntriesByDate = foodEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col justify-start items-center mt-10">
          <div className="flex w-full items-center justify-between px-5">
            {/* Diamond-shaped element */}
            <div className="bg-blue-100 border-2 border-blue-500 text-black px-1 py-0 transform rotate-45 shadow-lg">
              <span className="block transform -rotate-45 header-text text-center">
                Calen
                <br />
                dar
              </span>
            </div>
            {/* Today element */}
            <div className="bg-blue-100 border-2 border-blue-500 text-black px-5 py-5 rounded-full shadow-lg">
              <p className="header-text">
                Today -{" "}
                {foodEntries
                  .slice(0, 3)
                  .reduce(
                    (sum, entry) =>
                      sum + parseInt(entry.square.text.replace(/\D/g, "")),
                    0
                  )}{" "}
                cal
              </p>
            </div>
            {/* Circle-shaped element */}
            <div className="bg-blue-100 border-2 border-blue-500 text-black w-14 h-14 flex justify-center items-center rounded-full shadow-lg">
              <p className="header-text">User</p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-black mt-6"></div>
        </div>

        <div className="flex flex-col items-center mt-5">
          {/* Render grouped food entries */}
          {Object.entries(groupedEntriesByDate).map(([date, entries]) => (
            <FoodEntryGroup key={date} date={date} entries={entries} />
          ))}
        </div>

        {/* Input + Button */}
        <div className="flex items-center gap-2 mt-6 px-5 w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // Update inputText state
            onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleAddEntry();
      }
    }}
            placeholder="date: 2025-04-02, cal: 400, meal: Avocado Toast"
            className="flex-1 bg-white border-2 border-green-500 px-4 py-2 rounded-full outline-none shadow-lg"
          />
          <button
            onClick={handleAddEntry} // Add entry on click
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
