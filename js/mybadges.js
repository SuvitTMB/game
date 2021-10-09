var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
var sJoinTime = 0;
var sUserLevel = 0;
var EidScorePoint = "";
var sNewMember = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dbScorePoint = "";
var dbBadgeGame = "";
//var dbBadgeUser = "";



$(document).ready(function () {
  dbBadgeGame = firebase.firestore().collection("BadgeGame");
  dbBadgeUser = firebase.firestore().collection("BadgeUser");
  //Connect_DB();
  //GetBadgeUser();
  GetBadgeUser();
  AllBadge();
});
 

/*
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
  //dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbBadgeGame = firebase.firestore().collection("BadgeGame");
  dbBadgeUser = firebase.firestore().collection("BadgeUser");
  GetBadgeUser();
  Badge();
}
*/

var BadgeArr = [];
var BadgeArr1 = [];
var UserBadgeArr = [];
var UserBadgeArr1 = [];



function GetBadgeUser() {
	var i = 0;
	var str = "";
  	dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			if(doc.data().BadgeEnd=1) {
				UserBadgeArr1.push(doc.data().BadgeEng);
			}
			UserBadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTime, doc.data().BadgeEnd]);
			//console.log(BadgeArr1.indexOf(doc.data().BadgeEng));
		});
		$("#DisplayUserBadge").html(str); 
		console.log(UserBadgeArr1);
	});
}


function AllBadge() {
	var i = 0;
	var str = "";
	var calbar = 0;
  	dbBadgeGame.orderBy('BadgeNo','asc')
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			BadgeArr1.push(doc.data().BadgeEng);
			BadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTh, doc.data().BadgeImg, doc.data().BadgeDetail, doc.data().BadgeTarget, doc.data().memo, doc.data().BadgePoint, doc.data().BonusPoint]);
			//console.log(UserBadgeArr1.indexOf(doc.data().BadgeEng));
			//alert(UserBadgeArr[0][0]);
			//console.log(UserBadgeArr);
			if(UserBadgeArr1.indexOf(doc.data().BadgeEng)>=0) {
				calbar = (UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][2]/doc.data().BadgeTarget)*100;
				if(calbar>100) { calbar = 100; }
				//alert(UserBadgeArr[i][3]);
				if(UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][3]==1) {
					str += '<div class="box-badges" onclick="ShowBadges('+i+',1,'+calbar+')">';
					str += '<div><img src="'+ doc.data().BadgeImg +'" class="badges-img"></div>';
					str += '<div class="badges-txt">'+ doc.data().BadgeTh+'</div>';
					str += '<center><div class="progress-bar">';
					str += '<div class="progress" data-percent="70" data-color="green" style="width:'+calbar+'%;background:#00f63a;"><span>'+calbar+'%</span></div>'; 
					str += '</div></center>';
					//str += '<div>'+ doc.data().BadgeTarget+'==='+UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][2]+'</div>';
					str += '</div>';
				} else {
					str += '<div class="box-badges badges-gray" onclick="ShowBadges('+i+',1,'+calbar+')">';
					str += '<div><img src="'+ doc.data().BadgeImg +'" class="badges-img"></div>';
					str += '<div class="badges-txt">'+ doc.data().BadgeTh+'</div>';
					str += '<center><div class="progress-bar">';
					str += '<div class="progress" data-percent="70" data-color="#fff" style="width:'+calbar+'%;background:#ff0000;"><span>'+calbar+'%</span></div>'; 
					str += '</div></center>';
					//str += '<div>'+UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][2]+'==='+ doc.data().BadgeTarget+'</div>';
					str += '</div>';
				}
			} else {
				str += '<div class="box-badges badges-gray" onclick="ShowBadges('+i+',0)">';
				str += '<div><img src="'+ doc.data().BadgeImg +'" class="badges-img"></div>';
				str += '<div class="badges-txt">'+ doc.data().BadgeTh+'</div></div>';
			}
			i = i+1;
		});
		//var str1 = "";
		//str1 += '<center><div class="progress-bar">';
		//str1 += '<div class="progress" data-percent="70" data-color="green" name="sss'+i+'"><span>70%</span></div>';
		//str1 += '</div></center>';
		//$("#DisplayBadge2").html(str1); 


		//$(".progress-bar").ProgressBar();
		$("#DisplayBadge").html(str); 
		console.log(UserBadgeArr);
	});
}



