var cleararray = "";
//var Bottom_1 = 0;
var Bottom_3 = 0;
//var Bottom_4 = 0;
var CheckAddEdit = 0;
var SumQuiz = 0;
var newScore = 0;
var YourScore = 0;
var SendAnswer = 0;
var CheckPoint = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var CheckOpenCard = 1; // 0=ปิด, 1=เปิด
var sGroupQuiz = "MiniCard";
var CheckQuizQuestion = "";

var dbUser = "";
var dbCheck = "";
var dbQuestion = "";
var EidQuestion = "";

$(document).ready(function () {
  $("#DisplayDate").html("<div class='header-line'>เกมส์เปิดใจ<br>กิจกรรมประจำวันที่ "+today+"</div>");
  $("#DisplayMyScore").html("<div style='padding:5px 0 15px 0; color:#ffffff;font-size: 10px;''>คลิกเลือกภาพ ... ตามหาคะแนน</div>");
  Connect_DB();
  CheckScorePoint();
  CheckUserQuiz();
  //alert(UserPlay);
  Card();
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
  dbQuestion = firebase.firestore().collection("Question");
}

var CountRec = "";
var Eid = "";
var UserPlay = 0;
function CheckUserQuiz() {
  //alert(sGroupQuiz+"---"+sessionStorage.getItem("LineID"));
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizDate','==',today)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      CountRec = CountRec+1;
      //alert(CountRec);
      LastScore = doc.data().LastScore;
      UserPlay = 1;
      if(newScore!="" && CheckAddEdit==2) {
        $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
      } else {
        $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(doc.data().LastScore).toFixed(2) +" คะแนน</div>");
      }
    });
    //alert(CountRec);
    if(Eid=="") {
      CountRec = 0;
      document.getElementById('id02').style.display='block';
    } 
    //if(CountRec!=0) {
    //  document.getElementById('id01').style.display='none';
    //}
  });
}



function Card() { 
  var i = 0;
  var atr = '';
  var str = '';
  var btr = '';
  var Nub_end = 12 ;
  $("#BoxGame").val(cleararray);
  atr+='<center>';
  atr+='<div class="card-boximg">';
  atr+='<div>';
  for (i = 0; i < Nub_end; i++) {
    str+='<div class="flip-card" onclick="OpenCard('+i+');"><img src="./boxgame/box1/game-'+i+'.jpg" alt="Avatar" class="a_image">';
    str+='<div class="overlay"><div style="padding:-5px 20px;font-size:50px;color:#ffffff;"><b>'+(i+1)+'</b></div>';
    str+='<div class="btn-t1" style="width:90% !important;top:60px;left:4px; position: absolute;">เลือก</div></div></div>';
  }
  btr+=atr+str+'</div>';
  atr+='</center>';
  $("#BoxGame").html(btr);
}



function OpenCard(x) { 
  var str = "";
  str += '<div><img src="./boxgame/box1/game-'+x+'@.jpg" class="boxImg4heart"></div>';
  if(UserPlay==0) { // 0=ยังไม่ได้เล่น 1=เล่นแล้ว
    str += '<div class="btn-t1" onclick="RandomCard()">ลุ้นรางวัล</div><div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่าง</div>';
    str += '<div style="font-size:10px; padding:8px;color:#ff0000;">กิจกรรมเปิดภาพลุ้นรางวัล</div>';
  } else {
    str += '<div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่าง</div>';
  }
  $("#ShowStory").html(str);
  document.getElementById("id01").style.display = "block";
}



var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
var sJoinTime = 0;
var sUserLevel = 0;
var sUserSumTrue = 0;
var sUserSumFalse = 0;
var sUserSumQuiz = 0;

function CheckScorePoint() {
  if(CountRec==0) {
    dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        EidScorePoint = doc.id;
        //alert(EidScorePoint);
        sUserLevel = doc.data().UserLevel;
        sJoinTime = doc.data().JoinTime;
        sRewardsXP = doc.data().RewardsXP;
        sRewardsRP = doc.data().RewardsRP;
        sUserSumTrue = doc.data().UserSumTrue;
        sUserSumFalse = doc.data().UserSumFalse;
        sUserSumQuiz = doc.data().UserSumQuiz;
      });
      if(EidScorePoint=="") {
        alert("กรุณาลงทะเบียนก่อนเข้าร่วมกิจกรรม");
        window.location.href = 'index.html';
      }
    });
  }
}



