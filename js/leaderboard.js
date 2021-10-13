var i = 0;
var cleararray = "";
var dbScorePoint = "";
var dbBadgeGame = "";
var dbBadgeUser = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var BadgeArr = [];
var BadgeArr1 = [];
var UserBadgeArr = [];
var UserBadgeArr1 = [];


$(document).ready(function () {
  Connect_DB();
  DisplayLeaderBoard();
  //GetBadgeUser();
  //AllBadge();
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
  dbBadgeGame = firebase.firestore().collection("BadgeGame");
  dbBadgeUser = firebase.firestore().collection("BadgeUser");
}


function DisplayLeaderBoard() {
  var str = "";
  dbScorePoint.orderBy('RewardsXP','desc')
  .limit(50).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	//console.log(doc.data());
    	i = i+1;
      	if(i==1) {
			str += '<div class="box-5h1" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="box-5h-number1"><img src="./img/rank-1.png" width="30">';
			//str += '<div class="number4">'+i+'</div>';
			str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
      	} else if(i==2) {
			str += '<div class="box-5h2" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="box-5h-number1"><img src="./img/rank-2.png" width="30">';
			//str += '<div class="number4">'+i+'</div>';
			str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
      	} else if(i==3) {
			str += '<div class="box-5h3" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="box-5h-number1"><img src="./img/rank-3.png" width="30">';
			//str += '<div class="number4">'+i+'</div>';
			str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
      	} else if(doc.data().LineID==sessionStorage.getItem("LineID")) {
			str += '<div class="box-5h4" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="box-5h-number1"><img src="./img/leader-1.png" width="50">';
			str += '<div class="number4">'+i+'</div>';
			str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
      	} else {
			str += '<div class="box-5h" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="box-5h-number1"><img src="./img/leader-1.png" width="50">';
			str += '<div class="number4">'+i+'</div>';
			str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
      	}

		$("#DisplayBoard").html(str);
    });
  //alert(i);
  });
}





const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;

    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})


function LeaderBoard(x,y) {
	//alert(x);
	var str = "";
	dbScorePoint.where(firebase.firestore.FieldPath.documentId(), "==", x)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			GetBadgeUser(doc.data().LineID);
			str += '<div class="profile-user"><div><img src="'+ doc.data().LinePicture +'" class="imgprofile" width="130"></div>';
			str += '<div class="profile-level"><div class="profile-numberlevel">'+ doc.data().UserLevel +'</div>';
			str += '<div class="profile-textlevel">Level</div></div></div>';
			str += '<div class="NameLine">'+ doc.data().LineName+'</div>';
			str += '<div class="game-txt">'+ doc.data().EmpName+'</div>';
			str += '<center><div style="max-width:300px;background-color: #dce5f6;margin:10px auto;width:100%;">';
			str += '<div class="game-badge" onclick="badge(1)"><div><img src="./img/badge-level.png" width="85%"></div>';
			str += '<div class="txt-point">'+ doc.data().UserLevel+ '</div>';
			str += '<div class="txt-level">ระดับ</div></div>';
			str += '<div class="game-badge" onclick="badge(2)"><div><img src="./img/badge-score.png" width="85%"></div>';
			str += '<div class="txt-point">'+ (doc.data().RewardsXP).toFixed(2) +'</div>';
			str += '<div class="txt-level">แต้มสะสม</div></div>';
			str += '<div class="game-badge" onclick="badge(3)"><div><img src="./img/badge-point.png" width="80%"></div>';
			str += '<div class="txt-point" style="padding-top:3px;">'+ (doc.data().RewardsRP).toFixed(2) +'</div>';
			str += '<div class="txt-level">เหรียญรางวัล</div></div><div class="clr"></div>';
			str += '<div style="width:100%;margin:10px auto;">'+sBadge+'</div>';
			str += '<div class="clr"></div>';
		});
		$("#UserScore").html(str);  
	});
	document.getElementById("id01").style.display = "block";
}




function GetBadgeUser(x) {
	var i = 0;
	var str = "";
	UserBadgeArr = [];
	UserBadgeArr1 = [];
  	dbBadgeUser.where('LineID','==',x)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			if(doc.data().BadgeEnd=1) {
				UserBadgeArr1.push(doc.data().BadgeEng);
			}
			UserBadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTime, doc.data().BadgeEnd]);
			//console.log(BadgeArr1.indexOf(doc.data().BadgeEng));
		});
		//$("#DisplayUserBadge").html(str); 
		//console.log(UserBadgeArr1);
		AllBadge();
	});
}



var calbar = 0;
var sBadge = "";
function AllBadge() {
	$("#DisplayRatio").html(cleararray);
	var i = 0;
	var str = "";
  	dbBadgeGame.orderBy('BadgeNo','asc')
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			BadgeArr1.push(doc.data().BadgeEng);
			BadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTh, doc.data().BadgeImg, doc.data().BadgeDetail, doc.data().BadgeTarget, doc.data().memo, doc.data().BadgePoint, doc.data().BonusPoint]);

			if(UserBadgeArr1.indexOf(doc.data().BadgeEng)>=0) {
				calbar = (UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][2]/doc.data().BadgeTarget)*100;
				if(calbar>100) { calbar = 100; }
				if(UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][3]==1) {
					sBadge += '<div class="box-listuser">';
					sBadge += '<div style="width:15%;float:left;text-align:center;padding-top:3px;"><img src="'+ doc.data().BadgeImg +'" width="40px;"></div>';
					sBadge += '<div style="width:80%;padding:4px;float:left;"><div class="box-listtext" style="padding-left:6px;">'+ doc.data().BadgeTh +'</div>';
					sBadge += '<div class="progress-bar">';
					sBadge += '<div class="progress" data-percent="70" data-color="green" style="width:'+calbar+'%;background:#0056ff;"><span>'+calbar+'%</span></div>';
					sBadge += '</div></div></div>';
				} else {
					sBadge += '<div class="box-listuser">';
					sBadge += '<div style="width:15%;float:left;text-align:center;"><img src="'+ doc.data().BadgeImg +'" width="40px;"></div>';
					sBadge += '<div style="width:80%;padding:4px;float:left;"><div class="box-listtext" style="padding-left:6px;">'+ doc.data().BadgeTh +'</div>';
					sBadge += '<div class="progress-bar">';
					sBadge += '<div class="progress" data-percent="70" data-color="green" style="width:'+calbar+'%;background:#f68b1f;"><span>'+calbar+'%</span></div>';
					sBadge += '</div></div></div>';
				}
			} else {
				/*
				sBadge += '<div class="box-listuser">';
				sBadge += '<div style="width:15%;float:left;text-align:center;"><img src="'+ doc.data().BadgeImg +'" width="40px;"></div>';
				sBadge += '<div style="width:80%;padding:4px;float:left;"><div class="box-listtext" style="padding-left:6px;">'+ doc.data().BadgeTh +'</div>';
				sBadge += '<div class="progress-bar">';
				sBadge += '<div class="progress" data-percent="70" data-color="green" style="width:0%;background:#f68b1f;"><span>0%</span></div>';
				sBadge += '</div></div></div>';
				*/
			}
			i = i+1;
		});
		$("#DisplayRatio").html('<div style="width:95%;margin:10px auto;">'+sBadge+'</div>'); 
		sBadge = "";
	});
}





function CloseAll() {
	$("#DisplayRatio").val(cleararray);
	$("#DisplayRatio").html(cleararray); 
  	document.getElementById('id01').style.display='none';
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
