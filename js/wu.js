$(function(){
	
	var AI=false;
	var flag=true;
	var kongbai={};
	var gameState="pause"
	
	//进入
	var welcome=$(".welcome");
	welcome.on("click",function(){
		welcome.css("display","none");
	})
	
	
	//音效
	var audio=$("#audio").get(0);
	var audio1=$("#audio1").get(0);
	var audio2=$("#audio2").get(0);	
	
	//按钮
	var btn1=$(".btn1");
	var btn2=$(".btn2");
	var btn3=$(".btn3");
	var moshi=$(".moshi");
	var btn4=$(".btn4");
	var btn5=$(".btn5");

	var zhuangtai=$(".zhuangtai")[0];
	
	//点击开始
	btn1.on("click",function(){
		$("#zhe").css("display","none");
	})
	//重新开始
	btn2.on("click",restart);
//		window.location.reload();
	//模式选择
	btn3.on("click",function(){
		btn3.css("display","none");
		moshi.css("display","block");		
	})
	//游戏规则
	btn4.on("click",function(){
		alert("最先在棋盘横向、竖向、斜向形成连续的相同色五个棋子的一方为胜");
	})
	//查看棋路

	var close=$(".close");
	close.on("click",function(){
		$("#qipu").css("display","none");
		drawQipan();
		for(var k in qizi){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			luozi(x,y,qizi[k]);
		}
		$("#info").addClass("bian");
//		window.location.reload();
	})
	//退出游戏
	btn5.on("click",function(){
//		alert("5");
		window.close();
	})
	
	
	
	
	//棋盘所有	
	var canvas=$('#canvas').get(0);
	var ctx = canvas.getContext('2d');
	//黑棋倒计时
	var can1=$("#can1").get(0);
	var ctx1 = can1.getContext('2d');
	function title1(){
		ctx1.save();
		ctx1.font = "18px serif";
		ctx1.fillStyle="#333";
		ctx1.textAlign="center";
		ctx1.textBaseline = "middle";
		ctx1.fillText("黑棋倒计时", 100, 20);
		ctx1.restore();
	}
	
	//钟盘
	function zhong1(){
		ctx1.save();
		ctx1.translate(100,150);
		ctx1.beginPath();
		ctx1.arc(0,0,100,Math.PI*1.333,Math.PI*1.5);
		ctx1.closePath();
		ctx1.fillStyle="red";
		ctx1.fill();
		ctx1.restore();
		
		ctx1.save();
		ctx1.translate(100,150);
		for(var i=0;i<60;i++){
			ctx1.beginPath();
			if(i%5===0){
				ctx1.moveTo(0,-80);
				ctx1.strokeStyle='darkslateblue';
			}else{
				ctx1.moveTo(0,-90);
				ctx1.strokeStyle='slategrey';
			}
			ctx1.lineTo(0,-100);
			ctx1.closePath();
			ctx1.stroke();//描边
			ctx1.rotate(Math.PI/180*6);
		}
		ctx1.restore();
	}
	
	
	//秒针
	function miaozhen1(){
		ctx1.save();
		ctx1.translate(100,150);
		ctx1.rotate(Math.PI/180*6*angle1);	
		ctx1.beginPath();
		ctx1.arc(0,0,10,0,Math.PI*2);
		ctx1.moveTo(0,0+10);
		ctx1.lineTo(0,0+20);
		ctx1.moveTo(0,0-10);
		ctx1.lineTo(0,0-70);
		ctx1.closePath();
		ctx1.stroke();//描边
		ctx1.restore();
		audio.play();
	}
	
	title1();
	zhong1();
	miaozhen1();

	//
	var angle1=1;
	var t1;
	function render1(){
		ctx1.save();
		ctx1.clearRect(0,0,200,250);

		title1();
		zhong1();
		miaozhen1();
		
		if(angle1===60){
			clearInterval(t1);
			alert("时间到，白棋胜");
			chessManual();
			$(canvas).off("click");
		}
		angle1+=1;
		return arguments.callee;
		ctx1.restore();
		
	}
	// t1=setInterval(render1,1000);
	
	//白棋倒计时
	var can2=$("#can2").get(0);
	var ctx2 = can2.getContext('2d');
	
	function title2(){
		ctx2.save();
		ctx2.font = "18px serif";
		ctx2.fillStyle="#333";
		ctx2.textAlign="center";
		ctx2.textBaseline = "middle";
		ctx2.fillText("白棋倒计时", 100, 20);
		ctx2.restore();
	}
	
	//钟盘
	function zhong2(){
		ctx2.save();
		ctx2.translate(100,150);
		ctx2.beginPath();
		ctx2.arc(0,0,100,Math.PI*1.333,Math.PI*1.5);
		ctx2.closePath();
		ctx2.fillStyle="red";
		ctx2.fill();
		ctx2.restore();
		
		ctx2.save();
		ctx2.translate(100,150);
		for(var i=0;i<60;i++){
			ctx2.beginPath();
			if(i%5===0){
				ctx2.moveTo(0,-80);
				ctx2.strokeStyle='darkslateblue';
			}else{
				ctx2.moveTo(0,-90);
				ctx2.strokeStyle='slategrey';
			}
			
			ctx2.lineTo(0,-100);
			ctx2.closePath();
			ctx2.stroke();//描边
			ctx2.rotate(Math.PI/180*6)
		}
		
		ctx2.restore()
	}
	
	
	//秒针
	function miaozhen2(){
		ctx2.save();
		ctx2.translate(100,150);
		ctx2.rotate(Math.PI/180*6*angle2);	
		ctx2.beginPath();
		ctx2.arc(0,0,10,0,Math.PI*2);
		ctx2.moveTo(0,0+10);
		ctx2.lineTo(0,0+20);
		ctx2.moveTo(0,0-10);
		ctx2.lineTo(0,0-70);
		ctx2.closePath();
		ctx2.stroke();//描边
		ctx2.restore();
		audio.play();
	}
	
	title2();
	zhong2();
	miaozhen2();
	
	var angle2=1;
	var t2;
	function render2(){
		ctx2.save();
		ctx2.clearRect(0,0,200,250);

		title2();
		zhong2();
		miaozhen2();
		
		if(angle2===60){
			clearInterval(t2);
			alert("时间到，黑棋胜");
			chessManual();
			$(canvas).off("click");
		}
		angle2+=1;
		return arguments.callee;
		ctx2.restore();
		
	}
	// t2=setInterval(render2,1000);
	
	
	//一颗棋子
	var sep=40;
	var sR=3;
	var bR=18;
	
	//倍数
	function lam(x){
		return (x+0.5)*sep+0.5;
	}
	//封装圆
	function circle(x,y,r){
		ctx.save();
		ctx.beginPath();
		ctx.arc(lam(x),lam(y),r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	
	function drawQipan(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		//棋盘
		ctx.save();
		ctx.beginPath();
		for(var i=0;i<15;i++){
			//横线
			ctx.moveTo(lam(0),lam(i));
			ctx.lineTo(lam(14),lam(i));
			//竖线
			ctx.moveTo(lam(i),lam(0));
			ctx.lineTo(lam(i),lam(14));
		}
		ctx.closePath();
		ctx.stroke();//描边
		
		//标记原点
		circle(3,3,sR);
		circle(11,3,sR);
		circle(7,7,sR);
		circle(3,11,sR);
		circle(11,11,sR);
		
		ctx.restore();
		
		
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				kongbai[i+"_"+j]=true;
			}	
		}
	}
	drawQipan();
	
	//落子
	var qizi={};
	function luozi(x,y,r,color){
		ctx.save();
		ctx.translate(lam(x),lam(y));
		ctx.beginPath();
		ctx.arc(0,0,r,0,Math.PI*2);
		//黑白子颜色
		var g=ctx.createRadialGradient(-4,-4,0,0,0,50);
		if(color==="black"){		
			g.addColorStop(0.1,"#999");
			g.addColorStop(0.4,"#000");
			g.addColorStop(1,"#000");
		}else{
			g.addColorStop(0.1,"#fff");
			g.addColorStop(0.4,"#ddd");
			g.addColorStop(1,"#eee");
		}
		ctx.fillStyle=g;

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		
		qizi[m(x,y)]=color;
		// console.log(qizi)
		gameState='play';
		delete kongbai[m(x,y)];
	}

	//棋谱
	chessManual=function(){
		ctx.save();
		ctx.font="20px/1  微软雅黑"
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		
		var i=1;
		for(var k in qizi){
//			console.log(k);
			var arr=k.split("_");
			if(qizi[k]==="white"){
				ctx.fillStyle="black";
			}else{
				ctx.fillStyle="white";
			}
			ctx.fillText(i++,lam(parseInt(arr[0])),lam(parseInt(arr[1])));
		}

		ctx.restore();
		

		$("#qipu").show();
                    if($("#qipu").find("img").length){
                        $("#qipu").find("img").attr("src",canvas.toDataURL());
                    }else{
                        $("<img>").attr("src",canvas.toDataURL()).appendTo("#qipu");
                    }
                    
                    if($("#qipu").find("a").length){
                        $("#qipu").find("a").attr("href",canvas.toDataURL());
                    }else{
                        $("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo("#qipu");
                    }
		
	}
	
	//ai人机进攻+防守

	function intel(){
		//防守
		var max1=-Infinity;
		var pos1={};
		for(var k in kongbai){

			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m=cal(x,y,"black");
			if(m>max1){
				max1=m;
				pos1.x=x;
                                          pos1.y=y;
				// console.log(pos1)
			}
		}
		//进攻
		var max2=-Infinity;
		var pos2={};
		for(var k in kongbai){

			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m=cal(x,y,"white");
			if(m>max2){
				max2=m;
				pos2.x=x;
                                          pos2.y=y;
				// console.log(pos2)
			}
		}
		if(max1>max2){
			return pos1;
			
		}else{
			return pos2;
		}

	}
	
	//封装restart
	function restart(){
		
		audio1.pause();
		audio2.pause();
		clearInterval(t1);
		clearInterval(t2);

		$("#info").removeClass("active");
		drawQipan();
		$("#qipu").css("display","none");
		$(canvas).on("click",handleClick);
		flag=true;
		qizi={};
		gameState=false;
		
		$("#info").removeClass("bian");
		$("#zhe").css("display","block");
		
	}
	
	//再来一局again
	$(".again").on("click",restart);
	//退出游戏
	$(".cancle").on("click",function(){
		window.location.reload();
	})


	//AI+normal
	$("#ai").on("click",function(){
		if(gameState==='play'){
			return;
		}
		$("#normal").removeClass("red");
		$(this).addClass('red');
		AI=true;
                    console.log(kongbai)
	});
	$("#normal").on("click",function(){
		if(gameState==='play'){
			return;
		}
		$("#ai").removeClass("red");
		$(this).addClass('red');
		AI=false;

	});
	

	//改颜色，轮流下棋
	var flag=true;
	function handleClick(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);

		if(qizi[x+"_"+y]){
			return;
		}
		
		if(AI){
			luozi(x,y,bR,'black');
			if(cal(x,y,'black')>=5){
				clearInterval(t1);
                                         clearInterval(t2);
				$(canvas).off("click");
				
				$("#info").find('.text').html("黑棋胜利").end().addClass("active");
				chessManual();
				
			}
                               var p=intel();
			luozi(p.x,p.y,bR,"white");
			if(cal(p.x,p.y,'white')>=5){
				clearInterval(t1);
                                         clearInterval(t2);
				$(canvas).off("click");
				
				$("#info").find('.text').html("白棋胜利").end().addClass("active");
				chessManual();
				
			}
			return false;
		}
		
		if(flag){
			luozi(x,y,bR,"black");
			audio1.play();
			ctx2.save();
			ctx2.rotate(-Math.PI/180*6*angle2);
			angle2=0;
			ctx2.restore();
			clearInterval(t2);
			t2=setInterval(render2,1000);
			clearInterval(t1);
			
//			console.log(cal(x,y,"black"))
			if(cal(x,y,"black")>=5){
//				console.log("黑棋胜利");
//				alert("黑棋胜利");
                                        clearInterval(t1);
				clearInterval(t2);
				$(canvas).off("click");
				
				$("#info").find('.text').html("黑棋胜利").end().addClass("active");
				
				chessManual();
			}
			
			
		}
		else{
			luozi(x,y,bR,"white");
			audio2.play();
			ctx1.save();
			ctx1.rotate(-Math.PI/180*6*angle1);
			angle1=0;
			ctx1.restore();
			clearInterval(t1);
			t1=setInterval(render1,1000);
			clearInterval(t2);
			
//			console.log(cal(x,y,"white"))
			if(cal(x,y,"white")>=5){
//				console.log("白棋胜利");
//				alert("白棋胜利");
				clearInterval(t1);
                                        clearInterval(t2);

				$(canvas).off("click");
				
				$("#info").find('.text').html("白棋胜利").end().addClass("active");
				
				chessManual();
			}
			
			
		}
		flag=!flag;
	}
	$(canvas).on("click",handleClick);


	//链接
	function m(x,y){
		return x+"_"+y;
	}
	
	//输赢判断
	function cal(x,y,color){
		//行
		var row=1;
		var i;
		i=1
		while(qizi[m(x+i,y)]===color){
			row++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y)]===color){
			row++;
			i++;
		}
		
		//列
		var lie=1;
		i=1
		while(qizi[m(x,y-i)]===color){
			lie++;
			i++;
		}
		i=1;
		while(qizi[m(x,y+i)]===color){
			lie++;
			i++;
		}
		
		//左斜
		var zX=1;
		i=1
		while(qizi[m(x+i,y+i)]===color){
			zX++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y-i)]===color){
			zX++;
			i++;
		}
		
		//右斜
		var yX=1;
		i=1
		while(qizi[m(x+i,y-i)]===color){
			yX++;
			i++;
		}
		i=1;
		while(qizi[m(x-i,y+i)]===color){
			yX++;
			i++;
		}
		
		return Math.max(row,lie,zX,yX);
	}
	
	
})
