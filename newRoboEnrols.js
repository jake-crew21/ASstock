var t3lr = t3EnrolSheet.getLastRow();
var t3students = t3EnrolSheet.getRange("B2:J"+t3lr).getValues();
var t4lr = t4EnrolSheet.getLastRow();
var t4students = t4EnrolSheet.getRange("B2:J"+t4lr).getValues();

//Robotics After-School

function sortWriteRobo() {
  var allt3robo = t3students.filter(function(e) {return filterByValue(e[5],"Robotics After-School")});
  var t3robo = allt3robo.filter(function(e) {return filterByValue(e[0],"active")});
  var allt4robo = t4students.filter(function(e) {return filterByValue(e[5],"Robotics After-School")});
  var t4robo = allt4robo.filter(function(e) {return filterByValue(e[0],"active")});
  var t4schools = t4robo.map((x) => {
    var y;
    y = x[2];
    return y;
  })
  var unipue = t4schools.filter((item, index) => t4schools.findIndex(x => x == item) == index);
  // console.log(t4schools)
  var values = [];
  unipue.forEach(function(s) {
    //School, State, T4 Enrols, Recuring, New
    var names=[], enrolCount=0, recurCount=0, newCount=0, v=[];
    var temp3Filter = t3robo.filter(function(e) {return filterByValue(e[2], s)});
    var temp4Filter = t4robo.filter(function(e) {return filterByValue(e[2], s)});

    temp4Filter.forEach(function(e, i) {
      var pass = false;
      temp3Filter.find(function(t3) {if(e[7]==t3[7] && e[8]==t3[8] && !pass){recurCount++; pass=true;}});
      if(!pass){names.push(`${e[7]} ${e[8]}`);}
    });

    enrolCount = temp4Filter.length;
    newCount = enrolCount-recurCount;
    var newNames;
    if(newCount>1){newNames=names.join(", ");}
    else if(newCount==1){newNames=names[0];}
    else{newNames="N/A";}

    // v.push(s,temp4Filter[0][1],temp4Filter.length,recurCount,newCount);
    values.push([s,temp4Filter[0][1],temp4Filter.length,recurCount,newCount,newNames])
  });
  newRoboSheet.getRange(2,1,values[0].length,values.length).setValues(values);
}

function checkNames(f1, f2, l1, l2) {
  if(f1==f2 && l1==l2){return true}
}

function filterByValue(element, value) {
  return element == value;
}