export default async function handler(req, res) {
  try {

    // 1) VERÇEL'DE ÇALIŞIR
    const baseUrl =
      req.headers["x-forwarded-proto"]
        ? `${req.headers["x-forwarded-proto"]}://${req.headers.host}`
        : "http://localhost:3000";

    // 2) JSON ÇEK
    const response = await fetch(`${baseUrl}/hatlar.json`);

    // 3) JSON OLARAK PARSE ET
    const data = await response.json();

    // 4) GÖNDER
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
