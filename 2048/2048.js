
window.onload=function(){
    var box=document.getElementById('box');
    var shuzi=document.getElementsByClassName('shuzi');
    var arr1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var paly=document.getElementsByClassName('play')[0];
    var my=document.getElementsByClassName('my')[0];
    var max=document.getElementsByClassName('max')[0];
    var isTrue=true;
    var my_score=0;
    var max_score=0;


    function color(arr){
        for(var i=0;i<16;i++){
            if(arr[i]===0){
                shuzi[i].setAttribute('num','');
                shuzi[i].innerText='';
            }
            if(arr[i]===2){
                shuzi[i].setAttribute('num','bg2');
            }
            if(arr[i]===4){
                shuzi[i].setAttribute('num','bg4');
            }
            if(arr[i]===8){
                shuzi[i].setAttribute('num','bg8');
            }
            if(arr[i]===16){
                shuzi[i].setAttribute('num','bg16');
            }
            if(arr[i]===32){
                shuzi[i].setAttribute('num','bg32');
            }
            if(arr[i]===64){
                shuzi[i].setAttribute('num','bg64');
            }
            if(arr[i]===128){
                shuzi[i].setAttribute('num','bg128');
            }
            if(arr[i]===256){
                shuzi[i].setAttribute('num','bg256');
            }
            if(arr[i]===512){
                shuzi[i].setAttribute('num','bg512');
            }
            if(arr[i]===1024){
                shuzi[i].setAttribute('num','bg1024');
            }
            if(arr[i]===2048){
                shuzi[i].setAttribute('num','bg2048');
            }
        }
    }
    function inner(arr) {
        for (var i = 0; i < 16; i++) {
            shuzi[i].innerText = arr[i];
        }
    }
    function rend(arr){
        inner(arr);
        color(arr);
    }
    function init(arr) {
        var num1 = Math.floor(Math.random() * 15);
        var num2 = Math.floor(Math.random() * 15);
        while (num2 === num1) {
            num2 = Math.floor(Math.random() * 15);
        }
        arr[num1] = (Math.random()<0.1)?4:2;
        arr[num2] = (Math.random()<0.1)?4:2;
        inner(arr);
        color(arr);
    }
    function random(arr){
                var num=Math.floor(Math.random()*15);
                var rad=Math.random();
                var n=rad<0.1?4:2;
                while(arr[num]!==0){
                    num=Math.floor(Math.random()*15);
                }
                arr[num]=n;
                return arr;
     }
    function move(arr) {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(arr[j+1]===0){
                    arr[j+1]=arr[j];
                    arr[j]=0;
                }
            }
        }
        return arr;
    }
    function mount(arr){
            for(var i=4;i>0;i--){
                move(arr);
                if(arr[i]===arr[i-1]){
                    arr[i]=arr[i]*2;
                    arr[i-1]=0;
                    my_score+=arr[i];
                    move(arr);
                }
            }
            return arr;
    }
    function stop(x,y){
        if(x.toString()!=y.toString()){
            random(x);
            var result=x.reduce(function(a,b){
                return a*b;
            });
            if(result!==0){
                for(var i=0;i<x.length;i++){
                    if(x[i]===x[i-1] || x[i]===x[i+1] || x[i]===x[i-4] || x[i]===x[i+4]){
                        break;
                    }
                }
                if(i===x.length){
                    setTimeout(function(){
                        alert('游戏失败!');
                        return;
                    },300);

                }
            }
        }
        return x;
    }

    paly.onclick=function(){
        arr1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        my_score=0;
        my.innerText=my_score;
        setTimeout(init(arr1),1000);
    };

    setTimeout(init(arr1),1000);
    window.onkeydown=function(event){
        var e=event||window.event||arguments.callee.caller.arguments[0];
        var arr2=arr1.slice(0);
        if(e.keyCode===37){
            [arr1[3],arr1[2],arr1[1],arr1[0]]=mount([arr1[3],arr1[2],arr1[1],arr1[0]]);
            [arr1[7],arr1[6],arr1[5],arr1[4]]=mount([arr1[7],arr1[6],arr1[5],arr1[4]]);
            [arr1[11],arr1[10],arr1[9],arr1[8]]=mount([arr1[11],arr1[10],arr1[9],arr1[8]]);
            [arr1[15],arr1[14],arr1[13],arr1[12]]=mount([arr1[15],arr1[14],arr1[13],arr1[12]]);
            arr1=[arr1[0],arr1[1],arr1[2],arr1[3],arr1[4],arr1[5],arr1[6],arr1[7],arr1[8],arr1[9],arr1[10],arr1[11],arr1[12],arr1[13],arr1[14],arr1[15]];
            rend(arr1);
            stop(arr1,arr2);
            setTimeout(function(){rend(arr1);},200);
        }
        if(e.keyCode===38){
            [arr1[12],arr1[8],arr1[4],arr1[0]]=mount([arr1[12],arr1[8],arr1[4],arr1[0]]);
            [arr1[13],arr1[9],arr1[5],arr1[1]]=mount([arr1[13],arr1[9],arr1[5],arr1[1]]);
            [arr1[14],arr1[10],arr1[6],arr1[2]]=mount([arr1[14],arr1[10],arr1[6],arr1[2]]);
            [arr1[15],arr1[11],arr1[7],arr1[3]]=mount([arr1[15],arr1[11],arr1[7],arr1[3]]);
            arr1=[arr1[0],arr1[1],arr1[2],arr1[3],arr1[4],arr1[5],arr1[6],arr1[7],arr1[8],arr1[9],arr1[10],arr1[11],arr1[12],arr1[13],arr1[14],arr1[15]];
            rend(arr1);
            stop(arr1,arr2);
            setTimeout(function(){rend(arr1);},200);
        }
        if(e.keyCode===39){
            arr1=mount([arr1[0],arr1[1],arr1[2],arr1[3]]).concat(mount([arr1[4],arr1[5],arr1[6],arr1[7]])).concat(mount([arr1[8],arr1[9],arr1[10],arr1[11]])).concat(mount([arr1[12],arr1[13],arr1[14],arr1[15]]));
            rend(arr1);
            stop(arr1,arr2);
            setTimeout(function(){rend(arr1);},200);
        }
        if(e.keyCode===40){
            [arr1[0],arr1[4],arr1[8],arr1[12]]=mount([arr1[0],arr1[4],arr1[8],arr1[12]]);
            [arr1[1],arr1[5],arr1[9],arr1[13]]=mount([arr1[1],arr1[5],arr1[9],arr1[13]]);
            [arr1[2],arr1[6],arr1[10],arr1[14]]=mount([arr1[2],arr1[6],arr1[10],arr1[14]]);
            [arr1[3],arr1[7],arr1[11],arr1[15]]=mount([arr1[3],arr1[7],arr1[11],arr1[15]]);
            arr1=[arr1[0],arr1[1],arr1[2],arr1[3],arr1[4],arr1[5],arr1[6],arr1[7],arr1[8],arr1[9],arr1[10],arr1[11],arr1[12],arr1[13],arr1[14],arr1[15]];
            rend(arr1);
            stop(arr1,arr2);
            setTimeout(function(){rend(arr1);},200);
        }
        if(isTrue){
            setTimeout(function(){
                if(arr1.indexOf(2048)!==-1){
                    alert('您已合成2048！');
                    isTrue=false;
                }
            },200);
        }
        my.innerText=my_score;
        if(my_score>max_score){
            max_score= my_score;
            max.innerText=my_score;

        }


    }
}
