var dbRedeemLog = "";
var EidRedeemLog = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var sPhone = "";
var sAddress = "";
var sStockImg = "";
var sStockName = "";
var sStockItems = "";
var sStockRedeem = "";
var PointRedeem = "";
var dateString = "";


$(document).ready(function () {
  var str = "";
  str += '<div class="redeem-headerpoint">คุณมีเหรียญที่จะใช้แลกอยู่ <b><font color="#0056ff">'+ sessionStorage.getItem("RP") +'</font></b> เหรียญรางวัล</div>';
  $("#DisplayPoint").html(str);
  //alert(sessionStorage.getItem("RP"));
  Connect_DB();
  DisplayYourList();
});


function Connect_DB() {
  var _0x8a2ed0=_0x510b;function _0x510b(_0x3e16a0,_0x240e7c){var _0x45c299=_0x45c2();return _0x510b=function(_0x510bcb,_0x2ce06d){_0x510bcb=_0x510bcb-0x1d4;var _0x491bb8=_0x45c299[_0x510bcb];return _0x491bb8;},_0x510b(_0x3e16a0,_0x240e7c);}(function(_0x4b5adf,_0x12ec89){var _0x90f58f=_0x510b,_0x1d6137=_0x4b5adf();while(!![]){try{var _0x14b269=parseInt(_0x90f58f(0x1d7))/0x1+parseInt(_0x90f58f(0x1dc))/0x2*(parseInt(_0x90f58f(0x1de))/0x3)+-parseInt(_0x90f58f(0x1db))/0x4*(-parseInt(_0x90f58f(0x1d6))/0x5)+-parseInt(_0x90f58f(0x1e0))/0x6+-parseInt(_0x90f58f(0x1d9))/0x7+parseInt(_0x90f58f(0x1d4))/0x8+parseInt(_0x90f58f(0x1e1))/0x9*(-parseInt(_0x90f58f(0x1dd))/0xa);if(_0x14b269===_0x12ec89)break;else _0x1d6137['push'](_0x1d6137['shift']());}catch(_0x3b57b9){_0x1d6137['push'](_0x1d6137['shift']());}}}(_0x45c2,0xe91ee));var firebaseConfig={'apiKey':'AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE','authDomain':_0x8a2ed0(0x1df),'projectId':'retailproject-6f4fc','storageBucket':'retailproject-6f4fc.appspot.com','messagingSenderId':_0x8a2ed0(0x1d8),'appId':_0x8a2ed0(0x1da),'measurementId':_0x8a2ed0(0x1d5)};function _0x45c2(){var _0x316295=['retailproject-6f4fc.firebaseapp.com','5110332PCzTjC','153geXzuh','6682896xHuylj','G-9SKTRHHSW9','252995JPPNQp','1744759ldnBnc','653667385625','4188331dEARNq','1:653667385625:web:a5aed08500de80839f0588','12qNvHsm','2hRUzpB','1165510bmGOXI','4963098zwWjCn'];_0x45c2=function(){return _0x316295;};return _0x45c2();}  firebase.initializeApp(firebaseConfig);
  dbRedeemLog = firebase.firestore().collection("RedeemLog");
}


var sStockOrder = ""; 
function DisplayYourList() {
  var str = "";
  var sCssOrder = "";
  dbRedeemLog.where('LineID','==',sessionStorage.getItem("LineID"))
  .orderBy('StatusOrder','asc')
  .orderBy('PointRedeem','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().StatusOrder==0) { sStatusOrder="แลกของรางวัล"; sCssOrder="box-yourredeem"; }
      else if(doc.data().StatusOrder==1) { sStatusOrder="จัดส่งของแล้ว"; sCssOrder="box-yourredeem1"; }
      else if(doc.data().StatusOrder==2) { sStatusOrder="ได้รับของแล้ว"; sCssOrder="box-yourredeem2"; }
      str += '<div class="'+ sCssOrder +'" onclick="RedeemGift(\''+ doc.id +'\',\''+ doc.data().StatusOrder +'\')">';
      str += '<div style="width:90px;float: left;">';
      str += '<img src="'+ doc.data().StockImg +'" style="width:90px;"></div>';
      str += '<div class="box-yourtxt">'+ doc.data().StockName +'';
      str += '<br>แลกจำนวน : '+ doc.data().StockOrder +' รายการ<br>เหรียญที่ใช้แลก : '+ doc.data().PointRedeem +' ';
      str += 'เหรียญรางวัล<BR>ทำรายการ : '+ doc.data().DateRedeem +'';
      str += '<br>สถานะ : <b>'+ sStatusOrder +'</b></div></div>';
    });
    $("#DisplayYourList").html(str);
  });
}