function RandomCard() { 
  var str = '';
  Bottom_3 = 1;
  CheckBottom();
  //CheckScorePoint();
  //alert("ID : "+EidScorePoint+" Score = "+sRewardsXP);
  $("#ShowStory").val(cleararray);
  var RandomCardNumber = [sGroupQuiz,"1",sGroupQuiz,"2",sGroupQuiz,sGroupQuiz,"1",sGroupQuiz,"0",sGroupQuiz,sGroupQuiz,sGroupQuiz,sGroupQuiz];
  //var RandomCardNumber = [ "QUIZ","QUIZ","QUIZ","QUIZ"];
  //var RandomCardNumber = [sGroupQuiz,sGroupQuiz];
  //var RandomCardNumber = ["0","1",sGroupQuiz];
  //var RandomCardNumber = ["1","1","2"];
  var ShowCardNumber = RandomCardNumber[Math.floor(Math.random() * RandomCardNumber.length)];
  //YourScore = ShowCardNumber;
  //alert(ShowCardNumber);
  //alert("จำนวนข้อมูล "+CountRec);
  if(CountRec!=0) {
    document.getElementById('id01').style.display='none';
    CheckUserQuiz();
  } 
  if(ShowCardNumber==0) {
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="text-align: center;">';
    str+='<div><img src="./img/sorry-1.png" width="170px;"></div>';
    str+='<div class="txt-qq" style="color:#f68b1f;">เสียใจด้วย วันนี้คุณเปิดภาพไม่เจอคะแนน<div>';
    str+='<div style="color:#f68b1f;font-size:13px;">พรุ่งนี้กลับมาลุ้นคะแนนกันใหม่น้า</div>';
    str+='<div class="btn" onclick="CloseAll()" style="margin-top:12px;">ปิดหน้าต่างนี้</div></div></center></div>';
    $("#ShowStory").html(str);
    if(CountRec==0) {
      SaveMyScore();
      SaveMyScorePoint();
    }
  } else if(ShowCardNumber==1 || ShowCardNumber==2) {
    CheckPoint = ShowCardNumber;
    YourScore = ShowCardNumber;
    //sRewardsXP = (parseFloat(sRewardsXP)+parseFloat(ShowCardNumber));
    //sRewardsRP = (parseFloat(sRewardsRP)+parseFloat(ShowCardNumber));
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="margin-left:10px;text-align: center;">';
    //str+='<div style="margin:30px;"><img src="./img/true.png" width="60px;"></div>';
    str+='<div style="font-size:24px;color:#0056ff;padding:10px 0 20px 0;">';
    str+= '<div><img src="./img/happy@.jpg" width="200px;"></div>';
    str+='<div style="font-size:14px;color:#f68b1f;">ยินดีด้วย</div>';
    str+='คุณได้รับ '+ShowCardNumber+' คะแนน</div><div>ได้รับคะแนนกันไปง่าย ๆ<br>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div>';
    str+='<div class="btn-t1" onclick="CloseAll()" style="margin-top:12px;">ปิดหน้าต่างนี้</div></div></center></div>';
    $("#ShowStory").html(str);
    //alert("Save --> ได้คะแนน = "+sRewardsXP);
    if(CountRec==0) {
      SaveMyScore();
      SaveMyScorePoint();
    }
  } else if(ShowCardNumber==sGroupQuiz) {
    CheckPoint = 1;
    CheckAddEdit = 2;
    YourScore = CheckPoint;
    $('.noshow').hide();
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="margin-left:10px;text-align: center;">';
    str+='<div style="padding:10px 0 10px 0;"><img src="./img/quizgame.png" width="130px;"></div>';
    str+='<div>คุณต้องออกแรงกันหน่อยแล้ว<br>ไม่มีอะไรได้มาง่ายๆ</div>';
    str+='<div class="btn-t1" onclick="GetQuestion(\''+ ShowCardNumber +'\')" style="margin-top:12px;">ถ้าพร้อมแล้วไปตอบคำถามกัน</div></div></center></div>';
    $("#ShowStory").html(str);
    if(CountRec==0) {
      AddNewUser();
    }
    //SaveMyScorePoint();
  }
}



