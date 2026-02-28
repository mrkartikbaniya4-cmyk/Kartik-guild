const UPSTREAM = "https://guild-joiner.vercel.app/joinclan";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).send("Method Not Allowed");

  const { jwt, clanid } = req.query;

  if (!jwt || !clanid) {
    return res.status(400).send("Missing jwt or clanid");
  }

  const url = `${UPSTREAM}?jwt=${encodeURIComponent(jwt)}&clanid=${encodeURIComponent(clanid)}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    return res.status(response.status).send(text);
  } catch (err) {
    return res.status(500).send("Proxy Error");
  }
}
