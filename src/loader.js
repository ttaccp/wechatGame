
cc.Loader = cc.Scene.extend({
    _label : null,
    _className:"Loader",
    init : function(){
    	
        var self = this;

        // bg
        var bgLayer = new cc.LayerColor(cc.color(0, 0, 0, 50));
        self.addChild(bgLayer, 0);

        var label = self._label = new cc.LabelTTF("0%", "Arial", 40);
        label.setPosition(cc.visibleRect.center);
        label.setColor(cc.color(255, 255, 255));
        bgLayer.addChild(self._label, 10);
        
        return true;
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
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (++loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString(percent + "%");
            }, function () {
                if (self.cb)
                    self.cb();
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