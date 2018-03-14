/* eslint-disable */
function mobileCheck() {
    let check = false;
    (function (a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
}
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
}
// 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function getSlideDirection(startX, startY, endX, endY) {
    let dy = startY - endY
    let dx = endX - startX
    let result = 0
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        // return result
    }
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
let throttle = function (fn, delay) {
    let now, lastExec, timer, context, args

    let excute = function () {
        fn.apply(context, args)
        lastExec = now
    }

    return function () {
        context = this
        args = arguments
        now = Date.now()

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        if (lastExec) {
            let diff = delay - (now - lastExec)
            if (diff < 0) {
                excute()
            } else {
                timer = setTimeout(() => {
                    excute()
                }, delay)
            }
        } else {
            excute()
        }
    }
}

let Loadmore = function (opt) {
    this.options = {
        topDistance: 50,
        bottomDistance: 50,
        distanceIndex: 2,
        topPullText: '下拉刷新',
        topDropText: '释放更新',
        topLoadingText: '更新中...',
        bottomPullText: '上拉加载更多...',
        bottomDropText: '释放更新',
        bottomLoadingText: '更新中...',
        noMoreText: '没有更多了...',
        autoFill: true,
        scrollLoad: false,
        sideSlipDisabled: false,
        preLoadDistance: 50
    }
    this.options = extend(opt, this.options)
    this.events = []
    this.runEnvironment = mobileCheck() ? 'mobile' : 'pc'
    this.allBottomLoaded = false
    this.scrollEventTarget = opt.el instanceof HTMLElement ? opt.el : document.querySelector(opt.el)
    this.startY = 0
    this.startScrollTop = 0
    this.translate = 0
    this.topStatus = ''
    this.bottomStatus = ''
    this.bottomDropped = false
    this.bottomReached = false
    this.loadmoreTopElm = ''
    this.loadmoerBottomElm = ''
    this.distanceIndex = this.options.distanceIndex
    this.init()
    return this
}
Loadmore.prototype.init = function () {
    this.scrollEventTarget = this.getScrollEventTarget(this.scrollEventTarget)
    let elm = this.options.el
    let loadmoreTopElm = document.createElement('div')
    loadmoreTopElm.className = 'wa-loadmore-top'
    loadmoreTopElm.innerText = this.options.topPullText
    this.loadmoreTopElm = loadmoreTopElm
    elm.insertBefore(loadmoreTopElm, elm.childNodes[0])
    if (!this.options.scrollLoad) {
        this.appendBottomDom()
    }
    this.bindTouchEvent()
    this.fillContainer()
    this.on('changeBottomStatus', (str) => {
        this.bottomStatus = str
    })
    if (this.options.scrollLoad) {
        let throttleFn = throttle(this.checkBottomReached.bind(this), 200)
        this.scrollEventTarget.addEventListener('scroll', throttleFn)
    }
}
Loadmore.prototype.changeStatusText = function (direction, text) {
    if (direction === 'down') {
        this.loadmoreTopElm.innerText = text
    } else {
        this.loadmoreBottomElm.innerText = text
    }
}
Loadmore.prototype.appendBottomDom = function () {
    let elm = this.options.el
    let loadmoreBottomElm = document.createElement('div')
    loadmoreBottomElm.className = 'wa-loadmore-bottom'
    loadmoreBottomElm.innerText = this.options.bottomPullText
    this.loadmoreBottomElm = loadmoreBottomElm
    elm.appendChild(loadmoreBottomElm)
}
Loadmore.prototype.destroy = function () {
    this.setBottomLoadedStatus(true)
    let noMoreDom = document.createElement('div')
    noMoreDom.className = 'wa-nomore-text'
    noMoreDom.innerText = this.options.noMoreText
    this.noMoreDom = noMoreDom
    this.options.el.appendChild(noMoreDom)
    if (!this.options.scrollLoad && this.loadmoreBottomElm) {
        this.options.el.removeChild(this.loadmoreBottomElm)
    }
}
Loadmore.prototype.refresh = function () {
    this.setBottomLoadedStatus(false)
    if (!this.options.scrollLoad && !document.querySelector('.wa-loadmore-bottom')) {
        this.appendBottomDom()
    }
    if (this.noMoreDom) {
        this.options.el.removeChild(this.noMoreDom)
    }
}
Loadmore.prototype.setBottomLoadedStatus = function (bool) {
    this.allBottomLoaded = bool
}
Loadmore.prototype.scrollTo = function (position) {
    this.scrollEventTarget.scrollTop = position
}
Loadmore.prototype.bindTouchEvent = function () {
    let self = this
    if (this.runEnvironment === 'mobile') {
        this.scrollEventTarget.addEventListener('touchstart', startFn)
        this.scrollEventTarget.addEventListener('touchmove', moveFn)
        this.scrollEventTarget.addEventListener('touchend', endFn)
    } else {
        this.scrollEventTarget.addEventListener('mousedown', startFn)
        this.scrollEventTarget.addEventListener('mousemove', moveFn)
        this.scrollEventTarget.addEventListener('mouseup', endFn)
    }

    let mouseObj = {}
    function startFn(event) {
        if (self.runEnvironment === 'mobile') {
            self.startY = event.touches[0].clientY
            self.startX = event.touches[0].clientX
        } else {
            mouseObj.isStart = true
            self.startY = event.clientY
        }
        self.startScrollTop = self.getScrollTop(self.scrollEventTarget)
        self.options.el.style.transition = ''

    }
    function moveFn(event) {
        if (self.startY < self.options.el.getBoundingClientRect().top && self.startY > self.options.el.getBoundingClientRect().bottom) {
            return
        }
        if (!mouseObj.isStart && self.runEnvironment === 'pc') {
            return
        } else if (mouseObj.isStart && self.runEnvironment === 'pc') {
            self.currentY = event.clientY
        } else {
            self.currentY = event.touches[0].clientY
            self.currentX = event.touches[0].clientX
            let direction = getSlideDirection(self.startX, self.startY, self.currentX, self.currentY)
            if (self.options.sideSlipDisabled && direction === 3 || self.options.sideSlipDisabled && direction === 4) {
                return
            }
        }

        let distance = (self.currentY - self.startY) / self.distanceIndex
        self.direction = distance > 0 ? 'down' : 'up'
        if (typeof self.options.topMethod == 'function' && self.direction == 'down' && self.getScrollTop(self.scrollEventTarget) == 0 && self.topStatus != 'loading' || self.canMoveDown) {
            event.stopPropagation()
            event.preventDefault()
            if (self.scrollEventTarget == window) {
                self.canMoveDown = true
                console.log(self.canMoveDown)
            }
            self.translate = distance - self.startScrollTop
            if (self.translate < 0) {
                self.translate = 0
            }
            self.topStatus = self.translate > self.options.topDistance ? 'drop' : 'pull'
            let topStatusText = self.topStatus === 'drop' ? self.options.topDropText : self.options.topPullText
            self.changeStatusText('down', topStatusText)
        }
        if (self.direction == 'up') {
            self.bottomReached = self.checkBottomReached()
        }
        if (typeof self.options.bottomMethod == 'function' && self.direction == 'up' && self.bottomStatus != 'loading' && self.bottomReached && !self.allBottomLoaded && !self.options.scrollLoad) {
            event.preventDefault()
            event.stopPropagation()
            self.translate = self.getScrollTop(self.scrollEventTarget) - self.startScrollTop + distance
            if (self.translate > 0) {
                self.translate = 0
            }
            self.bottomStatus = self.translate < -self.options.bottomDistance ? 'drop' : 'pull'
            let bottomStatusText = self.bottomStatus === 'drop' ? self.options.bottomDropText : self.options.bottomPullText
            self.changeStatusText('up', bottomStatusText)
        }
        self.trigger('translate', self.translate)
        self.setElmTranslate(self.translate)
    }
    function endFn() {
        self.options.el.style.transition = 'all .3s'
        mouseObj.isStart = false
        if (self.direction == 'down' && self.getScrollTop(self.scrollEventTarget) == 0 && self.translate > 0) {
            self.topDropped = true
            if (self.topStatus == 'drop') {
                self.translate = 50
                self.topStatus = 'loading'
                self.changeStatusText('down', self.options.topLoadingText)
                self.options.topMethod()
                // self.onTopLoaded()
            } else {
                self.topStatus = 'pull'
                self.changeStatusText('down', self.options.topPullText)
                self.translate = 0
            }
        }
        if (self.direction == 'up' && self.bottomReached && self.translate < 0 && !this.allBottomLoaded) {
            self.bottomDropped = true
            if (self.bottomStatus == 'drop') {
                self.translate = -50
                self.bottomStatus = 'loading'
                self.changeStatusText('up', self.options.bottomLoadingText)
                self.options.bottomMethod()
                // self.onBottomLoaded()
            } else {
                self.bottomStatus = 'pull'
                self.changeStatusText('up', self.options.bottomPullText)
                self.translate = 0
            }
        }
        self.canMoveDown = false
        self.setElmTranslate(self.translate)
    }
}
Loadmore.prototype.fillContainer = function () {
    if (this.options.autoFill) {
        setTimeout(() => {
            if (this.scrollEventTarget === window) {
                this.containerFilled = this.options.el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom
            } else {
                this.containerFilled = this.scrollEventTarget.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom
            }
            if (!this.containerFilled) {
                this.bottomStatus = 'loading'
                this.options.bottomMethod()
            }
        }, 100)
    }
}
Loadmore.prototype.setElmTranslate = function (translate) {
    this.options.el.style.transform = `translateY(${translate}px)`
}
Loadmore.prototype.onBottomLoaded = function () {
    this.bottomStatus = 'pull'
    this.bottomDropped = false
    if (!this.options.scrollLoad) {
        this.changeStatusText('up', this.options.bottomPullText)
    }
    if (this.scrollEventTarget == window) {
        if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop += 50
        }
    } else {
        if (this.scrollEventTarget.scrollTop) {
            this.scrollEventTarget.scrollTop += 50
        }
    }
    this.translate = 0
    this.options.el.style.transition = ''
    this.setElmTranslate(this.translate)
    if (!this.allBottomLoaded && !this.containerFilled) {
        this.fillContainer()
    }

}
Loadmore.prototype.onTopLoaded = function () {
    this.translate = 0
    this.setElmTranslate(this.translate)
    setTimeout(() => {
        this.topStatus = 'pull'
    }, 200)
}
Loadmore.prototype.checkBottomReached = function () {
    if (!this.options.scrollLoad) {
        if (this.scrollEventTarget === window) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            return scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
        } else {
            return this.options.el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1 + 50
        }
    } else {
        let result
        if (this.scrollEventTarget === window) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            result = scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight - this.options.preLoadDistance
        } else {
            result = this.options.el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1 + this.options.preLoadDistance
        }
        if (result && this.bottomStatus !== 'loading' && !this.allBottomLoaded) {
            this.options.bottomMethod()
        }
    }
}
Loadmore.prototype.getScrollTop = function (el) {
    if (el == window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
    } else {
        return el.scrollTop
    }
}
Loadmore.prototype.getScrollEventTarget = function (element) {
    let currentNode = element
    while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode
        }
        currentNode = currentNode.parentNode
    }
    return window
}
Loadmore.prototype.on = function (eventType, fn) {
    this.events.push(
        {
            eventType,
            fn
        }
    )
}
Loadmore.prototype.trigger = function () {
    let args = Array.prototype.slice.apply(arguments)
    this.events.forEach((item) => {
        if (item.eventType === args[0]) {
            item.fn(args[1])
        }
    })
}
Loadmore.prototype.off = function (eventType) {
    this.events.forEach((item, index) => {
        if (item.eventType === eventType) {
            thsi.events.splice(index, 1)
        }
    })
}
Loadmore.prototype.once = function (eventType, fn) {
    let self = this
    let listener = function () {
        if (fn) {
            fn.apply(this.arguments)
        }
        self.off(eventType)
    }
    this.on(eventType, listener)
}
export default Loadmore