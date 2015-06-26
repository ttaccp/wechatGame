
var StartMenu = cc.Layer.extend({
	
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
        
        // 模糊背景图
        var bg_fuzzy = self.bg_fuzzy = new cc.Sprite(res.bg_fuzzy);
        bg_fuzzy.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0,
        	opacity: 0
        });
        bg_fuzzy.setVisible(false);
        container.addChild(bg_fuzzy, 0, 'bg_fuzzy');
        
        
        // 说明图片
        var explain = self.explain = new cc.Sprite(res.explain);
        explain.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0,
        	opacity: 0
        });
        explain.setVisible(false);
		
		// 说明相关容器
        var explainbox = self.explainbox = new cc.Layer();
        explainbox.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: size.width / 2 - explain.width / 2,
        	y: size.height / 2 - explain.height / 2,
        });
        
        self.addChild(explainbox);
        explainbox.addChild(explain, 0, 'explain');
        
        // 手指提示
        var playexplain = self.playexplain = new cc.Sprite(res.playexplain);
        playexplain.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 40,
        	y: -100,
        	opacity: 0
        });
        playexplain.setVisible(false);
        explainbox.addChild(playexplain, 0, 'playexplain');
        
        // go 图片
        var go = self.go = new cc.Sprite(res.go);
        go.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: explain.width / 2 - go.width / 2,
        	y: 20,
        	opacity: 0
        });
        go.setVisible(false);
        explainbox.addChild(go, 0, 'go');
        
        // 显示说明
        self.delayExec(self.showExplain);
        // 手指提示
        self.delayExec(self.showPlayexplain, 3000);
        // 显示GO
        self.delayExec(self.showGo, 6000);
        
        return true;
    },
    showExplain: function(){
        this.show(this.bg_fuzzy);
        this.show(this.explain);
    },
    showPlayexplain: function(){
    	this.show(this.playexplain);
    },
    showGo: function(){
        this.show(this.go);
        this.hide(this.playexplain);
    },
    delayExec: function(fn, time){
    	setTimeout(fn.bind(this), time || 1500);
    },
    show: function(node, time){
    	node.setVisible(true);
    	var fadeto = new cc.FadeTo(time || 0.2, 255);
        node.runAction(fadeto);
    },
    hide: function(node, time){
    	var fadeto = new cc.FadeTo(time || 0.2, 0);
        node.runAction(fadeto);
        setTimeout(function(){
        	node.setVisible(false);
        }, time || 0.2);
    }
});

