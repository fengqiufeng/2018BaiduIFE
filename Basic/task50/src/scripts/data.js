﻿import {Factory} from './factory.js' 
let Data = {
    //一些要用的数据
    basicTime:  1000,           //通过Data.basicTime直接调用这个数据
   // maxSeat:    4,                 //默认4个，可以更新
    maxQueue:   30,
    customerQueue:  [],
    seatQueue:  [], 
    RestaurantData: null,             //用于存放当前正在使用的饭店数据
    nowCook:    [],
    nowWaiter:  [],
    nowCookList:    [],
    
    //用于更新数据的函数
    updateBasicTime:    function(data) {            //输入的数据单位为秒，更新单位时间
        data *= 1000;
        this.basicTime = data;
    },
    getBasicTime:   function() {                //单位为秒
        return this.basicTime/1000 ;
    },
    showBasicTime:      function() {
        var time = document.querySelector('#show_basicTime');
        time.innerHTML = this.getBasicTime();
        var button = document.querySelector('#button_basicTime');
        button.onclick = function() {
            var input = document.querySelector('#input_basicTime');
            if(input.value == null||input.value == 0 ){return ;}
            Data.updateBasicTime(input.value);
            time.innerHTML = Data.getBasicTime();
        }
        var input = document.querySelector('#input_basicTime');
        input.value = this.getBasicTime();
        input.onchange = function() {
            if(input.value > 10) {
                input.value = 10;
                alert('单位时间不允许超过10');
            }else if (input.value < 1) {
                input.value = 1;
                alert('单位时间不允许小于1');
            }
        }
    },
    comeCustomer:   function() {                //随机客人（最多3人一起），超过排队人数则不排队
        let result = parseInt(Math.random()*4);
        if((this.customerQueue.length+result) <= this.maxQueue) {
            for(let i = 0; i < result;i++) {
                this.customerQueue.push(Factory.create('Customer'));
            }  
        }
    },
    updateCustomer:    function() {    //更新页面上的顾客队列
        var list1 = document.querySelector('#app #queue_wrapper');
        //console.log(this.customerQueue)
        var result1 = '';
        for(let i = 0 ; i<this.customerQueue.length ; i++) {
            result1 += '<div class = "customer"></div>';
        }
        list1.innerHTML = result1;
        
        var list2 = document.querySelector('#app #seat_wrapper');
        var result2 = '';
        let status = '';
        for(let i = 0 ; i < this.seatQueue.length ; i++) {
            if(this.seatQueue[i] == undefined) {
               status = '无客';
            } else if(this.seatQueue[i].status == ''){
               status = '已入座';
               this.seatQueue[i].status = "已入座";
            } else {
                status = this.seatQueue[i].status;
            }
            
            let eatListresult = '';
            if(this.seatQueue[i]) {
                for(let j = 0; j < this.seatQueue[i].eatList.length ; j++) {
                    let customerEatListStatus = '未上桌';
                    if(this.seatQueue[i].eatList[j].status == '已上桌'){ customerEatListStatus = '已上桌';}
                    if(this.seatQueue[i].eatList[j].status == '已吃完'){ customerEatListStatus = '已吃完';}
                    eatListresult += "<li>"+this.seatQueue[i].eatList[j].name+"<br>"+customerEatListStatus+"</li>"
                }
            }
            
            
            
            result2 += '<div class = "customer_in_seat">\
                            <div id = "customer_status_wrapper">\
                                <p>顾客状态：<p>\
                                <p id = "customer-status">'+status+'</p>\
                                <img src = "src/asserts/customer.png" alt = "customer" height = "100px">\
                            </div>\
                            <div>\
                                <ul id = "customer_eatList">'+eatListresult+'\
                                </ul>\
                            </div>\
                        </div>';
        }
        list2.innerHTML = result2;
        
        let preList = document.querySelector('#cook_list');
        let result3 = '';
        for(let j = 0 ; j < this.nowCookList.length ; j++) {
            result3 += '<li>'+this.nowCookList[j].name+"<br>"+this.nowCookList[j].status+" "+this.nowCookList[j].seat+"</li>"
        }
        preList.innerHTML = result3;
    },
    comeIntoSeat:   function() {     //用于检测是否有空位，然后让正在排队的顾客入座
        if(this.RestaurantData == null ){ return;}
        if(this.customerQueue[0] == null) {return;}
        for(let i = 0;i< this.RestaurantData.seats ; i++) {
            if(this.seatQueue[i] == null && this.customerQueue[0]) {
               // this.customerQueue[0].seatNumber = i+1;
                this.seatQueue[i] = this.customerQueue.shift();
                this.seatQueue[i].seatNumber = i+1;
            }
        }
        //console.log(this.seatQueue)
    },
    updateStaff:    function() {
        var tcook = [];
        var twaiter = [];
        for(let i = 0; i < this.RestaurantData.staff.length;i++) {
            if((this.RestaurantData.staff[i]).constructor.name == 'Cook') {
                tcook.push(this.RestaurantData.staff[i]);
            }
            if((this.RestaurantData.staff[i]).constructor.name == 'Waiter') {
                twaiter.push(this.RestaurantData.staff[i]);
            }
        }
        this.nowCook = tcook;
        this.nowWaiter = twaiter;
       
        var cookList = document.querySelector('#many_cook');
        var result1 = '';
        for(let i = 0 ; i < this.nowCook.length ;i++) {
            result1 += '<div class = "one_cook_wrapper" id = "'+'Cook_'+this.nowCook[i].id+'">\
                            <div class = "cook_status_wrapper">\
                                <p>厨师'+this.nowCook[i].name+'状态：</p>\
                                <p class = "cook_status">'+this.nowCook[i].status+'</p>\
                                <img src = "./src/asserts/cook.jpg" alt = "" height = "100px"/>\
                                <input type = "button" value = "解雇">\
                            </div>\
                        </div>';
        }
        cookList.innerHTML = result1;
       if(document.querySelectorAll(".one_cook_wrapper input").length != 0){
            let cook_buttons = document.querySelectorAll(".one_cook_wrapper input");
            for(let x = 0;x<cook_buttons.length;x++){
                cook_buttons[x].onclick = function() {
                    Data.nowCook[x].preWork = "等待解雇";
                    setTimeout(function(){Data.updateStaff();},500)
                    console.log('test')
                }
            }
            // let cook_button = document.querySelector("#many_cook") ;
            // cookList.onclick = function(e) {
                // if(e.target&&e.target.nodeName.toLowerCase() == "input"){
                    // console.log("test");
                // }
            // }
       }
        
        var result2 = '';
        var waiterList = document.querySelector('#waiter_wrapper');
        for(let i = 0 ; i < this.nowWaiter.length ;i++) {
            result2 += '<div class = "one_waiter_wrapper" id = "'+'Waiter_'+this.nowWaiter[i].id+'">\
                            <div class = "waiter_status_wrapper">\
                                <p class = "waiter_status">侍者'+this.nowWaiter[i].name+'状态：'+this.nowWaiter[i].status+'</p>\
                                <img src = "./src/asserts/waiter.png" alt = "" height = "60px"/>\
                                <input type = "button" value = "解雇">\
                            </div>\
                        </div>';
        }
        waiterList.innerHTML = result2;
        if(this.nowWaiter.length !=0) {
            let waiter_buttons = document.querySelectorAll(".one_waiter_wrapper input");
            for(let x = 0 ; x < waiter_buttons.length;x++) {
                waiter_buttons[x].onclick = function() {
                    Data.nowWaiter[x].preWork = "等待解雇";
                    setTimeout(function(){Data.updateStaff();},500)
                    console.log('test')
                }
            } 
        }
        
        
    },  
    startOrder() {
        if(this.seatQueue.length == 0 ) {return;}
        for(let i = 0;i < this.seatQueue.length ; i++) {
            if(!this.seatQueue[i]){return};
            if(this.seatQueue[i].status == "已入座") {
                let runTime = this.basicTime * 3 ;
                for(let j = 0 ; j <= runTime ;j+=1000) {
                    if(j==runTime){
                        setTimeout(function(){
                                Data.seatQueue[i].status = "等待上菜";
                                let list = Data.seatQueue[i].order();
                                for(let i = 0 ; i< list.length ;i++) {
                                    list[i].status = '未被处理';
                                    Data.nowCookList.push(list[i]);
                                }
                                Data.seatQueue[i].eatList = list;
                                //console.log(Data.nowCookList)
                            },j,i);
                    } else {
                        setTimeout(function(){Data.seatQueue[i].status = "点单中，还剩"+(runTime-j)/1000+"秒"},j,i,j);
                    }
                    
                }
            }
        }
    },
    startCook() {               //若有厨师有空闲，则随机挑选剩余中的一个去炒其中随机一种菜
        if(this.nowCook.length == 0) { return; }
        if(this.nowCookList.length == 0) {return;}
        let cookhavetime = []
        for(let i = 0; i < this.nowCook.length ; i++) {
            if(this.nowCook[i].status == '无' && this.nowCook[i].preWork == "等待工作") {
                cookhavetime.push(this.nowCook[i]);
            }
        }
        if(cookhavetime.length == 0 ) { return; }
        let whoCook = cookhavetime[parseInt(cookhavetime.length*Math.random())];
        let needCook = [];
        for(let i =0 ;i<this.nowCookList.length ; i++) {
            if(this.nowCookList[i].status == '未被处理') {
                needCook.push(this.nowCookList[i]);
            }
        }
        let toCookName = needCook[Math.floor(needCook.length*Math.random())];
        if(toCookName == undefined) {return};
        let toCook = [];
        for(let i =0 ;i<needCook.length ; i++) {
            if(needCook[i].name == toCookName.name) {
                needCook[i].status = "已有厨师处理";
                toCook.push(needCook[i]);
            }
        }
        let runTime = this.basicTime * toCookName.time ;
        for(let j = 0 ; j <= runTime ;j+=1000) {
            if(runTime == j) {
                setTimeout(function(){
                    whoCook.status = '无'; 
                    Data.updateStaff();
                    Data.startFire();
                    for(let i = 0 ; i<toCook.length ;i++) {
                        toCook[i].status = '已做完';
                    }
                    Data.updateStaff();                    
                },j);
            } else {
                setTimeout(function(){ whoCook.status = toCookName.name+"，还剩"+(runTime-j)/1000+"秒";Data.updateStaff();},j,j);
            }
        }
        
    },
    startServe() {          //若服务员有空闲，将一桌的菜送去这桌
        if(this.nowWaiter.length == 0 ){return;}
        if(this.nowCookList.length == 0) {return;}
        let waiterhavetime = [];
        for(let i = 0; i < this.nowWaiter.length ; i++) {
            if(this.nowWaiter[i].status == '无' && this.nowWaiter[i].preWork == "等待工作") {
                waiterhavetime.push(this.nowWaiter[i]);
            }
        }
        if(waiterhavetime.length == 0){return;}
        let whoServe = waiterhavetime[parseInt(waiterhavetime.length*Math.random())];
        let toStorage = [];
        let needSend = [];
        for(let i = 0; i < this.nowCookList.length ; i++) {
            if(this.nowCookList[i].status == '已做完'){
                needSend.push(this.nowCookList[i]);
            } else {
                toStorage.push(this.nowCookList[i]);
            }
        }
        if(needSend.length == 0) {return;}
        let toSendSeat = needSend[Math.floor(needSend.length*Math.random())];
        if(toSendSeat == undefined) { return; }
        let toSend = [];
        
        for(let i = 0 ; i< needSend.length ; i++) {             //将需要送的餐保存在一个数组中
            if(needSend[i].seat == toSendSeat.seat) {
                toSend.push(needSend[i]);
            } else {
                toStorage.push(needSend[i]);
            }
        }
        //console.log(toSend)
        //console.log(toStorage)
        this.nowCookList = toStorage;
        whoServe.status = '上菜';
        let runTime = this.basicTime * 3;
        setTimeout(function(){
            whoServe.status = '无'; 
            Data.updateStaff();
            Data.startFire();
            let customer = Data.seatQueue[toSendSeat.seat-1];
            for(let i =0 ; i < toSend.length ; i++) {
                for(let j = 0; j<customer.eatList.length;j++){
                    if(toSend[i] == customer.eatList[j]){
                        customer.eatList[j].status = '已上桌';
                    }
                }
            }
           Data.updateStaff();
        },runTime);
        
    },
    startEat() {    
        for(let i = 0 ; i<this.seatQueue.length;i++) {
            if(this.seatQueue[i] == undefined) {break;}
            if(this.seatQueue[i].status != '等待上菜') {break;}
            this.seatQueue[i].eat();
            let flag = 0;
            for(let j = 0;j<this.seatQueue[i].eatList.length;j++) {
                if(this.seatQueue[i].eatList[j].status == "已吃完") {
                    flag++;
                }
            }
           // console.log(flag)
            if(flag == this.seatQueue[i].eatList.length) {
                this.seatQueue[i] = undefined;
            }
        }
    },
    startFire() {
        let result = new Array();
        for(let i = 0 ; i < this.RestaurantData.staff.length;i++) {
            if(this.RestaurantData.staff[i].preWork != "等待解雇"||this.RestaurantData.staff[i].status != "无") {
                result.push(this.RestaurantData.staff[i]);
            }
        }

        this.RestaurantData.staff = result;
    }
}



export {Data}