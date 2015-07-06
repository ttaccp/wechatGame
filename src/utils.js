var Utils = {
	delayExec: function(fn, time){
    	setTimeout(fn, time || 1500);
    },
    show: function(node, time){
    	node.setVisible(true);
    	var fadeto = new cc.FadeTo(time || 0.5, 255);
        node.runAction(fadeto);
    },
    hide: function(node, time){
    	var fadeto = new cc.FadeTo(time || 0.5, 0);
        node.runAction(fadeto);
        setTimeout(function(){
        	node.setVisible(false);
        }, time || 0.5);
    },
    touchEffect: function(){
    	cc.audioEngine.playEffect(G_res.touch);
    },
    loadendEffect: function(){
    	cc.audioEngine.playEffect(G_res.loadend, true);
    },
    bgEffect: function(){
    	cc.audioEngine.playMusic(G_res.bgmusic, true);
    },
    stopBgEffect: function(){
    	cc.audioEngine.stopMusic();
    }
}