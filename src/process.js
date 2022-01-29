function calc(x={points:16,type:'Hann',alpha:0.5}) {
    let accum = [];
    let result;
    let outString = "{";
    switch(x.type){
      case 'Hann':
        for (let y1=0; y1 < x.points; y1++) {
           result = 0.5 * ( 1 - Math.cos(  (2 * Math.PI * y1) / x.points) );
           accum.push(result);
        }

        break;
        case 'Blackman':
          for (let y2=0; y2 < x.points; y2++) {
             result = 0.42 - (  0.5 *  Math.cos(  (2 * Math.PI * y2) / x.points) )  +   (0.08 *   Math.cos(  (4 * Math.PI * y2) / x.points) ) 
             accum.push(result);
          }
          break;
          case 'Gaussian':
          for (let y3=0; y3 < x.points; y3++) {
             result = Math.exp( -0.5 * Math.pow( ( y3 - (x.points/2) )/( (0.25 * x.points) / 2), 2 )       ); 
             accum.push(result);
          }
          break;
          case 'Welch':
            for (let y4=0; y4 < x.points; y4++) {
              result = 1- Math.pow( ((y4-(x.points/2)) / (x.points / 2) )  ,2) 
              accum.push(result);
           }
            break;
          case "Sine":
            for (let y5=0; y5 < x.points; y5++) {
              result = Math.sin( (Math.PI*y5) / x.points);
              accum.push(result);
           }
            break;
            case "Tukey":
              let stop = (x.points * x.alpha) / 2;
              stop = Math.round(stop);
              
              //from 0 to (alpha*N)/2
            for (let y6=0; y6 < stop; y6++) {
              result = (1 - Math.cos( (2 * Math.PI * y6) / (x.points * x.alpha))) * 0.5;
              accum.push(result);
             }
             //from (alpha*N)/2 to n/2
             let stop2 = x.points / 2;
             for(let y7=stop; y7 < stop2; y7++) {
              accum.push(1);  
             }
             ///mirror 
             let mirrorArray = Array.from(accum);
             
            for(let y8=stop2; y8 > 0; y8--) {
              accum.push( mirrorArray[y8-1]);  
             }
            break;
        default:
          console.log('NO variants to process');
    }

    if (accum.length > 0) {

        accum.forEach(function (currentValue,index) {
        outString += currentValue.toPrecision(3) + ', ';
          if ( index % 6 === 0) {
              outString += '\n';
          }
      });

      outString +='};';
      return {str:outString, num:Array.from(accum)};
    } else {

         return null;

    }
     
  }

  export {calc};