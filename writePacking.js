
function oneForAll(){
  updateActiveSchools();
  countStreams();
  countChrome();
  kitPacking();
  manualEnoughEnrol();
  dongles();
  removeNoDelivery();
  schoolProviding();
  removeNoDelivery();
  startDate();
  area();
  address();
  extras();
}

function enoughEnrol(row, enough){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var curVal =sheet.getRange(row,3).getValue();
  if(enough){
    sheet.getRange(row,3).setValue("Yes");
  } else if(!enough && !curVal) {
    sheet.getRange(row,3).setValue("No");
  }
}

function manualEnoughEnrol(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lr = sheet.getLastRow();
  const ids = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  ids.forEach(function(id,index){
    var streams, chromes, cm, ani, robo, design;
    streams = sheet.getRange(index+3,14).getValue();
    chromes = sheet.getRange(index+3,12).getValue();
    design = sheet.getRange(index+3,11).getValue();
    robo = sheet.getRange(index+3,10).getValue();
    ani = sheet.getRange(index+3,9).getValue();
    cm = sheet.getRange(index+3,8).getValue();
    // console.log(streams);
    if(isNumber(streams)||isNumber(chromes)||design=="DESIGN"||robo=="ROBO"||ani=="ANI"||cm=="CM"){
      // sheet.getRange(index+3,3).setValue("Yes");
      results.push(["Yes"]);
    } else {
      // sheet.getRange(index+3,3).setValue("No");
      results.push(["No"]);
    }
  })
  sheet.getRange(3,3,results.length).setValues(results);
}

function updateActiveSchools(){
  var values = stateSheet.getRange("R2:S").getValues();
  removeEmptyTail(values);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var currentSchools = sheet.getRange("A3:B"+lr).getValues();
  var filteredValues = values.filter(function(x){
      var notPresent = true;
      currentSchools.forEach(function(school){if(x[0]==school[0]){notPresent = false;}})
      return notPresent;
    }
  );
  if(filteredValues.length > 0) {
    sheet.getRange(lr+1,1,filteredValues.length,2).setValues(filteredValues);
  }
}

function dongles(){
  var setState = settingSheet.getRange("G5").getValue();
  var dongleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dongle_Required");
  var dlr = dongleSheet.getLastRow();
  var dongleVal = dongleSheet.getRange("A2:C"+dlr).getValues();
  var filteredValues = dongleVal.filter((x) => {
    return x[2]==setState
  })
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var values = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  values.forEach(function(v) {
    var exists = filteredValues.find(x => x[0] == v[0]);
    if(exists){results.push(["Yes"]);}else{results.push(["No"]);}
  })
  sheet.getRange(3,18,results.length).setValues(results);
}

function extras(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var values = sheet.getRange("H3:N"+lr).getValues();
  var extCord=0;
  var pb=0;
  var loginCard=0;
  var shirt=0;
  var allExtrOne = [];
  var allExtrTwo = [];
  values.forEach(function(obj, indX){
    if(obj[0]=="CM"){shirt+=2;}
    if(obj[1]=="ANI"){shirt+=2;}
    if(obj[2]=="ROBO"){shirt+=2;}
    if(obj[3]=="DESIGN"){shirt+=2}
    if(isNumber(obj[4])){
      pb += Math.round(obj[4]/5);
      extCord += Math.round(obj[4]/10);
      shirt += Math.round(obj[4]/10);
    }
    if(isNumber(obj[6])){
      pb += Math.round(obj[6]/5);
      extCord += Math.round(obj[6]/10);
      loginCard += obj[6];
      shirt += Math.round(obj[6]/10);
    }
    allExtrOne.push([extCord,pb]);
    allExtrTwo.push([loginCard,shirt]);

    extCord=0;pb=0;loginCard=0;shirt=0;
  })
  sheet.getRange(3,16,allExtrOne.length,2).setValues(allExtrOne);
  sheet.getRange(3,21,allExtrTwo.length,2).setValues(allExtrTwo);
}