function AddNewUser() {
 if(CountRec==0) {
    dbCheck.add({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      QuizDate : today
    });
  }
  CheckUserQuiz();
}


function CheckBottom() {
  if(Bottom_3==0) { 
    var str = '';
    $("#Bottom_3").val(cleararray);
    str+='<div class="btn-t3" onclick="QuizGame_3();">เริ่มเปิดภาพมหาสนุก</div>';
    $("#Bottom_3").html(str);
  } else {
    var str = '';
    $("#Bottom_3").val(cleararray);
    str+='<div class="btn0">วันนี้คุณเข้าร่วมกิจกรรมนี้แล้ว</div>';
    $("#Bottom_3").html(str);
  }
}


var SumQuizTrue = 0;
var SumQuizFalse = 0;
var SumChoice1 = 0;
var SumChoice2 = 0;
var SumChoice3 = 0;
var SumChoice4 = 0;

function GetQuestion(x) {
  //alert(x);
  dbQuestion.where('GroupQuestion','==',x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      //showData(doc);
      i = i+1;
      ArrQuestion.push([doc.data().Qid, doc.data().Question, doc.data().Choice1, doc.data().Choice2, doc.data().Choice3, doc.data().Choice4, doc.data().Answer_number, doc.data().SumQuiz, doc.data().SumQuizTrue, doc.data().SumQuizFalse, doc.data().SumChoice1, doc.data().SumChoice2, doc.data().SumChoice3, doc.data().SumChoice4, doc.id]);
    });
    //alert("จำนวนข้อมูลรวม = "+i+" รายการ");
    //alert(sQuestion);
    console.log(ArrQuestion);
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[14];
    CheckQuizAnswer = NewQuestion[6];
    SumChoice1 = NewQuestion[10];
    SumChoice2 = NewQuestion[11];
    SumChoice3 = NewQuestion[12];
    SumChoice4 = NewQuestion[13];
    SumQuizTrue = NewQuestion[8];
    SumQuizFalse = NewQuestion[9];
    SumQuiz = NewQuestion[7];
    StartQuizGame(NewQuestion);
    ArrQuestion = [];
    i = 0;
  });
}




var i = 0;
var EQid = "";
var MaxTime = 30;
var sQuestion = "";
var NewQuestion = "";
var CheckQuizAnswer = 0;
var ArrQuestion = [];

function StartQuizGame(x) {
  $("#ShowStory").val(cleararray);
  $('.noshow').show();
  timecountdown();
  var str = '';
  CheckQuizQuestion = x[1];
  str += "<div style='margin-top:20px;'></div><center>";
  str += '<div class="Qquestion"><u>คำถาม</u> : '+ x[1] +'</div>';
  str += "<div class='quiz-choice' onclick='ClickChoice(1)' id='answer1'><input type='radio'>"+ x[2] +"</div>";
  str += "<div class='quiz-choice' onclick='ClickChoice(2)' id='answer2'><input type='radio'>"+ x[3] +"</div>";
  str += "<div class='quiz-choice' onclick='ClickChoice(3)' id='answer3'><input type='radio'>"+ x[4]+"</div>";
  str += "<div class='quiz-choice' onclick='ClickChoice(4)' id='answer4'><input type='radio'>"+ x[5] +"</div>";
  str += "<div id='SubmitAns' class='btn-t0' onclick='SendSubmitAnswer()'>ส่งคำตอบ</div>";
  str += "</center>";
  $("#ShowStory").html(str);
}



