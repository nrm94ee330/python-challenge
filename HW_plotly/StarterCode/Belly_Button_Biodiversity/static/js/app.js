function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample


    d3.json("/metadata/" + sample).then(function(response) {

      // console.log(response);

      // Use d3 to select the panel with id of `#sample-metadata`
      //var selector = d3.select("#sample-metadata");
      

      var table = d3.select("#sample-metadata");
      var tbody = table.select("tbody");
      var trow;


      var keys = Object.keys(response);

      console.log(response);
      console.log(keys.length);
        tbody.html("") 

        for (var i = 0; i < keys.length; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(keys[i]);
        trow.append("td").text(response[keys[i]]);

        }
  
    })
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
  url="/samples/" + sample;

    d3.json(url).then(function(data) {

      // Grab values from the response json object to build the plots
      var name = data.otu_ids;
      var stock = data.sample_values;
      var label_names=data.otu_labels;
  
      var trace1 = {
        type: "bubble",
        mode: "markers",
        name: name,
        x: label_names,
        y: stock,
        marker: {
          size: stock,
          color:name
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: `Sample ${sample}`,
        yaxis: {
          autorange: true,
          type: "linear"
        },
         
      };
    // @TODO: Build a Bubble Chart using the sample data  
      Plotly.newPlot("bubble", data, layout);

    });    

    d3.json(url).then(function(data) {

    
      var keys = Object.keys(data);
      console.log(data[keys[0]].slice(0,10));

      top_10otu_ids=data[keys[0]].slice(0,10);
      top_10otu_labels=data[keys[1]].slice(0,10)
      top_10sample_values=data[keys[2]].slice(0,10)
      

      
      // var sliced = Array.prototype.slice.call(data, 10);
      // console.log(sliced);
      
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  
      var data = [{
        values: top_10sample_values,
        labels: top_10otu_ids,
        hovertext:top_10otu_labels,
        type: "pie"
      }];      

      

      var layout = {
        height: 600,
        width: 800
        
      };

      Plotly.plot("pie", data, layout);

    }); 



}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
