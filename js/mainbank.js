var cleararray = "";
var Bottom_3 = 0;
//var Bottom_4 = 0;
var CheckAddEdit = 0;
var SumQuiz = 0;
var newScore = 0;
var SendAnswer = 0;
var CheckPoint = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var CheckOpenCard = 1; // 0=ปิด, 1=เปิด
var CheckQuizQuestion = "";
var db = "";
var dbUser = "";
var dbCheck = "";
var dbQuestion = "";
var EidQuestion = "";
var EQuizForm = "";
var EidQuestion = "";
var CheckType = 0;
var CheckQuizAnswer = 0;
var CheckQuizAnswerText = "";
var CheckPoint = 0;
var YourScore = 0;
var SumChoice1 = 0;
var SumChoice2 = 0;
var SumChoice3 = 0;
var SumChoice4 = 0;
var SumQuiz = 0;
var SumQuizTrue = 0;
var SumQuizFalse = 0;
var ExtraPoint = 0;
var sGroupQuiz = "MainBank";
//var sGroupQuiz = "4Heart";


$(document).ready(function () {
  $("#DisplayDate").html("<div class='header-line'>รู้จักกับ Main Bank<br>กิจกรรมประจำวันที่ "+today+"</div>");
  $("#DisplayMyScore").html("<div style='padding:5px 0 15px 0; color:#ffffff;font-size: 10px;''>คลิกเลือกภาพ ... ตามหาคะแนน</div>");
  Connect_DB();
  CheckScorePoint();
  CheckUserQuiz();
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
  db = firebase.firestore().collection("QuizoftheDay");
  dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbCheck = firebase.firestore().collection("QuizScore");
  //dbQuestion = firebase.firestore().collection("Question");
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
      LastScore = doc.data().LastScore;
      UserPlay = 1;
      //alert("newScore "+newScore);
      //if(CheckAddEdit!=2) {
      //  $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(doc.data().LastScore).toFixed(2) +" คะแนน</div>");
      //}

      if(newScore!="" && CheckAddEdit==2) {
        $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
      } else {
        $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(doc.data().LastScore).toFixed(2) +" คะแนน</div>");
      }

    });
    if(Eid=="") {
      CountRec = 0;
    } 
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
    str+='<div class="flip-card" onclick="OpenCard('+(i+1)+');"><img src="./boxgame/'+sGroupQuiz+'/'+sGroupQuiz+'-'+(i+1)+'.jpg" alt="Avatar" class="a_image">';
    str+='<div class="overlay"><div style="padding:-5px 20px;font-size:50px;color:#ffffff;"><b>'+(i+1)+'</b></div>';
    str+='<div class="btn-t1" style="width:90% !important;top:60px;left:4px; position: absolute;">เลือก</div></div></div>';
  }
  btr+=atr+str+'</div>';
  atr+='</center>';
  $("#BoxGame").html(btr);
}



