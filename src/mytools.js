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
        var names = ["江湖补墙王","补墙大师兄","神一般的存在"];
        var r = Math.floor(Math.random()*3);
        return names[r];
    }
}