function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Get parameters from URL
    var params = e.parameter;
    
    // Log received data
    console.log('Received data:', params);
    
    // Save to spreadsheet
    var ss = SpreadsheetApp.openById("1GSjPnL7QTcdw4W8DQEzMNB4C-76d2mVRBmrLxCY0YcE");
    var sheet = ss.getSheetByName("Sheet1");
    
    var rowData = [
      new Date(),
      params.nama || "",
      params.npp || "",
      params.divisi || "",
      params.jawaban1 || "",
      params.jawaban2 || "",
      params.jawaban3 || "",
      params.jawaban4 || "",
      params.jawaban5 || "",
      
    ];
    
    sheet.appendRow(rowData);
    
    // Return simple success response
    return ContentService.createTextOutput("SUCCESS: Data saved to row " + sheet.getLastRow())
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput("ERROR: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Test function
function testDoGet() {
  var mockData = {
    parameter: {
      nama: "Test User",
      npp: "12345",
      divisi: "HCC",
      jawaban1: "Test jawaban 1",
      jawaban2: "Test jawaban 2"
    }
  };
  
  var result = handleRequest(mockData);
  Logger.log(result.getContent());
  return result.getContent();
}
