/*
* 使用TS 进行重构
*
*   OOB
* */
class Carousel {
    constructor(useNode, img_data, option = { changeTime: 4 }) {
        this.index = 0; // 当前展示图片的下标
        this.firstIndex = 0; // 上一张图片的下标
        this.flag = false;
        const { changeTime } = option;
        this.img_data = img_data;
        this.length = this.img_data.length;
        this.changeTime = changeTime;
        this.init(useNode);
    }
    /**
     * @param domNode {HTMLElement} 应用到的元素
     * @description 向useNode添加HTMLElement
     * */
    init(domNode) {
        this.img_box = document.createElement('div');
        this.img_box.setAttribute('id', 'imgBox');
        const dot_box = document.createElement('div');
        dot_box.setAttribute('class', 'small_dot');
        this.small_dot = document.createElement('ul');
        dot_box.appendChild(this.small_dot);
        const caption_box = document.createElement('div');
        caption_box.setAttribute('class', 'caption');
        this.caption = document.createElement('a');
        const caption_box_a_title = document.createElement('h2');
        caption_box_a_title.setAttribute('class', 'title');
        const caption_box_a_desc = document.createElement('p');
        caption_box_a_desc.setAttribute('class', 'describe');
        this.caption.appendChild(caption_box_a_title);
        this.caption.appendChild(caption_box_a_desc);
        caption_box.appendChild(this.caption);
        const button_box = document.createElement('div');
        button_box.setAttribute('class', 'button');
        const btn_left = document.createElement('div');
        btn_left.innerText = '<';
        btn_left.setAttribute('id', 'btn_left');
        const btn_right = document.createElement('div');
        btn_right.innerText = '>';
        btn_right.setAttribute('id', 'btn_right');
        button_box.appendChild(btn_left);
        button_box.appendChild(btn_right);
        domNode.appendChild(this.img_box); // 图片盒子
        domNode.appendChild(dot_box); // 小圆点盒子
        domNode.appendChild(caption_box); // 描述盒子
        domNode.appendChild(button_box); // 按钮盒子
        this.img_data.forEach((value, index, array) => {
            // 创建小圆点
            const li = document.createElement('li');
            li.setAttribute('data-index', String(index));
            // domNode.children[1].children[0].appendChild(li)
            this.small_dot.appendChild(li);
            // 创建图片
            const div = document.createElement('div');
            const a = document.createElement('a');
            a.setAttribute('href', 'javascript:void(0)');
            const img = document.createElement('img');
            img.setAttribute('alt', value.title);
            img.src = value.url;
            div.appendChild(a).appendChild(img);
            this.img_box.appendChild(div);
        });
        this.small_dot.addEventListener('click', (e) => {
            if (e.target !== this.small_dot) {
                this.stop();
                this.index = Number(e.target.dataset.index);
                this.change();
                this.Interval();
            }
        });
        domNode.addEventListener('mousemove', () => {
            this.img_box.children[this.index].style.transform = 'scale(1.05)';
            button_box.style.opacity = `1`;
            this.stop();
        });
        domNode.addEventListener('mouseout', () => {
            this.img_box.children[this.firstIndex].style.transform = '';
            button_box.style.opacity = '0';
            this.Interval();
        });
        btn_left.addEventListener('click', () => {
            if (this.flag) {
                return;
            }
            this.stop();
            this.index--;
            this.change();
            this.Interval();
        });
        btn_right.addEventListener('click', () => {
            if (this.flag) {
                return;
            }
            this.stop();
            this.index++;
            this.change();
            this.Interval();
        });
    }
    change() {
        // 设置节流阀
        this.flag = true;
        setTimeout(() => {
            this.flag = false;
        }, 1000);
        this.index = this.index === this.length ? 0 : this.index;
        this.index = this.index === -1 ? this.length - 1 : this.index;
        // if(this.firstIndex === this.index) return
        //清除上一张图片的样式
        const firstDOMElement = this.img_box.children[this.firstIndex];
        firstDOMElement.style.transform = '';
        this.small_dot.children[this.firstIndex].removeAttribute('id');
        this.firstIndex = this.index;
        // 设置当前图片的样式
        this.small_dot.children[this.index].setAttribute('id', 'active');
        // 设置描述
        this.caption.setAttribute('href', this.img_data[this.index].url);
        const captionChildren = this.caption.children;
        captionChildren[0].innerText = this.img_data[this.index].title;
        captionChildren[1].innerText = this.img_data[this.index].describe;
        this.img_box.style.transform = `translate(-${this.index * 1280}px, 0)`;
        // flag = true
    }
    Interval() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.index++;
            this.change();
        }, this.changeTime * 1000);
    }
    start() {
        this.change();
        this.Interval();
    }
    stop() {
        clearInterval(this.timer);
    }
}
export default Carousel;
//# sourceMappingURL=index.js.map