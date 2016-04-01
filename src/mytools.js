/**
 * Created by xujw on 16/3/24.
 */

var MyTools = {
    startFlag:false,
    removeItemFromArr: function (arr, item)
    {
        for(var i=0; i<arr.length; i++)
        {
            var ele = arr[i];
            if(item == ele) break;
        }

        arr.splice(i,1);
    },

    getRandName:function()
    {
        var names = ["补墙小湿妹","补墙大湿胸","补墙二湿弟"];
        var r = Math.floor(Math.random()*3);
        return names[r];
    }
}