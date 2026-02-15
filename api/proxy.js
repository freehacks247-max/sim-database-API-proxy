export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Phone missing" });
  }

  try {
    const response = await fetch(
      `https://api.impossible-world.xyz/api/data?phone=${phone}`
    );

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "API failed" });
  }
}
