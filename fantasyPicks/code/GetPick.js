// exports.tests = []
// exports.preconditions = []
// 
// var url = 'https://f6976d9f.ngrok.io/apis/fantasy-picks'; //'http://localhost:8082/apis/fantasy-picks';
// 
// //GetPick
// exports.function = function(players) {
//     var postData = {player1: players[0], player2: players[1]};
//     var DATA = http.postUrl(url, postData, {passAsJson:true}); //require("./lib/mock");
//     console.log(DATA);
//     return DATA;
// //     var id1 = players[0].toString().toLowerCase().split(' ').join('_');
// //     var id2 = players[1].toString().toLowerCase().split(' ').join('_');
// //     
// //     return DATA.map(function(x){
// //       if(x.id.toLowerCase() == id1 || x.id.toLowerCase() == id2){
// //         return x;
// //       }
// //     });
//   
//     // var pick = Math.floor(Math.random() * 1) + 1;
//     // return {
//     //   // pick: 0,
//     //   players: DATA
//     // };
// }