var ChoiceSelect = "";
var TextSelectChoice = "";
function ClickChoice(x) {
  ChoiceSelect = x;
  if(x==1) {
    document.getElementById("answer1").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==2) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==3) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==4) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice SelectQ'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  }
}



function SendSubmitAnswer() {
  stopcountdown();
  //alert("ตอบข้อที่ "+ChoiceSelect);
  SaveData();
  $("#ShowStory").val(cleararray);
  if(ChoiceSelect==CheckQuizAnswer) {
    YourScore = CheckPoint;
    var str = '';

    //str += '<div style="margin:30px;"><img src="./img/true.png" width="60px;"></div>';
    //str += '<div class="txt-qq" style="color:#f68b1f;height:80px;"><b>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ</b><div>';
    str += '<div><img src="./img/true.png" width="60px;"></div>';
    str += '<div class="txt-qq" style="color:#0056ff;">ยินดีด้วยคุณได้รับ 1 คะแนน<br>แต่เรามีข้อเสนอให้คุณ<div>';
    str += '<div style="padding:20px 0;color:#f68b1f;">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    str += '<div class="btn-t1" onclick="ChangeMyPoint()">รับข้อเสนอ</div><div class="btn-t2" onclick="NoChangeNow()">ไม่รับข้อเสนอ</div>';
    str += '<div style="padding:15px 10px;color:#777;">ช่วงคะแนนใหม่ที่จะได้อยู่ระหว่าง 0.3 - 1.70 คะแนน<br>คุณต้องรู้จักการบริหารความเสี่ยงด้วยน้า</div>';
    str += '<div><p id="displayNumber" style="font-size:26px;"></p></div>';

/*
    str+='<div class="box_game"><div class="txthead">กิจกรรมตอบทุกวันได้ทุกวัน</div>';
    str+='<div>ยินดีด้วย<br>คุณตอบคำถามได้ถูกต้อง</div>';
    str+='คุณได้รับ 1 MyPoint และ 1 คะแนนจากกิจกรรมนี้';
    str+='<div style="font-size:16px;color:#ff0000;padding:10px;">เรามีข้อเสนอ คุณสามารถเปลี่ยน 1 คะแนนที่ได้รับจากกิจกรรมนี้ใหม่ได้<br>คุณต้องการเปลี่ยนหรือไม่</div>';
    str+='<div class="btn" onclick="Closeall();" style="margin-top:12px;">รับ 1 คะแนน</div>';
    str+='<div class="btn" onclick="ChangeMyPoint();" style="margin-top:12px;">ต้องการเปลี่ยนคะแนน</div>';
    str+='<p id="displayNumber" style="font-size:26px;"></p></div>';
*/    
    $("#ShowStory").html(str);
  } else {
    YourScore = 0;
    AnswerFalse();
  }
}



function ChangeMyPoint() {
  $('.noshow').hide();
  var sMyScore = (parseFloat(YourScore)-1);
  $("#ShowStory").val(cleararray);
  $("#displayNumber").val(cleararray);
  getRandomNumber();
  //alert(newScore);
  var str = '';
  //str+='<div class="box_game"><div class="txthead">กิจกรรมตอบทุกวันได้ทุกวัน</div>';
  //str+='<div style="padding:12px 0 20px 0;">ผลการสุ่มเพื่อเปลี่ยนคะแนนของคุณ</div>';
  if(newScore<=1) {
    str += '<div class="txt-qq" style="color:#f68b1f;">เสียใจนิด ๆ น้า<div>';
    str += '<div><img src="./img/sad@.jpg" width="200px;"></div>';
    //str+='<div style="font-size:16px;color:#ff0000;">เสียใจด้วย<br><b>คุณได้รับคะแนนนลดลง</b></div>';
  } else {
    str += '<div class="txt-qq" style="color:#f68b1f;">ดีใจด้วยน้า<div>';
    str += '<div><img src="./img/happy@.jpg" width="200px;"></div>';
    //str+='<div style="font-size:16px;color:Blue;">ยินดีด้วย<br><b>คุณได้รับคะแนนเพิ่มขึ้น</b></div>';
  }
  str+='<div style="font-size:16px;padding-top:15px;">คุณได้รับ '+newScore+' คะแนน</div>';
  str+='<div class="btn-t2" onclick="CloseAll();" style="margin-top:20px;">ปิดหน้าต่างนี้</div>';
  $("#ShowStory").html(str);

  if(CheckAddEdit==2) { 
    var ChangePoint = 1;
    dbCheck.doc(Eid).update({
      //ChangePoint : parseFloat(ChangePoint).toFixed(2),
      //PointOUT : parseFloat(newScore).toFixed(2),
      //LastScore : parseFloat(newScore).toFixed(2)
      ChangePoint : parseFloat(ChangePoint),
      PointOUT : parseFloat(newScore),
      LastScore : parseFloat(newScore)
    });
    var cal1 = (sRewardsXP-YourScore)+parseFloat(newScore);
    var cal2 = (sRewardsRP-YourScore)+parseFloat(newScore);
    //alert(cal1);
    dbScorePoint.doc(EidScorePoint).update({
      //UserLevel : sUserLevel,
      RewardsXP : cal1,
      RewardsRP : cal2
    });
    //alert(sRewardsXP-YourScore+newScore);
    LastScore = newScore;
    CheckAddEdit = 1;
    CheckUserQuiz();
  }
}



