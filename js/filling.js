const container = document.querySelector('.container')
for (let i = 0; i < data.length; i++) {
	// 创建小圆点
	const li = document.createElement('li')
	li.setAttribute('data-index', String(i))
	container.children[1].children[0].appendChild(li)

	// 创建图片
	const div = document.createElement('div')
	const a = document.createElement('a')
	a.setAttribute('href', 'javascript:void(0)')
	const img = document.createElement('img')
	img.setAttribute('alt', data[i].title)
	img.src = data[i].url
	div.appendChild(a).appendChild(img)
	container.children[3].appendChild(div)
}
