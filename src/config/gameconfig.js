
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
		l1: 2500,
		l2: 8800,
		l3: 10800,
		l4: 11400
	},
	rules: [
		// 第一波
		{
			time: 5,
			count: 5,
			speed: 1
		},
		// 第二波
		{
			time: 10,
			count: 20,
			speed: 2
		},
		// 第三波
		{
			time: 15,
			count: 45,
			speed: 3
		},
		// 第四波
		{
			time: 5,
			count: 18,
			speed: 3.6
		},
		// 第五波
		{
			time: 5,
			count: 20,
			speed: 4
		}
		,
		// 第六波
		{
			time: 1,
			count: 6,
			speed: 6
		}
		,
		// 第七波
		{
			time: 1,
			count: 7,
			speed: 7
		}
		,
		// 第八波
		{
			time: 1,
			count: 8,
			speed: 8
		}
		,
		// 第九波
		{
			time: 1,
			count: 9,
			speed: 9
		}
		,
		// 第10波
		{
			time: 1,
			count: 10,
			speed: 10
		}
	],
	allTime: 45,	// 总时间30S
	allNumber: 148	// 总个数100
}