function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  var CheckType = 1;
  if(YourScore==0) {
    typeResult = "False";
  } else {
    typeResult = "True";
  }
  //alert(Eid);
  if(CheckAddEdit==2) { 
    var ChangePoint = 0;
    //alert("Your Score = " +YourScore)
    alert(Eid);
    dbCheck.doc(Eid).update({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      QuizDate : today,
      RefID : EidQuestion, //add
      AnswerTxt : TextSelectChoice, //add
      QuizType : CheckType,
      Quetion :  CheckQuizQuestion,
      Answer : ChoiceSelect,
      ResultQuiz : typeResult,
      PointIN : parseFloat(YourScore),
      //PointIN : parseFloat(YourScore).toFixed(2),
      ChangePoint : ChangePoint,
      PointOUT : parseFloat(ChangePoint),
      //PointOUT : parseFloat(ChangePoint).toFixed(2),
      LastScore : YourScore,
      DateQuiz : dateString,
      TimeStamp : TimeStampDate
    });
    //alert("sRewardsXP = "+sRewardsXP+"\nYourScore = "+YourScore);
    dbScorePoint.doc(EidScorePoint).update({
      //RewardsXP : parseFloat(sRewardsXP+YourScore),
      //RewardsRP : parseFloat(sRewardsRP+YourScore)
      RewardsXP : parseFloat(sRewardsXP+YourScore),
      RewardsRP : parseFloat(sRewardsRP+YourScore)
    });
  }
  //alert("Save Quiz User");
  SaveMyScorePoint();
  SaveQuestion();
  //ClearQuiz();
}



function SaveQuestion() {
  //alert("EidQuestion = "+EidQuestion+"\nYourScore = "+YourScore+"\nChoiceSelect = "+ChoiceSelect+"\nSumChoice2 = "+SumChoice2);
  SumQuiz = SumQuiz + 1; 
  if(YourScore==0) {
    SumQuizFalse = SumQuizFalse + 1;
  } else if(YourScore!=0) {
    SumQuizTrue = SumQuizTrue + 1;
  }
  if(ChoiceSelect==1) { SumChoice1 = SumChoice1+1; } else
  if(ChoiceSelect==2) { SumChoice2 = SumChoice2+1; } else
  if(ChoiceSelect==3) { SumChoice3 = SumChoice3+1; } else
  if(ChoiceSelect==4) { SumChoice4 = SumChoice4+1; } 
  dbQuestion.doc(EidQuestion).update({
    SumQuiz : SumQuiz,
    SumQuizTrue : SumQuizTrue,
    SumQuizFalse : SumQuizFalse,
    SumChoice1 : SumChoice1,
    SumChoice2 : SumChoice2,
    SumChoice3 : SumChoice3,
    SumChoice4 : SumChoice4
  });

}



