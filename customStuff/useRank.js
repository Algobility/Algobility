import { useUser } from "./useDB";

  function capitalizeFirstCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    const firstChar = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return `${firstChar}${restOfString}`;
  }
  function removeLastCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    return str.slice(0, -1);
  }


 const useRank = (userData, signedState, callback)=>{
  
  if(signedState == false){
    callback('Iron')
  }
  else{
    if (userData.cRank != 'loading') {
        if (userData.cRank == 'unranked') { // use p rank if c unranked
          if (userData.pRank != 'unranked') 
            callback(capitalizeFirstCharacter(userData.pRank))
        } else {    //otherwise use c rank
            callback(capitalizeFirstCharacter(removeLastCharacter(userData.cRank)))
        }
      }
}}

export default useRank