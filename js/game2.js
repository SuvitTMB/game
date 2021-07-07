var cleararray = "";
var getNumberStart = 0;
var getNumber1 = 0;
var getNumber2 = 0;
var getNumber3 = 0;
var ScorePoint = 0;
var ScoreExtraGame = 2;
var EndGame = 0;
var RoundNumber = 0;
var RoundNumber1 = 0;
var RoundNumber2 = 0;
var RoundNumber3 = 0;
var textmessage = "";
var textDisplayPoint = "";
var CheckPoint = 0;


$(document).ready(function () {
	/*
	var currURL = window.location.href;
	if (document.location.protocol == "https:")
	{
	   currURL = currURL.replace("https:", "http:");
	   window.location = currURL ; 
	   return;
	} 
	TTVBanner();
	*/
	BoxNumber();
	StartNumber();
});


/*
function test() {
    document.getElementById("id01").style.display = "block";
}
*/

function FalseGame() {
	$("#DisplayLastScore").val(cleararray);
	textDisplayPoint = "คุณทำคะแนนในเกมส์นี้ได้ = "+ ScorePoint +" คะแนน<br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า";
	$("#DisplayLastScore").html(textDisplayPoint);
	//alert(n);
    document.getElementById("id01").style.display = "block";
}


function TrueGame() {
	EndGame = 1;
	DisplayRound();
	if(CheckPoint==3) { ScorePoint = ScorePoint+2; }
	textmessage="เกมส์จบลงแล้ว";
	$("#DisplayMessage").val(cleararray);
	$("#DisplayMessage").html(textDisplayPoint);
	
	$("#DisplayEndScore").val(cleararray);
	textDisplayPoint = "คุณทำคะแนนในเกมส์นี้ได้ = "+ ScorePoint +" คะแนน<br>แล้วกลับมาเล่นใหม่ในวันพรุ่งนี้น้า";
	$("#DisplayEndScore").html(textDisplayPoint);
    document.getElementById("id02").style.display = "block";
}


function ExtraGame() {
	ScorePoint = ScorePoint + ScoreExtraGame;
	$("#DisplayExtraPoint").val(cleararray);
	var textExtraPoint = "ยินดีด้วย คุณทำ Extra Point สำเร็จ<br>คุณได้รับคะแนนพิเศษเพิ่ม 3 คะแนน<br>และสามารถเก็บคะแนนได้<br>จนกว่าเกมส์จะจบ";
	$("#DisplayExtraPoint").html(textExtraPoint);
    document.getElementById("id03").style.display = "block";
	//alert("คุณทำ Winner Game สำเร็จ ScorePoint = "+ScorePoint);
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
	document.getElementById('id02').style.display='none';
	document.getElementById('id03').style.display='none';
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
		str+='<div style="width:60%;margin:auto;">';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',1)"><div class="game-a3"><</div><div class="game-a4">น้อยกว่า</div></div>';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',2)"><div class="game-a3">=</div><div class="game-a4">เท่ากับ</div></div>';
		str+='<div class="col-sm-4 game2-box1" onclick="SendNumber('+RoundNumber+','+ getNumberStart +',3)"><div class="game-a3">></div><div class="game-a4">มากกว่า</div></div>';
		str+='</div>';
	} else {
		str+='<center><div class="btn-t1" style="margin-top:5px;" onclick="location.href=startcheck.html">การแข่งขันวันนี้จบลงแล้ว</div></center>';
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
			if(RoundNumber1<getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; }
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber1==getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; ExtraGame(); CheckPoint = CheckPoint+1; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber1>getNumberStart) { textmessage="คุณเลือกได้ถูกต้อง" ; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
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
			if(RoundNumber2<RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; }
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber2==RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; ExtraGame(); CheckPoint = CheckPoint+1; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber2>RoundNumber1) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		$("#DisplayNumber").val(cleararray);
		str+='<div class="gameNumber">'+RoundNumber2+'</div>';
		$("#DisplayNumber").html(str);
		str0+='<div class="col-sm-3 game2-box"><div class="game-a1">'+ RoundNumber2 +'</div><div class="game-a2">'+ ntext +'</div></div>';
		$("#DisplayNumber2").html(str0);
	} else if(RoundNumber==3) {
		if(n==1) { 
			if(RoundNumber3<RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; }
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		}
		if(n==2) { 
			if(RoundNumber3==RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; ExtraGame(); CheckPoint = CheckPoint+1; } 
			else { textmessage="คุณตอบข้อนี้ผิด"; EndGame=1; FalseGame(); }
		} 
		if(n==3) { 
			if(RoundNumber3>RoundNumber2) { textmessage="คุณเลือกได้ถูกต้อง"; ScorePoint = ScorePoint+1; CheckPoint = CheckPoint+1; } 
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
	$("#DisplayScore").html(ScorePoint);
	DisplayRound();
}


  
    
function RandomNumber() {
	if(RoundNumber==1) {
		RoundNumber1 = Math.floor((Math.random() * 10) + 1);		
	} else if(RoundNumber==2) {
		RoundNumber2 = Math.floor((Math.random() * 10) + 1);		
	} else if(RoundNumber==3) {
		RoundNumber3 = Math.floor((Math.random() * 10) + 1);		
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
/*
<div class="col-sm-3 game2-box"><div class="game-a1" id="DisplayNumber0"></div><div class="game-a2">เริ่มเกมส์</div></div>

function LoadNewHeart() {
	var i = 0;
	var str = "";
	var Nub_end = 12 ;
	$("#DisplayNewHeart").val(cleararray);
	str+='<div class="row">';
	for (i = 0; i < Nub_end; i++) {
		str+='<div class="col-lg-2 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">';
		str+='<div class="icon-box iconbox-blue"><div class="icon img_center">';
		str+='<div><img src="assets/img/blog-author.jpg" class="img_Employee">';
		str+='<div class="position_boss"><img src="assets/img/comments-2.jpg" class="img_Leader"></div></div></div>';
		str+='<div class="textname">สุวิทย์ ชัยรุ่งปัญญา</div>';
		str+='<div class="textdetail">ให้ทำการเลือกพนักงานที่จะเข้ารับรางวัล 4 ใจ จำนวน 1 ท่าน เพื่อนำเสนอผู้บริหารในอันดับต่อไป (ระหว่างวันที่ 25-31 ของทุกเดือน)</div>';
		str+='<div class="text-center"><div class="btn1 trigger" onclick="ShowNewHeart('+(i+1)+')">ดูรายละเอียด</div></div>';
		str+='</div></div>';		
	}
	str+='</div>';
	$("#DisplayNewHeart").html(str);

}



function ShowNewHeart(n) {
	//alert(n);
    document.getElementById("id01").style.display = "block";
}




function LoadTarget() {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawVisualization);
      function drawVisualization() {
        var data = google.visualization.arrayToDataTable([
          ['เดือน', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
          ['มกราคม',  165,      938,         522,             998,           450,      614.6],
          ['2005/06',  135,      1120,        599,             1268,          288,      682],
          ['2006/07',  157,      1167,        587,             807,           397,      623],
          ['2007/08',  139,      1110,        615,             968,           215,      609.4],
          ['2008/09',  136,      691,         629,             1026,          366,      569.6]
        ]);

        var options = {
          title : 'ข้อมูลการให้ใจรายเดือนของพนักงานทั้งระบบ',
          //vAxis: {title: 'Cups'},
          //hAxis: {title: 'Month'},
          seriesType: 'bars',
          series: {5: {type: 'line'}}
        };
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
 }


function CloseAll() {
	document.getElementById('id01').style.display='none';
}

*/