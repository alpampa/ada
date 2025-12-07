export default async function handler(req, res) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/hatlar.json`);
    const data = await response.json();

    return res.status(200).json({
      ok: true,
      toplamHat: Object.keys(data.hatlar).length,
      hatlar: data.hatlar
    });

  } catch (e) {
    return res.status(500).json({
      ok: false,
      hata: e.message
    });
  }
}
