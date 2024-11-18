
function pickups() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var packingSheetName;
  var allNames = ALLSHEETNAMES();
  var setState = settingSheet.getRange("G5").getValue();
  switch (setState){
    case "NSW":
      packingSheetName = settingSheet.getRange("E6").getValue();
      break;
    case "WA":
      packingSheetName = settingSheet.getRange("E7").getValue();
      break;
    case "SA":
      packingSheetName = settingSheet.getRange("E8").getValue();
      break;
    case "QLD":
      packingSheetName = settingSheet.getRange("E9").getValue();
      break;
    case "VIC":
      packingSheetName = settingSheet.getRange("E10").getValue();
      break;
    case "ACT":
      packingSheetName = settingSheet.getRange("E11").getValue();
      break;
    default:
      break;
  }
  var packSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(packingSheetName);
  var lr = packSheet.getLastRow();
  var packValues = packSheet.getRange("A3:AC"+lr).getValues();
  var resultsAC = [];
  var resultsIT = [];
  packValues.forEach(function(v){
    resultsAC.push([v[0],v[1],v[3]]);
    var kits=new Array;
    if(v[7]=="CM"){kits.push(v[7])}
    if(v[8]=="ANI"){kits.push(v[8])}
    if(v[9]=="ROBO"){kits.push(v[9])}
    if(v[10]=="DESIGN"){kits.push(v[10])}
    if(kits.length==0){kits.push("-")}
    var kitStr = kits.join(", ");
    resultsIT.push([kitStr,v[12],v[14],v[15],v[16],v[17],v[18],v[19],v[22],v[24],v[27],v[28]]);
  })
  sheet.getRange(3,1,resultsAC.length,resultsAC[0].length).setValues(resultsAC);
  sheet.getRange(3,9,resultsIT.length,resultsIT[0].length).setValues(resultsIT);
}

function endDate() {
  var sslr = stateSheet.getLastRow();
  var stateValues = stateSheet.getRange("A2:P"+sslr).getValues();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  for(i=0;i<=ids.length;i++) {
    if(!ids[i]){break;}
    var dates = new Array;
    var id = ids[i][0];
    for(k=0;k<=stateValues.length;k++) {
      if(!stateValues[k]){break;}
      if(stateValues[k][2] == id) {
        dates.push(stateValues[k][15]);
      }
    }
    var maxDate = new Date(Math.max.apply(null, dates));
    results.push([maxDate]);
    // sheet.getRange(3+i,4).setValue(maxDate);
  }
  sheet.getRange(3,4,results.length).setValues(results);
}

// function ALLSHEETNAMES() {
//   let ss = SpreadsheetApp.getActive();
//   let sheets = ss.getSheets();
//   let sheetNames = [];
//   sheets.forEach(function (sheet) {
//     if(!sheet.isSheetHidden()){sheetNames.push(sheet.getName());}
//   });
//   // console.log(sheetNames);
//   return sheetNames;
// }