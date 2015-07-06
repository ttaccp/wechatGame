cc.Loader = cc.Scene.extend({
    _label : null,
    _className:"Loader",
    init : function(){
    	
        var self = this;

        // bg
        var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 50));
        self.addChild(bgLayer, 0);

//      var label = self._label = new cc.LabelTTF("0%", "Arial", 40);
//      label.setPosition(cc.visibleRect.center);
//      label.setColor(cc.color(255, 255, 255));
//      bgLayer.addChild(self._label, 10);
        
        var loading_bg = self.loading_bg = new cc.Sprite('res/img/loading.png', cc.rect(0, 50, 298, 41));
        loading_bg.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: bgLayer.width / 2 - 298 /2,
        	y: cc.visibleRect.center.y
        });
        bgLayer.addChild(loading_bg, 10, 'loading_bg');
        
        var loading_img = self.loading_img = new cc.Sprite('res/img/loading.png', cc.rect(0, 0, 0, 41));
        loading_img.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: loading_bg.x,
        	y: loading_bg.y
        });
        bgLayer.addChild(loading_img, 10, 'loading_img');
        
        return false;
    },
    onEnter: function () {
    	
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.audioEngine.setMusicVolume(1);
    	var loadid = cc.audioEngine.playEffect(G_res.loadend, true);
        cc.loader.load(res,
            function (result, count, loadedCount) {
            	
                var percent = (++loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
//              self._label.setString(percent + "%");
                self.loading_img.setTextureRect(cc.rect(0, 0, 298 * percent / 100, 41));
            }, function () {
                if (self.cb) {
                	cc.audioEngine.stopEffect(loadid);
                	setTimeout(self.cb.bind(self), 100);
                }   
            });
    }
});

cc.Loader.preload = function(resources, cb){
	
    var _cc = cc;
    if(!_cc._loader) {
        _cc._loader = new cc.Loader();
        _cc._loader.init();
    }
    _cc._loader.initWithResources(resources, cb);

    cc.director.runScene(_cc._loader);
    return _cc._loader;
};