var MainScene = cc.Layer.extend({
	currentScore: 0,
    onEnter:function () {
        this._super();
        this.init();
    },
    init:function () {
        
        var self = this,
        	visibleRect = cc.visibleRect,
        	center = visibleRect.center,
        	size = cc.winSize;
        
        var container = self.container = new cc.Layer();
        container.setPosition(visibleRect.bottomLeft);
        self.addChild(container);
        
        // 背景图
        var bg = self.bg = new cc.Sprite(G_res.bg);
        bg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0
        });
        container.addChild(bg, 0, 'bg');
        
        // ready
        var ready = self.ready = new cc.Sprite(G_res.ready, cc.rect(0, 0, 630, 140));
        ready.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: size.width / 2 - ready.width / 2,
        	y: size.height / 2 - ready.height / 4
        });
        ready.setVisible(false);
        container.addChild(ready, 20, 'ready');
        
        // 渲染3/2/1
        self.numbers = self.renderNumber(size, container);
        // 渲染上面计数效果
        self.renderCount(bg, container);
        
        // 显示ready
        Utils.delayExec(self.showReady.bind(self), GC.time_showReady);
        // 显示数字
        Utils.delayExec(self.showNumber.bind(self), GC.time_showReady + 1000);
        
        
        self.milk_rects = milk_rects = [
   			cc.rect(0, 0, 156, 199),
   			cc.rect(162, 0, 156, 199),
   			cc.rect(320, 0, 156, 199),
   			cc.rect(477, 0, 149, 199)
   		];
   		self.milk_posi = milk_posi = [450, 570, 690, 810];
   		self.milk_posiTo = milk_posiTo = [0, 360, 800, 1200]
		
		Utils.bgEffect();
		
        return true;
    },
    checkIsOver: function(){
    	var self = this,
    		milkContainer = self.milkContainer;
    		
    	var allMilk = milkContainer.getChildren();
    	cc.log(allMilk.length)
    	for (var i = 0, len = allMilk.length, item; i <len; i++) {
    		item = allMilk[i];
			if(item.y <= 0){
				self.gameOver();
				break;
			}
    	}
    },
    startGame: function(){
		var self = this;
		
		var milkContainer = self.milkContainer = new cc.Layer();
        milkContainer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(milkContainer);
//		var checkInterval = self.checkInterval = setInterval(self.checkIsOver.bind(this), 500);
		// 渲染奶粉
		self.moveMilk(GC.rules, 0);
    },
    gameOver: function(){
    	cc.log('game over')
    	var self = this;
    	clearTimeout(self.timer);
    	clearInterval(self.interval);
    	clearInterval(self.interval_countdown);
    	clearInterval(self.checkInterval);
    	
    	cc.eventManager.removeListeners(self.buttons['button0']);
    	cc.eventManager.removeListeners(self.buttons['button1']);
    	cc.eventManager.removeListeners(self.buttons['button2']);
    	cc.eventManager.removeListeners(self.buttons['button3']);
    	
    	Utils.stopBgEffect();
    	
    	// 弹出结果显示
    	Utils.delayExec(self.popupResult.bind(self), 1000);
    },
    count: 0,
    moveMilk: function(rules, index){
    	var self = this;
    	
    	if(index >= rules.length){
    		cc.log(self.count);
    		return;
    	}
    	
    	var rule = rules[index];
    	var timer = self.timer = setTimeout(function(){
    		
    		var num = 0;
    		var interval = self.interval = setInterval(function(){
    			
    			self.renderMilk();
    			self.count++;
    			num++
    			
    			if(num >= rule.count){
    				clearInterval(interval);
    				interval = null;
    				self.moveMilk(rules, ++index);
    				cc.log(self.count + ' - ' + JSON.stringify(rule))
    			}
    		}, (1000 / rule.speed));
    		
    	}, ( temp = rules[index-1] && temp && temp.count) || 0)
    },
    showReady: function(){
    	Utils.show(this.ready);
    },
    showNumber: function(){
    	
    	var self = this;
    	Utils.hide(self.ready);
    	Utils.show(self.numbers['num3']);
    	
    	Utils.delayExec(function(){
    		Utils.show(self.numbers['num2']);
    		Utils.hide(self.numbers['num3']);
    	}, 1000);
    	
    	Utils.delayExec(function(){
    		Utils.show(self.numbers['num1']);
    		Utils.hide(self.numbers['num2']);
    	}, 2000);
    	
    	Utils.delayExec(function(){
    		Utils.hide(self.numbers['num1']);
    		// 渲染按钮
        	self.buttons = self.renderButton(self.bg, self.container);
        	// 开始游戏
        	var rules = GC.rules;
    		Utils.delayExec(self.startGame.bind(self), 1000 - (1000 / rules[0].speed + 1000 / rules[rules.length - 1].speed));
    		// 开始倒计时
    		Utils.delayExec(self.startCountDown.bind(self), 1000);
    	}, 3000);
    },
    renderNumber: function(size, container){
    	
    	var rel = {};
    	var rects = [
    		cc.rect(0, 149, 360, 378),
    		cc.rect(360, 149, 360, 378),
    		cc.rect(717, 149, 320, 378)
    	]
    	for (var i = 3, j = 0; i >= 1; i--, j++) {
    		var num = new cc.Sprite(G_res.ready, rects[j]);
    		num.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: size.width / 2 - num.width / 2,
	        	y: size.height / 2 - num.height / 2
	        });
	        num.setVisible(false);
	        container.addChild(num, 20, 'num' + i);
    		rel['num' + i] = num;
    	}
    	
    	return rel;
    },
    renderCount: function(bg, container){
    	
    	var self = this;
    	// 分数框
        var scoreBox = self.scoreBox = new cc.Sprite(G_res.time, cc.rect(0, 0, 166, 53));
        scoreBox.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: bg.width - scoreBox.width - 50,
        	y: bg.height - scoreBox.height - 20
        });
        container.addChild(scoreBox, 0, 'scoreBox');
        
        // 渲染默认分数
        self.setScore(0);
        
       	// 时间框
       	var timeBox = self.timeBox = new cc.Sprite(G_res.time, cc.rect(0, 84, 316, 53));
        timeBox.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 20,
        	y: bg.height - scoreBox.height - 20
        });
        container.addChild(timeBox, 0, 'timeBox');
        
        // 时间条背景
        var timebg = self.timebg = new cc.Sprite(G_res.time, cc.rect(0, 154, 298, 41));
        timebg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: timeBox.x + 9,
        	y: timeBox.y + 6
        });
        container.addChild(timebg, 0, 'timebg');
        
        // 时间条
        var time = self.time = new cc.Sprite(G_res.time, cc.rect(0, 215, 298, 41));
        time.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: timebg.x,
        	y: timebg.y
        });
        container.addChild(time, 0, 'time');
		
    },
    renderButton: function(bg, container){
    	var self = this;
    	
    	var rects = [
    		cc.rect(0, 0, 330, 150),
    		cc.rect(352, 0, 330, 150),
    		cc.rect(705, 0, 330, 150),
    		cc.rect(1059, 0, 330, 150)
    	];
    	var rects_activate = [
    		cc.rect(0, 150, 330, 150),
    		cc.rect(352, 150, 330, 150),
    		cc.rect(705, 150, 330, 150),
    		cc.rect(1059, 150, 330, 150)
    	];
    	var effect_rects = [
    		cc.rect(0, 0, 481, 596),
    		cc.rect(481, 0, 332, 596),
    		cc.rect(899, 0, 309, 596),
    		cc.rect(1213, 0, 482, 596)
    	];
    	var posi = [20, 340, 663, 988];
    	var effect_posi = [50, 355, 661, 809];
    	
    	var listener = self.createListener(self.btnTouchBegan.bind(self), self.btnTouchEnd.bind(self));
    	var buttons = {};
    	for (var i = 0; i < 4; i++) {
    		
    		var button_normal = new cc.Sprite(G_res.button, rects[i]);
	        button_normal.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: posi[i],
	        	y: 15
	        });
	        container.addChild(button_normal, 0, 'button' + i);
			buttons['button' + i] = button_normal;
			cc.eventManager.addListener(listener.clone(), button_normal);
	        
	        var button_activate = new cc.Sprite(G_res.button, rects_activate[i]);
	        button_activate.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: button_normal.x,
	        	y: button_normal.y
	        });
	        button_activate.setVisible(false);
	        container.addChild(button_activate, 6, 'button' + i + 'activate');
	        
	        
	        var effect = new cc.Sprite(G_res.effect, effect_rects[i]);
	        effect.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: effect_posi[i],
	        	y: button_normal.y + 75
	        });
	        effect.setVisible(false);
	        container.addChild(effect, 5, 'button' + i + 'effect');   
    	}
        return buttons;
    },
    createListener: function(touchbegan, touchend){
    	var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//单击
            swallowTouches: true,
            onTouchBegan: function(touch, event) {

                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                	touchbegan(target);
                	return true;
                }
	            return false;
            },
