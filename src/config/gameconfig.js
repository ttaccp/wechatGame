
/*
 *  游戏配置页
 */

var GC = {
	// 间隔时间
	time_showExplain: 1500,		// 显示说明
	time_showPlayexplain: 1500,	// 显示手指提示
	time_showGo: 3000,			// 显示go按钮
	time_showReady: 1000,		// 显示ready
	Incremental: 100,			// 每次增加分数
	level: {					// 评判结果分数(大力水手，神马神马的)
		l1: 3000,
		l2: 6000,
		l3: 9000,
		l4: 10000
	},
	rules: [
		// 第一波		2个/S 共5S
		{
			time: 5,
			count: 10,
			speed: 2
		},
		// 第二波		3个/S 共5S
		{
			time: 5,
			count: 15,
			speed: 3
		},
		// 第三波		3.5个/S 共10S
		{
			time: 10,
			count: 35,
			speed: 3.5
		},
		// 第四波		4个/S 共10S
		{
			time: 10,
			count: 40,
			speed: 4
		}
	],
	allTime: 30,	// 总时间30S
	allNumber: 100	// 总个数100
}