function badge(x) {
	str = "";
	if(x==1) {
		//str += '<div class="header-line" style="margin-top:0px;padding:10px;color:#0056ff;font-weight: 600;">ระดับการแข่งขัน</div>';
		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-4.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-level.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ sessionStorage.getItem("Level")+ '</div>';
		str += '<div class="txt-level">ระดับ</div>';
		str += '<div style="padding:15px;">ระดับการแขังขัน หรือ Level หมายถึง การกำหนดให้ผู้แข่งขันอยู่ในช่วงของระดับการแข่งขัน เมื่อผู้แข่งขันได้เก็บประสบการณ์และสามารถทำภารกิจได้ตามเป้าหมายระดับการแข่งขัน (Level) จะถูกปรับระดับใหม่ ยิ่งผู้แข่งขันมีระดับการแข่งขันที่สูงขึ้น ก็หมายถึงระดับความยากก็จะมากยิ่งขึ้นไปด้วย</div>';
	} else if(x==2) {
		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-5.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-score.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ numberWithCommas(sessionStorage.getItem("XP")) + '</div>';
		str += '<div class="txt-level">แต้ม</div>';
		str += '<div style="padding:15px;">แต้มประสบการณ์ หรือ Experience Point(XP) เป็นแต้มสำหรับการสะสมประสบการณ์ในการแข่งขัน โดยผู้เข้าแข่งขันจะได้รับแต้มได้ เมื่อเข้าเก็บการแข่งขันในแต่ละวันที่ทางผู้จัดการแข่งขันได้กำหนดไว้ โดยทุก ๆ แต้มที่สะสมไว้จะบ่งบอกถึงประสบการณ์การเข้ามาร่วมกิจกรรม ยิ่งสะสมมาก แต้มประสบการณ์จะสูงขึ้น และจะส่งผลให้ ระดับการแข่งขัน (Level) ของผู้แข่งขันมากขึ้นไปด้วย</div>';
	} else if(x==3) {
		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-6.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-point.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ numberWithCommas(sessionStorage.getItem("RP")) + '</div>';
		str += '<div class="txt-level">แต้ม</div>';
		str += '<div style="padding:15px;">เหรียญรางวัล หรือ Rewards Point (RP) เป็นเหรียญสำหรับการเก็บสะสมไว้เพื่อใช้ในการแลกของรางวัลจากรายการของรางวัลที่ทางผู้จัดกิจกรรมกำหนดไว้ แต่จะสามารถทำการแลกของรางวัลได้ก็ต่อเมื่อสามารถเก็บเหรียญรางวัลได้เท่ากับหรือมากกว่าของรางวัลรายการนั้น ๆ ที่ได้กำหนดไว้ และเมื่อทำการแลกของรางวัลไปแล้ว เหรียญรางวัลนี้จะถูกหักออกไปในมูลค่าเท่ากับของที่ได้ทำการแลกรางวัลมา</div>';
	}
	$("#BadgeDetail").html(str);  
 	document.getElementById('id05').style.display='block';
}

//function getData(doc) {
//	UserBadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTime, doc.data().BadgeEnd]);
//}


function ShowBadges(x,y,z) {
	//alert(BadgeArr[x][0]);
	//alert(x);
	var str = "";
	if(y==1) {
		str += '<div>';
		str += '<div class="header-line" style="margin-top:10px;color:#0056ff;font-weight: 600;">'+ BadgeArr[x][2] +'</div>';
		str += '<div style="padding:15px"><img src="'+ BadgeArr[x][3] +'" width="80%"></div>';
		str += '<center><div class="progress-bar">';
		str += '<div class="progress" data-percent="70" data-color="green" style="width:'+z+'%;background:#00f63a;"><span>'+z+'%</span></div>'; 
		str += '</div></center>';
		str += '<div style="padding-top:35px;width:90%;color:#f68b1f;">'+ BadgeArr[x][4] +'</div>';
		str += '<div class="badge-txt" style="padding-top:10px;color:#000;">'+ BadgeArr[x][6] +'</div>';
		str += '<div class="badge-txt">เมื่อทำสำเร็จจะได้แต้มเพิ่ม +'+ BadgeArr[x][8] +' แต้ม</div>';
		str += '</div>';
	} else {
		str += '<div class="badges-gray">';
		str += '<div class="header-line" style="margin-top:10px;color:#0056ff;font-weight: 600;">'+ BadgeArr[x][2] +'</div>';
		str += '<div style="padding:15px"><img src="'+ BadgeArr[x][3] +'" width="80%"></div>';
		str += '<center><div class="progress-bar">';
		str += '<div class="progress" data-percent="70" data-color="green" style="width:'+z+'%;background:#00f63a;"><span>'+z+'%</span></div>'; 
		str += '</div></center>';
		str += '<div style="padding-top:35px;width:90%;color:#f68b1f;">'+ BadgeArr[x][4] +'</div>';
		str += '<div class="badge-txt" style="padding-top:10px;color:#000;">'+ BadgeArr[x][6] +'</div>';
		if(BadgeArr[x][7]!=0) {
			str += '<div class="badge-txt">เมื่อทำสำเร็จจะได้แต้มเพิ่ม +'+ BadgeArr[x][8] +' แต้ม</div>';
		}
		str += '</div>';
	}
	$("#ViewBadge").html(str); 
	document.getElementById("id01").style.display = "block";
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id05').style.display='none';
}