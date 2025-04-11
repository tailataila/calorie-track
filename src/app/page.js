"use client";

function RectangleBar({ text, bgColor, borderColor }) {
  return (
    <div
      className={`flex-1 h-16 ${bgColor} border-2 ${borderColor} text-black shadow-lg mr-4 flex items-center`}
    >
      <p className="header-text ml-4">{text}</p>
    </div>
  );
}

function SquareBar({ text, bgColor, borderColor }) {
  return (
    <div
      className={`w-16 h-16 ${bgColor} border-2 ${borderColor} text-black shadow-lg ml-4 flex items-center justify-center`}
    >
      <p className="header-text">{text}</p>
    </div>
  );
}

function DateBubble({ text }) {
  return (
    <div className="bg-blue-100 border-2 border-blue-500 text-black px-5 py-2 rounded-full mt-4 shadow-lg">
      <p className="header-text">{text}</p>
    </div>
  );
}

const foodEntries = [
  {
    date: "2025-03-31",
    square: {
      text: "300 cal",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    rectangle: {
      text: "Piece of Pizza",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
  },
  {
    date: "2025-03-31",
    square: {
      text: "650 cal",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
    },
    rectangle: {
      text: "Ice Cream",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
    },
  },
  {
    date: "2025-03-31",
    square: {
      text: "100 cal",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
    },
    rectangle: {
      text: "Apple",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
    },
  },
  {
    date: "2025-04-01",
    square: {
      text: "250 cal",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    rectangle: {
      text: "Donut",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
  },
  {
    date: "2025-04-01",
    square: {
      text: "650 cal",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
    },
    rectangle: {
      text: "Raspberry Ice Cream",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
    },
  },
];

const totalCalories = foodEntries.slice(0, 3).reduce((sum, entry) => {
  const calories = parseInt(entry.square.text); // "450 cal" → 450
  return sum + (isNaN(calories) ? 0 : calories);
}, 0);

export default function Home() {
  return (
    <>
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
          <div className="bg-blue-100 border-2 border-blue-500 text-black px-10 py-5 rounded-full shadow-lg">
            <p className="header-text">Today - {totalCalories} cal</p>
          </div>
          {/* Circle-shaped element */}
          <div className="bg-blue-100 border-2 border-blue-500 text-black w-14 h-14 flex justify-center items-center rounded-full shadow-lg">
            <p className="header-text">User</p>
          </div>
        </div>
        <div className="w-full h-0.5 bg-black mt-6"></div>
      </div>

      <div className="flex flex-col items-center mt-5">
        {/* Date */}
        <DateBubble text="31 March" />

        {/* Render all entries */}
        {foodEntries.slice(0, 3).map((entry, index) => (
          <div key={index} className="flex flex-row gap-4 mt-4 w-full">
            <SquareBar {...entry.square} />
            <RectangleBar {...entry.rectangle} />
          </div>
        ))}
        {/* Date */}
        <DateBubble text="1 April" />

        {/* Remaining entries */}
        {foodEntries.slice(3).map((entry, index) => (
          <div key={index + 3} className="flex flex-row gap-4 mt-4 w-full">
            <SquareBar {...entry.square} />
            <RectangleBar {...entry.rectangle} />
          </div>
        ))}
      </div>

      {/* Input + Button */}
      <div className="flex items-center gap-2 mt-6 px-5 w-full">
        <input
          type="text"
          placeholder="Add your task"
          className="flex-1 bg-white border-2 border-green-500 px-4 py-2 rounded-full outline-none shadow-lg"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600"
          onClick={() => console.log("Add button clicked")}
        >
          Add
        </button>
      </div>
    </>
  );
}
