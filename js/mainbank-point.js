//var dbScorePoint = "";
//var dbBadgeGame = "";
var GetCount = 0;
var BadgeArr = [];
var BadgeArr1 = [];
//var UserBadgeArr = [];
//var UserBadgeArr1 = [];
var sBadgeEng = "Badge-MainBank";


$(document).ready(function () {
	dbBadgeGame = firebase.firestore().collection("BadgeGame");
	dbBadgeUser = firebase.firestore().collection("BadgeUser");
	//GetBadgeUser();
	AllBadge();
});


function GetBadgeUser() {
	//GetCount = 0;
	var i = 0;
	var str = "";
  	dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
  	.where('BadgeEng','==',sBadgeEng)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			GetCount = doc.data().BadgeTime;
			//if(doc.data().BadgeEnd=1) {
			//	UserBadgeArr1.push(doc.data().BadgeEng);
			//}
			//UserBadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTime, doc.data().BadgeEnd]);
		});
		OpenTarget();
		//$("#DisplayUserBadge").html(str); 
		//console.log(UserBadgeArr1);
	});
}



function OpenTarget() {
	//GetBadgeUser();
	var i = 0;
	//alert(GetCount);
	//console.log(GetCount);
	var sMin = GetCount;
	//var sMin = UserBadgeArr[UserBadgeArr1.indexOf(sBadgeEng)][2];
	var sMax = 30;
	var str = "";
	var sText = "";
	if(sMin>=sMax) { sMin = sMax; }
	for (let i = 0; i < sMax; i++) {
		if(i<sMin) {
		  	sText += '<div style="float: left;position: relative;">';
		  	sText += '<img src="./img/timetojoin-1.png" style="width:40px;padding:2px;">';
		  	sText += '<div class="bg-timetojointext">'+ (i+1) +'</div></div>';
		  } else {
		  	sText += '<div style="float: left;position: relative;">';
		  	sText += '<img src="./img/timetojoin-0.png" style="width:40px;padding:2px;">';
		  	sText += '<div class="bg-timetojointext1">'+ (i+1) +'</div></div>';
		  }
	}	
	var sNumber = (sMin/sMax)*100;
	str += '<center><div style="width:100%;">';
	str += '<div style="padding:40px 0 15px 0;"><img src="./img/head-2.png" style="height:45px;"></div>';
	str += '<div class="bg-timetojoin"><div style="width:100%;padding:50px;">'+ sText +'</div>';
	str += '<div class="clr"></div><div class="bg-timetojointext2">สำเร็จแล้ว '+ sNumber.toFixed(2) +'%</div>';
	str += '<div style="color:#fff;">ภารกิจพิชิตเหรียญ MainBank</div></div>';
	str += '</div></center>';
	$("#DisplayTimetoJoin").html(str);
	document.getElementById('id06').style.display='block';
}


function AllBadge() {
	var i = 0;
	var str = "";
  	dbBadgeGame.orderBy('BadgeNo','asc')
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			BadgeArr1.push(doc.data().BadgeEng);
			BadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTh, doc.data().BadgeImg, doc.data().BadgeDetail, doc.data().BadgeTarget, doc.data().memo, doc.data().BadgePoint, doc.data().BonusPoint]);
			i = i+1;
		});
		console.log(UserBadgeArr);
	});
}


