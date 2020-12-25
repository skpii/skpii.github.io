// 数据    对象数组；
let data = [
    {
        id: 0,
        name: '小明',
        age: 24,
        gender: '男'
    },
    {
        id: 1,
        name: '小芳',
        age: 30,
        gender: '女'
    },
    {
        id: 2,
        name: '小美',
        age: 31,
        gender: '女'
    },
    {
        id: 3,
        name: '小刚',
        age: 21,
        gender: '男'
    },
    {
        id: 4,
        name: '小琪',
        age: 18,
        gender: '女'
    }
];
{
    let ageEles = document.querySelectorAll(".age_sort a");
    let genderEles = document.querySelectorAll(".gender_show a");
    let sortIndex = 0;
    let genderIndex = 0;

    // 渲染视图
    function render(data){
        let str = "";
        data.forEach(item => {
            str += `<tr>
                <th>${item.id}</th>
                <th>${item.name}</th>
                <th>${item.age}</th>
                <th>${item.gender}</th>
            </tr>`;
        })
        document.querySelector("#table tbody").innerHTML = str;
    }
    let argSort = [
        () => {
            // 通过id进行排列
            data.sort((r1, r2) => r1.id - r2.id);
        },
        () => {
            // 年龄有小到大排列
            data.sort((r1, r2) => r1.age - r2.age);
        },
        () => {
            // 年龄有大到小排列
            data.sort((r1, r2) => r2.age - r1.age);
        }
    ]
    //筛选统一管理
    let filterType = [
        //不筛选；
        () => [...data],
        //筛选男
        () => data.filter(v => v.gender === "男"),
        //筛选女
        () => data.filter(v => v.gender === "女")
    ]

    // 年龄排序
    ageEles.forEach((item,key) => {
        item.onclick = function () {
            // console.log(item)
            //把所有其他的高亮去掉；
            ageEles.forEach(v => {
                v.classList.remove("active");
            })
            this.classList.add("active");
            argSort[key]();
            let newData = filterType[genderIndex]();
            render(newData);
            sortIndex = key;
        }
    })
    // 性别筛选
    genderEles.forEach((item,key) => {
        item.onclick = function () {
            genderEles.forEach(v => {
                v.classList.remove("active");
            })
            this.classList.add("active");
            argSort[sortIndex]();
            let newData = filterType[key]();
            render(newData);
            genderIndex = key;
        }
    })
    render(data);
}