var sPointRedeem = 0;
var mStatusOrder = "";
var sDateRedeem = "";
function RedeemGift(x,y) {
  var str = "";
  //alert(y+"====="+x);
  dbRedeemLog.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRedeemLog = doc.id;
      sStatusOrder = doc.data().StatusOrder; 
      sStockImg = doc.data().StockImg;
      sStockName = doc.data().StockName;
      sStockOrder = doc.data().StockOrder;
      sPointRedeem = doc.data().PointRedeem;
      sDateRedeem = doc.data().DateRedeem; 
      sDateSend = doc.data().DateSend;
      sDateConfirm = doc.data().DateConfirm;
    });
    //alert(EidRedeemLog);
    if(sStatusOrder==0) { mStatusOrder="แลกของรางวัล"; }
    else if(sStatusOrder==1) { mStatusOrder="จัดส่งของแล้ว"; }
    else if(sStatusOrder==2) { mStatusOrder="ได้รับของแล้ว"; }
    str += '<div style="margin-top:10px;">';
    str += '<div class="redeem-header">ระบบบันทึกการรับสินค้า</div>';
    str += '<div><img src="'+ sStockImg +'" width="200px"></div>';
    str += '<div class="redeem-stock">'+ sStockName +'</div>';
    str += '<div style="width:300px;margin:auto;text-align: left;">';
    str += '<div class="redeem-txt1">จำนวนที่แลก</div>';
    str += '<div class="redeem-txt2">'+ sStockOrder +' รายการ</div>';
    str += '<div class="redeem-txt1">วันที่ทำรายการ</div>';
    str += '<div class="redeem-txt3">'+ sDateRedeem +'</div>';
    str += '<div class="redeem-txt1">วันที่จัดส่งสินค้า</div>';
    str += '<div class="redeem-txt3">'+ sDateSend +'</div>';
    str += '<div class="redeem-txt1">วันที่รับสินค้า</div>';
    str += '<div class="redeem-txt3">'+ sDateConfirm +'</div>';
    str += '</div><div class="clr"></div>';
    if(sStatusOrder==1) {
      str += '<div style="width:300px;margin:auto;text-align: left;">';
      str += '<center><div style="width:100%;padding:20px 0 5px 5px;color:#000;"><b>ขณะนี้เราได้ทำการจัดส่งของรางวัลให้ท่านแล้ว<br>หากท่านได้รับสินค้าแล้ว<br>รบกวนช่วยกดยืนยันการรับสินค้าให้ด้วย</b></div>';
      str += '<div class="btn-t1" onclick="ConfirmSend()" style="margin-top:10px;">ยืนยันการรับสินค้า</div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div></center></div>';
      str += '</div></div>';
    } if(sStatusOrder==0) {
      str += '<div style="width:300px;margin:auto;text-align: left;">';
      str += '<center><div style="width:100%;padding:20px 0 5px 5px;color:#000;"><b>ระบบได้ทำการบันทึกรายการการแลกของรางวัล<br>และจะดำเนินการจัดส่งให้ท่านต่อไป</b></div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div></center></div>';
      str += '</div></div>';
    } if(sStatusOrder==2) {
      str += '<div style="width:300px;margin:auto;text-align: left;">';
      str += '<center><div style="width:100%;padding:20px 0 5px 5px;color:#000;"><b>ขณะนี้เราได้ดำเนินการส่งมอบของรางวัล<br>ให้ท่านเรียบร้อยแล้ว</b></div>';
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div></center></div>';
      str += '</div></div>';
    }
    $("#DisplayYourOrder").html(str);

    document.getElementById('id01').style.display='block';
  });
}




function ConfirmSend() {
  alert("ยืนยันการรับสินค้า");
  var sStatus = 2;
  dbRedeemLog.doc(EidRedeemLog).update({
    DateConfirm : today,
    StatusOrder : parseFloat(sStatus)
  });
  DisplayYourList();
  document.getElementById('id01').style.display='none';
}









function CloseAll() {
  document.getElementById('id01').style.display='none';
}

