var Brick_w = 158;
var Brick_h = 60;
var RowNum = 6; //默认开始时显示5行
var ColNum = 4;
var MoveSpeed = 1;

var GameLayer = cc.Layer.extend({
    bgLayer:null,
    startFlag:false,
    brickLayer:null,
    allBricks:null,
    actBricks:null,
    isCanTouch:true,
    lineSp:null,
    moveLength:0,
    clearLineNum:0,
    scoreLabel:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        //添加灰色背景
        var bg = this.bgLayer = new cc.LayerColor(cc.color(128,128,128));
        this.addChild(bg,0);

        //添加砖块容器层
        var bl = this.brickLayer = new cc.Layer();
        this.addChild(bl,1);

        //得分显示
        var label = this.scoreLabel = new cc.LabelTTF('0',  'Times New Roman', 36, cc.size(200,50), cc.TEXT_ALIGNMENT_CENTER);
        label.x = size.width/2;
        label.y = size.height - 50;
        this.addChild(label,2);

        this.addButton();

        this.initBricks();

        //添加停止线
        var line = this.lineSp = new cc.Sprite(res.Line_png);
        line.anchorX = 0;
        line.anchorY = 0;
        this.addChild(line);
        line.y = Brick_h * 1.5;

        this.actBricks = new Array();

        //var mainscene = ccs.load(res.MainScene_json);
        //this.addChild(mainscene.node);

        this.scheduleUpdate();

        return true;
    },

    addButton: function ()
    {
        var item1 = new cc.MenuItemImage(res.Brick_png,res.Brick_light_png);
        item1.setTag(0);
        item1.x = Brick_w/2;
        item1.y = Brick_h/2;
        item1.setCallback(this.menuCallback,this);

        var item2 = new cc.MenuItemImage(res.Brick_png,res.Brick_light_png);
        item2.setTag(1);
        item2.x = item1.x + 2 + Brick_w;
        item2.y = Brick_h/2;
        item2.setCallback(this.menuCallback,this);

        var item3 = new cc.MenuItemImage(res.Brick_png,res.Brick_light_png);
        item3.setTag(2);
        item3.x = item2.x + 2 + Brick_w;
        item3.y = Brick_h/2;
        item3.setCallback(this.menuCallback,this);

        var item4 = new cc.MenuItemImage(res.Brick_png,res.Brick_light_png);
        item4.setTag(3);
        item4.x = item3.x + 2 + Brick_w;
        item4.y = Brick_h/2;
        item4.setCallback(this.menuCallback,this);

        var menu = new cc.Menu(item1,item2,item3,item4);
        this.addChild(menu);
        menu.x = 0;
        menu.y = 0;
    },

    initBricks: function ()
    {
        this.allBricks = new Array();
        var size = cc.winSize;
        for(var r=0;r<RowNum;r++)
        {
            var rowData = new Array();
            var rand = Math.floor(Math.random()*4);

            for(var col=0; col<ColNum; col++)
            {
                if(rand != col)
                {
                    var brick = new Brick();
                    //第一行在屏幕外面
                    brick.y = size.height + Brick_h + 1 - (Brick_h+1)*r;
                    brick.x = (Brick_w+2) * col;
                    this.brickLayer.addChild(brick);
                    rowData.push(brick);
                }
            }
            this.allBricks.push(rowData);
        }
        //锚点不同的换算
        this.moveLength += Brick_h;
    },

    //新生成一行
    addRowBricks:function()
    {
        //添加一行砖块
        //获取第一行
        var fPosY = 0;
        var fRowData = this.allBricks[0];
        var newRowData = new Array();

        if(fRowData)
        {
            var brick = fRowData[0];
            if(brick)
            {
                fPosY = brick.y;
                var rand = Math.floor(Math.random()*4);
                for(var col=0; col<ColNum; col++)
                {
                    if(rand != col)
                    {
                        var brick = new Brick();
                        //第一行在屏幕外面
                        brick.y = fPosY + Brick_h + 1;
                        brick.x = (Brick_w+2) * col;
                        this.brickLayer.addChild(brick);
                        newRowData.push(brick);
                    }
                }
            }
        }
        this.allBricks.splice(0,0,newRowData);
    },

    menuCallback:function(target)
    {
        if(!this.isCanTouch)
        {
            return;
        }
        cc.log("出砖...");
        this.isCanTouch = false;
        var brick = new Brick();
        brick.x = target.x - Brick_w/2;
        //抵消掉当前容器已经下移动的距离
        brick.y = target.y + Brick_h/2 + this.moveLength;
        this.brickLayer.addChild(brick);
        this.actBricks.push(brick);
        this.scheduleOnce(this.openTouch,0.3);
    },

    openTouch:function(dt)
    {
        this.isCanTouch = true;
    },

    update:function(dt)
    {
        //if(!this.startFlag)
        //{
        //    return;
        //}

        //cc.log("update...");
        //cc.log("act len:" + this.actBricks.length);
        //cc.log("rows len:" + this.allBricks.length);

        this.brickLayer.y -= MoveSpeed;
        this.moveLength += MoveSpeed;

        //检测游戏结束
        var aRow = this.allBricks[this.allBricks.length-1];
        if(aRow)
        {
            var brick = aRow[0];
            if(brick)
            {
                var pos = brick.getPosition();
                if((pos.y-this.moveLength) < this.lineSp.y)
                {
                    this.unscheduleUpdate();
                    this.isCanTouch = false;
                    alert("game over,clear rows:" + this.clearLineNum);
                }
            }
        }

        for(var i=0;i<this.actBricks.length;i++)
        {
            var bullet = this.actBricks[i];
            if(bullet)
            {
                bullet.y += MoveSpeed*6;

                //碰撞检测var
                for(var j=0; j<this.allBricks.length; j++)
                {
                    //一行数据
                    var rowData = this.allBricks[j];
                    if(rowData && rowData.length>0)
                    {
                        for(var r=0; r<rowData.length; r++)
                        {
                            var brick = rowData[r];
                            if(brick)
                            {
                                if(cc.rectIntersectsRect(bullet.getBoundingBox(),brick.getBoundingBox()))
                                {
                                    MyTools.removeItemFromArr(this.actBricks,bullet);
                                    i--;
                                    //不能消除 添加一行(碰撞的是最后一行)
                                    if(j == this.allBricks.length-1)
                                    {
                                        bullet.y = brick.y - Brick_h - 1;
                                        var newRow = new Array();
                                        newRow.push(bullet);
                                        this.allBricks.push(newRow);
                                        return;
                                    }
                                    else
                                    {
                                        //消除一行 brick.row的下面一行(如果满行的话)
                                        var downRowData = this.allBricks[j + 1];
                                        if (!downRowData)
                                        {
                                            return;
                                        }
                                        if (ColNum != (downRowData.length+1))
                                        {
                                            //若不满行
                                            bullet.y = brick.y - Brick_h - 1;
                                            downRowData.push(bullet);
                                            return;
                                        }
                                        //满行则消除
                                        this.clearLineNum ++;
                                        this.scoreLabel.setString(this.clearLineNum);
                                        bullet.removeFromParentAndCleanup(true);
                                        for (var k=0; k<downRowData.length; k++)
                                        {
                                            var dbrick = downRowData[k];
                                            dbrick.removeFromParentAndCleanup(true);
                                            MyTools.removeItemFromArr(downRowData,dbrick);
                                            k--;
                                        }
                                        //把这一行从数组移除
                                        this.allBricks.splice(j+1,1);

                                        //下面所有的行上移一格
                                        for(var m=j+1; m<this.allBricks.length; m++)
                                        {
                                            var nRowData = this.allBricks[m];
                                            if(nRowData && nRowData.length>0)
                                            {
                                                for(var n=0; n<nRowData.length; n++)
                                                {
                                                    var nBrick = nRowData[n];
                                                    if (nBrick)
                                                    {
                                                        nBrick.y += (Brick_h+1);
                                                    }
                                                }
                                            }
                                        }
                                        return;
                                    }
                                }
                            }
                        }

                    }
                }

            }
        }

        //一旦移动超过一块砖的高度就生成一行
        var moveLen = Math.ceil(this.moveLength);
        if((moveLen >= Brick_h) && (moveLen % Brick_h == 0))
        {
            this.addRowBricks();
        }

    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

