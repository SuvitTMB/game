var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dateString = "";

var sMyPoint = 0;
var NewScore = 0;
var UserNeedPoint = 0;
var VDOtimer = 0;
var counter = 0;
var sVDOnumber = 0;
var sGameStatus = 0;
var sGameCount = 0;
var sGameSumPoint = 0
var timeup = "";
var dbGameFWB = "";
var EidGameFWB = "";
//var NewPoint = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
var NewPoint = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
var UserArr = [];


$(document).ready(function () {
	if(sessionStorage.getItem("LineID")==null || sessionStorage.getItem("LineID")=="") {
		SessionNotFound();
		//alert("Session Not Found");
	}
	//alert("RP="+sessionStorage.getItem("RP"));
	Connect_DB();
	CheckUserScorePoint();
	CheckGetBadge();
	CheckGetBadgeUser();
	CheckUserFWB();
});


var dbScorePoint = "";
var dbBadgeGame = "";
var dbBadgeUser = "";
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
  dbGameFWB = firebase.firestore().collection("GameFWB");
  dbBadgeGame = firebase.firestore().collection("BadgeGame");
  dbBadgeUser = firebase.firestore().collection("BadgeUser");
}


var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
function CheckUserScorePoint() {
    dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      sRewardsXP = doc.data().RewardsXP;
      sRewardsRP = doc.data().RewardsRP;
      sessionStorage.setItem("XP", doc.data().RewardsXP);
      sessionStorage.setItem("RP", doc.data().RewardsRP);
      //alert("XP = "+doc.data().RewardsXP+"\nRP = "+doc.data().RewardsRP);
    });
    //alert("Badge="+sBadgeEng+" Target="+sBadgeTarget+", BadgePoint="+sBadgePoint+" BounsPoint="+sBonusPoint);
  }); 
}


function CheckUserFWB() {
    dbGameFWB.where('LineID','==',sessionStorage.getItem("LineID"))
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      UserArr = [];
      EidGameFWB = doc.id;
      sGameStatus = doc.data().GameStatus;
      sGameCount = doc.data().GameCount;
      sGameSumPoint = doc.data().GameSumPoint;
      UserArr = [doc.data().Game1,doc.data().Game2,doc.data().Game3,doc.data().Game4,doc.data().Game5,doc.data().Game6,doc.data().Game7,doc.data().Game8,doc.data().Game9,doc.data().Game10,doc.data().Game11,doc.data().Game12,doc.data().Game13,doc.data().Game14,doc.data().Game15];
      if(doc.data().GameCount>=15 && doc.data().GameStatus==0) {
      	alert("check count = "+doc.data().GameCount);
      	CheckGetBadgeUser();
/*
		dbGameFWB.doc(EidGameFWB).update({
			GameStatus : 1,
			BonusGame : sBonusPoint,
			GameSumPoint : (sGameSumPoint+sBonusPoint)
		});	
		sGameStatus = 1;


		var str = "";
		str += '<div class="header-line" style="margin:10px;color:#0056ff;font-weight: 600;">คุณทำภารกิจสำเร็จ</div>';
		str += '<div><img src="'+ sBadgeImg +'" style="padding-top:8px;width:100%;border-radius: 15px;"></div>';
		str += '<div style="font-size: 14px;font-weight: 600;color:#000;padding-top:20px;">'+sBadgeTh+'</div>';
		str += '<div style="font-size: 12px;color:#f68b1f;padding-top:10px;line-height: 1.4;font-weight: 600;">';
		str += 'เมื่อผู้เข้าร่วมการแข่งขันทำภารกิจสำเร็จ<br>โดยได้ทำการแข่งขันรวม '+sBadgeTarget+' ครั้ง<br>รับแต้มพิเศษ '+sBonusPoint+' แต้ม</div>';
		$("#DisplayGetBadge").html(str);
    	document.getElementById('id05').style.display='block';
*/


      //} else {
      	//alert("ไม่เเข้าเงื่อนไข");
      }
      //console.log(UserArr);
      CheckButton();
      });
	  if(EidGameFWB=="") {
	 	AddNewUserFWB();
	  }  
    }); 
}



var sBadgeImg = "";
var sBadgeTh = "";
var EidBadgeGame = "";
var EidBadgeGameUser = "";
var sBadgeTarget = 0;
var sBadgePoint = 0;
var sBonusPoint = 0 ;
var sSumGetBadge = 0;
var sSumGetBadgeEnd = 0;
var sBadgeEng = "Badge-Well-being"; //ชื่อ badge

function CheckGetBadge() {
    dbBadgeGame.where('BadgeEng','==',sBadgeEng)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBadgeGame = doc.id;
      sBadgeImg = doc.data().BadgeImg;
      sBadgeTh = doc.data().BadgeTh;
      sBadgeTarget = doc.data().BadgeTarget;
      sBadgePoint = doc.data().BadgePoint;
      sBonusPoint = doc.data().BonusPoint;
      sSumGetBadge = doc.data().SumGetBadge;
      sSumGetBadgeEnd = doc.data().SumGetBadgeEnd;
    });
    //alert("Badge="+sBadgeEng+" Target="+sBadgeTarget+", BadgePoint="+sBadgePoint+" BounsPoint="+sBonusPoint);
  }); 
}


