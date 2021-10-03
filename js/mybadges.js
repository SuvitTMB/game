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

/*
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
  CheckScorePoint();
}


function CheckScorePoint() {
  dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	sNewMember = 1;
    	EidScorePoint = doc.id;
		sessionStorage.setItem("Level", doc.data().UserLevel);
		sessionStorage.setItem("XP", parseFloat(doc.data().RewardsXP).toFixed(2));
		sessionStorage.setItem("RP", parseFloat(doc.data().RewardsRP).toFixed(2));
		UpdateLevel(doc.data().RewardsXP);
    });
	if(sNewMember==0) {
		//alert(sNewMember);
		AddNewMember();
		document.getElementById("id01").style.display = "block";
	}
  });
}


function AddNewMember() {
    dbScorePoint.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      JoinTime : 0,
      RedemConfirm : 0,
      RedemPoint : 0,
      RewardsRP : 5,
      RewardsXP : 5,
      UserLevel : 1,
      UserSumTrue : 0,
      UserSumFalse : 0,
      UserSumQuiz : 0,
      StartDate : today
    });
    CheckScorePoint();	
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
	dbScorePoint.doc(EidScorePoint).update({
		UserLevel : NewLevel
	});
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
*/


function ShowBadges(x) {
	//alert(x);
	document.getElementById("id01").style.display = "block";
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}