function FalseGame() {
  stopcountdown();
  $('.noshow').hide();
  $("#ShowStory").val(cleararray);
  var str = '';
  str+='<div class="box_game"><div class="txthead">กิจกรรมตอบทุกวันได้ทุกวัน</div>';
  str+='<div style="padding:12px 0 20px 0;">หมดเวลาตอบคำถาม</div>';
  str+='<div style="font-size:16px;color:#ff0000;">เสียใจด้วย เวลาหมดเสียก่อน<br>เราเชื่อว่าคุณทำได้ แต่ส่งคำตอบไม่ทัน<br>พรุ่งนี้เข้าร่วมร่วมกิจกรรมกันใหม่น้า</b></div>';
  str+='<div class="btn" onclick="CloseAll();" style="margin-top:60px;">ปิดหน้าต่างนี้</div>';
  $("#ShowStory").html(str);
}



function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}



function showData(doc) {
  i = i+1;
  sQuestion += "\n"+doc.data().Qid;
  ArrQuestion.push(doc.data().Qid);
}



var qInterval;
function timecountdown() {
  var timeleft = MaxTime;
  document.getElementById("countdowntimer").innerHTML = "เวลา "+timeleft+" วินาที";
  var g=0;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      //alert("Time over");
      FalseGame();
    } else {
      timeleft--;
      document.getElementById("countdowntimer").textContent = "เวลา "+timeleft+" วินาที";
      //document.getElementById("countdowntimer3").textContent = "เวลา "+timeleft+" วินาที";
      if(g==0) { 
        if(timeleft<10) { 
          document.getElementById("countdowntimer").classList.remove('border-timer');
          document.getElementById("countdowntimer").classList.add('border-timer-red');
          g = 1;
        }
      }
    }
    },1000);
}



function stopcountdown() { 
    document.getElementById("countdowntimer").textContent = "";
    clearInterval(qInterval);
}



var drinks = [ "0.3", "0.4","0.5","0.6","0.7","0.8","0.9","1.1","1.2","1.3","1.4","1.5","1.6","1.7"];
function getRandomNumber() {
  $("#MyScore").val(cleararray);
  newScore = 0;
  const RandomNumber = drinks[Math.floor(Math.random() * drinks.length)];
  //document.getElementById("displayNumber").innerHTML = RandomNumber;
  newScore = RandomNumber;
  //gMyScore = (parseFloat(gMyScore)+parseFloat(gPoint));
  //RatioScore = (parseFloat(gMyScore)*100)/parseFloat(GobalScore);
  //alert(gPoint);
  //MyScore(EmpID);
}


function SaveMyScore() {
  //alert(YourScore);
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbCheck.add({
    GroupQuiz : sGroupQuiz,
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    EmpName : sessionStorage.getItem("EmpName"),
    QuizDate : today,
    //QuizType : CheckType,
    //Quetion :  CheckQuizQuestion,
    //Answer : ChoiceSelect,
    //ResultQuiz : typeResult,
    PointIN : parseFloat(YourScore),
    //ChangePoint : ChangePoint,
    //PointOUT : parseFloat(ChangePoint),
    LastScore : parseFloat(YourScore),
    DateQuiz : dateString,
    TimeStamp : TimeStampDate
  });

}


function SaveMyScorePoint() {
  //alert("Save My Score Point");
  sRewardsXP = parseFloat(sRewardsXP)+parseFloat(YourScore);
  sRewardsRP = parseFloat(sRewardsRP)+parseFloat(YourScore);
  dbScorePoint.doc(EidScorePoint).update({
    JoinTime : sJoinTime+1,
    RewardsXP : sRewardsXP,
    RewardsRP : sRewardsRP,
    UserSumTrue : sUserSumTrue,
    UserSumFalse : sUserSumFalse,
    UserSumQuiz : sUserSumQuiz + 1
  });
  sessionStorage.setItem("XP", sRewardsXP);
  sessionStorage.setItem("RP", sRewardsRP);
  CheckScorePoint();
  CheckUserQuiz();
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
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