var CheckBadge = 0;
var sBadgeTime = 0;
var sBadgeTrue = 0;
var sBadgeFalse = 0;
var sBadgeEnd = 0;
function CheckGetBadgeUser() {
	//alert("CheckGetBadgeUser="+sGameStatus)
  	var sGet = 0; 
    dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
    .where('BadgeEng','==',sBadgeEng)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckBadge = 1;
      EidBadgeGameUser = doc.id;
      sBadgeTime = doc.data().BadgeTime;
      sBadgeTrue = doc.data().BadgeTrue;
      sBadgeFalse = doc.data().BadgeFalse;
      sBadgeEnd = doc.data().BadgeEnd;
    });
    //sBadgeTime = 15;
    //sBadgeEnd = 0;
	//alert("BadgeEnd="+sBadgeEnd)
    if(sBadgeEnd==0) {

      if(sBadgeTime>=sBadgeTarget) {

		sGameStatus = 1;
		dbGameFWB.doc(EidGameFWB).update({
			GameStatus : sGameStatus,
			BonusGame : sBonusPoint,
			GameSumPoint : (sGameSumPoint+sBonusPoint)
		});	

        dbBadgeUser.doc(EidBadgeGameUser).update({
            BadgeEnd : 1,
            BadgeGetDate : today
        });

        dbBadgeGame.doc(EidBadgeGame).update({
            SumGetBadgeEnd : sSumGetBadgeEnd+1
        });

		//dbGameFWB.doc(EidGameFWB).update({
		//	BonusGame : sBonusPoint,
		//	GameSumPoint : (sGameSumPoint+sBonusPoint)
		//});	

		sRewardsXP = parseFloat(sessionStorage.getItem("XP"))+parseFloat(sBonusPoint);
		sRewardsRP = parseFloat(sessionStorage.getItem("RP"))+parseFloat(sBonusPoint);
		dbScorePoint.doc(EidScorePoint).update({
			//RewardsXP : sRewardsXP,
			RewardsRP : sRewardsRP
		});
		alert("XP="+sRewardsXP+"---RP="+sRewardsRP);
		sessionStorage.setItem("XP", parseFloat(sessionStorage.getItem("XP"))+parseFloat(sBonusPoint));
		sessionStorage.setItem("RP", parseFloat(sessionStorage.getItem("RP"))+parseFloat(sBonusPoint));

		var str = "";
		str += '<div class="header-line" style="margin:10px;color:#0056ff;font-weight: 600;">คุณทำภารกิจสำเร็จ</div>';
		str += '<div><img src="'+ sBadgeImg +'" style="padding-top:8px;width:100%;border-radius: 15px;"></div>';
		str += '<div style="font-size: 14px;font-weight: 600;color:#000;padding-top:20px;">'+sBadgeTh+'</div>';
		str += '<div style="font-size: 12px;color:#f68b1f;padding-top:10px;line-height: 1.4;font-weight: 600;">';
		str += 'เมื่อผู้เข้าร่วมการแข่งขันทำภารกิจสำเร็จ<br>โดยได้ทำการแข่งขันรวม '+sBadgeTarget+' ครั้ง<br>รับแต้มพิเศษ '+sBonusPoint+' แต้ม</div>';
		$("#DisplayGetBadge").html(str);
    	document.getElementById('id05').style.display='block';
    	//alert("get badge");
        //alert("คุณได้รับ Badge-Well-being เรียบร้อยแล้ว ขึ้น popup");
        /*popup get badge done */
      } else {
		/*fasdfasdfasdfasdfasd*/
      }
    }
  });
}





function CheckButton() {
	//sGameStatus = 0;
	//alert("Game Status = "+sGameStatus);
	if(sGameStatus==0) {
		if(UserArr[0]==0) { document.getElementById('ShowWB1').style.display='block'; }
		if(UserArr[1]==0) { document.getElementById('ShowWB2').style.display='block'; }
		if(UserArr[2]==0) { document.getElementById('ShowWB3').style.display='block'; }
		if(UserArr[3]==0) { document.getElementById('ShowWB4').style.display='block'; }
		if(UserArr[4]==0) { document.getElementById('ShowWB5').style.display='block'; }
		if(UserArr[5]==0) { document.getElementById('ShowWB6').style.display='block'; }
		if(UserArr[6]==0) { document.getElementById('ShowWB7').style.display='block'; }
		if(UserArr[7]==0) { document.getElementById('ShowWB8').style.display='block'; }
		if(UserArr[8]==0) { document.getElementById('ShowWB9').style.display='block'; }
		if(UserArr[9]==0) { document.getElementById('ShowWB10').style.display='block'; }
		if(UserArr[10]==0) { document.getElementById('ShowWB11').style.display='block'; }
		if(UserArr[11]==0) { document.getElementById('ShowWB12').style.display='block'; }
		if(UserArr[12]==0) { document.getElementById('ShowWB13').style.display='block'; }
		if(UserArr[13]==0) { document.getElementById('ShowWB14').style.display='block'; }
		if(UserArr[14]==0) { document.getElementById('ShowWB15').style.display='block'; }
	} else {
		document.getElementById('ShowWB1').style.display='none'; 
		document.getElementById('ShowWB2').style.display='none'; 
		document.getElementById('ShowWB3').style.display='none'; 
		document.getElementById('ShowWB4').style.display='none'; 
		document.getElementById('ShowWB5').style.display='none'; 
		document.getElementById('ShowWB6').style.display='none'; 
		document.getElementById('ShowWB7').style.display='none'; 
		document.getElementById('ShowWB8').style.display='none'; 
		document.getElementById('ShowWB9').style.display='none'; 
		document.getElementById('ShowWB10').style.display='none'; 
		document.getElementById('ShowWB11').style.display='none'; 
		document.getElementById('ShowWB12').style.display='none'; 
		document.getElementById('ShowWB13').style.display='none';
		document.getElementById('ShowWB14').style.display='none';
		document.getElementById('ShowWB15').style.display='none';
	}
}


function AddNewUserFWB() {
  if(EidGameFWB=="" && sessionStorage.getItem("LineID")!=null) {
  	NewDate();
    dbGameFWB.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      GameStatus : 0,
      GameCount : 0,
      GameSumPoint : 0,
      Game1 : 0,
      Game2 : 0,
      Game3 : 0,
      Game4 : 0,
      Game5 : 0,
      Game6 : 0,
      Game7 : 0,
      Game8 : 0,
      Game9 : 0,
      Game10 : 0,
      Game11 : 0,
      Game12 : 0,
      Game13 : 0,
      Game14 : 0,
      Game15 : 0,
      BonusGame : 0,
      FWBDate : dateString
    });
    dbBadgeUser.add({
		LineID : sessionStorage.getItem("LineID"),
		linename : sessionStorage.getItem("LineName"),
		empPicture : sessionStorage.getItem("LinePicture"),
  		EmpID : sessionStorage.getItem("EmpID"),
  		EmpName : sessionStorage.getItem("EmpName"),
		BadgeEng : sBadgeEng,
		BadgeTime : 0,
		BadgeTrue : 0,
		BadgeFalse : 0,
		BadgeEnd : 0,
		BadgeDate : today
    });
    dbBadgeGame.doc(EidBadgeGame).update({
        SumGetBadge : sSumGetBadge+1
    });
	document.getElementById('id04').style.display='block'; 
    CheckUserFWB();
  } else {
  	alert("ไม่พบข้อมูล LINE ของคุณ");
  	SessionNotFound();
  }
}


