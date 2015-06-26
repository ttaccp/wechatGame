/*
 * 所有资源地址
 */


var res = {
	bg: getImgByPhone('bg'),
	bg_fuzzy: getImgByPhone('bg_fuzzy'),
	explain: 'res/img/explain.png',
	playexplain: 'res/img/playexplain.png',
	go: 'res/img/go.png',
	number: 'res/img/number.png',
	ready: 'res/img/ready.png',
	time: 'res/img/time.png',
	button: 'res/img/button.png',
	effect: getImgByPhone('effect'),
	milk: 'res/img/milk.png',
	tip: 'res/img/tip.png',
	wechaticon: 'res/img/wechaticon.png',
	result_text: 'res/img/result_text.png',
	resultbg: 'res/img/resultbg.png',
	result_scorebg: 'res/img/result_scorebg.png',
	share: getImgByPhone('share')
};

var G_StartRes = [
	res.bg,
	res.bg_fuzzy,
	res.explain,
	res.playexplain,
	res.go,
	res.number,
	res.ready,
	res.time,
	res.button,
	res.effect,
	res.milk,
	res.tip,
	res.wechaticon,
	res.result_text,
	res.resultbg,
	res.result_scorebg,
	res.share
];

function getImgByPhone(key){
	if(document.body.clientWidth == 480 && document.body.clientHeight == 268){
		return 'res/img/'+key+'.png';
	} else {
		return 'res/img/'+key+'1.png';
	}
}