//EventTarget
//封装Js
class Dailog extends EventTarget {
    constructor(options) {
        super()
        // 合并配置；
        // let {width="100px",title="默认标题",content="默认内容"} = options;
        // console.log(width,content);
        this.opts = Object.assign({
            width: '30%',
            height: '200px',
            title: '测试标题',
            content: '测试内容',
            dragable: true, //是否可拖拽
            maskable: true, //是否有遮罩
            isCancel: false, //是否有取消
            success () {
                console.log('默认点击确定了！！')
            },
            cancel () {
                console.log('默认点击取消！！')
            },
        }, options
        )
        // console.log(opts);
        this.init()
    }
    init () {
        this.renderView()
        let cancel = new Event('cancel')
        this.addEventListener('cancel', this.opts.cancel)
        this.addEventListener('success', this.opts.success)
        this.dailogHtml.onclick = (e) => {
            //console.log(e.target.className);
            switch (e.target.className) {
                case 'k-close':
                    this.close()
                    // this.opts.cancel();
                    // this.trigger("cancel");
                    this.dispatchEvent(cancel)
                    break
                case 'k-cancel':
                    this.close()
                    // this.opts.cancel();
                    // this.trigger("cancel");
                    this.dispatchEvent(cancel)
                    break
                case 'k-primary':
                    this.close()
                    // this.opts.success();
                    // this.trigger("success");
                    this.confim()
                    break
            }
        }
    }
    confim (value) {
        let success = new CustomEvent('success', {
            detail: value,
        })
        this.dispatchEvent(success)
    }
    // 显示对话框；
    open () {
        if (this.opts.maskable) {
            this.dailogHtml.querySelector('.k-wrapper').style.display = 'block'
        }
        this.dailogHtml.querySelector('.k-dialog').style.display = 'block'
    }
    //关闭 对话框；
    close () {
        this.dailogHtml.querySelector('.k-wrapper').style.display = 'none'
        this.dailogHtml.querySelector('.k-dialog').style.display = 'none'
    }
    renderView () {
        this.dailogHtml = document.createElement('div')
        this.dailogHtml.innerHTML = `<div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height
            }">
            <div class="k-header">
                <span class="k-title">${this.opts.title}</span>
                <span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-cancel">取消</span>' : ''
            }
                <span class="k-primary">确定</span>
            </div>
        </div>`
        document.querySelector('body').appendChild(this.dailogHtml)
    }
}

class ExtendsDailog extends Dailog {
    constructor(options) {
        super(options)
        this.renderInput()
    }
    renderInput () {
        let myInput = document.createElement('input')
        myInput.type = 'text'
        myInput.classList.add('input-inner')
        this.dailogHtml.querySelector('.k-body').appendChild(myInput)
        // console.log(this.dailogHtml.querySelector(".input-inner").value);
    }
    confim () {
        let value = this.dailogHtml.querySelector('.input-inner').value
        super.confim(value)
    }
}
