// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the weather data from data.js

var submit = d3.select("#filter-btn");

submit.on("click", function() {


  
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // clear out the previous filter
  d3.select("tbody").html("");

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");
  console.log(inputElement)
  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  console.log(inputValue);

    // Select the input element and get the raw HTML node
    var inputElement2 = d3.select("#city");
    console.log(inputElement2)
    // Get the value property of the input element
    var inputValue2 = inputElement2.property("value");
    //console.log(inputValue2 == "");
    console.log(inputValue2);

   var filteredData = data.filter(givendata => ((givendata.datetime === inputValue) && ((inputValue2 == "" ? true : givendata.city === inputValue2) ))) ;
   console.log(filteredData);


  filteredData.forEach(function(ufoReport) {
  
  //console.log(ufoReport);
  var row = tbody.append("tr");
  Object.entries(ufoReport).forEach(function([key, value]) {
    //console.log(key, value);
    // Append a cell to the row for each value
    var cell = tbody.append("td");
    cell.text(value);
  });
});

});













// data.forEach(function(ufoReport) {
  
//   //console.log(ufoReport);
//   var row = tbody.append("tr");
//   Object.entries(ufoReport).forEach(function([key, value]) {
    
//     //console.log(key, value);
//     // Append a cell to the row for each value
//     // in the weather report object
//     var cell = tbody.append("td");
//     cell.text(value);
//   });
// });








// // Step 1: Loop Through `data` and console.log each weather report object
// data.forEach(function(ufoReport) {
//   console.log(ufoReport);
// });

// // Step 2:  Use d3 to append one table row `tr` for each weather report object
// // Don't worry about adding cells or text yet, just try appending the `tr` elements.
// data.forEach(function(ufoReport) {
//   console.log(ufoReport);
//   var row = tbody.append("tr");
// });

// // Step 3:  Use `Object.entries` to console.log each weather report value
// data.forEach(function(ufoReport) {
//   console.log(ufoReport);
//   var row = tbody.append("tr");

//   Object.entries(ufoReport).forEach(function([key, value]) {
//     console.log(key, value);
//   });
// });

// Step 4: Use d3 to append 1 cell per weather report value (weekday, date, high, low)
// data.forEach(function(ufoReport) {
//   console.log(ufoReport);
//   var row = tbody.append("tr");

//   Object.entries(ufoReport).forEach(function([key, value]) {
//     console.log(key, value);
//     // Append a cell to the row for each value
//     // in the weather report object
//     var cell = tbody.append("td");
//   });
// });

// Step 5: Use d3 to update each cell's text with
// weather report values (weekday, date, high, low)



//
//// BONUS: Refactor to use Arrow Functions!
//data.forEach((ufoReport) => {
//   var row = tbody.append("tr");
//   Object.entries(ufoReport).forEach(([key, value]) => {
//     var cell = tbody.append("td");
//     cell.text(value);
//   });
// });
