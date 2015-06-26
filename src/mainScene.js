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
        
        var container = self._container = new cc.Layer();
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
        container.addChild(ready, 0, 'ready');
        
        var numbers = self.numbers = self.renderNumber(size, container);
        
        // 显示ready
        Utils.delayExec(self.showReady.bind(self), GC.time_showReady);
        // 显示数字
        Utils.delayExec(self.showNumber.bind(self), GC.time_showReady + 1000);
        return true;
    },
    showReady: function(){
    	Utils.show(this.ready);
    },
    showNumber: function(time){
    	
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
	        container.addChild(num, 0, 'num' + i);
    		rel['num' + i] = num;
    	}
    	
    	return rel;
    }
});