var cleararray = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dateString = "";
var getNumberStart = 0;
var getNumber1 = 0;
var getNumber2 = 0;
var getNumber3 = 0;
var ScorePoint = 0;
var GetOpenPoint = 0.2;
var ScoreExtraGame = .40;
var EndGame = 0;
var GetTrue = 0;
var RoundNumber = 0;
var RoundNumber1 = 0;
var RoundNumber2 = 0;
var RoundNumber3 = 0;
var textmessage = "";
var textDisplayPoint = "";
var CheckPoint = 0;
var intromessage = '<div class="text-score">เลือกตัวเลข 1-10 ตัวต่อไปว่าจะ <b><font color="#ffff00">น้อยกว่า</font></b> | <b><font color="#ffff00">เท่ากับ</font></b> | <b><font color="#ffff00">มากกว่า</font></b></div>';
var intwarning = '<div class="text-warning">คำเตือน<br>หากคุณออกจากหน้านี้ก่อนการตอบคำถามจะสิ้นสุด<br>คุณจะได้ 0 คะแนน และไม่สามารถเข่งขันเกมส์นี้ในวันนี้ได้อีก</div>';
var dbUser = "";
var dbCheck = "";
var sTypeSelect = "เกมส์วัดดวง";
var sGroupQuiz = "GameNumber";


$(document).ready(function () {
    //document.getElementById("id04").style.display = "block";
	//$("#Displayintromessage").html(intromessage);
	//$("#DisplayWarning").html(intwarning);
	Connect_DB();
	CheckScorePoint();
	CheckUserQuiz();
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
}


var Eid = "";
var CountRec = "";
var CheckAddEdit = 0;
//var UserPlay = 0;
function CheckUserQuiz() {
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizDate','==',today)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      CountRec = CountRec+1;
      LastScore = doc.data().LastScore;
      //alert("Found "+ Eid);
      //UserPlay = 1;
      //if(newScore!="" && CheckAddEdit==2) {
      //  $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
      //} else {
      //  $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(doc.data().LastScore).toFixed(2) +" คะแนน</div>");
      //}
    });
    if(Eid=="") {
    	//alert("New Game");
      CountRec = 0;
	  document.getElementById("id04").style.display = "block";
	  $("#Displayintromessage").html(intromessage);
	  $("#DisplayWarning").html(intwarning);
	  BoxNumber();
	  StartNumber();
    } 
  });
}


function FalseGame() {
	if(RoundNumber!=3) {
		$("#DisplayWarning").html(cleararray);
		$("#DisplayMessage").val(cleararray);
		$("#DisplayMessage").html(cleararray);
		$("#Displayintromessage").val(cleararray);
		$("#Displayintromessage").html(cleararray);
		$("#DisplayLastScore").val(cleararray);
		textDisplayPoint = "<img src='./img/false.jpg' style='max-width: 120px; margin-bottom: 20px;'><div class='text-false'>คุณทายผลตัวเลขผิด</div>คุณทำคะแนนในเกมส์นี้ได้ = <b>"+ ScorePoint.toFixed(2) +" คะแนน</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า";
		$("#DisplayLastScore").html(textDisplayPoint);
		//alert(n);
	    document.getElementById("id01").style.display = "block";
	}
}


function TrueGame() {
	EndGame = 1;
	$("#DisplayWarning").html(cleararray);
	$("#Displayintromessage").val(cleararray);
	$("#Displayintromessage").html(cleararray);
	DisplayRound();
	//alert("CheckPoint "+CheckPoint);
	//if(CheckPoint==3) { ScorePoint = ScorePoint+0.4; }
	//alert("CheckPoint " +CheckPoint);
	//if(CheckPoint==0.6) { ScorePoint = parseFloat(ScorePoint)+0.4 ; }
	//if(CheckPoint==.6) { ScorePoint = ScorePoint+1 ; }
	//alert("RoundNumber "+RoundNumber);
	if(GetTrue==3) { 
		ScorePoint = ScorePoint+0.4; 
		//alert("ScorePoint "+ScorePoint); 
	}
	UpdateNewUser();
	//alert("ScorePoint "+ScorePoint);
	textmessage="เกมส์จบลงแล้ว";
	$("#DisplayMessage").val(cleararray);
	//$("#DisplayMessage").html(cleararray);
	$("#DisplayMessage").html(textDisplayPoint);
	$("#DisplayEndScore").val(cleararray);
	textDisplayPoint = "<img src='./img/ok.jpg' style='max-width: 120px; margin-bottom: 20px;'><div class='text-false'>สรุปผลคะแนนการแข่งขันของคุณในรอบนี้</div>คุณทำคะแนนในเกมส์นี้ได้ = <b>"+ ScorePoint.toFixed(2) +" คะแนน</b><br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า";
	$("#DisplayEndScore").html(textDisplayPoint);
    document.getElementById("id02").style.display = "block";
}


