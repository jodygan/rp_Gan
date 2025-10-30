async function getData(){
    const response = await fetch('../growth-data.csv');       //.. to move up one folder 
    const data = await response.text()                                  // CSV to TEXT format
    console.log(data);

    const xTimes=[];                        // x-axis label = time in days
    const yObserved=[];                     // y-axis = # observed growth
    const yNObserved=[];                      // y-axis = # of no observed growth

    // \n - new line character
    // split('\n') - will separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index "start" up to and including end 

    const table = data.split('\n').slice(1);                // Split by line and remove first row
    //console.log(table);

    table.forEach(row =>{
        const columns = row.split(',')
        const time = columns[0];        // Assign year value
        xTimes.push(time)                           // Push each year into array for years

        const observed = parseFloat(columns[2]);     
        yObserved.push(observed);                   

        const noObserved = parseFloat(columns[3]);     
        yNObserved.push(noObserved);                   

        console.log(time, observed, noObserved);
    });

    return {xTimes, yObserved, yNObserved};     
}

async function createChart(){
    const data = await getData();                   
    const barChart = document.getElementById('results');

    const myChart = new Chart(barChart, {  // Construct the chart    
    type: 'bar',
    data: {                         // Define data
        labels: data.xTimes,        // x-axis labels
        datasets: [                 // Each object describes one dataset of y-values
                                    //  including display properties.  To add more datasets, 
                                    //  place a comma after the closing curly brace of the last
                                    //  data set object and add another dataset object. 
            {
                label:    'Number of Trials that Observed Growth',     
                data:     data.yObserved,    
                borderWidth:      1   // Data marker border width
            },
            {
                label:    'Number of Trials that did not Observe Growth',     
                data:     data.yNObserved,    
                borderWidth:      1   // Data marker border width
            }
    ]
    },
    options: {                        // Define display chart display options 
        responsive: true,             // Re-size based on screen size
        maintainAspectRatio: false,
        scales: {                     // Display options for x & y axes
            x: {                      // x-axis properties
                title: {
                    display: true,
                    text: 'Time (in days)',
                    font: {                   // font properties
                        size: 14
                    },
                },
                ticks: {                      // x-axis tick mark properties
                    callback: function(val, index){
                        // Set the tick marks at every 5 years
                        return index % 1 === 0 ? this.getLabelForValue(val) : '';
                    },
                font: {
                    size: 14  
                },
                },
                grid: {                       // x-axis grid properties
                    color: '#6c767e'
                }
            },
            y: {                              // y-axis properties
                beginAtZero: true,
                title: {
                    display: true,                          
                    text: 'Number of Trials Growth',     // y-axis title
                    font: {
                        size: 12
                    },
                },
                ticks: {
                    min: 0,                   
                    maxTicksLimit: 20,
                    font: {
                        size: 12
                    }
                },
                grid: {                       // y-axis gridlines
                    color: '#6c767e'
                }
            }
        },
        plugins: {                  // Display options for title and legend
            title: {
                display: true,
                text: 'Factors of Growth Summative Chart',
                font: {
                    size: 24,
                },
                color: '#black',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                align: 'start',
                position: 'bottom',
            }
        }
    }       
});
}

createChart();