function address(){
  var sslr = stateSheet.getLastRow();
  var values = stateSheet.getRange("C2:I"+sslr).getValues();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  for(i=0;i<=ids.length;i++) {
    if(!ids[i]){break;}
    var id = ids[i][0];
    for(k=0;k<=values.length;k++) {
      if(!values[k]){break;}
      if(values[k][0] == id) {
        results.push([values[k][6]]);
        break;
      }
    }
  }
  sheet.getRange(3,28, results.length).setValues(results);
}

function area() {
  var sslr = stateSheet.getLastRow();
  var values = stateSheet.getRange("C2:J"+sslr).getValues();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  for(i=0;i<=ids.length;i++) {
    if(!ids[i]){break;}
    var id = ids[i][0];
    for(k=0;k<=values.length;k++) {
      if(!values[k]){break;}
      if(values[k][0] == id) {
        results.push([values[k][7]]);
        break;
      }
    }
  }
  sheet.getRange(3,4,results.length).setValues(results);
}

function removeNoDelivery() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var values = sheet.getRange("A3:R"+lr).getValues();
  var rowAdjust = 3;
  for(i=0;i<=values.length;i++) {
    if(!values[i]){break;}
    if(values[i][7]=="-" && values[i][8]=="-" && values[i][9]=="-" && values[i][10]=="-" && ((values[i][11]=="N/A" && values[i][13]=="N/A")||(values[i][11]=="-"&&values[i][13]=="-"))  &&  values[i][17]!="Yes"){
      sheet.deleteRow(i+rowAdjust);
      rowAdjust--;
    }
  }
}

function startDate(){
  var sslr = stateSheet.getLastRow();
  var values = stateSheet.getRange("C2:O"+sslr).getValues();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  var results = [];
  for(i=0;i<=ids.length;i++) {
    if(!ids[i]){break;}
    var dates = new Array;
    var id = ids[i][0];
    for(k=0;k<=values.length;k++) {
      if(!values[k]){break;}
      if(values[k][0] == id) {
        dates.push(new Date(values[k][12]));
      }
    }
    var minDate = new Date(Math.min.apply(null, dates));
    results.push([minDate]);
  }
  sheet.getRange(3,5,results.length).setValues(results);
}

function schoolProviding() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var splr = byodSchoolSheet.getLastRow();
  var schoolProv = byodSchoolSheet.getRange("A2:A"+splr).getValues();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  for(i=0;i<=ids.length;i++) {
    if(!ids[i]){break;}
    var id = ids[i][0];
    // if(getFieldValue("afterschoolVenueProvidingComputers", id)){
    //   sheet.getRange(3+i,12).setValue("N/A");
    //   sheet.getRange(3+i, 14).setValue("N/A");
    // }
    schoolProv.find(function(element){
      if(element==id){
        sheet.getRange(3+i,12).setValue("N/A");
        sheet.getRange(3+i, 14).setValue("N/A");
      }
    })
  }
}

function checkBYOD(id){
  var splr = byodSchoolSheet.getLastRow();
  var schoolProv = byodSchoolSheet.getRange("A2:B"+splr).getValues();
  
}

function kitPacking() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids=sheet.getRange("A3:A"+lr).getValues();
  var cm=null;
  var ani=null;
  var robo=null;
  var des=null;
  var sslr = stateSheet.getLastRow();
  var stateValues = stateSheet.getRange("B2:N"+sslr).getValues();
  var allKits = [];
  for(i=0; i<=ids.length; i++) {
    if(!ids[i]){break;}
    for(k=0; k<=stateValues.length; k++) {
      if(!stateValues[k]){break;}
      var kits = [];
      if(ids[i][0]==stateValues[k][1]) {
        if(stateValues[k][0]=="Animation After-School"){ani+=stateValues[k][11]}
        else if (stateValues[k][0]=="Design After-School"){des+=stateValues[k][11]}
        else if (stateValues[k][0]=="Curious Minds by Code Camp"){cm+=stateValues[k][11]}
        else if (stateValues[k][0]=="Robotics After-School"){robo+=stateValues[k][11]}
      }
    }
    if(cm>=settingSheet.getRange("B4").getValue()) {
      kits.push("CM");
    } else if(isNumber(cm)) {
      kits.push(cm);
    } else {kits.push("-");}
    
    if(ani>=settingSheet.getRange("B2").getValue()) {
      kits.push("ANI");
    } else if(isNumber(ani)) {
      kits.push(ani);
    } else {kits.push("-");}

    if(robo>=settingSheet.getRange("B5").getValue()) {
      sheet.getRange(3+i,6).setValue("edison: "+(robo+2));
      kits.push("ROBO");
    } else if(isNumber(robo)) {
      kits.push(robo);
    } else {kits.push("-");}

    if(des>=settingSheet.getRange("B3").getValue()) {
      kits.push("DESIGN");
    } else if(isNumber(des)) {
      kits.push(des);
    } else {kits.push("-");}
    cm=null;
    ani=null;
    robo=null;
    des=null;
    allKits.push(kits);
  }
  sheet.getRange(3,8,allKits.length,4).setValues(allKits);
}

