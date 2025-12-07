import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://sehirhatlari.istanbul/tr/seferler/adalar";

  const response = await fetch(url);
  const html = await response.text();

  // HTML'nin ilk 2000 karakterini döndürüyoruz
  res.status(200).json({
    ok: true,
    html_preview: html.substring(0, 2000)
  });
}