//          onTouchMoved: function(touch, event){
//          	touchend(event.getCurrentTarget());
//          },
            onTouchEnded: function(touch, event){
            	var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                	touchend(target);
                }
                return true;
            }
        });
        return listener;
//    	cc.eventManager.addListener(listener, node);
    },
    isRenderScore: false,
    scores: {},
    setScore: function(score){
    	var self = this;
    	score = Math.max(0, score);
    	score = Math.min(99999, score);
    	var numberRects = [
    		cc.rect(294, 0, 28, 35),	// 0
    		cc.rect(0, 0, 28, 35),		// 1
    		cc.rect(28, 0, 28, 35),		// 2
    		cc.rect(62 , 0, 28, 35),	// 3
    		cc.rect(95, 0, 28, 35),		// 4
    		cc.rect(129, 0, 28, 35),	// 5
    		cc.rect(163, 0, 28, 35),	// 6
    		cc.rect(196, 0, 28, 35),	// 7
    		cc.rect(230, 0, 28, 35),	// 8
    		cc.rect(264, 0, 28, 35)		// 9
    	];
    	
    	if(!self.isRenderScore){
    		self.isRenderScore = true;
    		self.scores['one'] = renderDefaultScore('one', true);
    		self.scores['ten'] = renderDefaultScore('ten');
    		self.scores['hundred'] = renderDefaultScore('hundred');
    		self.scores['thousand'] = renderDefaultScore('thousand');
    		self.scores['tenThousand'] = renderDefaultScore('tenThousand');
    	}
    	
    	var nodes = getNodes(score);
    	score += '';
    	for (var i = score.length, str, node; i-- ;) {
    		str = score[i];
    		node = nodes[i];
    		node.setVisible(true);
    		node.setTextureRect(numberRects[+str]);
    	}
    	
    	function renderDefaultScore(key, isShow){
        	var posi = {
        		'one': 0,
        		'ten': 30,
        		'hundred': 60,
        		'thousand': 90,
        		'tenThousand': 120
        	}

        	var num = self[key] = new cc.Sprite(G_res.number, cc.rect(294, 0, 28, 35));
        	var x = self.scoreBox.x + self.scoreBox.width - num.width - 11, y = self.scoreBox.y + 8;
	        num.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: x - posi[key],
	        	y: y
	        });
	        num.setVisible(isShow || false);
	        self.container.addChild(num, 0, key);
        }
    	function getNodes(score){
    		var nodes = [self['one']];
    		if(score >= 10){
    			nodes.push(self['ten']);
    		}
    		if(score >= 100){
    			nodes.push(self['hundred']);
    		}
    		if(score >= 1000){
    			nodes.push(self['thousand']);
    		}
    		if(score >= 10000){
    			nodes.push(self['tenThousand']);
    		}
    		return nodes.reverse();
    	}
    },
    startCountDown: function(){
    	var self = this,
    		time = self.time;
    	
    	var w = time.width / GC.allTime / 5;
    	var interval_countdown = self.interval_countdown = setInterval(function(){
    		var width = time.width;
    		if(width <= 0){
    			clearInterval(interval_countdown);
    			interval = null;
    			// 游戏结束
	    		self.gameOver();
    		}
    		time.setTextureRect(cc.rect(0, 215, width - w, 41));
    	}, 200);
    },
    btnTouchBegan: function(node){

    	var self = this,
    		container = self.container,
    		name = node.getName();
    	
    	for (var i = 0; i < 4; i++) {
    		container.getChildByName('button' + i + 'effect').setVisible(false);
    		container.getChildByName('button' + i + 'activate').setVisible(false);
    		container.getChildByName('button' + i).setVisible(true);
    	}
    	
    	var effect = container.getChildByName(name + 'effect');
    	effect.setVisible(true);
    	
    	var activate = container.getChildByName(name + 'activate');
    	activate.setVisible(true);
    	
    	node.setVisible(false);
    	
    	Utils.touchEffect();
   },
    btnTouchEnd: function(node){
   		var self = this,
    		container = self.container,
    		milkContainer = self.milkContainer;

    	for (var i = 0; i < 4; i++) {
    		container.getChildByName('button' + i + 'effect').setVisible(false);
    		container.getChildByName('button' + i + 'activate').setVisible(false);
    		container.getChildByName('button' + i).setVisible(true);
    	}
    	if(milkContainer){
    		// 碰撞检测
	    	var allMilk = milkContainer.getChildren();
	    	var inRect = false,
	    		currentMilk = null;
    		
    		
	    	for (var i = 0, len = allMilk.length, milk; i < len; i++) {
	    		milk = allMilk[i];
	    		inRect = self.rectIntersectsRect(milk, node);
	    		if(inRect){
	    			currentMilk = milk;
	    			break;
	    		}
	    	}

	    	if(inRect){
	    		// 加分 删除奶粉
	    		milkContainer.removeChild(currentMilk);
	    		
	    		self.currentScore += GC.Incremental;
	    		self.setScore(self.currentScore);
	    		self.showTip(self.currentScore);
	    		
	    	} else if(allMilk.length > 0){
	    		// 游戏结束
//	    		self.gameOver();
	    	}
    	}
   },
   	renderMilk: function(){
   		var self = this,
   			milk_rects = self.milk_rects,
   			milk_posi = self.milk_posi,
   			bg = self.bg,
    		milkContainer = self.milkContainer;
    		
   		var random = Math.floor(Math.random() * milk_rects.length);
   		var milk = new cc.Sprite(G_res.milk, milk_rects[random]);
        milk.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: milk_posi[random],
        	y: bg.height - milk.height / 2 - 20,
        	scale: 0.5
        });
        milkContainer.addChild(milk, 7, 'milk');
        
        milk.runAction(cc.scaleTo(1, 1));
        milk.runAction(cc.moveTo(1, cc.p(milk_posiTo[random], -milk.height)));
   	},
   	rectIntersectsRect: function(node1, node2){
   		var box1 = node1.getBoundingBox();  
		var bottom = cc.p(box1.x +box1.width / 2,box1.y);  
		var right = cc.p(box1.x +box1.width,box1.y +box1.height / 2);  
		var left = cc.p(box1.x,box1.y +box1.height / 2);  
		var top = cc.p(box1.x + box1.width / 2,box1.y + box1.height);  
		  
		  
		 var box2 = node2.getBoundingBox();  
		 if(cc.rectContainsPoint(box2, left)||cc.rectContainsPoint(box2, right)||cc.rectContainsPoint(box2, top)||cc.rectContainsPoint(box2, bottom)){  
		    //发生碰撞 
		 	return true;
		 }
		 return false;
   	},
   	isInitTip: false,
   	showTip: function(score){

   		var self = this;
   		var bg = self.bg;
   		
   		var rects = {};
   		rects[GC.level.l1] = cc.rect(504, 0, 435, 85);	// NOT BAD
   		rects[GC.level.l2] = cc.rect(1007, 0, 250, 85);	// COOL
   		rects[GC.level.l3] = cc.rect(1372, 0, 584, 85);	// WONDERFUL
   		rects[GC.level.l4] = cc.rect(0, 0, 448, 85);	// PERFECT
   		
   		var rect = rects[score];
   		if(rect){
   			
   			if(!self.isInitTip){
   				self.isInitTip = true;
   				renderTip();
   			}
   			var tip = self.tip;
   			tip.setTextureRect(rect);
   			tip.attr({
   				x: bg.width / 2 - tip.width / 2,
	        	y: bg.height - bg.height / 3
   			});
   			Utils.show(tip);
   			Utils.delayExec(Utils.hide.bind(self, tip), 1500);
   		}
   		
   		function renderTip(){
   			
   			var tip = self.tip = new cc.Sprite(G_res.tip, rects['3000']);
   			
	        tip.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: bg.width / 2 - tip.width / 2,
	        	y: bg.height - bg.height / 3
	        });
	        tip.setVisible(false);
	        self.container.addChild(tip, 10, 'tip');
   		}
   	},
   	popupResult: function(){
   		var self = this,
   			bg = self.bg,
   			score = self.currentScore,
   			level = GC.level;
   		
   		var resultContainer = self.resultContainer = new cc.Layer();
        resultContainer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(resultContainer, 10);
   		
   		// 背景框
   		var resultbg = new cc.Sprite(G_res.resultbg);
        resultbg.attr({
        	anchorX: 0,
        	anchorY: 0
        });
        resultContainer.setPosition(cc.p(bg.width / 2 - resultbg.width / 2, bg.height / 2- resultbg.height / 2));
        resultContainer.addChild(resultbg, 0, 'resultbg');
        
        // 提示文字
        var txt_rect;
        if(score < level.l1){
        	// 入门新手
        	txt_rect = cc.rect(0, 0, 664, 301);
        } else if(score < level.l2){
        	// 大力水手
        	txt_rect = cc.rect(676, 0, 662, 301);
        } else if(score < level.l3){
        	// 武林高手
        	txt_rect = cc.rect(1349, 0, 663, 301);
        } else {
        	// 超级神“抢”手
        	txt_rect = cc.rect(2035, 0, 662, 301);
        }
        var result_text = new cc.Sprite(G_res.result_text, txt_rect);
        result_text.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: resultbg.width / 2 - result_text.width / 2,
        	y: resultbg.height / 2 - result_text.height / 2 + 30
        });
        resultContainer.addChild(result_text, 0, 'result_text');
        
        // 分数背景
        var result_scorebg = new cc.Sprite(G_res.result_scorebg);
        result_scorebg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: -60,
        	y: result_text.y + result_text.height / 2
        });
        resultContainer.addChild(result_scorebg, 0, 'result_scorebg');
        
        // 渲染分数
        var numberRects = [
    		cc.rect(294, 0, 28, 35),	// 0
    		cc.rect(0, 0, 28, 35),		// 1
    		cc.rect(28, 0, 28, 35),		// 2
    		cc.rect(62 , 0, 28, 35),	// 3
    		cc.rect(95, 0, 28, 35),		// 4
    		cc.rect(129, 0, 28, 35),	// 5
    		cc.rect(163, 0, 28, 35),	// 6
    		cc.rect(196, 0, 28, 35),	// 7
    		cc.rect(230, 0, 28, 35),	// 8
    		cc.rect(264, 0, 28, 35)		// 9
    	];
    	
    	var left = 10;
    	if(score < 10000){
    		left = 30
    	}
    	if(score < 1000){
    		left = 45
    	}
    	if(score < 100){
    		left = 65
    	}
    	if(score < 10){
    		left = 80
    	}
    	score += '';
    	for (var i = 0, len = score.length, str; i < len; i++) {
    		str = +score[i];
    		var num = new cc.Sprite(G_res.number, numberRects[str]);
	        num.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: i * 32 + left,
	        	y: result_scorebg.height / 2 - num.height / 2
	        });
	        result_scorebg.addChild(num, 0, 'num' + i);
    	}
        
        // 微信图标
        var wechaticon = new cc.Sprite(G_res.wechaticon, cc.rect(127, 0, 90, 99));
        wechaticon.attr({
        	x: resultbg.width / 2 + wechaticon.width / 2 + 20,
        	y: result_text.y - 50
        });
        resultContainer.addChild(wechaticon, 0, 'wechaticon');
