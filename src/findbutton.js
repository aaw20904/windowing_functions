
/*Author: Andrew Androsowych*/
function findButtonValue (btnSelector='input[type="radio"]') {
let btnList = document.querySelectorAll(btnSelector);
           
         
          let xnode  = null;
          let ar = Array.prototype.slice.call(btnList);
          ar.every((x01)=>{
            if (x01.checked) {
              xnode = x01;
              return false;
            }
            return true;
          });

          return xnode.value;
 }


 export {findButtonValue};
