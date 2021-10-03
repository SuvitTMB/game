var db = "";
var dbUser = "";
var dbCheck = "";

var OpenQuiz = "1";
var Eid = "";
var EQuizDate = "";
var EQuizForm = "";
var cleararray = "";
//var today = moment().format('DD MMM, YYYY');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var EQuizQuizTimer = 0;
var now = new Date();
var timeup = "";
var counter = "";
var CheckPass = 0;
var dateString = "";
var CheckQuizQuestion = "";
var YourScore = 0;
var sTypeSelect = "หมวดคำถามคลายเครียด";
var sGroupQuiz = "QuizRelax";


$(document).ready(function () {
  Connect_DB();
  CheckUserQuiz();
  //CheckOpenQuiz();
  //RandomQuestion();
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
  db = firebase.firestore().collection("QuizoftheDay");
  dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbCheck = firebase.firestore().collection("QuizScore");
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
  dbScorePoint.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      //sUserLevel = doc.data().UserLevel;
      sJoinTime = doc.data().JoinTime;
      sRewardsXP = doc.data().RewardsXP;
      sRewardsRP = doc.data().RewardsRP;
      sUserSumTrue = doc.data().UserSumTrue;
      sUserSumFalse = doc.data().UserSumFalse;
      sUserSumQuiz = doc.data().UserSumQuiz;
    });
    if(EidScorePoint=="") {
      AddNewScorePoint();
    }
  });
}


function AddNewUser() {
  if(CheckAddEdit==2) {
    dbCheck.add({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      TypeSelect : sTypeSelect,
      LastScore : 0,
      PointIN : 0,
      QuizDate : today
    });
    CheckUserQuiz();
  }
}



var LastScore = 0;
var CheckAddEdit = 0;
var CheckSaveRecord = 0;
function CheckUserQuiz() {
  CheckScorePoint();
  //alert("Check User Quiz "+sessionStorage.getItem("LineID"));
  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  $("#DisplayTimer").val(cleararray);  
  //alert(sGroupQuiz);
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizDate','==',today)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckPass = 1;
      Eid = doc.id;
      LastScore = doc.data().PointOUT;
      //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
      $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
      if(CheckAddEdit!=2) {
/*
        if(LastScore!=0) {
          $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ parseFloat(doc.data().PointIN).toFixed(2) +"</span> คะแนน555</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
        } else {
          $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ parseFloat(doc.data().PointIN).toFixed(2) +"</span> คะแนน666</div></div>");
        }
      } else {
*/
        $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ parseFloat(doc.data().LastScore).toFixed(2) +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
      }
    });
    if(CheckPass==0) {
      document.getElementById("id04").style.display = "block";
      CheckAddEdit = 2; // รายการใหม่     
      AddNewUser();
      RandomQuestion();
    }
    //alert("รหัสพนักงาน "+Eid);
  });
}




var i = 0;
var ArrQuestion = [];
var NewQuestion = "";
function RandomQuestion() { 
  db.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizStatus','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    //alert("จำนวนข้อมูลรวม = "+i+" รายการ");
    //alert(sQuestion);
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    //alert(EidQuestion);
    //console.log(NewQuestion);
    GetQuestion();
  });  
}



function GetQuestion() {
  console.log(NewQuestion);
  //alert("ID คำถาม = "+EidQuestion);
  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  $("#DisplayTimer").val(cleararray);
  db.where(firebase.firestore.FieldPath.documentId(), "==", EidQuestion)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //alert("พบคำถาม = "+EidQuestion);
      //QuizNotOpen = 1;
      //EidQuestion = doc.id;
      EQuizDate = doc.data().QuizDate;
      EQuizQuizTimer = Number(doc.data().QuizTimer);
      now = new Date();
      timeup = now.setSeconds(now.getSeconds() + Number(doc.data().QuizTimer));
      counter = setInterval(timer, 1000);
      timer();
      //console.log(doc.data().QuizDate+"==="+doc.data().QuizQuestion);
      CheckType = doc.data().QuizTypeQuestion;
      CheckQuizQuestion = doc.data().QuizQuestion;
      CheckQuizAnswer = doc.data().QuizAnswer;
      CheckQuizAnswerText = doc.data().QuizAnswerText;
      CheckPoint = doc.data().QuizPoint;
      SumQuiz = doc.data().SumQuiz;
      SumChoice1 = doc.data().SumChoice1;
      SumChoice2 = doc.data().SumChoice2;
      SumChoice3 = doc.data().SumChoice3;
      SumChoice4 = doc.data().SumChoice4;
      SumQuizTrue = doc.data().SumQuizTrue;
      SumQuizFalse = doc.data().SumQuizFalse;
      if(doc.data().QuizTypeQuestion=="1") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
        $("#DisplayQuestion").html("<div class='txt-qq'>"+ doc.data().QuizQuestion +"</div>");
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="2") {
        $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ </div><div id='chars' style='color:#0016ed;'><div>";
      } else if(doc.data().QuizTypeQuestion=="3") {
        $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ </div><div id='chars4' style='color:#0016ed;'><div>";
      }
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
    //if(Eid=="") {
    //  alert("Quiz not Open55555");
    //  CloseQuiz();
    //}
  });
}



