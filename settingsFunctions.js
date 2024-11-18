function onEdit(e) {
  for(let i=6;i<12;i++){
    settingSheet.getRange(i,5).setDataValidation(sheetDropdown());
  }
}

function sheetDropdown() {
  const sheetNames = ALLSHEETNAMES();
  const dropList = SpreadsheetApp.newDataValidation()
    .requireValueInList(sheetNames)
    .build();
  return dropList;
}

//Get all names of provided Spread Sheet, excluding hidden sheets
function ALLSHEETNAMES() {
  let ss = SpreadsheetApp.getActive();
  let sheets = ss.getSheets();
  let sheetNames = [];
  sheets.forEach(function (sheet) {
    var name = sheet.getName();
    if(!sheet.isSheetHidden()&&name!="Settings"&&name!="State_Courses"&&name!="Active_Courses"&&name!="Dongles"&&name!="Pickup_Template"&&name!="Packing_Template"&&name!="Dongle_Required"){sheetNames.push(sheet.getName());}
  });
  // console.log(sheetNames);
  return sheetNames;
}