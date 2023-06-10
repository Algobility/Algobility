// const rankMap = (inp)=>{
//     const map = {
//         'iron1': 'Iron 1',
//         'iron2': 'Iron 2',
//         'iron3': 'Iron 3',
//         'bronze1': 'Bronze 1',
//         'bronze2': 'Bronze 2',
//         'bronze3': 'Bronze 3',
//         'silver1': 'Silver 1',
//         'silver2': 'Silver 2',
//         'silver3': 'Silver 3',
//         'gold1': 'Gold 1',
//         'gold2': 'Gold 2',
//         'gold3': 'Gold 3',
//         'platinum1': 'Platinum 1',
//         'platinum2': 'Platinum 2',
//         'platinum3': 'Platinum 3',
//         'loading': 'Loading ...',
//         'unranked': 'Unranked'
//     }

//     return map[inp]
// }

const prettyCRank = (inp)=>{
    if(inp == 'loading') return 'Loading ...'
    if(inp == 'unranked') return 'Unranked'
    // Extract the word and the number
  const word = inp.slice(0, -1); // Remove the last character (digit)
  const number = inp.slice(-1); // Get the last character (digit)

  // Capitalize the first letter of the word
  const formattedWord = word.charAt(0).toUpperCase() + word.slice(1);

  // Return the formatted string with a space between the word and number
  return formattedWord + ' ' + number;
}

const pretty = (inp)=>{
    return inp.charAt(0).toUpperCase() + inp.slice(1)
}
const unpretty = (inp)=>{
    return inp.charAt(0).toLowerCase() + inp.slice(1);
}

const ranks = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum']
const codedRanks = ['iron', 'bronze', 'silver', 'gold', 'platinum']

export {ranks, codedRanks, pretty, unpretty, prettyCRank};