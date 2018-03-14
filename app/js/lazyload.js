let throttle = function(fn, delay) {
  let now , lastExec , timer , context , args
  let excute = function() {
    fn.apply(context,args)
    lastExec = now
  }

  return function(){
    context = this
    args = arguments

    now = Date.now()

    if(timer){
      clearTimeout(timer)
      timer = null
    }

    if(lastExec){
      let diff = delay - (now-lastExec)
      if(diff<0){
        excute()
      }else{
        timer = setTimeout(() => {
          excute()
        }, delay)
      }
    }else{
      excute()
    }
  }
}

let LazyLoad = function(elm, opt) {
  if (typeof elm === 'string') {
    elm = document.querySelectorAll(elm)
  }
  this.option = {
    error: 'http://upload-images.jianshu.io/upload_images/1031000-6cf1ecc41ef8c31d.png?imageMogr2/auto-orient/',
    loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512623943778&di=c80bbc05b072673a4f14e51867cf7e15&imgtype=0&src=http%3A%2F%2Fpic.92to.com%2F360%2F201705%2F06%2F98333031_15.jpg',
    elm:elm,            //需要懒加载的图片数组
    src:"imgsrc",       //默认给图片地址的属性
    threshold:100,	    //提前加载距离
    opa:0.3,		        //图片初始透明度
    isBg:false,         //是否为背景图
    delay: 500,         //节流时间
    hasLoadingImg:false  //是否有loading图片 为true 当图片全部加载完成之后不会移除事件绑定
  }
  for(var key in opt) {
    this.option[key] = opt [key]
  }
  this.init()
  return this
}

LazyLoad.prototype = {
  init() {
    let count = 0
    this.option.elm.forEach((img) => {
      img.onload = () => {
        count++
      }
      img.onerror = () => {
        img.setAttribute('lazy', 'error')
        img.removeAttribute(this.option.src)
        img.setAttribute('src', this.option.error)
      }
    })
    this.lazyLoadImg()
    this.scrollListener = throttle(() => {
      this.scrollTrigger(this.lazyLoadImg, this)
      if (count == this.option.elm.length && !this.hasLoadingImg) {
        document.removeEventListener('scroll', this.scrollListener)
      }
    }, this.option.delay)
    document.addEventListener('scroll', this.scrollListener)
  },
  lazyLoadImg() {
    this.option.elm.forEach((item) => {
      if (item.getAttribute(this.option.src)) {
        item.style.opacity = this.option.opa
        item.setAttribute('lazy', 'loading')
        if (this.option.hasLoadingImg) {
          item.setAttribute('src', this.option.loading)
        }
        if (this.getImgTop(item)) {
          if (this.option.isBg) {
            item.style.opacity = 1
            item.setAttribute('lazy', 'loaded')
            item.style.transition = 'all 1s'
            item.style.background = `url(${item.getAttribute(this.option.src)} no-repeat`
          } else {
            item.style.opacity = 1
            item.style.transition = 'all 1s'
            item.setAttribute('lazy', 'loaded')
            item.setAttribute('src', item.getAttribute(this.option.src))
            item.removeAttribute(this.option.src)
          }
        }
      }
    })
  },
  getImgTop(dom) {
    let height = document.documentElement.clientHeight
    if(dom.offsetTop < document.documentElement.scrollTop+ height +this.option.threshold) {
      return true
    }
    return false
  },
  scrollTrigger(method, context) {
    method.call(context)
  }
}
export default LazyLoad