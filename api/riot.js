// api/riot.js
export default async function handler(req, res) {
  const RIOT_API_KEY = process.env.RIOT_API_KEY;
  const { type, summoner, puuid, matchId } = req.query;

  const PLATFORM = "euw1";    // for Summoner-V4
  const REGION = "europe";    // for Match-V5

  try {
    let url;

    switch (type) {
      case "summoner":
        if (!summoner) throw new Error("Missing summoner name");
        url = `https://${PLATFORM}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
          summoner
        )}?api_key=${RIOT_API_KEY}`;
        break;

      case "matches":
        if (!puuid) throw new Error("Missing puuid");
        url = `https://${REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`;
        break;

      case "match":
        if (!matchId) throw new Error("Missing matchId");
        url = `https://${REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`;
        break;

      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    const r = await fetch(url);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