function ExtraGame() {
	$("#Displayintromessage").val(cleararray);
	$("#Displayintromessage").html(cleararray);
	ScorePoint = ScorePoint + ScoreExtraGame;
	//alert(ScorePoint);
	$("#DisplayExtraPoint").val(cleararray);
	var textExtraPoint = "<img src='./img/true.jpg' style='max-width: 120px; margin-bottom: 20px;'><div class='text-false'>คุณทายผลตัวเลขเหมือนกันได้ถูกต้อง</div>ยินดีด้วย คุณทำ Extra Point สำเร็จ<br>คุณได้รับคะแนนพิเศษเพิ่ม 0.6 คะแนน<br>และสามารถเก็บคะแนนได้<br>จนกว่าเกมส์จะจบ";
	$("#DisplayExtraPoint").html(textExtraPoint);
    document.getElementById("id03").style.display = "block";
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
	document.getElementById('id02').style.display='none';
	document.getElementById('id03').style.display='none';
	document.getElementById('id04').style.display='none';
}


function StartNumber() {
	RoundNumber = RoundNumber+1;
	getNumberStart = Math.floor((Math.random() * 10) + 1);
	textmessage = "เริ่มการแข่งขันของคุณ";
	var str = "";
	var str0 = "";
	$("#DisplayNumber").val(cleararray);
	str+='<div class="gameNumber">'+getNumberStart+'</div>';
	$("#DisplayNumber").html(str);
	str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ getNumberStart +'</div><div class="game-a2">เริ่มเกมส์</div></div>';
	$("#DisplayNumber0").html(str0);
	$("#DisplayMessage").html(textmessage);
	DisplayRound();
}



function DisplayRound() {
	//if(RoundNumber>3) { alert(RoundNumber); EndGame=1; EndGame(); }
	//alert("Display Round : "+RoundNumber);
	$("#DisplayRound").val(cleararray);
	var str = "";
	if(EndGame==0) {
		str+='<div style="max-width:360px;width:100%;margin:auto;">';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',1)"><div class="game-a3"><</div><div class="game-a4">น้อยกว่า</div></div>';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',2)"><div class="game-a3">=</div><div class="game-a4">เท่ากับ</div></div>';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',3)"><div class="game-a3">></div><div class="game-a4">มากกว่า</div></div>';
		str+='</div>';
	} else {
		str+='<center><div class="btn-t1" style="margin-top:25px;" onclick="LinkMainPage()">กลับไปที่เมนูหลัก</div></center>';
	}
	$("#DisplayRound").html(str);
}


function SendNumber(r,s,n) {
	$("#DisplayScore").val(cleararray);
	$("#DisplayMessage").val(cleararray);
	RandomNumber();
	//alert(r+"==="+s+"==="+n)
	var str = "";
	var str0 = "";
	var ntext = "";
	if(n==1) { ntext = "น้อยกว่า"; } else
	if(n==2) { ntext = "เท่ากับ"; } else
	if(n==3) { ntext = "มากกว่า"; } 
	if(RoundNumber==1) {
		if(n==1) { 
			if(RoundNumber1<getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1; }
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber1==getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+GetOpenPoint; 
			if(RoundNumber!=3) { ExtraGame(); } 
			CheckPoint = CheckPoint+GetOpenPoint; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber1>getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1;} 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		$("#DisplayNumber").val(cleararray);
		str+='<div class="gameNumber">'+RoundNumber1+'</div>';
		$("#DisplayNumber").html(str);
		str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber1 +'</div><div class="game-a2">'+ ntext +'</div></div>';
		$("#DisplayNumber1").html(str0);
		$("#DisplayMessage").html(textmessage);

	} else if(RoundNumber==2) {
		if(n==1) { 
			if(RoundNumber2<RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1;}
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber2==RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; 
			if(RoundNumber!=3) { ExtraGame(); } 
			CheckPoint = CheckPoint+GetOpenPoint; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber2>RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1;} 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		$("#DisplayNumber").val(cleararray);
		str+='<div class="gameNumber">'+RoundNumber2+'</div>';
		$("#DisplayNumber").html(str);
		str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber2 +'</div><div class="game-a2">'+ ntext +'</div></div>';
		$("#DisplayNumber2").html(str0);
	} else if(RoundNumber==3) {
		if(n==1) { 
			if(RoundNumber3<RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1;}
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber3==RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; 
			if(RoundNumber!=3) { ExtraGame(); } 
			CheckPoint = CheckPoint+GetOpenPoint; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber3>RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+GetOpenPoint; CheckPoint = CheckPoint+GetOpenPoint; GetTrue=GetTrue+1;} 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		$("#DisplayNumber").val(cleararray);
		str+='<div class="gameNumber">'+RoundNumber3+'</div>';
		$("#DisplayNumber").html(str);
		str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber3 +'</div><div class="game-a2">'+ ntext +'</div></div>';
		$("#DisplayNumber3").html(str0);
	}
	
	if(RoundNumber>2) { TrueGame(); }
	RoundNumber = RoundNumber+1;
	$("#DisplayScore").html(ScorePoint.toFixed(2));
	DisplayRound();
}


  
    
