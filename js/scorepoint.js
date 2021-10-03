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
var sTypeSelect = "Join Game";
var sGroupQuiz = "JoinGame";
var dateString = "";

$(document).ready(function () {
  Connect_DB();
  DisplayScore();
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
  CheckScorePoint();
}



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
		UpdateLevel(doc.data().RewardsXP);
    });
	if(sNewMember==0) {
		//alert(sNewMember);
		document.getElementById("id01").style.display = "block";
		AddNewMember(sCountTimeJoin,);
	}
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


function GetBadges(x) { 
	alert("Get New Badges = "+x);
	//alert("Get New Badges - "+x);
}


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
    GetBadges("NewMember");
    CheckScorePoint();	
    //DisplayScore();
}


function UpdateLevel(x) {
	var NewLevel = 0;
	if(x>0 && x <=100) {
		NewLevel = 1;
	} else if(x>100 && x <=300) { 
		NewLevel = 2;
	} else if(x>300 && x <=600) { 
		NewLevel = 3;
	} else if(x>600 && x <=1000) { 
		NewLevel = 4;
	} else if(x>1000 && x <=1500) { 
		NewLevel = 5;
	} else if(x>1500 && x <=2000) { 
		NewLevel = 5;
	}

	//alert(sUserLevel+" === "+NewLevel);
	if(sUserLevel!=NewLevel) {
		dbScorePoint.doc(EidScorePoint).update({
			UserLevel : NewLevel
		});
		if(x!=0) {
			document.getElementById('id04').style.display='block';
    		GetBadges("LevelUp"+NewLevel);
		}
	}

	sessionStorage.setItem("Level", NewLevel);
	DisplayScore();
}


function DisplayScore() {
	var str = "";
	str += '<div class="profile-user"><div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="imgprofile"></div>';
	str += '<div class="profile-level"><div class="profile-numberlevel">'+ sessionStorage.getItem("Level") +'</div>';
	str += '<div class="profile-textlevel">Level</div>';
	str += '</div></div><div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
	if(sessionStorage.getItem("StatusConfirm")==2) {
	  str += '<center><div style="width:300px;background-color: #f1f1f1;margin:10px auto;">';
	  str += '<div class="col-lg-4 box-level" style="background:#0056ff; width:30%;padding:5px;float: left;">';
	  str += '<div><img src="./img/levels.png" width="30px"></div>';
	  str += '<div class="txt-point">'+ sessionStorage.getItem("Level")+ '</div><div class="txt-level">ระดับ</div></div>';
	  str += '<div class="col-lg-4 box-level" style="background:#f68b1f; width:30%;padding:5px;float: left;">';
	  str += '<div><img src="./img/rewards.png" width="30px"></div>';
	  str += '<div class="txt-point">'+ numberWithCommas(sessionStorage.getItem("XP")) +'</div><div class="txt-level">แต้มสะสม</div></div>';
	  str += '<div class="col-lg-4 box-level" style="background:#002d63; width:30%;padding:5px;float: left;">';
	  str += '<div><img src="./img/coin@.png" width="30px"></div>';
	  str += '<div class="txt-point">'+ numberWithCommas(sessionStorage.getItem("RP")) +'</div><div class="txt-level">เหรียญรางวัล</div></div>';
	  str += '</div></center><div class="clr"></div>';
	}
	$("#MyScore").html(str);  
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
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

