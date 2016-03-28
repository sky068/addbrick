/**
 * Created by xujw on 16/3/24.
 */

var Brick = cc.Sprite.extend({
    ctor:function()
    {
        this._super(res.Brick_png);
        this.anchorX = 0;
        this.anchorY = 1;

        return true;
    }
});