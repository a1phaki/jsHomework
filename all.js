let data = [];
let completedlist = [];
let Uncompletedlist = [];
const addList = document.querySelector(".addList");
const btnAdd = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const number = document.querySelector(".number");



btnAdd.addEventListener("click",function(){
    if( addList.value =="" ){
        alert("請輸入代辦事項");
        return;
    }
    let obj = {};
    obj.content = addList.value;
    obj.completed = "false";
    data.push(obj);
    showList();
    addList.value = "";
    init(data);
    updateList(data);

    
    number.textContent = `${Uncompletedlist.length}個待完成項目`;
});

function updateList(arr = [{
    completed : "",
    content: ""
}]){
    completedlist = arr.filter(function(item){
        return item.completed == "true";
    });
    Uncompletedlist = arr.filter(function(item){
        return item.completed == "false";
    });
}

function init( arr=[{
    content:"",
    completed:""
}] ){
    const check = document.querySelectorAll(".checkbox");
    check.forEach(function(item,index){
        item.addEventListener("click",function(){
            if(arr[index].completed == "false"){
                arr[index].completed = "true";
            }else{
                arr[index].completed = "false";
            };
            updateList(arr);
        
            number.textContent = `${Uncompletedlist.length}個待完成項目`;
        })
    });
    const deleteList = document.querySelectorAll(".delete");
    deleteList.forEach(function(item,index){
        item.addEventListener('click',function(){
            data.splice(index,1);
            showList();
            updateList(data);
            number.textContent = `${Uncompletedlist.length}個待完成項目`;
            console.log(data);
            init(data);
        })
    });
    const deleteAll = document.querySelector(".deleteAll");
    deleteAll.addEventListener("click",function(){
        data.forEach(function(item,index){
            if(item.completed == "true"){
                data.splice(index,1);
            }
        })
        showList();
        updateList(data);
        init(data);
    })
};

function showList(){
    all.classList.add("active");
    Uncompleted.classList.remove("active");
    completed.classList.remove("active");
    let str = "";
    data.forEach(function(item,index){
        if(item.completed == "false"){
            str +=`<li><label class="checkbox" for="" data-num="${index}"><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`
        }else{
            str +=`<li><label class="checkbox checked" for="" data-num="${index}"><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`
        }
    });
    list.innerHTML = str;
}

const Uncompleted = document.querySelector(".uncompleted");
const completed = document.querySelector(".completed");
const all = document.querySelector(".All");



all.addEventListener("click",function(){
    showList();
    init(data);
})

completed.addEventListener("click",function(){
    completed.classList.add("active");
    Uncompleted.classList.remove("active");
    all.classList.remove("active");
    let str = "";
    completedlist.forEach(function(item,index){
        str +=`<li><label class="checkbox checked" for="" data-num="${index}"><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`
    })
    list.innerHTML = str;
    init(completedlist);
})

Uncompleted.addEventListener("click",function(e){
    Uncompleted.classList.add("active");
    completed.classList.remove("active");
    all.classList.remove("active");
    console.log(Uncompletedlist);
    let str = "";
    Uncompletedlist.forEach(function(item,index){
        str +=`<li><label class="checkbox" for="" data-num="${index}"><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`
    })
    list.innerHTML = str;
    init(Uncompletedlist);
})