//      wechaticon.runAction(cc.rotateBy(1, 360, 360).repeatForever());
        
        // 添加事件
        var listener = createListener();
        cc.eventManager.addListener(listener.clone(), wechaticon);
//      
        // 再来一次
        var restart = new cc.Sprite(G_res.wechaticon, cc.rect(0, 0, 90, 99));
        restart.attr({
        	x: wechaticon.x - restart.width - 30,
        	y: wechaticon.y
        });
        resultContainer.addChild(restart, 0, 'restart');
        cc.eventManager.addListener(listener.clone(), restart);
        
        // 分享
        var share = self.share = new cc.Sprite(G_res.share);
        share.attr({
        	anchorX: 0,
        	anchorY: 0
        });
        share.setPosition(cc.visibleRect.bottomLeft);
        share.setVisible(false);
        self.container.addChild(share, 20, 'share');
        cc.eventManager.addListener(listener.clone(), share);
        
        function createListener(){
        	return cc.EventListener.create({
	            event: cc.EventListener.TOUCH_ONE_BY_ONE,//单击
	            swallowTouches: true,
	            onTouchBegan: function(touch, event) {
	
	                var target = event.getCurrentTarget();
	                var locationInNode = target.convertToNodeSpace(touch.getLocation());
	                var s = target.getContentSize();
	                var rect = cc.rect(0, 0, s.width, s.height);
	                if (cc.rectContainsPoint(rect, locationInNode)) {
	                	var name = target.getName();
	                	if(name == 'wechaticon'){
	                		Utils.touchEffect();
	                		self.share.setVisible(true);
	                		resultContainer.setVisible(false);
//              			self.removeChild(resultContainer);
	                	} else if(name == 'restart'){
	                		Utils.touchEffect();
	                		cc.director.runScene(new MainScene());
	                	} else if(name == 'share'){
	                		Utils.touchEffect();
	                		self.share.setVisible(false);
	                		resultContainer.setVisible(true);
	                	}
	                	
	                	return true;
	                }
		            return false;
	            }
	        });
        }
   	}
});