var ChoiceSelect = "";
var TextSelectChoice = "";
function ClickChoice(x,y) {
  ChoiceSelect = x;
  TextSelectChoice = y;
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



function SendAnswer() {
  if(CheckPoint!=0) {
    LastScore = CheckPoint;
  }
  if(CheckType==1) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==2) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType2').value;
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==3) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==4) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType4').value;
      //alert(TextSelectChoice+" --- "+CheckQuizAnswerText)
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  }
  SaveData();
}



function SaveData() {
  //CheckPass = 2;
  //alert("check-2");
  //CheckUserQuiz();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  if(YourScore==0) {
    typeResult = "False";
  } else {
    typeResult = "True";
  }
  //alert(Eid);
  if(CheckAddEdit==2) { 
    var ChangePoint = 0;
    dbCheck.doc(Eid).update({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID"),
      EmpName : sessionStorage.getItem("EmpName"),
      QuizDate : today,
      RefID : EidQuestion, //add
      QuizType : CheckType,
      Quetion :  CheckQuizQuestion,
      Answer : ChoiceSelect,
      AnswerTxt : TextSelectChoice, //add
      ResultQuiz : typeResult,
      PointIN : parseFloat(YourScore),
      //PointIN : parseFloat(YourScore).toFixed(2),
      ChangePoint : ChangePoint,
      PointOUT : parseFloat(ChangePoint),
      //PointOUT : parseFloat(ChangePoint).toFixed(2),
      LastScore : YourScore,
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
  }
  //alert("Save Quiz User");
  SaveMyScorePoint();
  SaveQuestion();
  ClearQuiz();
}



function SaveMyScorePoint() {
  //alert(EidScorePoint);
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
}



function SaveQuestion() {
  //alert("SaveQuestion "+EidQuestion);
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
  db.doc(EidQuestion).update({
    SumQuiz : SumQuiz,
    SumQuizTrue : SumQuizTrue,
    SumQuizFalse : SumQuizFalse,
    SumChoice1 : SumChoice1,
    SumChoice2 : SumChoice2,
    SumChoice3 : SumChoice3,
    SumChoice4 : SumChoice4
  });
}


function ClearQuiz() {
  //alert("ClearQuiz");
  var a = "";
  clearInterval(counter);
  document.getElementById("timer").innerHTML = ""; 
  document.getElementById("DisplayTimer").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  document.getElementById("DisplayDay").innerHTML = ""; 
  document.getElementById("DisplayQuestion").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //alert(YourScore);
  if(YourScore!=0) {
    LastScore = YourScore;
    $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div></div>");
    var str1 = "";
    var str2 = "";
    str1 += '<div style="margin:30px;"><img src="./img/true.png" width="100px;"></div>';
    str1 += '<div class="txt-qq" style="color:#f68b1f;height:80px;"><b>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ</b><div>';
    str2 += '<div><img src="./img/true.png" width="70px;"></div>';
    str2 += '<div class="txt-qq">ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ<div>';
    str2 += '<div style="padding:20px 0;color:#f7fa06">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    str2 += '<div class="btn-t1" onclick="ChangeNow()">รับข้อเสนอ</div><div class="btn-t2" onclick="NoChangeNow()">ไม่รับข้อเสนอ</div>';
    str2 += '<div style="padding:15px 10px;">ช่วงคะแนนใหม่ที่จะได้อยู่ระหว่าง 0.3 - 1.70 คะแนน<br>คุณต้องรู้จักการบริหารความเสี่ยงด้วยน้า</div>';
    $("#DisplayChoice").html(str2);
    $("#SelectWay").html(str1);
    document.getElementById("id02").style.display = "block";
    //$("#DisplayChoice").html("<div class='btn-t1' onclick='xxx' style='margin-top;45px;'>เรามีข้อเสนอให้คุณ</div>");
  } else {
    LastScore = 0;
    $("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
    var str2 = "";
    str2 += '<div><img src="./img/false.png" width="100px;"></div>';
    str2 += '<div class="txt-qq">เสียใจด้วยน้า<div>';
    str2 += '<div style="padding:20px 0;color:#f7fa06">วันนี้คุณตอบคำถามไม่ถูกต้อง</div>';
    $("#DisplayChoice").html(str2);
  }  
}



var newScore = 0;
function ChangeNow() {
  var newPoint = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
  newScore = random_item(newPoint);
  var str2 = "";
  if(YourScore>newScore) {
    str2 += '<div class="header-line" style="margin-top:-30px;">เสียใจนิด ๆ น้า<div>';
  } else {
    str2 += '<div class="header-line" style="margin-top:-30px;">ดีใจด้วยน้า<div>';
  }
  str2 += '<div>คุณได้รับคะแนนใหม่ : <span class="txt-qqq">'+parseFloat(newScore).toFixed(2)+'</span> คะแนน</div>';
  str2 += '<div class="btn-t2" onclick="gotoweb()" style="margin-top;25px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div>';
  //$("#DisplayChoice").html(str2);
  document.getElementById("DisplayChoice").innerHTML = "";
  $("#DisplayQuestion").html(str2);
  //$("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ doc.data().LastScore +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");

  var str1 = "";
  if(YourScore>newScore) {
    str1 += '<div class="header-line1">เสียใจนิด ๆ น้า<div>';
    str1 += '<div><img src="./img/sad@.gif" style="margin-top:15px;width:310px;border-radius: 12px;"></div>';
  } else {
    str1 += '<div class="header-line1">ดีใจด้วยน้า<div>';
    str1 += '<div><img src="./img/congratulations@.gif" style="margin-top:15px;width:310px;border-radius: 12px;"></div>';
  }
  str1 += '<div style="padding:10px 0;">คุณได้รับคะแนนใหม่ : <span class="txt-qqq" style="color:#000000;"><b>'+parseFloat(newScore).toFixed(2)+'</b></span> คะแนน</div>';
  //alert(CheckAddEdit+"line 479");
  if(CheckAddEdit==2) { 
    //alert(CheckAddEdit+"line 481");
    var ChangePoint = 1;
    dbCheck.doc(Eid).update({
      //ChangePoint : parseFloat(ChangePoint).toFixed(2),
      //PointOUT : parseFloat(newScore).toFixed(2),
      //LastScore : parseFloat(newScore).toFixed(2)
      ChangePoint : parseFloat(ChangePoint),
      PointOUT : parseFloat(newScore),
      LastScore : parseFloat(newScore)
    });

    dbScorePoint.doc(EidScorePoint).update({
      UserLevel : sUserLevel,
      RewardsXP : parseFloat(sRewardsXP-YourScore+newScore),
      RewardsRP : parseFloat(sRewardsRP-YourScore+newScore)
    });

  }
  $("#ShowEndPoint").html(str1);
  document.getElementById("id03").style.display = "block";
}



function NoChangeNow() {
  alert("ขอบคุณสำหรับการเข้าร่วมกิจกรรมในวันนี้");
  window.location.href = 'introgame.html';
}



function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}



function CloseQuiz() {
  document.getElementById("DisplayDay").innerHTML = "";
  document.getElementById("DisplayQuestion").innerHTML = "";
  var str = "<div class='txt-qq' style='color:#f68b1f;padding-top:30px;'>ระบบบยังไม่เปิดให้ตอบคำถาม<div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>กลับไปเมนูหลัก</div>";
  var str1="";
  str1 += '<div><img src="./img/close.jpg" style="width:200px;"></div>';
  str1 += '<div class="txt-qq" style="color:#f68b1f;">ระบบบยังไม่เปิดให้ตอบคำถาม<div>';
  str1 += '<div style="padding:30px;color:#000000;">ขณะนี้ระบบยังไม่ได้เปิดให้ตอบคำถาม<br>กรุณากลับเข้ามาให้อีกครั้ง</div>';
  $("#CloseQuiz").html(str1);
  $("#DisplayQuestion").html(str);
  document.getElementById("id01").style.display = "block";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


function timer() {
  now = new Date();
  count = Math.round((timeup - now)/1000);
  if (now > timeup) {
      window.location = "#"; //or somethin'
      $("#timer").html("<font color='#ffff00'>หมดเวลาตอบคำถาม</font>");
      document.getElementById("SubmitAns").style.display = "none";
      //alert("หมดเวลา");
      clearInterval(counter);
      SaveData();
      return;
  }
  var seconds = Math.floor((count%60));
  var minutes = Math.floor((count/60) % 60);
  if(seconds<10) { seconds="0"+seconds } 
  $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>" + minutes + " นาที " + seconds  + " วินาที</font>");
  //document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}


function ChkText() {
  var inp = document.getElementById('SendCheckType2');
  var chars = document.getElementById('chars');
  inp.onkeyup = function() {
    chars.innerHTML = inp.value.length;
  if(inp.value.length>0) {
    $('#SubmitAns').removeClass('btn-t0');
    $('#SubmitAns').addClass('btn-t2');
  } else {
    $('#SubmitAns').removeClass('btn-t2');
    $('#SubmitAns').addClass('btn-t0');
  }
  } 
}


function ChkText4() {
  var inp = document.getElementById('SendCheckType4');
  var chars = document.getElementById('chars4');
  inp.onkeyup = function() {
    chars.innerHTML = inp.value.length;
  if(inp.value.length>0) {
    $('#SubmitAns').removeClass('btn-t0');
    $('#SubmitAns').addClass('btn-t2');
  } else {
    $('#SubmitAns').removeClass('btn-t2');
    $('#SubmitAns').addClass('btn-t0');
  }
  } 
}


function gotoweb() {
  window.location.href = 'introgame.html';
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