function OpenCard(x) { 
  document.getElementById("id01").style.display = "none";
  var str = "";
  str += '<div><img src="./boxgame/'+sGroupQuiz+'/'+sGroupQuiz+'-'+x+'@.jpg" class="boxImg4heart"></div>';
  if(UserPlay==0) { // 0=ยังไม่ได้เล่น 1=เล่นแล้ว
    str += '<div class="btn-t1" onclick="RandomCard()">เปิดภาพนี้</div><div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่าง</div>';
    str += '<div style="font-size:10px; padding:8px;color:#ff0000;">กิจกรรมเปิดภาพลุ้นรางวัล</div>';
  } else {
    str += '<div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่าง</div>';
  }
  $("#ShowStory").html(str);
  document.getElementById("id02").style.display = "block";
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


var sTypeSelect = "";
function RandomCard() { 
/*
  alert(CheckAddEdit);
  
  if(CheckAddEdit!=2) {
    document.getElementById('id02').style.display='none';
    document.getElementById('id03').style.display='none';
  }
*/  
  var str = '';
  Bottom_3 = 1;
  CheckBottom();
  //CheckScorePoint();
  //alert("ID : "+EidScorePoint+" Score = "+sRewardsXP);
  $("#ShowStory").val(cleararray);
  //var RandomCardNumber = [sGroupQuiz,"1",sGroupQuiz,"2",sGroupQuiz,sGroupQuiz,sGroupQuiz,sGroupQuiz,"0",sGroupQuiz,sGroupQuiz,sGroupQuiz,sGroupQuiz];
  var RandomCardNumber = [sGroupQuiz];
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
    sTypeSelect = "เปิดภาพได้ 0 คะแนน";
    if(CountRec==0) {
      alert(CountRec);
      CheckAddEdit = 2;
      YourScore = 0;
      AddNewUser();
      SaveMyScorePoint();
    }
  } else if(ShowCardNumber==1 || ShowCardNumber==2) {
    sTypeSelect = "เปิดภาพได้ "+ShowCardNumber+" คะแนน";
    CheckPoint = ShowCardNumber;
    //ExtraPoint = ShowCardNumber;
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
    str+='<div class="btn-t1" onclick="CloseAll()" style="margin-top:12px;">ปิดหน้าต่างนี้</div></div></center><br><br></div>';
    $("#ShowStory").html(str);
    //alert("Save --> ได้คะแนน = "+sRewardsXP);
      alert(CountRec);
    if(CountRec==0) {
      CheckAddEdit = 2;
      AddNewUser();
      SaveMyScorePoint();
      //SaveMyScore();
      //SaveMyScorePoint();
    }
  } else if(ShowCardNumber==sGroupQuiz) {
    sTypeSelect = "ตอบคำถาม";
    $('.noshow').hide();
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="margin-left:10px;text-align: center;">';
    str+='<div style="padding:10px 0 10px 0;"><img src="./img/timer.gif" width="230px;"></div>';
    str+='<div>คุณต้องออกแรงกันหน่อยแล้ว<br>ไม่มีอะไรได้มาง่ายๆ</div>';
    //str+='<div class="btn-t1" onclick="GetQuestion(\''+ ShowCardNumber +'\')" style="margin-top:12px;">ถ้าพร้อมแล้วไปตอบคำถามกัน</div></div></center></div>';
    str+='<br><div class="btn-t1" onclick="RandomQuestion()" style="margin-top:12px;">ถ้าพร้อมแล้วไปตอบคำถามกัน</div></div></center><br></div>';
    $("#ShowStory").html(str);
    if(CountRec==0) {
       CheckAddEdit = 2;
       AddNewUser();
    } else {
      document.getElementById('id02').style.display='none';
      document.getElementById('id03').style.display='none';
      
    }
    //SaveMyScorePoint();
  }
}

//YourScore==0
//CheckAddEdit==2

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
      LastScore : YourScore,
      PointIN : YourScore,
      QuizDate : today
    });
    CheckUserQuiz();
  } else {
    document.getElementById('id02').style.display='none';
    document.getElementById('id03').style.display='none';
  }
}


var i = 0;
var ArrQuestion = [];
var NewQuestion = "";

function RandomQuestion() {
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='block';
  db.where('GroupQuiz','==',sGroupQuiz)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    //console.log(ArrQuestion);
    //alert("จำนวนข้อมูลรวม = "+i+" รายการ");
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    //alert("Question ID: "+NewQuestion);
    GetQuestion();
  }); 
}



function GetQuestion() {
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
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
        $("#DisplayQuestion").html("<div class='txt-qq'>"+ doc.data().QuizQuestion +" | "+doc.data().QuizAnswer+"</div>");
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><br><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="2") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><div id='chars' style='color:#0016ed;'></div><br><br>";
      } else if(doc.data().QuizTypeQuestion=="3") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
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
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:10px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ </div><br><br><div id='chars4' style='color:#ffffff;'><div>";
        EQuizForm += "<div style='height:20px;'></div>";
      }
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
  });
}



var ChoiceSelect = "";
var TextSelectChoice = "";
function ClickChoice(x) {
  ChoiceSelect = x;
  //alert("เลือกคำตอบข้อที่ "+ ChoiceSelect);
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



function SendAnswerQuiz() {
  //alert("คะแนนที่ได้ "+YourScore);
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
  //alert(YourScore);
  SaveData();
}


function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  if(YourScore==0) {
    typeResult = "False";
  } else {
    typeResult = "True";
  }
  //(Eid);
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
  if(CheckAddEdit==2) {
    SaveMyScorePoint();
    SaveQuestion();
    ClearQuiz();
  } else {
    document.getElementById('id03').style.display='none';
    //document.getElementById('id04').style.display='block';
  }

}


