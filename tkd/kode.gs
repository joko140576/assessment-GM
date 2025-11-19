function doGet(e) {
  const action = e.parameter.action;

  // Set header untuk CORS
  const createJSONResponse = (data) => {
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  };

  // -----------------------------
  // 1. Ambil soal
  // -----------------------------
  if (action === "getQuestions") {
    try {
      const sheet = SpreadsheetApp.getActive().getSheetByName("Soal");
      const lastRow = sheet.getLastRow();
      
      // Cek apakah ada data soal
      if (lastRow <= 1) {
        return createJSONResponse({error: "Tidak ada data soal"});
      }
      
      const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();

      const questions = data.map((row, index) => ({
        number: row[0] || (index + 1),
        question: row[1] || "",
        options: {
          a: row[2] || "",
          b: row[3] || "",
          c: row[4] || "",
          d: row[5] || ""
        },
        correct: row[6] || ""
      })).filter(q => q.question !== ""); // Filter soal yang kosong

      return createJSONResponse(questions);
        
    } catch (error) {
      return createJSONResponse({error: error.toString()});
    }
  }

  // -----------------------------
  // 2. Simpan Biodata + Nilai
  // -----------------------------
  if (action === "saveResult") {
    try {
      const sheet = SpreadsheetApp.getActive().getSheetByName("Data");

      sheet.appendRow([
        e.parameter.nama || "",
        e.parameter.npp || "",
        e.parameter.divisi || "",
        e.parameter.nilai || "0",
        new Date()
      ]);

      return createJSONResponse({status: "success"});
        
    } catch (error) {
      return createJSONResponse({error: error.toString()});
    }
  }

  // Default response untuk action yang tidak dikenali
  return createJSONResponse({error: "Action tidak dikenali"});
}

// Fungsi tambahan untuk handle CORS (jika diperlukan POST)
function doPost(e) {
  return doGet(e);
}
