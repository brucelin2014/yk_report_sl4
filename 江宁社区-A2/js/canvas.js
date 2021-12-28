// 2021-01-16, Bruce

// 清空画布
var clearCanvas = function(ctx, width, height) {
	ctx.clearRect(0, 0, width, height);
}

// 画线
var addLine = function(ctx, x0, y0, x1, y1, color) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.strokeStyle = color;
	ctx.stroke();
}

// 画圆
var addArc = function(ctx, x0, y0, r, color) {
	ctx.beginPath();
	ctx.arc(x0, y0, r, 0, 2 * Math.PI, true);
	ctx.strokeStyle = color;
	ctx.stroke();
}

// 文字
var addText = function(ctx, txt, left, top, color) {
	ctx.beginPath();
	ctx.font = "16px Microsoft YaHei";
	ctx.textAlign = "left"; // 水平对齐方式
	ctx.textBaseline = "top"; // 垂直对齐方式
	ctx.fillText(txt, left, top);
}

// 绘制多边形
var drawPolygon = function(ctx, conf) {
	var x = conf && conf.x || 0; // 中心点x坐标
	var y = conf && conf.y || 0; // 中心点y坐标
	var num = conf && conf.num || 3; // 图形边的个数
	var r = conf && conf.r || 100; // 图形的半径
	var width = conf && conf.width || 5;
	var strokeStyle = conf && conf.strokeStyle;
	var fillStyle = conf && conf.fillStyle;
	var angle = conf && conf.angle || 0; // 旋转角度

	//开始路径
	ctx.rotate(angle);
	ctx.beginPath();
	var startX = x + r * Math.cos(2 * Math.PI * 0 / num);
	var startY = y + r * Math.sin(2 * Math.PI * 0 / num);
	ctx.moveTo(startX, startY);
	for (var i = 1; i <= num; i++) {
		var newX = x + r * Math.cos(2 * Math.PI * i / num);
		var newY = y + r * Math.sin(2 * Math.PI * i / num);
		ctx.lineTo(newX, newY);
	}
	ctx.closePath();

	//路径闭合
	if (strokeStyle) {
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = width;
		ctx.lineJoin = 'round';
		ctx.stroke();
	}
	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
	ctx.rotate(-angle);
}

// 绘制贝塞尔曲线
var addCurve = function drawLine(ctx, points) {
	ctx.strokeStyle = "#ff0000";
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	var size = points.length;
	var ctrlPoint = {};
	for (i = 1; i < size - 2; i++) {
		ctrlPoint.x = (points[i].x + points[i + 1].x) / 2;
		ctrlPoint.y = (points[i].y + points[i + 1].y) / 2;
		ctx.quadraticCurveTo(points[i].x, points[i].y, ctrlPoint.x, ctrlPoint.y);
	}
	ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	ctx.stroke();
}

// reloadAbleJSFn("Config", "HKWeatherConfig.js?t=" + Math.random());
var reloadAbleJSFn = function(id, newJS) {
	try {
		var oldjs = null;
		var t = null;
		var oldjs = document.getElementById(id);
		if (oldjs)
			oldjs.parentNode.removeChild(oldjs);
		var scriptObj = document.createElement("script");
		scriptObj.src = newJS;
		scriptObj.type = "text/javascript";
		scriptObj.id = id;
		document.getElementsByTagName("head")[0].appendChild(scriptObj);
	} catch (e) {
		alert(e.message);
	}
}
