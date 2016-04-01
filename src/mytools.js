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
    }
}