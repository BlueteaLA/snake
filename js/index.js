window.onload=function(){
	var sence=document.getElementsByTagName('div')[0];
	// 创建贪吃蛇
	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}];
	// 创建词典
	var dict={};
	// 词典设置初始值
	for(var i=0;i<snake.length;i++){
		dict[snake[i].x+"_"+snake[i].y]=true;
	}
	// 创建变量，储藏键盘码
	var dir=39;
	var over=false;


	// 创建环境
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var div=document.createElement('div');
			div.className="b";
			div.id=i+"_"+j;
			sence.appendChild(div);
		}
	}
	// 设置贪吃蛇的初始状态
	for(var i=0;i<snake.length;i++){
		document.getElementById(snake[i].x+"_"+snake[i].y).className="b s";
	}


	// 键盘事件
	document.onkeydown=function(){
		// 时间间隔函数让它动起来
		var t=setInterval(move,500);
		// 嵌套onkeydown事件,是为了避免时间间隔函数多次触发
		document.onkeydown=function(e){
			// 事件对象
			var ev=e||window.event;
			// 不能以向左又向右/向上又向下
			if(Math.abs(dir-ev.keyCode)==2){
				return false;
			}
			// 获取键盘码
			dir=ev.keyCode;
			move();
		}
	}




	function move(){
		if(over){return false;}
		// 获取当前蛇的头部
		var head=snake[snake.length-1];
		// 声明一个新蛇头
		var newhead=null;
		// 判断按键，并赋值新蛇头
		if(dir==37){
			newhead={x:head.x,y:head.y-1}
		}
		if(dir==38){
			newhead={x:head.x-1,y:head.y}
		}
		if(dir==39){
			newhead={x:head.x,y:head.y+1}
		}
		if(dir==40){
			newhead={x:head.x+1,y:head.y}
		}


		// 判断边界有问题
		for(var i in dict){
			if(newhead.x<0||newhead.y<0||newhead.x>19||newhead.y>19||(newhead.x+"_"+newhead.y)==i){
				over=true;
				alert("GAME OVER");
				document.location.reload();
				return false;
			}
		}


		// 给新蛇头变色
		document.getElementById(newhead.x+"_"+newhead.y).className="b s";
		// 将新蛇头压入数组
		snake.push(newhead);
		// 更新词典(添加新蛇头)
		dict[newhead.x+"_"+newhead.y]=true;


		// 遇到食物时
		if(newhead.x==f.x&&newhead.y==f.y){
			f=food();
		}else{
			// 删除蛇身数组的第一个元素即蛇尾(返回值为删除的元素)
			var last=snake.shift();
			// 给蛇尾变色
			document.getElementById(last.x+"_"+last.y).className="b";
			// 更新词典(删除旧蛇尾)
			delete dict[last.x+"_"+last.y];
		}
	}

	// 吃食物
	var f=food();
	function food(){
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
		var fod=x+"_"+y;
		console.log(fod);
		for(var i in dict){
			while(fod==i){
				x=Math.floor(Math.random()*19);
				y=Math.floor(Math.random()*19);
			}
		}
		document.getElementById(x+"_"+y).className="b food";
		return {x:x,y,y};
	}
}