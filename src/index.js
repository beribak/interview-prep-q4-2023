import ApexCharts from 'apexcharts'

fetch("https://gitlab.com/-/snippets/2149167/raw/main/data.json")
.then(response => response.json())
.then(data => {
  let counter = 1
  data.profiles.forEach((profile) => {  
    let values = []
    let labels = []
    let title = profile.title
    
    profile.data.forEach((data) => {
      values.push(data.value)
      labels.push(data.label)
    })

    const html = `<div class="flex-container">
                    <h2 style="margin-bottom: 0;">${title}</h2>
                    <p class="btn${counter}" style="margin-bottom: 0; padding: 5px; background-color: red;">Clone</p>
                  </div>
                  <div id="chart${counter}" style="width: 25%;">
    
                  </div>` 
    const clone_html = `<div class="flex-container">
                         <h2 style="margin-bottom: 0;">${title}</h2>
                        </div>
                        <div id="chart${counter + 3}" style="width: 25%;">
          
                        </div>` 

    const container = document.querySelector('.container')
    container.insertAdjacentHTML('beforeend', html)

    const btn = document.querySelector(`.btn${counter}`)
    const new_id = `#chart${counter + 3}` // FIX we need calculate the counter at the poinjt of the click and use this id to render the chart

    btn.addEventListener('click', () => {
      container.insertAdjacentHTML('beforeend', clone_html)
      var options = {
        series: values,
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        labels: labels,
      };
      
      var chart = new ApexCharts(document.querySelector(`${new_id}`), options);
      chart.render();
    })

    var options = {
      series: values,
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      labels: labels,
    };
    
    var chart = new ApexCharts(document.querySelector(`#chart${counter}`), options);
    chart.render();
    counter++
  })
})

  
