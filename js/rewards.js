var dbStockList = "";
var dbScorePoint = "";
var dbRedeemLog = "";
var dbProfile = "";
var EidStockList = "";
var EidScorePoint = "";
var EidProfile = "";
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



$(document).ready(function () {
  var str = "";
  str += '<div class="redeem-headerpoint">คุณมีเหรียญที่จะใช้แลกอยู่ <b><font color="#0056ff">'+ sessionStorage.getItem("RP") +'</font></b> เหรียญรางวัล</div>';
  $("#DisplayPoint").html(str);
  //alert(sessionStorage.getItem("RP"));
  Connect_DB();
  DisplayStockList();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbStockList = firebase.firestore().collection("StockList");
  dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbRedeemLog = firebase.firestore().collection("RedeemLog");
  dbProfile = firebase.firestore().collection("CheckProfile");
}



function DisplayStockList() {
	var str = "";
  var xRatio  = 45;
  	dbStockList.where('StockStatus','==',1)
  	.orderBy('StockGroup','asc')
    .orderBy('PointRedeem','asc')
	  .get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			EidStockList = doc.id;
      xRatio = (sessionStorage.getItem("RP")/doc.data().PointRedeem)*100;
      if(xRatio>=100) { xRatio=100; }
			//sBadgeTarget = doc.data().BadgeTarget;
			str += '<div class="game-redeem" onclick="RedeemGift(\''+ doc.id +'\')">';
      str += '<div style="height:111px">';
			str += '<div style="padding:5px;"><img src="'+ doc.data().StockImg +'" width="65px"></div>';
			str += '<div class="game-redeemtxt">'+ doc.data().StockNameweb +'</div></div>';
      if(xRatio<100) {
        str += '<div style="height:8px;"><div class="progress-bar" style="margin:2px 0 0 0;width:100%;">';
        str += '<div class="progress" data-percent="'+xRatio+'" data-color="red" style="width:'+xRatio+'%;background:#ff0000;"><span>'+xRatio+'%</span></div>'; 
        str += '</div></div>';
      } else {
        str += '<div style="height:8px;"><div class="progress-bar" style="margin:2px 0 0 0;width:100%;">';
        str += '<div class="progress" data-percent="'+xRatio+'" data-color="green" style="width:'+xRatio+'%;background:#00f63a;"><span>'+xRatio+'%</span></div>'; 
        str += '</div></div>';
      }

      if(doc.data().StockItems==0) {
        str += '<div class="game-redeem-point" style="background:#000;">';
        str += '<div style="padding-top:8px;"><span class="text10">สินค้าหมด</div>';
        //str += '<div><span class="text10">แลก</span> '+ doc.data().PointRedeem +' <span class="text10">เหรียญรางวัล</span></div>';
        str += '</div>';
      } else {
        str += '<div class="game-redeem-point">';
        str += '<div><span class="text10">คงเหลือ</span> '+ doc.data().StockItems +' <span class="text10">รายการ</span></div>';
        str += '<div><span class="text10">แลก</span> '+ doc.data().PointRedeem +' <span class="text10">เหรียญรางวัล</span></div>';
        str += '</div>';
      }

      str += '</div>';
		});
		$("#DisplayListAll").html(str);
	});	

}



function RedeemGift(x) {
	var str = "";
  dbStockList.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //EidStockList = doc.id;
      sStockImg = doc.data().StockImg;
      sStockName = doc.data().StockName;
      sStockItems = doc.data().StockItems;
      sStockRedeem = doc.data().StockRedeem;
      sPointRedeem = doc.data().PointRedeem;
      sStockItems = doc.data().StockItems;
      str += '<div style="margin-top:10px;">';
      str += '<div class="redeem-header">แลกของรางวัล</div>';
      str += '<div class="redeem-headerpoint">คุณมีเหรียญที่จะใช้แลกอยู่ <b><font color="#0056ff">'+ sessionStorage.getItem("RP") +'</font></b> เหรียญรางวัล</div>';
      str += '<div><img src="'+ doc.data().StockImg +'" width="200px"></div>';
      str += '<div class="redeem-stock">'+ doc.data().StockName +'</div>';
      str += '<div style="width:300px;margin:auto;text-align: left;">';
      str += '<div class="redeem-txt1">มูลค่าสินค้าต่อชิ้น</div>';
      str += '<div class="redeem-txt2">'+ doc.data().StockValue +' บาท</div>';
      str += '<div class="redeem-txt1">สินค้าคงเหลือ</div>';
      str += '<div class="redeem-txt2">'+ doc.data().StockItems +' รายการ</div>';
      str += '<div class="redeem-txt1">เหรียญที่ใช้แลก</div>';
      str += '<div class="redeem-txt2">'+ doc.data().PointRedeem +' เหรียญรางวัล</div></div><div class="clr"></div>';
      if(doc.data().StockItems==0) {
          str += '<div class="btn-t0" style="background:#000000;margin-top:20px;cursor:default;">สินค้าหมด</div>';
      } else {
        if(sessionStorage.getItem("RP")>=doc.data().PointRedeem) {
          str += '<div class="btn-t1" onclick="ExchangeGift(\''+ x +'\')" style="margin-top:20px;">แลกของรางวัล</div>';
        } else {
          str += '<div class="btn-t0" style="margin-top:20px;">คะแนนไม่พอ</div>';
        }
      }
      str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ยกเลิก</div></div>';
    });
    $("#DisplayByItem").html(str);
  });
  document.getElementById('id01').style.display='block';
}


