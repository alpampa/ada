import fetch from "node-fetch";
import * as cheerio from "cheerio";

const hatlar = {
  "kabatas-adalar": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/kabatas-adalar-177",
  "adalar-besiktas": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/adalar-besiktas-769",
  "bostanci-adalar-ring": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/bostanci-adalar-ring-hatti-770",
  "buyukada-sedef": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/buyukada-sedef-adasi-hatti-895",
  "maltepe-adalar": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/maltepe-buyukada-heybeliada-burgazada-kinaliada-hatti-2020",
  "tuzla-adalar": "https://sehirhatlari.istanbul/tr/seferler/ic-hatlar/adalar-hatlari/tuzla-pendik-buyukada-hatti-3373"
};

// HTML tablodan JSON çıkarma fonksiyonu
async function tabloyuCek(url) {
  const html = await fetch(url).then(r => r.text());
  const $ = cheerio.load(html);

  // Tablodaki tüm satırları oku
  const seferler = [];
  $("table tr").each((i, el) => {
    const kolonlar = [];
    $(el)
      .find("td")
      .each((j, td) => {
        kolonlar.push($(td).text().trim());
      });

    // boş satırları at
    if (kolonlar.length > 0) {
      seferler.push(kolonlar);
    }
  });

  return seferler;
}

export default async function handler(req, res) {
  try {
    const sonuc = {};

    // Her hattı paralel çek
    await Promise.all(
      Object.entries(hatlar).map(async ([isim, url]) => {
        sonuc[isim] = await tabloyuCek(url);
      })
    );

    res.status(200).json({
      ok: true,
      hatlar: sonuc,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      hata: err.toString(),
    });
  }
}