function RandomNumber() {
	if(RoundNumber==1) {
		RoundNumber1 = Math.floor((Math.random() * 10) + 1);	
		//alert("Start Game");
		AddNewUser();
		//RoundNumber1 = 5;	
	} else if(RoundNumber==2) {
		RoundNumber2 = Math.floor((Math.random() * 10) + 1);		
		//RoundNumber2 = 5;	
	} else if(RoundNumber==3) {
		RoundNumber3 = Math.floor((Math.random() * 10) + 1);		
		//RoundNumber3 = 5;	
	}
}
    
   

var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
var sJoinTime = 0;
var sUserLevel = 0;
function CheckScorePoint() {
  if(CountRec==0) {
    dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        EidScorePoint = doc.id;
        //sUserLevel = doc.data().UserLevel;
        sJoinTime = doc.data().JoinTime;
        sRewardsXP = doc.data().RewardsXP;
        sRewardsRP = doc.data().RewardsRP;
      });
      if(EidScorePoint=="") {
        alert("กรุณาลงทะเบียนก่อนเข้าร่วมกิจกรรม");
        window.location.href = 'index.html';
      }
    });
  }
}



function AddNewUser() {
 if(CountRec==0) {
 	var GetZero = 0;
    var TimeStampDate = Math.round(Date.now() / 1000);
 	CheckAddEdit = 2;
    NewDate();
    dbCheck.add({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      QuizDate : today,
      PointIN : GetZero,
      LastScore : GetZero,
      DateQuiz : dateString,
      TimeStamp : TimeStampDate,
      TypeSelect : sTypeSelect
    });
  }
  CheckUserQuiz();
}


function UpdateNewUser() {
	if(CheckAddEdit==2) { 
	    //alert(Eid);
	    NewDate();
	    var TimeStampDate = Math.round(Date.now() / 1000);
	    dbCheck.doc(Eid).update({
	      //GroupQuiz : sGroupQuiz,
	      //LineID : sessionStorage.getItem("LineID"),
	      //LineName : sessionStorage.getItem("LineName"),
	      //LinePicture : sessionStorage.getItem("LinePicture"),
	      //EmpID : sessionStorage.getItem("EmpID"),
	      //EmpName : sessionStorage.getItem("EmpName"),
	      //QuizDate : today,
	      //QuizType : CheckType,
	      //Quetion :  CheckQuizQuestion,
	      //Answer : ChoiceSelect,
	      //ResultQuiz : typeResult,
	      PointIN : parseFloat(ScorePoint),
	      //PointIN : parseFloat(YourScore).toFixed(2),
	      //ChangePoint : ChangePoint,
	      //PointOUT : parseFloat(ChangePoint),
	      //PointOUT : parseFloat(ChangePoint).toFixed(2),
	      LastScore : ScorePoint,
	      DateQuiz : dateString,
	      TimeStamp : TimeStampDate
	    });	

	    dbScorePoint.doc(EidScorePoint).update({
	      JoinTime : sJoinTime+1,
	      RewardsXP : parseFloat(sRewardsXP+ScorePoint),
	      RewardsRP : parseFloat(sRewardsRP+ScorePoint)
	    });
	}
}



function BoxNumber() {
	var str="";
	str+='<div class="col-sm-3 game2-boxs"><div class="game-a5">?</div>';
	$("#DisplayScore").html(ScorePoint);
	$("#DisplayNumber1").html(str);
	$("#DisplayNumber2").html(str);
	$("#DisplayNumber3").html(str);
}



function LinkMainPage(){
	window.location.href='introgame.html';
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
