var MainScene = cc.Layer.extend({
	
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
        var bg = self.bg = new cc.Sprite(res.bg);
        bg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0
        });
        container.addChild(bg, 0, 'bg');
        
        // ready
        var ready = self.ready = new cc.Sprite(res.ready, cc.rect(0, 0, 630, 140));
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
        return true;
    },
    startGame: function(){
//	  	alert('start')
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
    		Utils.delayExec(self.startGame.bind(self), 1000);
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
    		var num = new cc.Sprite(res.ready, rects[j]);
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
        var scoreBox = self.scoreBox = new cc.Sprite(res.time, cc.rect(0, 0, 166, 53));
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
       	var timeBox = self.timeBox = new cc.Sprite(res.time, cc.rect(0, 84, 316, 53));
        timeBox.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 20,
        	y: bg.height - scoreBox.height - 20
        });
        container.addChild(timeBox, 0, 'timeBox');
        
        // 时间条背景
        var timebg = self.timebg = new cc.Sprite(res.time, cc.rect(0, 154, 298, 41));
        timebg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: timeBox.x + 9,
        	y: timeBox.y + 6
        });
        container.addChild(timebg, 0, 'timebg');
        
        // 时间条
        var time = self.time = new cc.Sprite(res.time, cc.rect(0, 215, 298, 41));
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
    		cc.rect(0, 0, 330, 95),
    		cc.rect(352, 0, 330, 95),
    		cc.rect(705, 0, 330, 95),
    		cc.rect(1059, 0, 330, 95)
    	];
    	var rects_activate = [
    		cc.rect(0, 150, 330, 95),
    		cc.rect(352, 150, 330, 95),
    		cc.rect(705, 150, 330, 95),
    		cc.rect(1059, 150, 330, 95)
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
    		
    		var button_normal = new cc.Sprite(res.button, rects[i]);
	        button_normal.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: posi[i],
	        	y: 70
	        });
	        container.addChild(button_normal, 0, 'button' + i);
			buttons['button' + i] = button_normal;
			cc.eventManager.addListener(listener.clone(), button_normal);
	        
	        var button_activate = new cc.Sprite(res.button, rects_activate[i]);
	        button_activate.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: button_normal.x,
	        	y: button_normal.y
	        });
	        button_activate.setVisible(false);
	        container.addChild(button_activate, 6, 'button' + i + 'activate');
	        
	        
	        var effect = new cc.Sprite(res.effect, effect_rects[i]);
	        effect.attr({
	        	anchorX: 0,
	        	anchorY: 0,
	        	x: effect_posi[i],
	        	y: button_normal.y + 20
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
            onTouchMoved: function(touch, event){
            	touchend(event.getCurrentTarget());
            },
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
    		cc.rect(-6, 0, 28, 35),		// 1
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

        	var num = self[key] = new cc.Sprite(res.number, cc.rect(294, 0, 28, 35));
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
    	var interval = setInterval(function(){
    		var width = time.width;
    		if(width <= 0){
    			cc.log('time over');
    			clearInterval(interval);
    			interval = null;
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
   },
   btnTouchEnd: function(node){
   		var self = this,
    		container = self.container;

    	for (var i = 0; i < 4; i++) {
    		container.getChildByName('button' + i + 'effect').setVisible(false);
    		container.getChildByName('button' + i + 'activate').setVisible(false);
    		container.getChildByName('button' + i).setVisible(true);
    	}
   }
});