var PointAfterRedeem = 0;
function ExchangeGift(x) {
  var str = "";
  //document.getElementById("phone").value = sessionStorage.getItem("EmpPhone");
  PointAfterRedeem = (sessionStorage.getItem("RP")-sPointRedeem).toFixed(2);
  //var sAdd = sessionStorage.getItem("Address"); 
  //alert(sessionStorage.getItem("Address"));
  //document.getElementById("address").value = sAdd;
  if(x!="") {
    str += '<div style="margin-top:10px;">';
    str += '<div class="redeem-header">ยืนยันการแลกของรางวัล</div>';
    str += '<div><img src="'+ sStockImg +'" width="200px"></div>';
    str += '<div class="redeem-stock">'+ sStockName +'</div>';
    //str += '<div class="redeem-headerpoint" style="color:#000;">ระบบจะตัดเหรียญรางวัล <font color="#0056ff">'+ sPointRedeem +' เหรียญ</font> ของคุณ<br>';
    //str += 'คุณจะมีเหรียญคงเหลือ <font color="#0056ff">'+ (sessionStorage.getItem("RP")-sPointRedeem).toFixed(2) +' เหรียญ</font></div>';
    str += '<div style="width:300px;margin:auto;text-align: left;">';
    str += '<div class="redeem-txt1">ระบบจะตัดเหรียญ</div>';
    str += '<div class="redeem-txt2">'+ sPointRedeem +' เหรียญรางวัล</div>';
    str += '<div class="redeem-txt1">เหรียญของคุณ</div>';
    str += '<div class="redeem-txt2">'+ sessionStorage.getItem("RP") +' เหรียญรางวัล</div>';
    str += '</div><div class="clr"></div>';
    str += '<div style="width:300px;margin:auto;text-align: left;">';
    str += '<div style="width:100%;padding:20px 0 5px 5px;">กรุณาระบุ <font color="#ff0000"><b>ที่อยู่สาขา</b></font> ในการจัดส่งของรางวัล</div>';
    str += '<div style="color:#0056ff;"><textarea id="address" placeholder="ที่อยู่สาขาสำหรับการจัดส่งของรางวัล .." style="height:80px;font-size:12px; line-height:1.3;">'+sessionStorage.getItem("Address")+'</textarea></div>';
    str += '<div>โทรศัพท์มือถือ</div><div style="color:#0056ff;"><input type="text" name="phone" id="phone" pattern="[+-]?[0-9]" value="'+ sessionStorage.getItem("EmpPhone") +'"></div>';

    str += '<div class="btn-t1" onclick="CheckStock(\''+ x +'\')" style="margin-top:20px;">ยืนยันแลกรางวัล</div>';
    str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ยกเลิก</div></div>';
    str += '</div></div>';
  }
  $("#DisplayByItem").html(str);
}


function CheckStock(x) {
  sAddress = document.getElementById("address").value;
  sPhone = document.getElementById("phone").value;
  ProfileUpdate();
  dbStockList.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidStockList = doc.id;
      if(doc.data().StockItems>0) {
        sStockItems = doc.data().StockItems;
        sStockRedeem = doc.data().StockRedeem;
        UpdateStock(doc.id);
      } else {
        alert("รายการของรางวัลนี้หมดแล้ว");
      }
    });
  });
}


function ProfileUpdate() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidProfile = doc.id;
    });
  });
}


function UpdateStock(x) {
  //alert(x);
  dbStockList.doc(x).update({
    StockItems : (sStockItems-1),
    StockRedeem : (sStockRedeem+1)
  });
  dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      UpdateScorePoint();
    });
  });
}



