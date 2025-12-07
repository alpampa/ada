import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://sehirhatlari.istanbul/tr/seferler/adalar";
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    let seferler = [];

    $(".sefer-card").each((i, el) => {
      const hat = $(el).find(".sefer-title").text().trim();
      const zamanlar = [];

      $(el)
        .find(".time-item")
        .each((j, t) => {
          zamanlar.push($(t).text().trim());
        });

      seferler.push({ hat, zamanlar });
    });

    res.status(200).json({
      ok: true,
      kaynak: url,
      seferler,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      hata: err.toString(),
    });
  }
}
