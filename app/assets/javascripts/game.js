
// カウント
var whiteCount = 2;
var blackCount = 2;
// パスカウント
var whitePassCount = 0;
var blackPassCount = 0;
// トータルクリックカウント
var totalClickCount = 4;
// トータルパスカウント
var totalPassCount  = whitePassCount + blackPassCount;

// 各方向別変数（ヨコ、タテ、ナナメ２種）
const X = 1;
const Y = 16;
const XY = 15;
const mXY = 17;
var directions = [X,Y,XY,mXY];
// 石の見た目
var stones = ["●","■","◆","▲","◀︎","▼","▶︎","★"];

//時間カウント
var min = 0;
var tenSec = 0;
var sec = 0;
var tithe = 0; 
var Hundredth = 0;

// ゲームの処理
$(function(){
  var stoneNum = 0;
  var stone = stones[stoneNum];
  // 初期配置
  $("#52").text(stone).addClass("white")
  $("#53").text(stone).addClass("black")
  $("#69").text(stone).addClass("white")
  $("#68").text(stone).addClass("black")

  //タイマー１分
  var countMin = function() {
    min++;
    if(min < 10)
    $("#timeMin").text("0" + min)
    else{
      min = 0;
      $("#timeMin").text("0" + min) 
    }
  }
  //タイマー10秒
  var countTenSec = function() {
    tenSec++;
    if(tenSec < 6){
      $("#timeTenSec").text(tenSec)
    }else{
      tenSec = 0;
      $("#timeTenSec").text(tenSec)
    }
  }
  //タイマー1秒

  var countSec = function() {
    sec++;
    if(sec < 10){
      $("#timeSec").text(sec)
    }else{
      sec = 0;
      $("#timeSec").text(sec)
    }
  }
  //タイマー0.1秒
  var countTithe = function() {
    tithe++;
    if(tithe == 10)
      tithe = 0;
    $("#timeTithe").text(tithe)
  }
  //タイマー0.01秒
  var countHundredth = function() {
    Hundredth++;
    if(Hundredth == 10)
      Hundredth = 0;
    $("#timeHundredth").text(Hundredth)
  }

//スタートボタン(ゲームフィールドを出す)
$(document).on('click','.startButton',function() {

  var blackName = $('.inputNameBlack').val()
                  $(".player-black-name").text(blackName)
  var whiteName = $('.inputNameWhite').val()
                  $(".player-white-name").text(whiteName)

  //トップページを消す
  $('.pageTop').remove();
    setInterval(countMin,60000);
    setInterval(countTenSec,10000);
    setInterval(countSec,1000);
    setInterval(countTithe,100);
    setInterval(countHundredth,10);
  })

  //チェンジボタン
  $(document).on('click','.changeButton',function() {
    stoneNum++;
    stone = stones[stoneNum];
    $("#52 ,#69").text(stone)
    $("#53, #68").text(stone)
    if(stoneNum > 6){
      stoneNum = -1;
    }
  })

  //ゲームリセットボタン
  $(document).on('click','.resetBtn',function() {
    location.reload();
    whitePassCount = 0;
    blackPassCount = 0;
    totalClickCount = 4;
  })

  // パスをしたときの処理
  $(document).on('click','.pass-btn',function() {
    if(totalClickCount%2 == 0){
      blackPassCount++;
      totalClickCount++;
      $(".pass-btn").toggleClass("turnBlack");
      console.log("黒がパスした回数",blackPassCount);
      console.log("this",this);
    }else{
      whitePassCount++;
      totalClickCount++;
      $(".pass-btn").toggleClass("turnBlack");
      console.log("白がパスした回数",whitePassCount);
      console.log("this",this);
    }

    //ターンプレイヤー点灯
    $(".player-white").toggleClass("turnPlayer");
    $(".player-black").toggleClass("turnPlayer");
  })

  // オセロを置いたときの処理
  $(document).on('click','.grid-item',function() {

    // 置いた場所のIDを取得
    var id = $(this).attr('id');
    var selectId = parseInt(id);
    console.log("置いたID", selectId);

    // ひっくり返す個数(０のときに置けない処理する用の関数)
    var reverseCount = 0;

    // 黒を置いた場合の処理
    if(totalClickCount%2 == 0){
      $(this).text(stone).addClass("black");
        blackCount++;

        // ８方向をチェックするためののループ
        directions.forEach(function(value){
          var reverseIds = [];
          var upCheckId = selectId + value;
          var downCheckId = selectId - value;

          // 置いたIDより数字が多いIDチェック
          while($("#" + upCheckId).hasClass("white")) {
            reverseIds.push("#" + upCheckId);
            upCheckId = upCheckId + value;

            // はさめる黒がある場合
            if($("#" + upCheckId).hasClass("black")){
              console.log("待機中のIDたち",reverseIds);
              console.log("待機中のID数",reverseIds.length);
              whiteCount -= reverseIds.length;
              blackCount += reverseIds.length;
              reverseIds.forEach(function(value){
                reverseCount++;
                $(value).removeClass("white").addClass("black");
              })
            }
          }

          // 置いたIDより数字が少ないIDチェック
          while($("#" + downCheckId).hasClass("white")) {
            reverseIds.push("#" + downCheckId);
            downCheckId = downCheckId - value;

            // はさめる状況だった場合
            if($("#" + downCheckId).hasClass("black")){
              console.log("待機中のIDたち",reverseIds);
              console.log("待機中のID数",reverseIds.length);
              whiteCount -= reverseIds.length;
              blackCount += reverseIds.length;
              reverseIds.forEach(function(value){
                reverseCount++;
                $(value).removeClass("white").addClass("black");
              })
            }
          }
        })

        // 置けないときの処理
        console.log("黒reverseCount",reverseCount);
        if(reverseCount == 0){
          $("#" + selectId).text("").removeClass("black");
          totalClickCount++;
          blackCount--;
          $(".player-white").toggleClass("turnPlayer");
          $(".pass-btn").toggleClass("turnBlack");
          $(".player-black").toggleClass("turnPlayer");
        }
    }

    // 白を置いた場合の処理
    else{
      $(this).text(stone).addClass("white");
        whiteCount++;

        // ８方向をチェックするためののループ
        directions.forEach(function(value){
          var reverseIds = [];
          var upCheckId = selectId + value;
          var downCheckId = selectId - value;
          // 置いたIDより数字が多いIDチェック

          while($("#" + upCheckId).hasClass("black")) {
            reverseIds.push("#" + upCheckId);
            upCheckId = upCheckId + value;

            // はさめる状況だった場合

            if($("#" + upCheckId).hasClass("white")){
              console.log("待機中のIDたち",reverseIds);
              console.log("待機中のID数",reverseIds.length);
              whiteCount += reverseIds.length;
              blackCount -= reverseIds.length;
              reverseIds.forEach(function(value){
                reverseCount++;
                $(value).removeClass("black").addClass("white");
              })
            }
          }

          // 置いたIDより数字が少ないIDチェック

          while($("#" + downCheckId).hasClass("black")) {
            reverseIds.push("#" + downCheckId);
            downCheckId = downCheckId - value;

            // はさめる状況だった場合
            if($("#" + downCheckId).hasClass("white")){
              console.log("待機中のIDたち",reverseIds);
              console.log("待機中のID数",reverseIds.length);
              whiteCount += reverseIds.length;
              blackCount -= reverseIds.length;
              reverseIds.forEach(function(value){
                reverseCount++;
                $(value).removeClass("black").addClass("white");
              })
            }
          }
        })

        // 置けない時の処理
        console.log("黒reverseCount",reverseCount);
        if(reverseCount == 0){
          $("#" + selectId).text("").removeClass("white");
          totalClickCount++;
          whiteCount--;

          $(".player-white").toggleClass("turnPlayer");
          $(".pass-btn").toggleClass("turnBlack");
          $(".player-black").toggleClass("turnPlayer");
        }
    }

    // 反転の処理後
    // カウンター表示機能
    $("#whiteCounter").html(whiteCount);
    $("#blackCounter").html(blackCount);

    //ターンプレイヤー点灯
    $(".player-white").toggleClass("turnPlayer");
    $(".pass-btn").toggleClass("turnBlack");
    $(".player-black").toggleClass("turnPlayer");

    //ゲームセット処理
    totalClickCount++;
    var gameCount = whiteCount + blackCount;
    console.log("パスとセルのクリックの合計",totalClickCount);
    console.log("パスとセルのクリックの合計",totalPassCount);
    console.log("ゲームカウント",gameCount);
    if(gameCount == 64){
      console.log("ゲーム終了");
      if(whiteCount > blackCount){
        $("#whiteCounter").html("win");
        $("#blackCounter").html("lose");
        $(".player-white").addClass("turnPlayer");
        $(".player-black").removeClass("turnPlayer");
        $(".timeResult").html(("0" + min + ":") + tenSec + sec + ("." + tithe + "0"));
        $(".timeWrap").remove()
      }else{
        $("#whiteCounter").html("lose");
        $("#blackCounter").html("win");
        $(".player-white").removeClass("turnPlayer");
        $(".player-black").addClass("turnPlayer");
        $(".timeResult").html(("0" + min + ":") + tenSec + sec + ("." + tithe + "0"));
        $(".timeWrap").remove()
      }
      
    }
  });
});








