/**
 * Created by xujw on 16/4/1.
 */

var StartLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var bg = new cc.Sprite(res.start_bg_jpg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);

        var icon = new cc.Sprite(res.start_icon_png);
        icon.x = bg.getContentSize().width/2;
        icon.y = bg.getContentSize().height/3 * 2;
        bg.addChild(icon);

        var btnItem = new cc.MenuItemImage(res.start_btn_png);
        btnItem.setCallback(this.btnCallback,this);
        btnItem.x = bg.getContentSize().width/2;
        btnItem.y = bg.getContentSize().height/3 * 1.2;
        var menu = new cc.Menu(btnItem);
        menu.x =  menu.y = 0;
        bg.addChild(menu);

        var logo = new cc.Sprite(res.logo_png);
        logo.anchorX = 0;
        logo.anchorY = 1;
        logo.x = 15;
        logo.y = bg.getContentSize().height - 15;
        bg.addChild(logo);

    },

    btnCallback:function(target)
    {
        cc.log("start game...");
        var sct = cc.scaleTo(0.5,0.1);
        var rotb = cc.rotateBy(0.5,360);
        var callback = cc.callFunc(this.removeSelfAndStart,this);
        this.runAction(cc.sequence(cc.spawn(sct,rotb),callback));
    },

    removeSelfAndStart: function ()
    {
        MyTools.startFlag = true;
        this.removeFromParentAndCleanup();
    }
});