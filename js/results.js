async function getData(){
    const response = await fetch('data/growthdata.csv');       
    const data = await response.text()                               
    console.log(data);

    const xTimes=[];                        // x-axis label = time in days
    const yObserved=[];                     // y-axis = # observed growth
    const yNObserved=[];                    // y-axis = # of no observed growth

    // \n - new line character
    // split('\n') - will separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index "start" up to and including end 

    const table = data.split('\n').slice(1);                // Split by line and remove first row
    //console.log(table);

    table.forEach(row =>{
        const columns = row.split(',')
        const time = columns[0];        
        xTimes.push(time)        

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
        datasets: [                           
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
                stacked: true,
                title: {
                    display: true,
                    text: 'Time (days) : Amount of LB Used (mL)',
                    font: {   
                        family: "Lexend",                // font properties
                        size: 14
                    },
                },
                ticks: {                      // x-axis tick mark properties
                    callback: function(val, index){
                        return index % 1 === 0 ? this.getLabelForValue(val):'';
                    },
                font: {
                    family: "Lexend",
                    size: 14  
                },
                },
                grid: {                       // x-axis grid properties
                    color: '#6c767e'
                }
            },
            y: {                              // y-axis properties
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,                          
                    text: 'Number of Trials Grown',     // y-axis title
                    font: {
                        family: "Lexend",
                        size: 12
                    },
                },
                ticks: {
                    min: 0,                   
                    maxTicksLimit: 20,
                    font: {
                        family: "Lexend",
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
                    family: "Lexend",
                    size: 24,
                },
                color: '#6B705C',
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
