import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
window.bootsrtap = require('../node_modules/bootstrap/dist/js/bootstrap.bundle.js');
import "./custom.scss";
import favouriteIcon from "./favicon.ico";
import * as comp from "./process.js";
import * as fbtn from "./findbutton.js";
import * as chartjs from"../node_modules/chart.js/dist/chart.min.js";

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var form = document.querySelector('.myform')
     console.log(form);
    // Loop over them and prevent submission
     
        form.addEventListener('click', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
         
      })
  })();

/*alpha parameter displaying */
  (function(){
    let alpha = document.querySelector('.alpha');
    let rangeOut = document.querySelector('.range-out');
    alpha.addEventListener('change',onChange,false);
    function onChange (evt) {
        rangeOut.innerText = (alpha.value/100).toPrecision(3);
    }

  })();

/*the favicon attaching dinamically */
  (function (){
  let icon = document.querySelector("link[type='image/x-icon']");
  icon.href=favouriteIcon;
  })();

  /*enable disable range control in dependence of radiobuttons */
  (function(){

    let container= document.querySelector('.btn-container');
    let range = document.querySelector('.alpha');
    let label = document.querySelector('.lbrange');
    container.addEventListener('click',onClick);

    function onClick () {
      let val = fbtn.findButtonValue();
      console.log(val);
       if (val==="Tukey") {
             range.removeAttribute("disabled");
       range.setAttribute("id","");
       label.innerText="Select &alpha; :"
       return;
        }
       range.setAttribute("disabled","");
       range.setAttribute("id","disabled-range");
       label.innerText="-"

    }
  
  })();


  window.onload=function () {
    let button = document.querySelector(".mybtn");
    let form = document.querySelector(".myform");
    
    /***chartjs */
    let labels = [
      '*',
      '*',
      '*',
      '*',
      '*',
      '*',
    ];
  
    let data1 = {
      labels: labels,
      datasets: [{
        fill: false,
        lineTension: 0,
        label: 'Output values',
        backgroundColor: 'rgba(0,0,128,1.0)',
        borderColor: 'rgba(0,0,255,0.5)',
        data: [0, 0.1, 0.1, 0.1, 0.1, 1.0],
        
      }]
    };

   

  
    const config = {
      type: 'line',
      data: data1,
      options: {
        animation:false,
      }
    };

    

    const myChart = new chartjs.Chart(
      document.getElementById('myChart'),
      config
    );

    myChart.options.animation = false;

    



    /**************on START click**************************************** */
    button.addEventListener('click',onClick,false);

    function onClick (evt) {
     /* data1.datasets[0].data[0]=0.05;
      myChart.update();*/

      if (form.checkValidity()) {
          
          let len = document.querySelector('#number-of-points');
    let range = document.querySelector('.alpha');
    let out = document.querySelector('.result');
          let val  = fbtn.findButtonValue();
          let results = comp.calc({points:len.value, type:val,alpha:(range.value/100)});
          out.innerText =  results.str;
          /*show the chart*/
          //clear an array
          data1.datasets[0].data = results.num;
          data1.labels = [];
          for (let ab1 = 0; ab1 < results.num.length; ab1++) {
            data1.labels[ab1] = '';
          }

          myChart.update();
          /*myChart.destroy()
          myChart = new chartjs.Chart(
            document.getElementById('myChart'),
            config
          );*/
         // console.log(btnList[0].checked, btnList[0].value );
      }
    }
  }



 

 