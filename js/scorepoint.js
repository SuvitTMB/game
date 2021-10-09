var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
var sJoinTime = 0;
var sUserLevel = 1;
var sCountTimeJoin = 0;
var EidScorePoint = "";
var sNewMember = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var sDateCheckIN = "";
var dbCheck = "";
var dbBadgeGame = "";
var dbBadgeUser = "";
var dateString = "";
var sTypeSelect = "Join Game";
var sGroupQuiz = "JoinGame";
var Update_BadgeLevel = "";


$(document).ready(function () {
  Connect_DB();
  CheckScorePoint();
  CheckGetBadge();
  //CheckGetBadgeUser();
  //DisplayScore();
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
  dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbCheck = firebase.firestore().collection("QuizScore");
  dbBadgeGame = firebase.firestore().collection("BadgeGame");
  dbBadgeUser = firebase.firestore().collection("BadgeUser");
  
}



var CheckBadge = 0;
function CheckGetBadgeUser() {
	var sGet = 0; 
  	dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
  	.where('BadgeEng','==',sBadgeEng)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			CheckBadge = 1;
		});
		if(CheckBadge==0) {
			AddBadgeUser();
		}
	});
}

var EidBadgeGame = "";
var sBadgeTarget = 0;
var sBadgePoint = 0;
var sBonusPoint = 0 ;
var sSumGetBadge = 0;
var sBadgeEng = "Badge-Welcome"; //ชื่อ badge
function CheckGetBadge() {
  	dbBadgeGame.where('BadgeEng','==',sBadgeEng)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			EidBadgeGame = doc.id;
			sBadgeTarget = doc.data().BadgeTarget;
			sBadgePoint = doc.data().BadgePoint;
			sBonusPoint = doc.data().BonusPoint;
			sSumGetBadge = doc.data().SumGetBadge;
		});
	});	
}




function AddBadgeUser() {
	//alert("Badge="+sBadgeEng+" Target="+sBadgeTarget+", BadgePoint="+sBadgePoint+" BounsPoint="+sBonusPoint);
	if(CheckBadge==0) {
	    dbBadgeUser.add({
			LineID : sessionStorage.getItem("LineID"),
			linename : sessionStorage.getItem("LineName"),
			empPicture : sessionStorage.getItem("LinePicture"),
      		EmpID : sessionStorage.getItem("EmpID"),
      		EmpName : sessionStorage.getItem("EmpName"),
			BadgeEng : sBadgeEng,
			BadgeTime : 1,
			BadgeTrue : 0,
			BadgeFalse : 0,
			BadgeEnd : 1,
			BadgeDate : today
	    });

	    var sBadgeLevel = "Badge-LevelUp-1";
	    dbBadgeUser.add({
			LineID : sessionStorage.getItem("LineID"),
			linename : sessionStorage.getItem("LineName"),
			empPicture : sessionStorage.getItem("LinePicture"),
      		EmpID : sessionStorage.getItem("EmpID"),
      		EmpName : sessionStorage.getItem("EmpName"),
			BadgeEng : sBadgeLevel,
			BadgeTime : 1,
			BadgeTrue : 0,
			BadgeFalse : 0,
			BadgeEnd : 1,
			BadgeDate : today
	    });

		dbBadgeGame.doc(EidBadgeGame).update({
			SumGetBadge : sSumGetBadge+1
		});

   		document.getElementById("id01").style.display = "block";
		//alert("Get New Badge");
	}
}



