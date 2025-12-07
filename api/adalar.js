import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const url = "https://data.ibb.gov.tr/api/3/action/datastore_search?resource_id=4d302d41-586d-4787-a2fa-fcb0dfa09cde";

    const response = await fetch(url);
    const data = await response.json();

    // sadece adalar hatlarını filtrele
    const adalarSeferleri = data.result.records.filter(
      item => item.Baslangic_Adi.includes("ADA") || item.Bitis_Adi.includes("ADA")
    );

    res.status(200).json({
      ok: true,
      toplam: adalarSeferleri.length,
      seferler: adalarSeferleri
    });

  } catch (err) {
    res.status(500).json({ ok: false, hata: err.toString() });
  }
}