function GetTarget(x) {
	str = "";
	seeVDO = 0;
	sMyPoint = 0;
	clearInterval(counter);
	timer();
	if(x==1) {
		document.getElementById('ShowWB1').style.display='none';
		str += '<div class="slideanim slide"><img src="./img/wellbeing-01.jpg" style="width:100%;"></div>';
		str += '<div class="text-topic">';
		str += '<div class="text-subtopic1">การที่พนักงานทุกคนมีชีวิตทางการเงินที่ดี คือ <span class="text-blue">ก้าวแรกและเป็นก้าวสำคัญ</span> ของธนาคารที่จะแสดงจุดยืนให้สังคมเห็นว่า <span class="text-org">เราพร้อมเปลี่ยน</span> เพื่อให้ลูกค้ามีชีวิตทางการเงินที่ดีขึ้น ... <span class="text-blue">โดยเริ่มที่ตัวเราก่อน</span></div>';
		str += '<div class="text-subtopic2">ดังนั้น ในฐานะธนาคาร เราจึงอยากเห็น <span class="text-blue">"พนักงานทุกคน"</span> มี Financeial Well-being ที่ดี ซึ่งหมายถึง <span class="text-org">สามารถใช้เงินได้ตามต้องการ</span> เพื่อมีความสุขในการใช้ชีวิตในแบบของตนเอง</div>';               
		str += '</div>';
	} else if(x==2) {
		document.getElementById('ShowWB2').style.display='none';
        	str += '<div class="wb-top-header" style="margin-top:20px;">เส้นทางก้าวสู่<br>การมีชีวิตทางการเงินที่ดีขึ้น 4 มิติ</div>';
		str += '<div class="slideanim slide" style="padding:10px 20px;text-align: left;">';
		str += '<div class="wb-box"><div style="padding:10px;">';
		str += '<div><img src="./img/wb-01.png" class="wb-img"></div>';
		str += '<div class="wb-header">รอบรู้เรื่องกู้ยืม</div>';
		str += '<div class="wb-subheader">Healthy Borrowing</div>';
		str += '</div></div><div class="wb-box"><div style="padding:10px;">';
		str += '<div><img src="./img/wb-02.png" class="wb-img"></div>';
		str += '<div class="wb-header">ฉลาดออม ฉลาดใช้</div>';
		str += '<div class="wb-subheader">Mindful Spending & Start Saving</div>';
		str += '</div></div><div class="wb-box"><div style="padding:10px;">';
		str += '<div><img src="./img/wb-03.png" class="wb-img"></div>';
		str += '<div class="wb-header">ลงทุนเพื่ออนาคต</div>';
		str += '<div class="wb-subheader">Investing for Future</div>';
		str += '</div></div><div class="wb-box"><div style="padding:10px;">';
		str += '<div><img src="./img/wb-04.png" class="wb-img"></div>';
		str += '<div class="wb-header">มีความคุ้มครองอุ่นใจ</div>';
		str += '<div class="wb-subheader">Sufficient Protection</div>';
		str += '</div></div></div>';
	} else if(x==3) {
		str += '<div class="bg_topic">ก้าวแรก ... บริหารชีวิตไม่ติดลบ</div>';
		str += '<div class="slideanim slide"><img src="./img/wb1.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="text-align: left;">';
		str += '<div class="text-subtopic1">การเป็น <span class="text-naviblue">"หนี้"</span> ไม่ใช่ความล้มเหลวของชีวิต และไม่ใช่ความผิด แต่หากจำเป็นต้องสร้างหนี้ เราต้องเลือกว่าจะเป็น <span class="text-naviblue">"หนี้แบบไหน"</span> ที่สำคัญต้องเป็นหนี้แบบ <span class="text-naviblue">"มีวันจบ"</span></div>';
		str += '<div class="text-subtopic2"><span class="text-blue">รอบรู้เรื่องกู้ยืม หรือ healthy Borrowing</span> เป็นแนวคิดที่ธนาคารต้องการ ให้พนักงานเข้าใจ และให้ความสำคัญเกี่ยวกับความรู้ด้านสินเชื่อก่อนการกู้ยืม เพื่อมีข้อมูลประกอบการพิจารณา และตัดสินใจเลือกใช้สินเชื่อได้อย่างถูกต้องและเหมาะสม</div>';
		str += '</div><div class="clr"></div>';
	} else if(x==4) {
		seeVDO = 2;
		sVDOnumber = x;
		VDOtimer = 175;
		timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
		counter = setInterval(timer, 1000);
		str += '<div class="text-topic">';
		str += '<video id="VDO1" width="100%" controls="controls" autoplay>';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep1.mp4?alt=media&token=0aae3eec-1943-46f6-a0aa-93905f462e4d" type="video/mp4">';
		str += '</video><div id="timer" class="timer btn-t1" style="margin-top:10px;"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">การเป็น <span class="text-naviblue">"หนี้"</span> ไม่ใช่ความล้มเหลวของชีวิต และไม่ใช่ความผิด แต่หากจำเป็นต้องสร้างหนี้ เราต้องเลือกว่าจะเป็น <span class="text-naviblue">"หนี้แบบไหน"</span> ที่สำคัญต้องเป็นหนี้แบบ <span class="text-naviblue">"มีวันจบ"</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;"><span class="text-blue">รอบรู้เรื่องกู้ยืม หรือ healthy Borrowing</span> เป็นแนวคิดที่ธนาคารต้องการ ให้พนักงานเข้าใจ และให้ความสำคัญเกี่ยวกับความรู้ด้านสินเชื่อก่อนการกู้ยืม เพื่อมีข้อมูลประกอบการพิจารณา และตัดสินใจเลือกใช้สินเชื่อได้อย่างถูกต้องและเหมาะสม</div>';               
		str += '</div>';
	} else if(x==5) {
		str += '<div class="text-naviblue" style="padding:20px 0 10px 20px; text-align:left;">สินเชื่อที่<span class="text-org">มีหลักทรัพย์</span>ค้ำประกัน</div>';
		str += '<div class="slideanim slide"><img src="./img/wellbeing-04.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="margin:20px;width:90%;">';
		str += '<div class="text-blue">สินเชื่อบ้านแลกเงิน ทีทีบี</div>';
		str += '<div style="margin-top:10px;"><span class="text-naviblue">โซลูชันด้านการเงินกู้เพื่อคนที่มีบ้าน เพื่อใช้สินทรัพย์ที่มีให้เกิดประโยชน์ ปลดล็อกทุกภาระหนี้ เปลี่ยนดอกเบี้ยแพงให้ถูกลง หรือต้องการเงินก้อนใหญ่ไปเสริมสภาพคล่องส่วนตัว หรือธุรกิจ และบ้านยังมีอยู่เหมือนเดิม</span></div>';
		str += '<div style="padding-top:15px;"><span class="text-org">เหมาะสำหรับ</span> ... <br>คนที่ต้องการวงเงินสูง 5 แสน - 10 ล้านบาท เพียงมีบ้านที่ปลอดภาระแล้ว หรือกรณีผ่อนอยู่ก็รีไฟแนนซ์มาที่ ทีทีบี และขอวงเงินเพิ่มเติมได้</div>';
		str += '<div class="clr" style="height:30px;"></div>';
	} else if(x==6) {
		str += '<div class="text-naviblue" style="padding:20px 0 10px 20px; text-align:left;">สินเชื่อที่<span class="text-org">มีหลักทรัพย์</span>ค้ำประกัน</div>';
		str += '<div class="slideanim slide"><img src="./img/wellbeing-05.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="margin:20px;width:90%;">';
		str += '<div class="text-blue">สินเชื่อรถแลกเงิน ทีทีบีไดรฟ์</div>';
		str += '<div style="margin-top:10px;"><span class="text-naviblue">สินเชื่อด้านเงินกู้เพื่อคนมีรถ นำเงินไปเคลียร์หนี้เดิม ลดภาระดอกเบี้ย ผ่านต่อเดือนน้อยลง</span></div>';
		str += '<div style="padding-top:15px;"><span class="text-org">เหมาะสำหรับ</span> ... <br>คนที่ต้องการวงเงินปานกลาง (เฉลี่ยประมาณ 2 แสนบาทขึ้นไป) กู้ได้ 100% ของมูลค่ารถ ไม่ว่ารถจะปลอดภาระแล้ว หรือยังผ่อนอยู่ก็กู้ได้</div>';
		str += '<div class="clr" style="height:30px;"></div>';
	} else if(x==7) {
		str += '<div class="text-naviblue" style="padding:20px 0 10px 20px; text-align:left;">สินเชื่อที่<span class="text-org">ไม่มีหลักทรัพย์</span>ค้ำประกัน</div>';
		str += '<div class="slideanim slide"><img src="./img/wellbeing-09.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="margin:20px;width:90%;">';
		str += '<div class="text-blue">สินเชื่อบุคคลทีทีบี แคชทูแคร์</div>';
		str += '<div style="margin-top:10px;"><span class="text-naviblue">โซลูชันด้านเงินกู้ที่ตั้งใจคิดดอกเบี้ยต่ำสำหรับเรื่องจำเป็น ไม่ว่าจะอุบัติเหตุ เจ็บป่วย หรืออยากรวบหนี้</span></div>';
		str += '<div style="padding-top:15px;"><span class="text-org">เหมาะสำหรับ</span> ... <br>คนที่ต้องการใช้เงินด่วนสำหรับเรื่องสำคัญ จำเป็นในชีวิต รับวงเงินสูงสุด 5 เท่า ของรายได้ต่อเดือน</div>';
		str += '<div class="clr" style="height:30px;"></div>';
	} else if(x==8) {
		str += '<div class="bg_topic">ก้าวที่สอง ... เงินที่หาได้ ไม่สำคัญเท่าเงินที่เก็บได้</div>';
		str += '<div class="slideanim slide"><img src="./img/wb2.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="text-align: left;margin-top:20px;">';
		//str += '<div class="text-subtopic1">การเป็น <span class="text-naviblue">"หนี้"</span> ไม่ใช่ความล้มเหลวของชีวิต และไม่ใช่ความผิด แต่หากจำเป็นต้องสร้างหนี้ เราต้องเลือกว่าจะเป็น <span class="text-naviblue">"หนี้แบบไหน"</span> ที่สำคัญต้องเป็นหนี้แบบ <span class="text-naviblue">"มีวันจบ"</span></div>';
		str += '<div class="text-subtopic2">เพื่อสร้างชีวิตทางการเงินที่ดี เราสนับสนุนให้พนักงานรู้จักวางแผนการเงิน ใช้ให้เป็น ออมให้ถูกที่ และมีวินัยในการออม</div>';
		str += '</div><div class="clr"></div>';
	} else if(x==9) {
		seeVDO = 2;
		sVDOnumber = x;
		VDOtimer = 180;
		timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
		counter = setInterval(timer, 1000);
		str += '<div class="text-topic">';
		str += '<video id="VDO1" width="100%" controls="controls" autoplay>';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep2.mp4?alt=media&token=5d69472d-cdce-4d61-be6a-1849dc539b21" type="video/mp4">';
		str += '</video><div id="timer" class="timer btn-t1" style="margin-top:10px;"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">การที่พนักงานทุกคนมีชีวิตทางการเงินที่ดี คือ <span class="text-blue">ก้าวแรกและเป็นก้าวสำคัญ</span> ของธนาคารที่จะแสดงจุดยืนให้สังคมเห็นว่า <span class="text-org">เราพร้อมเปลี่ยน</span> เพื่อให้ลูกค้ามีชีวิตทางการเงินที่ดีขึ้น ... <span class="text-blue">โดยเริ่มที่ตัวเราก่อน</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;">ดังนั้น ในฐานะธนาคาร เราจึงอยากเห็น <span class="text-blue">"พนักงานทุกคน"</span> มี Financeial Well-being ที่ดี ซึ่งหมายถึง <span class="text-org">สามารถใช้เงินได้ตามต้องการ</span> เพื่อมีความสุขในการใช้ชีวิตในแบบของตนเอง</div>';               
		str += '</div>';
	} else if(x==10) {
		str += '<div class="top-header" style="padding-top:20px;">ttb no fixed</div>';
		str += '<div class="top-subheader">โซลูชันบัญชีเพื่อออม ฝากไม่ประจำ ดอกสูง ถอนได้</div><div class="clr"></div>';
		str += '<div style="margin:15px; width:92%; background:#ffff00;"><img src="./img/wellbeing-07.jpg" style="width:100%;"></div>';
	} else if(x==11) {
		str += '<div class="bg_topic">ก้าวที่สาม ... การวางแผนการเงินคือการวางแผนชีวิตหลังจากนี้</div>';
		str += '<div class="slideanim slide"><img src="./img/wb3.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="text-align: left;margin:20px;width:92%;">';
		str += '<div class="text-navi" style="color:#0056ff;">เพราะการลงทุนคือเรื่องการเงินพื้นฐาน ที่เชื่อมโยงไปสู่เป้าหมายในทุก ๆ ช่วงของชีวิต</div>';
		//str += '<div class="text-subtopic1">การเป็น <span class="text-naviblue">"หนี้"</span> ไม่ใช่ความล้มเหลวของชีวิต และไม่ใช่ความผิด แต่หากจำเป็นต้องสร้างหนี้ เราต้องเลือกว่าจะเป็น <span class="text-naviblue">"หนี้แบบไหน"</span> ที่สำคัญต้องเป็นหนี้แบบ <span class="text-naviblue">"มีวันจบ"</span></div>';
		str += '<div class="text-navi">การลงทุนคืออีกหนึ่งทางเลือกที่ช่วยกระตุ้นให้เงินของเราเติบโตได้มากกว่าการฝากเงิน แม้ทุกการลงทุนมีความเสี่ยง แต่การไม่ลงทุนอะไรเลยก็นับเป็นความเสี่ยงเช่นเดียวกัน</div>';
		str += '</div><div class="clr"></div>';
	} else if(x==12) {

		seeVDO = 2;
		sVDOnumber = x;
		VDOtimer = 175;
		timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
		counter = setInterval(timer, 1000);
		str += '<div class="text-topic">';
		str += '<video id="VDO1" width="100%" controls="controls" autoplay>';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep3.mp4?alt=media&token=8d2ecca4-8eb7-4839-bd22-dd19c2e14b74" type="video/mp4">';
		str += '</video><div id="timer" class="timer btn-t1" style="margin-top:10px;"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">เพราะการลงทุนคือเรื่องการเงินพื้นฐาน ที่เชื่อมโยงไปสู่เป้าหมายในทุก ๆ ช่วงของชีวิต</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;">การลงทุนคืออีกหนึ่งทางเลือกที่ช่วยกระตุ้นให้เงินของเราเติบโตได้มากกว่าการฝากเงิน แม้ทุกการลงทุนมีความเสี่ยง แต่การไม่ลงทุนอะไรเลยก็นับเป็นความเสี่ยงเช่นเดียวกัน</div>';               
		str += '</div>';
		
		<!--
		seeVDO = 1;
		sVDOnumber = x;
		VDOtimer = 35;
		timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
		counter = setInterval(timer, 1000);
		str += '<div class="top-header" style="padding-top:20px;">ttb smart port</div>';
		str += '<div class="top-subheader">พอร์ตลงทุน ดูเลโดยผู้เชี่ยวชาญ</div><div class="clr"></div>';
		str += '<div style="margin-top:20px; width:100%; height:190px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/0Yy9498hZ8Q?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div><div id="timer" class="timer btn-t1" style="margin-top:-10px;"></div>';
		-->
	} else if(x==13) {
		str += '<div class="bg_topic">ก้าวที่สี่ ... เปลี่ยนมาดูแลคนอื่น ด้วยการดูแลตัวคุณเอง</div>';
		str += '<div class="slideanim slide"><img src="./img/wb4.jpg" class="box-wb1"></div>';
		str += '<div class="text-wb1" style="text-align: left;margin:20px;width:92%;">';
		str += '<div class="text-navi" style="color:#0056ff;">การมีประกันคุ้มครองที่เหมาะสม เพื่อรองรับสถานการณ์ที่เกิดขึ้นอย่างไม่คาดฝัน</div>';
		str += '<div class="text-navi">การทำประกันจะช่วยป้องกันความเสี่ยงในอนาคตที่อาจจะเกิดขึ้น เพราะเราไม่รู้ว่าแต่ละวันเราจะพบเจออะไรบ้าง ไม่ว่าจะเป็นประกันชีวิต หรือประกันอุบัติเหตุ จึงเป็นเสมือนเบาะที่รองรับความเสี่ยงแทนเรา ช่วยเพิ่มความอุ่นใจ และหมดกังวลเรื่องค่ารักษาพยาบาลเมื่อเกิดอุบัติเหตุ หรือเจ็บป่วยกะทันหัน</div>';
		str += '</div><div class="clr"></div>';
	} else if(x==14) {
		seeVDO = 1;
		sVDOnumber = x;
		VDOtimer = 35;
		timeup = now.setSeconds(now.getSeconds() + Number(VDOtimer));
		counter = setInterval(timer, 1000);
		str += '<div class="top-header" style="padding-top:20px;">ttb all free</div>';
		str += '<div class="top-subheader">เปลี่ยนมาดูแลคนอื่น ด้วยการดูแลตัวคุณเอง</div><div class="clr"></div>';
		str += '<div style="width:100%; height:180px;margin-top:20px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/6HyVzAdwNHg?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div><div id="timer" class="timer btn-t1" style="margin-top:-10px;"></div>';

		//str += '<div style="margin:15px; width:92%; height:190px;"><img src="./img/wb11.jpg" style="width:100%;"></div><div id="timer" class="timer btn-t1" style="margin-top:-10px;"></div>';
	} else if(x==15) {
		str += '<div class="top-header" style="padding-top:20px;">ttb all free</div>';
		str += '<div class="slideanim slide"><img src="./img/wb15.jpg" style="width:100%;padding:10px 0;"></div>';
	}
	if(seeVDO==0) {
		str += '<div class="clr"></div><center>';
		str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
		str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
		str += '</center><div style="height: 30px;"></div>';
	} else if(seeVDO==1) {
		str += '<div class="clr"></div><center>';
		//str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">เริ่มดูวิดิโอ</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ขอทบทวนใหม่</div>';
		str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">ชมวิดิโอจนจบแล้วไปลุ้นเหรียญรางวัลกันเลย</div>';
		str += '</center><div style="height: 30px;"></div>';
	} else if(seeVDO==2) {
		str += '<div class="clr"></div><center>';
		str += '<div class="btn-t2" onclick="CloseVDO()" style="margin-top:15px;">ขอทบทวนใหม่</div>';
		str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">ชมวิดิโอจนจบแล้วไปลุ้นเหรียญรางวัลกันเลย</div>';
		str += '</center><div style="height: 30px;"></div>';
	}
	$("#DisplayGetPoint").html(str);  
	document.getElementById('id02').style.display='block';
}


