/**
 * Under the Legacy — Google Apps Script
 * 
 * Este script recibe datos de los formularios del sitio web y los
 * almacena en hojas (tabs) separadas de un Google Sheet.
 * 
 * INSTRUCCIONES DE DESPLIEGUE:
 * 1. Ir a https://script.google.com y crear un nuevo proyecto
 * 2. Pegar este código en Code.gs
 * 3. Ir a Extensiones > Apps Script desde el Google Sheet destino,
 *    o vincular con SpreadsheetApp.openById('TU_SHEET_ID')
 * 4. Desplegar > Nueva implementación > Aplicación web
 *    - Ejecutar como: tu cuenta
 *    - Quién tiene acceso: Cualquiera
 * 5. Copiar la URL del deploy y pegarla en los formularios del sitio
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var formType = e.parameter.form_type || 'contact';
    var targetSheet;
    var headers;
    var rowData;

    switch (formType) {
      case 'wishlist':
        headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Product', 'Message'];
        rowData = [
          new Date(),
          e.parameter.name || '',
          e.parameter.email || '',
          e.parameter.phone || '',
          e.parameter.product || '',
          e.parameter.message || ''
        ];
        targetSheet = getOrCreateSheet(sheet, 'Wishlist', headers);
        break;

      case 'newsletter':
        headers = ['Timestamp', 'Name', 'Email', 'Phone'];
        rowData = [
          new Date(),
          e.parameter.name || '',
          e.parameter.email || '',
          e.parameter.phone || ''
        ];
        targetSheet = getOrCreateSheet(sheet, 'Newsletter', headers);
        break;

      default: // contact
        headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message'];
        rowData = [
          new Date(),
          e.parameter.name || '',
          e.parameter.email || '',
          e.parameter.phone || '',
          e.parameter.subject || '',
          e.parameter.message || ''
        ];
        targetSheet = getOrCreateSheet(sheet, 'Contacts', headers);
    }

    targetSheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', type: formType })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Obtiene una hoja existente o la crea con headers si no existe.
 */
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Bold headers
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}
