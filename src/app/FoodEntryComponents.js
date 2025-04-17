"use client";

// DateBadge Component
function DateBadge({ text }) {
  return (
    <div className="bg-blue-100 border-2 border-blue-500 text-black px-5 py-2 rounded-full mt-4 shadow-lg">
      <p className="header-text">{text}</p>
    </div>
  );
}

// CalorieBox Component
function getColorClasses(calories) {
  if (calories < 300) return "bg-green-100 border-green-300";
  if (calories < 500) return "bg-orange-100 border-orange-300";
  return "bg-red-100 border-red-300";
}

function CalorieBox({ text }) {
  const calories = parseInt(text);
  const colorClasses = getColorClasses(calories);
  return (
    <div
      className={`w-16 h-16 ${colorClasses} border-2 text-black shadow-lg ml-4 flex items-center justify-center`}
    >
      <p className="header-text">{text}</p>
    </div>
  );
}

// MealDescription Component
function MealDescription({ text, squareText }) {
  const calories = parseInt(squareText);
  const colorClasses = getColorClasses(calories);
  return (
    <div
      className={`flex-1 h-16 ${colorClasses} border-2 text-black shadow-lg mr-4 flex items-center`}
    >
      <p className="header-text ml-4">{text}</p>
    </div>
  );
}

// FoodEntryGroup Component
function FoodEntryGroup({ date, entries }) {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <DateBadge text={date} />
      </div>
      {entries.map((entry, index) => (
        <div key={index} className="flex flex-row gap-4 mt-4 w-full">
          <CalorieBox text={entry.square.text} />
          <MealDescription
            text={entry.rectangle.text}
            squareText={entry.square.text}
          />
        </div>
      ))}
    </div>
  );
}

export { DateBadge, CalorieBox, MealDescription, FoodEntryGroup };
