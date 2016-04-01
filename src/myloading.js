
MyLoadingScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"MyLoadingScene",
    cb: null,
    target: null,
    _progressLayerColor: null, //进度条
    _progressLength: null, //进度条长度
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo
        var logoWidth = 150;
        var logoHeight = 150;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(100, 100, 80, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        if(res.mylogo_png){
            //loading logo
            cc.loader.loadImg(res.mylogo_png, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, cc.visibleRect.center);
            });
        }

        //loading progress bar
        progressLength = self._progressLength = cc.winSize.width-100;
        var progress = self._progressLayerColor = new cc.LayerColor(cc.color(255,255,0,255),5,20);
        progress.setAnchorPoint(cc.p(0,0));
        progress.setPosition(cc.p(50,100));
        self.addChild(this._progressLayerColor);

        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", 30);
        label.setPosition(cc.p(cc.winSize.width/2,label.getContentSize().height));
        label.setColor(cc.color(255, 255, 255));
        bgLayer.addChild(this._label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.5);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} callback
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("Loading... " + percent + "%");
                self._progressLayerColor.changeWidth(self._progressLength*(percent/100));
            },
            function () {
                if (self.cb)
                    self.cb.call(self.target);
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @param target
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */

MyLoadingScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.myLoadingScene) {
        _cc.myLoadingScene = new MyLoadingScene();
        _cc.myLoadingScene.init();
    }
    _cc.myLoadingScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.myLoadingScene);
    return _cc.myLoadingScene;
};