function BeForRandom(x) {
	//alert(sVDOnumber);
	var i = 0;
	var str = "";
	var str1 = "";
	for (i = 0; i < 15; i++) {
	  str1 += '<div class="box-number" id="'+i+'" onclick="SelectBox('+i+')">'+NewPoint[i].toFixed(2)+'</div>';
	}	
	str += '<div class="wb-top-header" style="margin-top:30px;">ระบบสุ่มเหรียญรางวัล</div>';
	str += '<div class="text-subtopic3" style="padding:20px 0;color:#0056ff;">เพื่อให้คุณได้สนุกกับการลุ้นเหรียญรางวัล<br>คุณคิดว่าคุณจะสุ่มได้เหรียญรางวัลเท่าไร</div>';
	//str += '<div style="font-size:16px;color:#fff;"><input id="MyPointSelect" type="number" placeholder="ทายเหรียญซิ" pattern="[+-]?[0-9]" style="background:#f68b1f;color:#fff;text-align:center;border-radius:5px;min-height:30px;padding:5px;"></div>';
	str += '<div style="width:83%; margin:auto;">'+ str1 +'</div><div class="clr"></div>';
	str += '<div class="text-subtopic3">ทายถูกรับเหรียญรางวัล คูณ 2</div>';
	str += '<div class="btn-t1" onclick="RandomPoint('+x+')" style="margin-top:30px;">คลิกสุ่มเหรียญรางวัล</div>';
	$("#DisplayGetPoint").html(str);
	sVDOnumber = 0; 
}


