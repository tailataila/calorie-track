export async function GET(request) {

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
  //Receives parameter request, which is a Request object. It contains the details of the incoming HTTP request — method, headers, body, etc.

  // Parse the request body
  const body = await request.json();

  // In a real app, you would save `body` to a DB here

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