var Update_BadgeLevel = "";
function CheckScorePoint() {
  dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	sNewMember = 1;
    	EidScorePoint = doc.id;
    	sUserLevel = doc.data().UserLevel;
    	sRewardsXP = doc.data().RewardsXP;
    	sRewardsRP = doc.data().RewardsRP;
    	sDateCheckIN = doc.data().DateCheckIN;
    	sCountTimeJoin = doc.data().CountTimeJoin;
    	sCheckAlert = doc.data().RCheckAlert;
		sessionStorage.setItem("Level", doc.data().UserLevel);
		sessionStorage.setItem("XP", parseFloat(doc.data().RewardsXP).toFixed(2));
		sessionStorage.setItem("RP", parseFloat(doc.data().RewardsRP).toFixed(2));
		UpdateTimeLine();
		/*
		var x = sRewardsXP;
		if(x>0 && x <=100) {
			Update_BadgeLevel = "Badge-LevelUp-1";
		} else if(x>100 && x <=300) { 
			Update_BadgeLevel = "Badge-LevelUp-2";
		} else if(x>300 && x <=600) { 
			Update_BadgeLevel = "Badge-LevelUp-3";
		} else if(x>600 && x <=1000) { 
			Update_BadgeLevel = "Badge-LevelUp-4";
		} else if(x>1000 && x <=1500) { 
			Update_BadgeLevel = "Badge-LevelUp-5";
		} else if(x>1500 && x <=2000) { 
			Update_BadgeLevel = "Badge-LevelUp-6";
		}
		*/
		UpdateLevel(doc.data().RewardsXP);

    });
	if(sNewMember==0) {
		//alert(sNewMember);
		//document.getElementById("id01").style.display = "block";
		AddNewMember(sCountTimeJoin,);
	}
	//alert("Level = "+sUserLevel);
  });
}



function UpdateTimeLine() {
	var str = "";
	var sPoint = 0;
	var sTarget = 0;
	var sGetRewards = 0;
	if(sDateCheckIN!=today) {
		sCountTimeJoin = sCountTimeJoin+1;
		if(sCountTimeJoin<=5) { sTarget = 5; sPoint = 5; }
		else if(sCountTimeJoin<=15) { sTarget = 15; sPoint = 10; }
		else if(sCountTimeJoin<=30) { sTarget = 30; sPoint = 15; }
		else if(sCountTimeJoin<=60) { sTarget = 60; sPoint = 20; }
		else if(sCountTimeJoin<=90) { sTarget = 90; sPoint = 30; }
		else if(sCountTimeJoin<=180) { sTarget = 180; sPoint = 50; }
		else if(sCountTimeJoin<=360) { sTarget = 360; sPoint = 100; }
		else sPoint = 0;
		if(sCountTimeJoin==5) {
			sGetRewards = 5;
		} else if(sCountTimeJoin==15) {
			sGetRewards = 10;
		} else if(sCountTimeJoin==30) {
			sGetRewards = 15;
		} else if(sCountTimeJoin==60) {
			sGetRewards = 20;
		} else if(sCountTimeJoin==90) {
			sGetRewards = 30;
		} else if(sCountTimeJoin==180) {
			sGetRewards = 50;
		} else if(sCountTimeJoin==360) {
			sGetRewards = 100;
		}

		if(sCountTimeJoin==sTarget) {
		    str+='<div style="margin-top:15px;">';
		    str+='<div class="box-target">เดินทาง<div class="box-target-number">'+sCountTimeJoin+'</div>วัน</div>';
		    str+='<div class="box-target">เป้าหมาย<div class="box-target-number">'+(sTarget-sCountTimeJoin)+'</div>วัน</div>';
		    str+='<div class="box-target">รางวัล<div class="box-target-number">'+sPoint+'</div>แต้ม</div>';
		    str+='</div>';
		  	$("#BoxTimeLineNew").html(str);
			document.getElementById("id03").style.display = "block";
			if(sessionStorage.getItem("LineID")!="") {
				//alert("Get Point");
				NewDate();
				var TimeStampDate = Math.round(Date.now() / 1000);
				dbScorePoint.doc(EidScorePoint).update({
					DateCheckIN : today,
					CountTimeJoin : sCountTimeJoin,
					RewardsXP : parseFloat(sRewardsXP+sPoint),
					RewardsRP : parseFloat(sRewardsRP+sPoint)
				});
			    dbCheck.add({
			      GroupQuiz : sGroupQuiz,
			      LineID : sessionStorage.getItem("LineID"),
			      LineName : sessionStorage.getItem("LineName"),
			      LinePicture : sessionStorage.getItem("LinePicture"),
			      EmpID : sessionStorage.getItem("EmpID"),
			      EmpName : sessionStorage.getItem("EmpName"),
			      TypeSelect : sTypeSelect,
			      LastScore : sPoint,
			      PointIN : sPoint,
			      TimeStamp : TimeStampDate,
			      DateRegister : dateString,
			      QuizDate : today
			    });
				sessionStorage.setItem("XP", sRewardsXP+sPoint);
				sessionStorage.setItem("RP", sRewardsRP+sPoint);
    			GetBadges("Join"+sCountTimeJoin+"Days");
				DisplayScore();
			}
		} else {
		    str+='<div style="margin-top:15px;">';
		    str+='<div class="box-target">เดินมาแล้ว<div class="box-target-number">'+sCountTimeJoin+'</div>วัน</div>';
		    str+='<div class="box-target">เหลืออีก<div class="box-target-number">'+(sTarget-sCountTimeJoin)+'</div>วัน</div>';
		    str+='<div class="box-target">เพื่อรางวัล<div class="box-target-number">'+sPoint+'</div>แต้ม</div>';
		    str+='</div>';
		  	$("#BoxTimeLine").html(str);			
			document.getElementById("id02").style.display = "block";
			if(sessionStorage.getItem("LineID")!="") {
				dbScorePoint.doc(EidScorePoint).update({
			      DateCheckIN : today,
			      CountTimeJoin : sCountTimeJoin
				});
			}
		}
	}
}