function SelectBox(x) {
	var i = 0;
	for (i = 0; i < 15; i++) {
		document.getElementById(i).classList.remove('box-novi');
	}	
	sMyPoint = NewPoint[x].toFixed(2);
	document.getElementById(x).classList.add('box-novi');
}


function RandomPoint(x) {
	//alert(x);
	str = "";
	//alert(sMyPoint);
	var sNewMyPoint = 0;
	var sCheckUserImg = '<img src="./img/true.png" style="width:30px;">';
	var sCheckUserImg1 = '<img src="./img/true.png" style="width:30px;">';
	//var sMyPoint = document.getElementById("MyPointSelect").value;
	if(x==1) {
		document.getElementById('ShowWB1').style.display='none';
	} else if(x==2) {
		document.getElementById('ShowWB2').style.display='none';
	} else if(x==3) {
		document.getElementById('ShowWB3').style.display='none';
	} else if(x==4) {
		document.getElementById('ShowWB4').style.display='none';
	} else if(x==5) {
		document.getElementById('ShowWB5').style.display='none';
	} else if(x==6) {
		document.getElementById('ShowWB6').style.display='none';
	} else if(x==7) {
		document.getElementById('ShowWB7').style.display='none';
	} else if(x==8) {
		document.getElementById('ShowWB8').style.display='none';
	} else if(x==9) {
		document.getElementById('ShowWB9').style.display='none';
	} else if(x==10) {
		document.getElementById('ShowWB10').style.display='none';
	} else if(x==11) {
		document.getElementById('ShowWB11').style.display='none';
	} else if(x==12) {
		document.getElementById('ShowWB12').style.display='none';
	} else if(x==13) {
		document.getElementById('ShowWB13').style.display='none';
	} else if(x==14) {
		document.getElementById('ShowWB14').style.display='none';
	} else if(x==15) {
		document.getElementById('ShowWB15').style.display='none';
	}
	//CheckUserFWB();
	ChangeNow();
	//NewScore = 1.5;
	if(sMyPoint==NewScore) { sNewMyPoint=(NewScore*2); }
	else if(sMyPoint!=NewScore) { sNewMyPoint=NewScore; sCheckUserImg = '<img src="./img/false.png" style="width:30px;">'; }
	str += '<div class="wb-top-header" style="margin-top:30px;">ผลการสุ่มเหรียญรางวัล</div>';
	str += '<div class="text-subtopic3" style="padding:30px 10px 10px 10px;">คุณได้ทายเหรียญที่จะได้ไว้ที่</div>';
	str += '<div style="width:200px;margin:auto;">';
	str += '<div class="input-txt1" style="float: left;margin-right:10px;">'+sMyPoint+'</div>';
	str += '<div style="float: left;text-align:center;padding:5px;">'+sCheckUserImg+'</div>';
	str += '</div><div class="clr"></div>';

	str += '<div class="text-subtopic3" style="padding:10px;">เหรียญรางวัลที่สุ่มได้</div>';
	str += '<div style="width:200px;margin:auto;">';
	str += '<div class="input-txt2" style="float: left;margin-right:10px;">'+NewScore.toFixed(2)+'</div>';
	str += '<div style="float: left;text-align:center;padding:5px;">'+sCheckUserImg1+'</div>';
	str += '</div><div class="clr"></div>';

	//str += '<div class="input-txt2" style="position:relative;">'+NewScore.toFixed(2)+'</div>';
	str += '<div class="text-subtopic3" style="padding:10px;">เหรียญรางวัลที่ได้รับ</div>';
	str += '<div style="width:200px;margin:auto;">';
	str += '<div class="input-txt3" style="float: left;margin-right:10px;">'+sNewMyPoint.toFixed(2)+'</div>';
	str += '<div style="float: left;text-align:center;padding:5px;">'+sCheckUserImg+'</div>';
	str += '</div><div class="clr"></div>';

	str += '<div class="clr"></div>';
	str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
	str += '<div style="height: 30px;"></div>';
	//alert("XP="+sessionStorage.getItem("XP")+"\nRP="+sessionStorage.getItem("RP"));
	$("#DisplayGetPoint").html(str);  
	SaveDataFWB(x,sNewMyPoint);

}


