/*
 * 所有资源地址
 */


var res = {
	// 背景图片
	bg: getImgByPhone('bg'),
	bg_fuzzy: getImgByPhone('bg_fuzzy'),
	explain: 'res/img/explain.png',
	playexplain: 'res/img/playexplain.png',
	go: 'res/img/go.png',
	number: 'res/img/number.png',
	ready: 'res/img/ready.png'
};

var G_StartRes = [
	res.bg,
	res.bg_fuzzy,
	res.explain,
	res.playexplain,
	res.go,
	res.number,
	res.ready
];

function getImgByPhone(key){
	if(document.body.clientWidth == 480 && document.body.clientHeight == 268){
		return 'res/img/'+key+'.png';
	} else {
		return 'res/img/'+key+'1.png';
	}
}