//function GetBadges(x) { 
//	alert("Get New Badges = "+x);

//}


function AddNewMember() {
	NewDate();
	var TimeStampDate = Math.round(Date.now() / 1000);
	sRewardsXP = 5;
	sRewardsRP = 5;
    dbScorePoint.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      JoinTime : 0,
      RedemConfirm : 0,
      RedemPoint : 0,
      RewardsXP : sRewardsXP,
      RewardsRP : sRewardsRP,
      UserLevel : 1,
      UserSumTrue : 0,
      UserSumFalse : 0,
      UserSumQuiz : 0,
      DateCheckIN : today,
      CountTimeJoin : 1,
      StartDate : today
    });
	sessionStorage.setItem("XP", sRewardsXP);
	sessionStorage.setItem("RP", sRewardsRP);
	GroupQuiz = "Welcome";
    dbCheck.add({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      TypeSelect : sTypeSelect,
      LastScore : sRewardsXP,
      PointIN : sRewardsXP,
      TimeStamp : TimeStampDate,
      DateRegister : dateString,
      QuizDate : today
    });
    CheckGetBadgeUser();
    //GetBadges("NewMember");
    CheckScorePoint();	
    //DisplayScore();
}


function UpdateLevel(x) {
	//alert(Update_BadgeLevel);
	var NewLevel = 0;
	var NewPoint = 0;
	if(x>0 && x <=100) {
		NewLevel = 1;
		Update_BadgeLevel = "Badge-LevelUp-1";
		NewPoint = 0;
	} else if(x>100 && x <=300) { 
		NewLevel = 2;
		Update_BadgeLevel = "Badge-LevelUp-2";
		NewPoint = 5;
	} else if(x>300 && x <=600) { 
		NewLevel = 3;
		Update_BadgeLevel = "Badge-LevelUp-3";
		NewPoint = 10;
	} else if(x>600 && x <=1000) { 
		NewLevel = 4;
		Update_BadgeLevel = "Badge-LevelUp-4";
		NewPoint = 15;
	} else if(x>1000 && x <=1500) { 
		NewLevel = 5;
		Update_BadgeLevel = "Badge-LevelUp-5";
		NewPoint = 20;
	} else if(x>1500 && x <=2000) { 
		NewLevel = 6;
		Update_BadgeLevel = "Badge-LevelUp-6";
		NewPoint = 25;
	}

	//alert(sessionStorage.getItem("Level")+" === "+NewLevel);
	if(sessionStorage.getItem("Level")!=NewLevel) {
		dbScorePoint.doc(EidScorePoint).update({
			UserLevel : NewLevel
		});
		if(sUserLevel!=NewLevel) {
			document.getElementById('id04').style.display='block';
			AddBadgeLevel(Update_BadgeLevel,NewPoint);
    		//GetBadges("LevelUp"+NewLevel);
		}
	}
	sessionStorage.setItem("Level", NewLevel);
	DisplayScore();
}



