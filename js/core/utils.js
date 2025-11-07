//**********************************************//
//
// Utility Functions
//
//**********************************************//

// APIの種類を生成する
function underbar_case(s){
	return s.replace(/\.?([A-Z]+)/g, function(x, y){ return "_" + y; }).replace(/^_/, "").toUpperCase();
}

// キャピタルにする
function capitalize(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// url queryの作成
function build_queries(q){
	return Object.keys(q).map(function(key){ return key + (q[key] ? "=" + q[key] : "");}).join("&");
}

// ツールチップ関連
function drawTooltip(d, axis, tooltip){
	var  _tooltip_html  = '';
	tooltip.transition()
		.duration(ANIMATION.TOOLTIP_FADE_OUT)
		.style("opacity", 0);
	tooltip.transition()
		.duration(ANIMATION.TOOLTIP_FADE_IN)
		.style("opacity", .9);
	var tooltip_html = ''
	tooltip_html += d[axis].name+':'+d.$
	tooltip_html += d.unit != undefined ? d.unit : '';
	tooltip.html(tooltip_html)
	.style("left", (d3.event.pageX) + "px")
	.style("top", (d3.event.pageY - 5) + "px");
	tooltip.style("visibility", "visible");
}

function moveTooltip(d, tooltip){
	return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX+10)+"px");
}

function removeTooltip(d, tooltip){
	return tooltip.style("visibility", "hidden");
}

// エラー表示関数
function showError(message){
	var errorEl = $('#error-message');
	errorEl.find('.error-text').text(message);
	errorEl.fadeIn(ANIMATION.ERROR_FADE_DURATION);
	setTimeout(function(){
		errorEl.fadeOut(ANIMATION.ERROR_FADE_DURATION);
	}, ANIMATION.ERROR_DISPLAY_DURATION);
}

function hideError(){
	$('#error-message').hide();
}
