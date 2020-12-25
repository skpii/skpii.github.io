{
    let data = [
      {
        id: 0,
        title: "残酷月光 - 费启鸣",
        checked: true,
        collect: true
      }, {
        id: 1,
        title: "兄弟 - 艾热",
        checked: false,
        collect: false
      }, {
        id: 2,
        title: "毕生 - 夏增祥",
        checked: false,
        collect: true
      }, {
        id: 3,
        title: "公子向北去 - 李春花",
        checked: false,
        collect: false
      }, {
        id: 4,
        title: "战场 - 沙漠五子",
        checked: true,
        collect: false //是否收藏 true 收藏 false 没有收藏
      }
    ];
    //判断是否全选；
    // let isCheckedAll = ()=>{
    //     let checkeds = data.filter(item=>item.checked);
    //     return checkeds.length === data.length; //全选 true； 非全选 false；
    // }
    let checkAll = document.querySelector("#checkAll");
    let isCheckedAll = () => data.every(item => item.checked);

    let render = (data) => {
        let str = "";
        data.forEach(v => {
            str += `<li>
            ${v.id}
            <input type="checkbox" ${v.checked ? 'checked' : ''} />
            <span>${v.title}</span>
            ${v.collect ? '<a href="javascript:;" class="cancelCollect">取消收藏</a>' : '<a href="javascript:;" class="collect">收藏</a>'}
            <a href="javascript:;" class="remove">删除</a>
            </li>`;
        });
        document.querySelector("#list").innerHTML = str;
        checkAll.checked = isCheckedAll();
        addEvent();
    }

    // 数据驱动； 改数据---》渲染视图；
    let addEvent = () => {
        let lis = document.querySelectorAll("li");
        lis.forEach((li, index) => {
            let checked = li.querySelector("input");
            let collect = li.querySelector(".collect");
            let cancelCollect = li.querySelector(".cancelCollect");
            let remove = li.querySelector(".remove");
            checked.onchange = function () {
                data[index].checked = this.checked;
                render(data);
            }
            collect && (collect.onclick = function () {
                data[index].collect = true;
                render(data);
            })
            cancelCollect && (cancelCollect.onclick = function () {
                data[index].collect = false;
                render(data);
            })
            remove.onclick = function () {
                data = data.filter(item => item != data[index]);
                render(data);
            }
            checkAll.onchange = function () {
                data.forEach(v => {
                  v.checked = this.checked;
                })
                render(data);
            }
        })
    }
    document.querySelector("#remove").onclick = function () {
        // delete-->id  get  post put
        data = data.filter(item => item.checked == false)
        render(data);
    }
    document.querySelector("#add").onclick = function () {
        let value = document.querySelector("#newInfo").value;
        if(value){
            data.push({
                id: data.length,
                title: value,
                checked: false,
                collect: false
            })
        }else{
            console.log("输入内容为空！！！");
        }
        document.querySelector("#newInfo").value = "";
        render(data);
    }
    render(data)
}