function AddBadgeLevel(x,p) {
	var TimeStampDate = Math.round(Date.now() / 1000);
	//alert("Add New Badge = "+l);
    dbBadgeUser.add({
		LineID : sessionStorage.getItem("LineID"),
		linename : sessionStorage.getItem("LineName"),
		empPicture : sessionStorage.getItem("LinePicture"),
  		EmpID : sessionStorage.getItem("EmpID"),
  		EmpName : sessionStorage.getItem("EmpName"),
		BadgeEng : x,
		BadgeTime : 1,
		BadgeTrue : 0,
		BadgeFalse : 0,
		BadgeEnd : 1,
		BadgeDate : today
    });
	sessionStorage.setItem("XP", sRewardsXP+p);
	sessionStorage.setItem("RP", sRewardsRP+p);    
	/// Add Point
    dbCheck.add({
      GroupQuiz : x,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      TypeSelect : "Level Up",
      LastScore : p,
      TimeStamp : TimeStampDate,
      DateRegister : dateString,
      QuizDate : today
    });
	if(sessionStorage.getItem("LineID")!="") {
		dbScorePoint.doc(EidScorePoint).update({
	      //DateCheckIN : today,
	      //CountTimeJoin : sCountTimeJoin
			RewardsXP : sRewardsXP+p,
			RewardsRP : sRewardsRP+p
		});
	}
	//alert("Add Badge และ Point ให้ user");
	//CheckScorePoint();
}



function DisplayScore() {
	var str = "";
	str += '<div class="profile-user"><div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="imgprofile"></div>';
	str += '<div class="profile-level"><div class="profile-numberlevel">'+ sessionStorage.getItem("Level") +'</div>';
	str += '<div class="profile-textlevel">Level</div>';
	str += '</div></div><div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
	str += '<div class="game-txt">'+ sessionStorage.getItem("EmpName") +'</div>'
	//if(sessionStorage.getItem("StatusConfirm")==1) {
	  str += '<center><div style="max-width:300px;background-color: #f1f1f1;margin:10px auto;width:100%;">';
      str += '<div class="game-badge" onclick="badge(1)"><div><img src="./img/badge-level.png" width="85%"></div>';
      str += '<div class="txt-point">'+ sessionStorage.getItem("Level")+ '</div>';
      str += '<div class="txt-level">ระดับ</div></div>';
      str += '<div class="game-badge" onclick="badge(2)"><div><img src="./img/badge-score.png" width="85%"></div>';
      str += '<div class="txt-point">'+ numberWithCommas(sessionStorage.getItem("XP"))+ '</div>';
      str += '<div class="txt-level">แต้มสะสม</div></div>';
      str += '<div class="game-badge" onclick="badge(3)"><div><img src="./img/badge-point.png" width="80%"></div>';
      str += '<div class="txt-point" style="padding-top:3px;">'+ numberWithCommas(sessionStorage.getItem("RP"))+ '</div>';
      str += '<div class="txt-level">เหรียญรางวัล</div></div>';
	//}
	$("#MyScore").html(str);  
	//CheckLevelUp();
}


