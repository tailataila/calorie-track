export async function GET(request) {
  // For example, fetch data from your DB here
  const foodEntries = [
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
  ];
  return new Response(JSON.stringify(foodEntries), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  // Parse the request body
  //   const body = await request.json();
  //   const { name } = body;

  // e.g. Insert new user into your DB
  const error = { msg: "Not implemented yet" };

  return new Response(JSON.stringify(error), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });
}
