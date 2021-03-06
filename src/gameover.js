/**
 * Created by xujw on 16/4/1.
 */
var GameoverLayer = cc.Layer.extend({
    ctor:function(chenghao,score)
    {
        this._super();
        var size = cc.winSize;
        var bg = new cc.Sprite(res.gameover_bg_jpg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);

        var icon = new cc.Sprite(res.gameover_icon_jpg);
        icon.x = bg.getContentSize().width/2;
        icon.y = bg.getContentSize().height/3 * 1.8;
        bg.addChild(icon);

        /*----------------个十百千 显示----------------*/
        if(!score)
        {
            score = 0;
        }
        if(score > 9999)
        {
            score = 9999;
        }
        if(!chenghao || chenghao=="")
        {
            chenghao = '"江湖补墙王"';
        }

        var qian = Math.floor(score / 1000);
        var qianLabel = new cc.LabelTTF(qian.toString(),"Arial-BoldMT",50);
        qianLabel.setColor(cc.color(255,0,0));
        qianLabel.x = 146;
        qianLabel.y = 172;
        icon.addChild(qianLabel);

        var bai = Math.floor(score % 1000 / 100);
        var baiLabel = new cc.LabelTTF(bai.toString(),"Arial-BoldMT",50);
        baiLabel.setColor(cc.color(255,0,0));
        baiLabel.x = 208;
        baiLabel.y = 172;
        icon.addChild(baiLabel);

        var shi = Math.floor(score % 1000 % 100 / 10);
        var shiLabel = new cc.LabelTTF(shi.toString(),"Arial-BoldMT",50);
        shiLabel.setColor(cc.color(255,0,0));
        shiLabel.x = 270;
        shiLabel.y = 172;
        icon.addChild(shiLabel);

        var ge = Math.floor( score % 10);
        var geLabel = new cc.LabelTTF(ge.toString(),"Arial-BoldMT",50);
        geLabel.setColor(cc.color(255,0,0));
        geLabel.x = 332;
        geLabel.y = 172;
        icon.addChild(geLabel);
        /*-----------------------------------*/

        /*----------------称谓---------------*/
        var label = new cc.LabelTTF(chenghao,"Arial-BoldMT",40);
        label.setColor(cc.color(255,0,0));
        label.x = icon.getContentSize().width/2;
        label.y = icon.getContentSize().height/6;
        icon.addChild(label);

        var huode = new cc.LabelTTF("获得","Arial",30);
        huode.anchorX = 1;
        huode.x = 105 ;
        huode.y = label.y - 3;
        huode.setColor(cc.color(255,0,0));
        icon.addChild(huode);

        var chenghao = new cc.LabelTTF("称号","Arial",30);
        chenghao.anchorX = 0;
        chenghao.x = icon.getContentSize().width - 105 ;
        chenghao.y = label.y - 3;
        chenghao.setColor(cc.color(255,0,0));
        icon.addChild(chenghao);
        /*-------------------------------------*/

        /*-----------------分享-----------------*/
        var share = new cc.LabelTTF("分享到","Arial",26);
        share.x = 100;
        share.y = bg.getContentSize().height/4;
        bg.addChild(share);

        var weibobtn = new cc.MenuItemImage(res.gameover_share_weibo_png);
        weibobtn.anchorX = 0;
        weibobtn.x = 150;
        weibobtn.y = share.y;
        weibobtn.setName("xinlang");
        weibobtn.setCallback(this.menuCallback,this);

        var tengbtn = new cc.MenuItemImage(res.gameover_share_teng_png);
        tengbtn.anchorX = 0;
        tengbtn.x = weibobtn.x + 100;
        tengbtn.y = share.y;
        tengbtn.setName("tengxun");
        tengbtn.setCallback(this.menuCallback,this);

        var qzonebtn = new cc.MenuItemImage(res.gameover_share_zone_png);
        qzonebtn.anchorX = 0;
        qzonebtn.x = tengbtn.x + 100;
        qzonebtn.y = share.y;
        qzonebtn.setName("qzone");
        qzonebtn.setCallback(this.menuCallback,this);

        var weixinbtn = new cc.MenuItemImage(res.gameover_share_weixin_png);
        weixinbtn.anchorX = 0;
        weixinbtn.x = qzonebtn.x + 100;
        weixinbtn.y = share.y;
        weixinbtn.setName("weixin");
        weixinbtn.setCallback(this.menuCallback,this);

        var menu = new cc.Menu(weibobtn,tengbtn,qzonebtn,weixinbtn);
        bg.addChild(menu);
        menu.x = menu.y = 0;

    },

    menuCallback: function (target)
    {
        cc.log("分享到:" + target.getName());


        //微信分享
        window.WeixinShareData = {
            icon: 'images/share.jpg',
            title: '竞无止境，双飞燕新品发布会邀您共同见证'
        };

        var share_title=encodeURIComponent('竞无止境，双飞燕新品发布会邀您共同见证');
        var share_link=encodeURIComponent('http://m.zol.com.cn/topic/5533906.html');
        var share_pic=encodeURIComponent('images/share.jpg ');

        var sina='http://service.weibo.com/share/share.php?url='+share_link+'&title='+share_title+'&appkey=4028615622&ralateUid=1951621751&pic='+share_pic+'&searchPic=false&refer='+share_link;
        var tencent='http://share.v.t.qq.com/index.php?c=share&a=index&url='+share_link+'&title='+share_title+'&appkey=99d207b90670adceaaa416b63528d92c&pic='+share_pic;
        var qzone='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+share_link+'&desc='+share_title+'&pics='+share_pic;

        var curLink = "";
        if(target.getName() == "xinlang")
        {
            curLink = sina;
        }
        else if(target.getName() == "tengxun")
        {
            curLink = tencent;
        }
        else if(target.getName() == "qzone")
        {
            curLink = qzone;
        }
        else if(target.getName() == "weixin")
        {

        }
        window.open(curLink);
    }
});