function badge(x) {
	str = "";
	if(x==1) {

		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-4.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-level.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ sessionStorage.getItem("Level")+ '</div>';
		str += '<div class="txt-level">ระดับ</div>';
		str += '<div style="padding:15px;">ระดับการแขังขัน หรือ Level หมายถึง การกำหนดให้ผู้แข่งขันอยู่ในช่วงของระดับการแข่งขัน เมื่อผู้แข่งขันได้เก็บประสบการณ์และสามารถทำภารกิจได้ตามเป้าหมายระดับการแข่งขัน (Level) จะถูกปรับระดับใหม่ ยิ่งผู้แข่งขันมีระดับการแข่งขันที่สูงขึ้น ก็หมายถึงระดับความยากก็จะมากยิ่งขึ้นไปด้วย</div>';
/*
		str += '<center><div style="padding:10px 0 20px 0;"><img src="./img/head-4.png" style="height:45px;"></div>';
		str += '<div class="bg-timetojoin"><div style="padding-top:20px;"><img src="./img/badge-level.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ sessionStorage.getItem("Level")+ '</div>';
		str += '<div class="txt-level">ระดับ</div>';
		str += '<div style="padding:15px;color:#fff;">ระดับการแขังขัน หรือ Level หมายถึง การกำหนดให้ผู้แข่งขันอยู่ในช่วงของระดับการแข่งขัน เมื่อผู้แข่งขันได้เก็บประสบการณ์และสามารถทำภารกิจได้ตามเป้าหมายระดับการแข่งขัน (Level) จะถูกปรับระดับใหม่ ยิ่งผู้แข่งขันมีระดับการแข่งขันที่สูงขึ้น ก็หมายถึงระดับความยากก็จะมากยิ่งขึ้นไปด้วย</div>';
		str += '</div></center>';
*/
	} else if(x==2) {
		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-5.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-score.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ sessionStorage.getItem("XP").toFixed(2) + '</div>';
		str += '<div class="txt-level">แต้ม</div>';
		str += '<div style="padding:15px;">แต้มประสบการณ์ หรือ Experience Point(XP) เป็นแต้มสำหรับการสะสมประสบการณ์ในการแข่งขัน โดยผู้เข้าแข่งขันจะได้รับแต้มได้ เมื่อเข้าเก็บการแข่งขันในแต่ละวันที่ทางผู้จัดการแข่งขันได้กำหนดไว้ โดยทุก ๆ แต้มที่สะสมไว้จะบ่งบอกถึงประสบการณ์การเข้ามาร่วมกิจกรรม ยิ่งสะสมมาก แต้มประสบการณ์จะสูงขึ้น และจะส่งผลให้ ระดับการแข่งขัน (Level) ของผู้แข่งขันมากขึ้นไปด้วย</div>';
	} else if(x==3) {
		str += '<div style="padding:10px 0 20px 0;"><img src="./img/head-6.png" style="height:45px;"></div>';
		str += '<div><img src="./img/badge-point.png" width="120xp"></div>';
		str += '<div class="txt-point">'+ sessionStorage.getItem("RP").toFixed(2) + '</div>';
		str += '<div class="txt-level">แต้ม</div>';
		str += '<div style="padding:15px;">เหรียญรางวัล หรือ Rewards Point (RP) เป็นเหรียญสำหรับการเก็บสะสมไว้เพื่อใช้ในการแลกของรางวัลจากรายการของรางวัลที่ทางผู้จัดกิจกรรมกำหนดไว้ แต่จะสามารถทำการแลกของรางวัลได้ก็ต่อเมื่อสามารถเก็บเหรียญรางวัลได้เท่ากับหรือมากกว่าของรางวัลรายการนั้น ๆ ที่ได้กำหนดไว้ และเมื่อทำการแลกของรางวัลไปแล้ว เหรียญรางวัลนี้จะถูกหักออกไปในมูลค่าเท่ากับของที่ได้ทำการแลกรางวัลมา</div>';
	}
	$("#BadgeDetail").html(str);  
 	document.getElementById('id05').style.display='block';
}



/*
line 398
function CheckLevelUp() {
	//alert(sessionStorage.getItem("XP")+"==="+sessionStorage.getItem("Level"));
	alert(sessionStorage.getItem("XP"));
	if(sessionStorage.getItem("XP") >= 101 && sessionStorage.getItem("XP") <= 300) {
		alert("Level 2");
	} else if(sessionStorage.getItem("XP") >= 301 && sessionStorage.getItem("XP") <= 600) {
		alert("Level 3");
	} else if(sessionStorage.getItem("XP") >= 601 && sessionStorage.getItem("XP") <= 1000) {
		alert("Level 4");
	} else if(sessionStorage.getItem("XP") >= 1000 && sessionStorage.getItem("XP") <= 1500) {
		alert("Level 5");
	} else if(sessionStorage.getItem("XP") >= 1500 && sessionStorage.getItem("XP") <= 2000) {
		alert("Level 6");
	}
}
*/



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
}



function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

