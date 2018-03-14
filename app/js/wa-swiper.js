function addClass(el, cls) {
    if (!el) return
    let curClass = el.className
    let classes = (cls || '').split(' ')

    for (let i = 0; i < classes.length; i++) {
        let clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}
function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}
/* istanbul ignore next */
function removeClass(el, cls) {
    if (!el || !cls) return
    let classes = cls.split(' ')
    let curClass = ' ' + el.className + ' '

    for (let i = 0; i < classes.length; i++) {
        let clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.remove(clsName)
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}
function extend(opts, option) {
    let opt = opts || {}
    for (let key in opt) {
        if (typeof opt[key] === 'object' && !opt[key] instanceof HTMLElement) {
            for (let k in opt[key]) {
                option[key][k] = opt[key][k]
            }
        } else {
            option[key] = opt[key]
        }
    }
    return option
}
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
}
function GetSlideDirection(startX, startY, endX, endY) {
    let dy = startY - endY
    let dx = endX - startX
    let result = 0
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    }
    // 1上   2下   3左   4右
    let angle = GetSlideAngle(dx, dy)
    if (angle >= -45 && angle < 45) {
        result = 4
    } else if (angle >= 45 && angle < 135) {
        result = 1
    } else if (angle >= -135 && angle < -45) {
        result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
    }
    return result
}
let WaSwiper = function (opt) {
    this.options = {
        imgArr: [],
        el: '',
        isLoop: true,
        distance: 100,
        isAutoPlay: false,
        playDirection: 'left',
        duration: 3000,
        dragDisable: false,
        hasDot: true,
        platform: 'mobile',
        hasControllArrow: true
    }
    this.options.el = opt.el instanceof HTMLElement ? opt.el : document.querySelector(opt.el)
    this.activeIndex = 1
    this.interval = null
    this.options = extend(opt, this.options)
    this.init()
    return this
}
WaSwiper.prototype.init = function () {
    this.renderImg()
    this.bindEvents()
    if (this.options.isAutoPlay && this.carouselArr.length > 1) {
        this.autoPlay()
    }
    if (this.options.hasDot) {
        this.renderDot()
    }
    if (this.options.platform !== 'mobile' && this.options.hasControllArrow) {
        this.renderArrow()
    }
}
WaSwiper.prototype.renderImg = function () {
    let data = Object.assign([], this.options.imgArr)
    if (this.options.imgArr.length > 1 && this.options.isLoop) {
        let length = this.options.imgArr.length - 1
        data.push(this.options.imgArr[0])
        data.unshift(this.options.imgArr[length])
    } else {
        this.activeIndex = 0
    }
    this.carouselArr = data
    let liArr = []
    for (let i = 0; i < data.length; i++) {
        if (!data[i].href) {
            if (!data[i].imgUrl) {
                liArr.push(`<li class="wa-img-item"><img src="${data[i]}"></li>`)
            } else {
                liArr.push(`<li class="wa-img-item" ><img src="${data[i.imgUrl]}"></li>`)
            }
        } else {
            liArr.push(`<li class="wa-img-item" ><a href="${data[i].href}"><img src="${data[i].imgUrl}"></a></li>`)
        }
    }
    let htmlTemplate = `<ul class="wa-swipper-content clearfix" >${liArr.join('')}</ul>`
    this.options.el.innerHTML = htmlTemplate
    document.querySelectorAll('.wa-img-item').forEach((item, index) => {
        item.addEventListener('click', data[index].callback)
    })
    document.querySelector('.wa-swipper-content').style.width = this.options.el.clientWidth * data.length + 'px'
    let imgItems = document.querySelectorAll('.wa-img-item')
    for (let j = 0; j < imgItems.length; j++) {
        imgItems[j].style.width = this.options.el.clientWidth + 'px'
    }
    this.setWrapperStyle()
}
WaSwiper.prototype.renderDot = function () {
    let dotArr = []
    for (let i = 0; i < this.options.imgArr.length; i++) {
        if (i === 0) {
            dotArr.push('<li><button class="active"></button></li>')
        } else {
            dotArr.push('<li><button></button></li>')
        }
    }
    let dotWrapper = document.createElement('div')
    dotWrapper.className = 'dot-wrapper'
    dotWrapper.innerHTML = `<ol>${dotArr.join('')}</ol>`
    this.options.el.appendChild(dotWrapper)
    let dotList = document.querySelectorAll('.dot-wrapper li')
    dotList.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (this.options.isLoop) {
                this.activeIndex = index + 1
            } else {
                this.activeIndex = index
            }
            this.setTransition('all .5s')
            this.setWrapperStyle()
            this.changeDotActive()
        })
    })
}
WaSwiper.prototype.renderArrow = function () {
    let leftArrowDom = document.createElement('span')
    leftArrowDom.className = 'carousel-control left'
    let rightArrowDom = document.createElement('span')
    rightArrowDom.className = 'carousel-control right'
    this.options.el.appendChild(leftArrowDom)
    this.options.el.appendChild(rightArrowDom)
    leftArrowDom.addEventListener('click', this.prevPlay.bind(this))
    rightArrowDom.addEventListener('click', this.nextPlay.bind(this))
}
WaSwiper.prototype.changeDotActive = function (idx) {
    let dotList = document.querySelectorAll('.dot-wrapper button')
    dotList.forEach((dot, index) => {
        if (hasClass(dot, 'active')) {
            removeClass(dot, 'active')
        }
        if (this.options.isLoop) {
            if (index === this.activeIndex - 1 || index === idx - 1) {
                addClass(dot, 'active')
            }
        } else {
            if (index === this.activeIndex || index === idx) {
                addClass(dot, 'active')
            }
        }
    })
}
WaSwiper.prototype.scrollTo = function (index) {
    if (this.options.isLoop) {
        this.activeIndex = index + 1
    } else {
        this.activeIndex = index
    }
    this.setTransition('all .5s')
    this.setWrapperStyle()
    this.changeDotActive()
    return this
}
WaSwiper.prototype.autoPlay = function () {
    if (!this.options.isLoop) {
        return
    }
    if (this.interval) {
        clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
        if (this.options.playDirection === 'left') {
            this.prevPlay(true)
        } else {
            this.nextPlay(true)
        }
    }, this.options.duration)
}
WaSwiper.prototype.bindEvents = function () {
    this.options.el.addEventListener('touchstart', startFn)
    this.options.el.addEventListener('touchmove', moveFn)
    this.options.el.addEventListener('touchend', endFn)
    if (this.options.platform !== 'mobile') {
        this.options.el.addEventListener('mousedown', startFn)
        this.options.el.addEventListener('mousemove', moveFn)
        this.options.el.addEventListener('mouseup', endFn)
    }
    let self = this
    let eventObj = {}
    function startFn(e) {
        if (self.interval) {
            clearInterval(self.interval)
        }
        if (self.options.platform !== 'mobile') {
            eventObj.isMouseDown = true
            eventObj.startX = e.clientX
            eventObj.startY = e.clientY
        } else {
            eventObj.startX = e.touches[0].clientX
            eventObj.startY = e.touches[0].clientY
        }
        eventObj.startIndex = self.activeIndex
        self.setTransition('')
    }
    function moveFn(e) {
        e.preventDefault()
        e.stopPropagation()
        if (self.options.dragDisable) {
            return
        }
        if (self.options.platform !== 'mobile' && !eventObj.isMouseDown) {
            return
        }
        let diffX = 0
        diffX = self.options.platform === 'mobile' ? e.touches[0].clientX - eventObj.startX : e.clientX - eventObj.startX
        eventObj.diffX = diffX
        self.activeIndex = eventObj.startIndex - (diffX / self.options.el.clientWidth)
        self.setTransition('')
        self.setWrapperStyle()
    }
    function endFn(e) {
        eventObj.isMouseDown = false
        let direction
        if (self.options.platform === 'mobile') {
            direction = GetSlideDirection(eventObj.startX, eventObj.startY, e.changedTouches[0].clientX, e.changedTouches[0].clientY)
        } else {
            direction = GetSlideDirection(eventObj.startX, eventObj.startY, e.clientX, e.clientY)
        }

        self.setTransition('all .5s')
        let distance = self.options.platform === 'mobile' ? Math.abs(eventObj.startX - e.changedTouches[0].clientX) : Math.abs(eventObj.startX - e.clientX)
        if (self.options.isLoop) {
            if (direction === 3 && distance > self.options.distance) {
                self.activeIndex++
            }
            if (direction === 4 && distance > self.options.distance) {
                self.activeIndex--
            }
        } else {
            if (direction === 3 && distance > self.options.distance && self.activeIndex < self.carouselArr.length - 1) {
                self.activeIndex++
            } else if (direction === 3 && distance > 30) {
                console.log('end')
            }
            if (direction === 4 && distance > 10 && self.activeIndex > 0) {
                self.activeIndex--
            }
        }
        if (eventObj.diffX <= -self.options.distance) {
            self.activeIndex = Math.floor(self.activeIndex)
        } else if (eventObj.diffX >= self.options.distance) {
            self.activeIndex = Math.ceil(self.activeIndex)
        } else {
            self.activeIndex = Math.round(self.activeIndex)
        }
        self.changeDotActive()
        self.setWrapperStyle()
        if (self.options.isLoop) {
            if (self.activeIndex === -0 || self.activeIndex === 0) {
                self.changeDotActive(self.carouselArr.length - 2)
                setTimeout(() => {
                    self.activeIndex = self.carouselArr.length - 2
                    self.setTransition('')
                    self.setWrapperStyle()
                }, 350)
            }
            if (self.activeIndex >= self.carouselArr.length - 1) {
                self.changeDotActive(1)
                setTimeout(() => {
                    self.activeIndex = 1
                    self.setTransition('')
                    self.setWrapperStyle()
                }, 350)
            }
        }
        if (self.options.isAutoPlay && self.carouselArr.length > 1) {
            self.autoPlay()
        }
    }
}
WaSwiper.prototype.setTransition = function (str) {
    document.querySelector('.wa-swipper-content').style.transition = str
}
WaSwiper.prototype.setWrapperStyle = function () {
    document.querySelector('.wa-swipper-content').style.transform = `translateX(${-this.activeIndex * 100 / this.carouselArr.length}%)`
}
WaSwiper.prototype.prevPlay = function (flag) {
    this.activeIndex++
    this.changeDotActive()
    this.setWrapperStyle()
    this.setTransition('all .5s')
    if (flag !== true) {
        clearInterval(this.interval)
    }
    if (this.activeIndex >= this.carouselArr.length - 1) {
        this.changeDotActive(1)
        setTimeout(() => {
            this.setTransition('')
            this.activeIndex = 1
            this.setWrapperStyle()
        }, 350)
    }
}
WaSwiper.prototype.nextPlay = function (flag) {
    this.activeIndex--
    this.changeDotActive()
    this.setWrapperStyle()
    this.setTransition('all .5s')
    if (flag !== true) {
        clearInterval(this.interval)
    }
    if (this.activeIndex === 0) {
        this.changeDotActive(this.carouselArr.length - 2)
        setTimeout(() => {
            this.setTransition('')
            this.activeIndex = this.carouselArr.length - 2
            this.setWrapperStyle()
        }, 350)
    }
}
export default WaSwiper
