export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const replicateRes = await fetch(
      "https://api.replicate.com/v1/models/google/nano-banana-2/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({
          input: { prompt }
        })
      }
    );

    const data = await replicateRes.json();

    if (!replicateRes.ok) {
      return res.status(500).json({ error: data.detail || "API error" });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
