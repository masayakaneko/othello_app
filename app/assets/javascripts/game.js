// $(function(){
  
//   $(document).on('click','button',function() {
//     $(this).toggleClass("btn-black");
//   });
// });

// ここから--------------------------------------------------------------

var clickCount = 0;
var passCount  = 0;
var number = 0;

// 各方向別変数（ヨコ、タテ、ナナメ２種）

var X = 1;
var Y = 16;
var XY = 15;
var mXY = 17;
var directions = [X,Y,XY,mXY]

// ゲームの処理

$(function(){

  // パスをしたときの処理

  $(document).on('click','.pass-btn',function() {
    clickCount++;
    passCount++;
    console.log("パスした回数",passCount);
  })

  // オセロを置いたときの処理

  $(document).on('click','.grid-item',function() {

    // 置いた場所のIDを取得

    var id = $(this).attr('id');
    var selectId = parseInt(id);
    console.log("置いたID", selectId);

    // 白を置いた場合の処理-------------------------------------------------

    if(clickCount%2 == 0){
      $(this).text("●").addClass("white");

        // ８方向をチェックするためののループ

        directions.forEach(function(value){
          var reverseIds = [];
          var upCheckId = selectId + value;
          var downCheckId = selectId - value;

          // 置いたIDより数字が多いIDチェック

          while($(".grid-item" + "#" + upCheckId).hasClass("black")) {
            reverseIds.push(".grid-item" + "#" + upCheckId);
            upCheckId = upCheckId + value;
            console.log("upCheckId",upCheckId);

            // はさめる状況だった場合

            if($(".grid-item" + "#" + upCheckId).hasClass("white")){
              console.log("待機中のIDたち",reverseIds);
              reverseIds.forEach(function(value){
                console.log("要素の値", value)
                $(value).removeClass("black").addClass("white");
              })
            }
          }
          // 置いたIDより数字が少ないIDチェック

          while($(".grid-item" + "#" + downCheckId).hasClass("black")) {
            reverseIds.push(".grid-item" + "#" + downCheckId);
            downCheckId = downCheckId - value;
            console.log("upCheckId",downCheckId);

            // はさめる状況だった場合

            if($(".grid-item" + "#" + downCheckId).hasClass("white")){
              console.log("待機中のIDたち",reverseIds);
              reverseIds.forEach(function(value){
                console.log("要素の値", value)
                $(value).removeClass("black").addClass("white");
              })
            }
          }
          reverseIds.length = 0;
        })
    }

    // 黒を置いた場合の処理-------------------------------------------------

    else{
      $(this).text("●").addClass("black");

        // ８方向をチェックするためののループ

        directions.forEach(function(value){
          var reverseIds = [];
          var upCheckId = selectId + value;
          var downCheckId = selectId - value;

          // 置いたIDより数字が多いIDチェック

          while($(".grid-item" + "#" + upCheckId).hasClass("white")) {
            reverseIds.push(".grid-item" + "#" + upCheckId);
            upCheckId = upCheckId + value;
            console.log("upCheckId",upCheckId);

            // はさめる状況だった場合

            if($(".grid-item" + "#" + upCheckId).hasClass("black")){
              console.log("待機中のIDたち",reverseIds);
              reverseIds.forEach(function(value){
                console.log("要素の値", value)
                $(value).removeClass("white").addClass("black");
              })
            }
          }
        // 置いたIDより数字が少ないIDチェック

          while($(".grid-item" + "#" + downCheckId).hasClass("white")) {
            reverseIds.push(".grid-item" + "#" + downCheckId);
            downCheckId = downCheckId - value;
            console.log("upCheckId",downCheckId);

            // はさめる状況だった場合

            if($(".grid-item" + "#" + downCheckId).hasClass("black")){
              console.log("待機中のIDたち",reverseIds);
              reverseIds.forEach(function(value){
                console.log("要素の値", value)
                $(value).removeClass("white").addClass("black");
              })
            }
          }
          reverseIds.length = 0;
        })
    }

    // 反転の処理後

    clickCount++;
    var gameCount = clickCount - passCount;
    console.log("パスとセルのクリックの合計",clickCount);
    console.log("ゲームカウント",gameCount);
    if(gameCount == 64){
      console.log("ゲーム終了");
    }
  });
});

    //   $(this).text("●").addClass("black");

    //   // ↓黒の処理後------------------------------------
    //   clickCount++;
    //   var gameCount = clickCount - passCount;
    //   console.log("パスとセルのクリックの合計",clickCount);
    //   console.log("ゲームカウント",gameCount);
    //   if(gameCount == 64){
    //     console.log("ゲーム終了");
    //   }
    // }