function isNumber(value){return typeof value === 'number';}

function countChrome() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids=sheet.getRange("A3:A"+lr).getValues();
  var count=0;
  var sslr = stateSheet.getLastRow();
  var courses = stateSheet.getRange("B2:N"+sslr).getValues();
  var allChromes = [];
  for(i=0; i<=ids.length; i++) {
    if(!ids[i]){break;}
    for(k=0; k<=courses.length; k++) {
      if(!courses[k]){break;}
      if(ids[i][0] == courses[k][1]) {
        if(courses[k][0]=="Minecraft Engineers" && courses[k][11]>=settingSheet.getRange("B7").getValue()) {
          count += courses[k][11];
        }
      }
    }
    if(count>0) {
      count += 2;
      allChromes.push([count]);
      count=0;
    } else {allChromes.push(["-"]);}
  }
  sheet.getRange(3,12,allChromes.length).setValues(allChromes);
}

function countStreams() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow();
  var ids = sheet.getRange("A3:A"+lr).getValues();
  // var count = 0;
  var clr = stateSheet.getLastRow();
  var courses = stateSheet.getRange("B2:O"+clr).getValues();
  var allStreams = [];
  for(i=0; i<=ids.length; i++) {
    var classes = [];
    if(!ids[i]){break;}
    for(k=0; k<=courses.length; k++) {
      if(!courses[k]){break;}
      if(ids[i][0] == courses[k][1]) {
        if((courses[k][0]=="Code Camp After-School Coding" && courses[k][11]>=settingSheet.getRange("B8").getValue())||(courses[k][0]=="Robotics After-School" && courses[k][11]>=settingSheet.getRange("B5").getValue())||(courses[k][0]=="Little Coders After-School" && courses[k][11]>=settingSheet.getRange("B6").getValue())) {
          classes.push(courses[k]);
        }
      }
    }
    var maxCount = findNeededCount(classes,11,13);
    if(maxCount>0) {
      maxCount += 2;
      allStreams.push([maxCount]);
    } else {allStreams.push(["-"]);}
  }
  sheet.getRange(3,14,allStreams.length).setValues(allStreams);
}

function findNeededCount(arr, numCol, dayCol){
  // const arr = [[6,'29/07/2024'],[10,'30/07/2024'],[6,'29/07/2024'],[5,'30/07/2024'],[1,'01/08/2024'],[2,'02/08/2024'],[3,'03/08/2024'],[4,'04/08/2024'],[5,'05/08/2024']];
  var totals = [];
  arr.forEach(function(a,i){
    var temp = 0;
    for(let k=i+1; k < arr.length; k++){
      if(a[dayCol].getDay() == arr[k][dayCol].getDay()){
        temp += arr[k][numCol];
        arr.splice(k,1);
        k--;
      }
    }
    temp += a[numCol];
    totals.push(temp);
    temp = 0;
  })
  var results;
  if(isNumber(totals[0])){results = Math.max.apply(null, totals);}
  return results;
}

function removeEmptyTail(array) {
  var i = 0;

  //Count up until you reach empty
  while (array[i] != ",") {
    i++;
  };

  //Remove the empty tail of array
  array.splice(i, array.length);

  return array;
}