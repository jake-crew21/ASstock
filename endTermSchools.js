
function writeEndTermDates() {
  var aclr = activeCoursesSheet.getLastRow();
  var aclc = activeCoursesSheet.getLastColumn();
  var activeData = activeCoursesSheet.getRange(1,1,aclr,aclc).getValues();
  var allDates = activeCoursesSheet.getRange("P1:P"+aclr).getValues();
  //Get unique dates: https://gist.github.com/DoctorDerek/d8d956691a35263a03860ed5361ad54d
  var uniqueDates = [
    ...new Set(allDates.map((date) => date[0].toDateString())),
  ].map((string) => new Date(string))
  //easy sort dates: https://medium.com/@danialashrafk20sw037/sorting-dates-in-javascript-89c63e143acf
  uniqueDates.sort((a, b) => a - b);
  // console.log(uniqueDates);
  // console.log(+activeData[50][15] == +uniqueDates[0]);
  var courseSortDate = [];
  uniqueDates.forEach((date, i) => {
    var tempArr = [];
    tempArr.push([date]);
    activeData.forEach((c) => {
      // if(+c[15] == +date && c[1]!="Curious Minds by Code Camp" && c[1]!="Robotics After-School"){
      if(+c[15] == +date){
        var x = `${c[10]}, ${c[3]}, ${c[1]}`;
        tempArr.push([x]);
      }
    })
    courseSortDate.push(tempArr);
  })
  // console.log(courseSortDate);
  courseSortDate.forEach((csd, idx) => {endTermSheet.getRange(1,idx+1,csd.length).setValues(csd);})
}
