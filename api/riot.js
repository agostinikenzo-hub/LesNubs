// api/riot.js
export default async function handler(req, res) {
  const { type, summoner, puuid, matchId } = req.query;
  const RIOT_API_KEY = process.env.RIOT_API_KEY;

  if (!RIOT_API_KEY) {
    return res.status(500).json({ error: "Missing Riot API key on server" });
  }

  const REGION_ROUTING = "europe";      // for EUW match data
  const PLATFORM_ROUTING = "euw1";      // for EUW summoner data

  try {
    let url = "";

    switch (type) {
      case "summoner":
        if (!summoner)
          return res.status(400).json({ error: "Missing summoner parameter" });
        url = `https://${PLATFORM_ROUTING}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
          summoner
        )}?api_key=${RIOT_API_KEY}`;
        break;

      case "matches":
        if (!puuid)
          return res.status(400).json({ error: "Missing puuid parameter" });
        url = `https://${REGION_ROUTING}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`;
        break;

      case "match":
        if (!matchId)
          return res.status(400).json({ error: "Missing matchId parameter" });
        url = `https://${REGION_ROUTING}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`;
        break;

      default:
        return res.status(400).json({
          error: "Invalid type parameter. Use ?type=summoner|matches|match"
        });
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Riot API proxy error:", err);
    res.status(500).json({ error: err.message });
  }
}