function UpdateScorePoint() {
  var str = "";
  var TimeStampDate = Math.round(Date.now() / 1000);
  //alert(EidScorePoint);
  dbScorePoint.doc(EidScorePoint).update({
    RewardsRP : parseFloat(PointAfterRedeem),
    StockRedeem : (sStockRedeem+1)
  });
  alert(EidProfile+"==="+sAddress+"==="+sPhone);
  dbProfile.doc(EidProfile).update({
    empAddress : sAddress,
    empPhone : sPhone
  });
  dbRedeemLog.add({
    LineID : sessionStorage.getItem("LineID"),
    linename : sessionStorage.getItem("LineName"),
    empPicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    EmpName : sessionStorage.getItem("EmpName"),
    EmpPhone : sessionStorage.getItem("EmpPhone"),
    EmpAddress : sAddress,
    StockName : sStockName,
    StockImg : sStockImg,
    PointRedeem : sPointRedeem,
    PointIn : parseFloat(sessionStorage.getItem("RP")),
    PointOut : PointAfterRedeem,
    //PointRedeem : PointAfterRedeem,
    DateRedeem : today,
    StatusOrder : 1, // 1. สั่งซื้อ 2. อยู่ระหว่างการจัดส่ง 3.จัดส่งแล้ว 4. ยืนยันการรับของ
    StatusOrder : 0, // 0. อยู่ระหว่างการดำเนินการ  1. เรียบร้อยแล้ว
    TimeStamp : TimeStampDate
  });

  str += '<div style="margin-top:10px;">';
  str += '<div class="redeem-header">ระบบทำรายการเรียบร้อยแล้ว</div>';
  str += '<div><img src="'+ sStockImg +'" width="200px"></div>';
  str += '<div class="redeem-stock">'+ sStockName +'</div>';
  str += '<div style="width:300px;margin:auto;text-align: left;">';
  str += '<div class="redeem-txt1">ระบบตัดเหรียญ</div>';
  str += '<div class="redeem-txt2">'+ sPointRedeem +' เหรียญรางวัล</div>';
  str += '<div class="redeem-txt1">เหรียญคงเหลือ</div>';
  str += '<div class="redeem-txt2">'+ PointAfterRedeem +' เหรียญรางวัล</div>';
  str += '</div><div class="clr"></div>';
  str += '<div style="width:300px;margin:auto;text-align: left;">';
  str += '<center><div style="width:100%;padding:20px 0 5px 5px;color:#000;"><b>ระบบได้ทำการบันทึกรายการการแลกของรางวัล<br>และจะดำเนินการจัดส่งให้ท่านต่อไป</b></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div></center></div>';
  str += '</div></div>';
  $("#DisplayByItem").html(str);
  sessionStorage.setItem("EmpPhone", sPhone)
  sessionStorage.setItem("Address", sAddress)
  sessionStorage.setItem("RP", parseFloat(PointAfterRedeem).toFixed(2));
  var str1 += '<div class="redeem-headerpoint">คุณมีเหรียญที่จะใช้แลกอยู่ <b><font color="#0056ff">'+ sessionStorage.getItem("RP") +'</font></b> เหรียญรางวัล</div>';
  $("#DisplayPoint").html(str1);
  //alert(PointAfterRedeem);
  DisplayStockList();
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function phone_formatting(ele,restore) {
  var new_number,
      selection_start = ele.selectionStart,
      selection_end = ele.selectionEnd,
      number = ele.value.replace(/\D/g,'');
  
  // automatically add dashes
  if (number.length > 2) {
    // matches: 123 || 123-4 || 123-45
    new_number = number.substring(0,3) + '-';
    if (number.length === 4 || number.length === 5) {
      // matches: 123-4 || 123-45
      new_number += number.substr(3);
    }
    else if (number.length > 5) {
      // matches: 123-456 || 123-456-7 || 123-456-789
      new_number += number.substring(3,6) + '-';
    }
    if (number.length > 6) {
      // matches: 123-456-7 || 123-456-789 || 123-456-7890
      new_number += number.substring(6);
    }
  }
  else {
    new_number = number;
  }
  
  // if value is heigher than 12, last number is dropped
  // if inserting a number before the last character, numbers
  // are shifted right, only 12 characters will show
  ele.value =  (new_number.length > 12) ? new_number.substring(12,0) : new_number;
  
  // restore cursor selection,
  // prevent it from going to the end
  // UNLESS
  // cursor was at the end AND a dash was added
  document.getElementById('msg').innerHTML='<p>Selection is: ' + selection_end + ' and length is: ' + new_number.length + '</p>';
  
  if (new_number.slice(-1) === '-' && restore === false
      && (new_number.length === 8 && selection_end === 7)
          || (new_number.length === 4 && selection_end === 3)) {
      selection_start = new_number.length;
      selection_end = new_number.length;
  }
  else if (restore === 'revert') {
    selection_start--;
    selection_end--;
  }
  ele.setSelectionRange(selection_start, selection_end);

}
  
function phone_number_check(field,e) {
  var key_code = e.keyCode,
      key_string = String.fromCharCode(key_code),
      press_delete = false,
      dash_key = 189,
      delete_key = [8,46],
      direction_key = [33,34,35,36,37,38,39,40],
      selection_end = field.selectionEnd;
  
  // delete key was pressed
  if (delete_key.indexOf(key_code) > -1) {
    press_delete = true;
  }
  
  // only force formatting is a number or delete key was pressed
  if (key_string.match(/^\d+$/) || press_delete) {
    phone_formatting(field,press_delete);
  }
  // do nothing for direction keys, keep their default actions
  else if(direction_key.indexOf(key_code) > -1) {
    // do nothing
  }
  else if(dash_key === key_code) {
    if (selection_end === field.value.length) {
      field.value = field.value.slice(0,-1)
    }
    else {
      field.value = field.value.substring(0,(selection_end - 1)) + field.value.substr(selection_end)
      field.selectionEnd = selection_end - 1;
    }
  }
  // all other non numerical key presses, remove their value
  else {
    e.preventDefault();
//    field.value = field.value.replace(/[^0-9\-]/g,'')
    phone_formatting(field,'revert');
  }

}
/*
document.getElementById('phone').onkeyup = function(e) {
  phone_number_check(this,e);
}
*/
