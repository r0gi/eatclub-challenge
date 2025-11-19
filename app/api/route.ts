const API_ENDPOINT = "https://eccdn.com.au/misc/challengedata.json";

export async function GET() {
  const res = await fetch(API_ENDPOINT, { cache: "no-store" });
  const data = await res.json();

  return Response.json(data);
}
