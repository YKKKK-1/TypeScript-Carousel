const btn = document.querySelector('.button')
const img_box = document.querySelector('#imgBox')
const small_dot = document.querySelector('.small_dot').children[0]
const caption = document.querySelector('.caption').children[0]
let timer = null
let index = 0
let firstIndex = 1
let flag = false

small_dot.addEventListener('click', function (e) {
	if (e.target !== this) {
		clearInterval(timer)
		index = Number(e.target.dataset.index)
		change()
		Interval()
	}
})
btn.children[0].addEventListener('click', () => {
	if (flag) {
		return;
	}
	clearInterval(timer)
	index--
	change()
	Interval()
})
btn.children[1].addEventListener('click', () => {
	if (flag) {
		return;
	}
	clearInterval(timer)
	index++
	change()
	Interval()
})

document.querySelector('.container').addEventListener('mousemove', () => {
	btn.style.opacity = '1'
	img_box.children[index].style.transform = 'scale(1.05)'
	clearInterval(timer)
})
document.querySelector('.container').addEventListener('mouseout', () => {
	btn.style.opacity = '0'
	img_box.children[firstIndex].style.transform = ''
	Interval()
})
function change() {
	// 设置节流阀
	flag = true
	setTimeout(() => {
		flag = false
	}, 1000)
	index = index === data.length ? 0 : index
	index = index === -1 ? data.length - 1 : index
	if(firstIndex === index) return
	//清除上一张图片的样式
	img_box.children[firstIndex].style.transform = ''
	small_dot.children[firstIndex].removeAttribute('id')
	firstIndex = index
	// 设置当前图片的样式
	small_dot.children[index].setAttribute('id', 'active')
	// 设置描述
	caption.setAttribute('href', data[index].url)
	caption.children[0].innerText = data[index].title
	caption.children[1].innerText = data[index].describe
	img_box.style.transform = `translate(-${index * 1280}px, 0)`
	// flag = true
}
change()
function Interval() {
	clearInterval(timer)
	timer = setInterval(() => {
		index++
		change()
	}, 4000)
}
Interval()