function SaveMyScorePoint() { 
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
  //alert("YourScore = "+YourScore);
  //alert("ClearQuiz");
  var a = "";
  clearInterval(counter);
  document.getElementById("timer").innerHTML = ""; 
  document.getElementById("DisplayTimer").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //document.getElementById("DisplayDay").innerHTML = ""; 
  document.getElementById("DisplayQuestion").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //alert(YourScore);
  if(YourScore!=0) {
    var str1 = "";
    var str2 = "";
    LastScore = YourScore;
    //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div></div>");
    //str1 += '<div style="margin:30px;"><img src="./img/true.png" width="100px;"></div>';
    //str1 += '<div class="txt-qq" style="color:#f68b1f;height:80px;"><b>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ</b><div>';
    str2 += '<div><img src="./img/true.png" width="70px;"></div>';
    str2 += '<div class="txt-qq" style="color:#0056ff;">ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ<div>';
    str2 += '<div style="padding:10px 0;color:#f68b1f">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    str2 += '<div class="btn-t1" onclick="ChangeNow()">รับข้อเสนอ</div><div class="btn-t2" onclick="NoChangeNow()">ไม่รับข้อเสนอ</div>';
    str2 += '<div style="padding:15px 10px;">ช่วงคะแนนใหม่ที่จะได้อยู่ระหว่าง 0.3 - 1.70 คะแนน<br>คุณต้องรู้จักการบริหารความเสี่ยงด้วยน้า</div><br><br>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
    //$("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
    //$("#SelectWay").html(str1);
    //document.getElementById("id03").style.display = "none";
    //document.getElementById("id04").style.display = "block";
    //$("#DisplayChoice").html("<div class='btn-t1' onclick='xxx' style='margin-top;45px;'>เรามีข้อเสนอให้คุณ</div>");
  } else {
    LastScore = 0;
    //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div></div>");
    var str2 = "";
    str2 += '<center><div><img src="./img/false.png" width="100px;"></div>';
    str2 += '<div class="txt-qq" style="color:#f68b1f;">เสียใจด้วยน้า<div>';
    str2 += '<div style="padding:10px 0;color:#000000">วันนี้คุณตอบคำถามไม่ถูกต้อง</div>';
    str2 += '<div class="btn-t2" onclick="CloseAll()" style="margin-top;10px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div><br><br></center>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
  }  
  //$("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
}




function ChangeNow() {
  var newPoint = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
  newScore = random_item(newPoint);
  var str2 = "";
  if(YourScore>newScore) {
    str2 += '<div class="txt-qq">เสียใจนิด ๆ น้า<div>';
  } else {
    str2 += '<div class="txt-qq">ดีใจด้วยน้า<div>';
  }
  str2 += '<div>คุณได้รับคะแนนใหม่ : <span class="txt-qqq">'+parseFloat(newScore).toFixed(2)+'</span> คะแนน</div>';
  str2 += '<div class="btn-t2" onclick="gotoweb()" style="margin-top;25px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div><br><br>';
  //$("#DisplayChoice").html(str2);
  document.getElementById("DisplayChoice").innerHTML = "";
  $("#DisplayQuestion").html(str2);
  //$("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ doc.data().LastScore +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
  var str1 = "";
  if(YourScore>newScore) {
    str1 += '<div class="txt-qq" style="color:#f68b1f;">เสียใจนิด ๆ น้า<div>';
    str1 += '<div><img src="./img/sad.gif" style="padding-top:8px;width:310px;border-radius: 12px;"></div>';
  } else {
    str1 += '<div class="txt-qq" style="color:#f68b1f;">ดีใจด้วยน้า<div>';
    str1 += '<div><img src="./img/congratulations@.gif" style="padding-top:8px;width:310px;border-radius: 12px;"></div>';
  }
  str1 += '<div style="padding:10px 0;">คุณได้รับคะแนนใหม่ : <span class="txt-qqq" style="color:#000000;"><b>'+parseFloat(newScore).toFixed(2)+'</b></span> คะแนน</div>';
  //alert(CheckAddEdit+"line 479");
  if(CheckAddEdit==2) { 
    //alert(CheckAddEdit+"line 557 "+Eid);
    var ChangePoint = 1;
    dbCheck.doc(Eid).update({
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
  $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
  $("#ShowEndPoint").html(str1);
  document.getElementById("id03").style.display = "none";
  document.getElementById("id04").style.display = "block";
}



function NoChangeNow() {
  alert("ขอบคุณสำหรับการเข้าร่วมกิจกรรมในวันนี้");
  window.location.href = 'introgame.html';
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function gotoweb() {
  window.location.href = 'introgame.html';
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
