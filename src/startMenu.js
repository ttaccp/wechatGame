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
        var bg = self.bg = new cc.Sprite(G_res.bg);
        bg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0
        });
        container.addChild(bg, 0, 'bg');
        
        // 模糊背景图
        var bg_fuzzy = self.bg_fuzzy = new cc.Sprite(G_res.bg_fuzzy);
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
        var explain = self.explain = new cc.Sprite(G_res.explain);
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
        	y: size.height / 2 - explain.height / 2 + 30,
        });
        
        self.addChild(explainbox);
        explainbox.addChild(explain, 0, 'explain');
        
        // 手指提示
        var playexplain = self.playexplain = new cc.Sprite(G_res.playexplain);
        playexplain.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 40,
        	y: -90,
        	opacity: 0
        });
        playexplain.setVisible(false);
        explainbox.addChild(playexplain, 0, 'playexplain');
        
        // go 图片
        var go = self.go = new cc.Sprite(G_res.go);
        go.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: explain.width / 2 - go.width / 2,
        	y: 20,
        	opacity: 0
        });
        go.setVisible(false);
        explainbox.addChild(go, 0, 'go');
        
        // 添加事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//单击
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                	cc.director.runScene(new MainScene());
                }
                return true;
            }
        }, go);
        
        // 显示说明
        Utils.delayExec(self.showExplain.bind(self), GC.time_showExplain);
        // 手指提示
        Utils.delayExec(self.showPlayexplain.bind(self), GC.time_showExplain + GC.time_showExplain);
        // 显示GO
        Utils.delayExec(self.showGo.bind(self), GC.time_showExplain + GC.time_showExplain + GC.time_showGo);
        
        return true;
    },
    showExplain: function(){
        Utils.show(this.bg_fuzzy);
        Utils.show(this.explain);
    },
    showPlayexplain: function(){
    	Utils.show(this.playexplain);
    },
    showGo: function(){
        Utils.show(this.go);
        Utils.hide(this.playexplain);
    }
});