function SaveDataFWB(x,p) {
	//alert(UserArr[0]);
	sGameCount = sGameCount+1;
	sBadgeTime = sBadgeTime+1;
	sSumGetBadge = sSumGetBadge+1;
	sGameSumPoint = parseFloat(sGameSumPoint)+parseFloat(p);
	if(sGameStatus==0) {
		sessionStorage.setItem("XP", parseFloat(sessionStorage.getItem("XP"))+parseFloat(p.toFixed(2)));
		sessionStorage.setItem("RP", parseFloat(sessionStorage.getItem("RP"))+parseFloat(p.toFixed(2)));

		sRewardsXP = parseFloat(sRewardsXP)+parseFloat(p);
		sRewardsRP = parseFloat(sRewardsRP)+parseFloat(p);
		dbScorePoint.doc(EidScorePoint).update({
			//RewardsXP : sRewardsXP,
			RewardsRP : sRewardsRP
		});
        dbBadgeUser.doc(EidBadgeGameUser).update({
            BadgeTime : sBadgeTime
        });

		if(x==1 && UserArr[0]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game1 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==2 && UserArr[1]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game2 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==3 && UserArr[2]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game3 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==4 && UserArr[3]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game4 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==5 && UserArr[4]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game5 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==6 && UserArr[5]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game6 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==7 && UserArr[6]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game7 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==8 && UserArr[7]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game8 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==9 && UserArr[8]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game9 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==10 && UserArr[9]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game10 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==11 && UserArr[10]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game11 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==12 && UserArr[11]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game12 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==13 && UserArr[12]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game13 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==14 && UserArr[13]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game14 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		if(x==15 && UserArr[14]==0) {
			dbGameFWB.doc(EidGameFWB).update({
				Game15 : p,
				GameCount : sGameCount,
				GameSumPoint : sGameSumPoint
			});	
		}
		CheckUserFWB();
	}
}



function ChangeNow() {
  NewScore = random_item(NewPoint);
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}



function timer(x) {
  //var sSendItem = x;
	//alert("timer="+x);
  now = new Date();
  count = Math.round((timeup - now)/1000);
  if (now > timeup) {
      window.location = "#"; //or somethin'
      $("#timer").html("<font color='#ffff00'>ขอบคุณสำหรับการชมวิดิโอนี้</font>");
      //document.getElementById("SubmitAns").style.display = "none";
      //alert("หมดเวลา");
      clearInterval(counter);
      BeForRandom(sVDOnumber);
      //SaveData();
      return;
  }
  var seconds = Math.floor((count%60));
  var minutes = Math.floor((count/60) % 60);
  if(seconds<10) { seconds="0"+seconds } 
  $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>&nbsp;" + minutes + " นาที " + seconds + " วินาที</font>");
}


function wb_topic(x) {
	var str = "";
	if(x==1) {
		str += '<div><div><img src="./img/wb1.jpg" class="wb-imgbox"></div>';
		str += '<div class="wb-imgbox-text"><div class="wb-header">รอบรู้เรื่องกู้ยืม</div>';
		str += '<div class="wb-subheader">Healthy Borrowing</div>';
		str += '<div class="text-subtopic3"><span class="text-org">เปลี่ยน</span> ... <br>มาศึกษา และวางแผนการกู้ยืมอย่างเหมาะสม เพื่อเพิ่มสภาพคล่อง และลดภาระหนี้ที่จะเกิดขึ้นในอนาคต</div>';
		str += '<div class="text-subtopic4">ผ่านโซลูชันสินเชื่อที่มีให้เลือกตามความเหมาะสม เช่น รับดอกเบี้ยถูกพิเศษเมื่อกู้ยืมในสิ่งที่จำเป็น รวบนี้ปลดภาระด้วยดอกเบี้ยต่ำ</div>';
		str += '</div></div><div class="clr"></div>';
		str += '<div class="btn-t1" onClick=window.location="wellbeing-healthy.html" style="margin-top:10px;">ดูรายละเอียด</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
		str += '<div style="height: 30px;"></div>';
	} if(x==2) { 
		str += '<div><div><img src="./img/wb2.jpg" class="wb-imgbox"></div>';
		str += '<div class="wb-imgbox-text"><div class="wb-header">ฉลาดออม ฉลาดใช้</div>';
		str += '<div class="wb-subheader">Mindful Spending & Start Saving</div>';
		str += '<div class="text-subtopic3"><span class="text-org">เปลี่ยน</span> ... <br>มาใช้จ่ายอย่างมีวินัย ระมัดระวังไม่ให้เกินตัว พร้อมเริ่มเก็บออมเงินอย่างสม่ำเสมอ</div>';
		str += '<div class="text-subtopic4">ผ่านบัญชีเพื่อออม บัญชีเพื่อใช้ และบัตรเครดิตที่มีโซลูชันที่แตกต่าง และดีที่สุดของ ทีทีบี ที่สามารถตอบได้ทุกไลฟ์สไตล์</div>';
		str += '</div></div><div class="clr"></div>';
		str += '<div class="btn-t1" onClick=window.location="wellbeing-mindful.html" style="margin-top:10px;">ดูรายละเอียด</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
		str += '<div style="height: 30px;"></div>';
	} if(x==3) { 
		str += '<div><div><img src="./img/wb3.jpg" class="wb-imgbox"></div>';
		str += '<div class="wb-imgbox-text"><div class="wb-header">ลงทุนเพื่ออนาคต</div>';
		str += '<div class="wb-subheader">Investing for Future</div>';
		str += '<div class="text-subtopic3"><span class="text-org">เปลี่ยน</span> ... <br>มาเริ่มลงทุนอย่างเข้าใจ ตั้งแต่วันนี้ เพื่อโอกาสรับผลตอบแทนที่ดีกว่าการออมเงินในบัญชีเงินฝาก</div>';
		str += '<div class="text-subtopic4">ผ่านโซลูชันการลงทุนบนพอร์ตกองทุนชั้นนำ ที่มาพร้อมผู้เชี่ยวชาญทางการเงิน ที่ให้คำปรึกษาได้ทันที</div>';
		str += '</div></div><div class="clr"></div>';
		str += '<div class="btn-t1" onClick=window.location="wellbeing-investing.html" style="margin-top:10px;">ดูรายละเอียด</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
		str += '<div style="height: 30px;"></div>';
	} if(x==4) { 
		str += '<div><div><img src="./img/wb4.jpg" class="wb-imgbox"></div>';
		str += '<div class="wb-imgbox-text"><div class="wb-header">มีความคุ้มครองอุ่นใจ</div>';
		str += '<div class="wb-subheader">Sufficient Protection</div>';
		str += '<div class="text-subtopic3"><span class="text-org">เปลี่ยน</span> ... <br>มาให้ความสำคัญกับตัวเองและคนที่รัก พร้อมปกป้องเงินออม และทรัพย์สินไม่ให้เสียไปกับเหตุการณ์ที่ไม่คาดฝัน</div>';
		str += '<div class="text-subtopic4">ผ่านโซลูชันประกันที่หลากหลาย เหมาะสมในแต่ละช่วงชีวิต เพื่อให้คุณ และคนที่รักมีความคุ้มครองที่ครอบคลุม อุ่นใจไว้รับความเสี่ยง</div>';
		str += '</div></div><div class="clr"></div>';
		str += '<div class="btn-t1" onClick=window.location="wellbeing-sufficient.html" style="margin-top:10px;">ดูรายละเอียด</div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
		str += '<div style="height: 30px;"></div>';
	}
	$("#DisplayWB").html(str);  
	document.getElementById('id01').style.display='block';
}


function OpenVDO(x) {
	var str = "";
	if(x==1) {
		str += '<center><div class="top-header" style="padding-top:20px;">ก้าวแรก ... บริหารชีวิตไม่ติดลบ</div>';
		str += '<div class="top-subheader">โซลูชันรวบหนี้ ลดภาระดอกเบี้ย</div><div class="clr"></div>';
		str += '<video id="VDO1" width="100%" controls="controls" autoplay style="padding-top:15px;">';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep1.mp4?alt=media&token=0aae3eec-1943-46f6-a0aa-93905f462e4d" type="video/mp4">';
		str += '</video><div class="clr"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">การที่พนักงานทุกคนมีชีวิตทางการเงินที่ดี คือ <span class="text-blue">ก้าวแรกและเป็นก้าวสำคัญ</span> ของธนาคารที่จะแสดงจุดยืนให้สังคมเห็นว่า <span class="text-org">เราพร้อมเปลี่ยน</span> เพื่อให้ลูกค้ามีชีวิตทางการเงินที่ดีขึ้น ... <span class="text-blue">โดยเริ่มที่ตัวเราก่อน</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;">ดังนั้น ในฐานะธนาคาร เราจึงอยากเห็น <span class="text-blue">"พนักงานทุกคน"</span> มี Financeial Well-being ที่ดี ซึ่งหมายถึง <span class="text-org">สามารถใช้เงินได้ตามต้องการ</span> เพื่อมีความสุขในการใช้ชีวิตในแบบของตนเอง</div>';               
		str += '<div class="btn-t2" onclick="CloseVDO()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
		str += '</center><div style="height: 30px;"></div>';

/*
		str += '<div class="top-header" style="padding-top:20px;">ttb debt consolidation</div>';
		str += '<div class="top-subheader">โซลูชันรวบหนี้ ลดภาระดอกเบี้ย</div><div class="clr"></div>';
		str += '<div style="margin-top:20px; width:100%; height:180px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/icpgq9qgnd0?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div>';
		str += '<div class="clr"></div>';
*/
	} else if(x==2) {
		str += '<center><div class="top-header" style="padding-top:20px;">ก้าวที่สอง ... เงินที่หาได้ ไม่สำคัญเท่าเงินที่เก็บได้</div>';
		str += '<div class="top-subheader">ฉลาดออม ฉลาดใช้</div><div class="clr"></div>';
		str += '<video id="VDO2" width="100%" controls="controls" autoplay style="padding-top:15px;">';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep2.mp4?alt=media&token=5d69472d-cdce-4d61-be6a-1849dc539b21" type="video/mp4">';
		str += '</video><div class="clr"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">การที่พนักงานทุกคนมีชีวิตทางการเงินที่ดี คือ <span class="text-blue">ก้าวแรกและเป็นก้าวสำคัญ</span> ของธนาคารที่จะแสดงจุดยืนให้สังคมเห็นว่า <span class="text-org">เราพร้อมเปลี่ยน</span> เพื่อให้ลูกค้ามีชีวิตทางการเงินที่ดีขึ้น ... <span class="text-blue">โดยเริ่มที่ตัวเราก่อน</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;">ดังนั้น ในฐานะธนาคาร เราจึงอยากเห็น <span class="text-blue">"พนักงานทุกคน"</span> มี Financeial Well-being ที่ดี ซึ่งหมายถึง <span class="text-org">สามารถใช้เงินได้ตามต้องการ</span> เพื่อมีความสุขในการใช้ชีวิตในแบบของตนเอง</div>';               

/*
		str += '<div class="wb-top-header1" style="margin-top:0px;"><u>3 ป. เพื่อการฉลาดออม ฉลาดใช้</u></div>';
		str += '<div style="text-align:left;width:90%;font-size:12px;><div style="text-align: left;"><ul>';
		str += '<li><span class="text-blue">ประเมินสถานการณ์การเงิน</span><br>คำนวณรายรับรายจ่าย เพื่อกำหนดค่าใช้จ่ายในแต่ละเดือน<br></li>';
		str += '<li><span class="text-blue">ประหยัดค่าใช้จ่าย</span><br>สำรวจและตัดรายจ่ายที่ไม่จำเป็นออกไป เพื่อให้มีเงินเหลือเก็บมากขึ้น<br></li>';
		str += '<li><span class="text-blue">เปลี่ยนแปลงนิสัยตนเอง</span><br>รู้จักหารายได้เพิ่ม ไม่ใช้เงินฟุ่มเฟือย มีวินัยในการออม และตั้งเป้าหมายในการเก็บเงิน<br></li>';
		str += '</ul></div></div>';
*/
		str += '<div class="btn-t2" onclick="CloseVDO2()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
		str += '</center><div style="height: 30px;"></div>';



/*
		str += '<div class="top-header" style="padding-top:20px;">ttb no fixed</div>';
		str += '<div class="top-subheader">โซลูชันบัญชีเพื่อออม ฝากไม่ประจำ ดอกสูง ถอนได้</div><div class="clr"></div>';
		str += '<div style="margin-top:20px; width:100%; height:180px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/B69taBZOEkw?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div>';
		str += '<div class="clr"></div>';
*/
	} else if(x==3) {
		str += '<center><div class="top-header" style="padding-top:20px;">ก้าวที่สาม ... การวางแผนการเงินคือการวางแผนชีวิตหลังจากนี้</div>';
		str += '<div class="top-subheader">ลงทุนเพื่ออนาคต</div><div class="clr"></div>';
		str += '<video id="VDO2" width="100%" controls="controls" autoplay style="padding-top:15px;">';
		str += '<source src="https://firebasestorage.googleapis.com/v0/b/retailproject-6f4fc.appspot.com/o/vdo%2FFWBep3.mp4?alt=media&token=8d2ecca4-8eb7-4839-bd22-dd19c2e14b74" type="video/mp4">';
		str += '</video><div class="clr"></div>';
		str += '<div class="text-subtopic1" style="text-align:left;">การที่พนักงานทุกคนมีชีวิตทางการเงินที่ดี คือ <span class="text-blue">ก้าวแรกและเป็นก้าวสำคัญ</span> ของธนาคารที่จะแสดงจุดยืนให้สังคมเห็นว่า <span class="text-org">เราพร้อมเปลี่ยน</span> เพื่อให้ลูกค้ามีชีวิตทางการเงินที่ดีขึ้น ... <span class="text-blue">โดยเริ่มที่ตัวเราก่อน</span></div>';
		str += '<div class="text-subtopic2" style="text-align:left;">ดังนั้น ในฐานะธนาคาร เราจึงอยากเห็น <span class="text-blue">"พนักงานทุกคน"</span> มี Financeial Well-being ที่ดี ซึ่งหมายถึง <span class="text-org">สามารถใช้เงินได้ตามต้องการ</span> เพื่อมีความสุขในการใช้ชีวิตในแบบของตนเอง</div>';               
/*		
		str += '<div class="top-header" style="padding-top:20px;">ttb smart port</div>';
		str += '<div class="top-subheader">พอร์ตลงทุน ดูเลโดยผู้เชี่ยวชาญ</div><div class="clr"></div>';
		str += '<div style="margin-top:20px; width:100%; height:180px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/0Yy9498hZ8Q?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div>';
		str += '<div class="clr"></div>';
*/
	} else if(x==4) {
		str += '<div class="top-header" style="padding-top:20px;">ttb all free</div>';
		str += '<div class="top-subheader">เปลี่ยนมาดูแลคนอื่น ด้วยการดูแลตัวคุณเอง</div><div class="clr"></div>';
		str += '<div style="margin-top:20px; width:100%; height:180px;"><center><iframe width="280" height="158" src="https://www.youtube.com/embed/6HyVzAdwNHg?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></div>';
		str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</div>';
		str += '<div class="clr"></div>';
	}
	$("#DisplayVDO").html(str);  
	document.getElementById('id03').style.display='block';
}



function CloseAll() {
  $("iframe").remove();
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
}


function CloseVDO() {
  clearInterval(counter);;	
  document.getElementById('VDO1').pause();
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
}

function CloseVDO2() {
  clearInterval(counter);;	
  document.getElementById('VDO2').pause();
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
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




function SessionNotFound() {
  window.location.href = 'index.html';
}
