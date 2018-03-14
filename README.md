# wa-swiper
原生js写的一个兼容移动端和pc的轮播图类,不依赖别的类库

## 查看demo
```
git clone https://github.com/523451928/wa-swiper.git
cd wa-swiper
npm install
npm run dev
```

## wa-swiper的使用方法
```
引用styles/wa-swiper.css
引用js/wa-swiper.js
或者
import WaSwiper from './js/wa-swiper'
let swiper = new WaSwiper({
  el: document.querySelector('.wa-swiper-wrap'),
  imgArr: [
    { imgUrl: require('./imgs/banner-01.jpg'), href: 'javascript:void(0);', },
    {
      imgUrl: require('./imgs/banner-03.jpg'),
      href: 'javascript:void(0);',
      callback: () => {
        console.log(this)
      }
    }
  ],
  isAutoPlay: false,
  isLoop: true,
  distance: 100,
  playDirection: 'left',
  duration: 3000,
  dragDisable: false,
  hasDot: true,
  platform: 'mobile',
  hasControllArrow: true
})

```
## arguments
| Option | Description | Type | Default |
| ----- | ----- | ----- | ----- |
| el | WaSwiper的包裹容器 | String or Dom | '' |
| imgArr | 不需要a标签的直接一个数组放图片链接,需要a标签的放对象 | Array | [] |
| isAutoPlay | 是否自动轮播 | Boolean | false |
| isLoop | 是否无缝连接 | Boolean | true |
| distance | 当手指滑动结束或者鼠标抬起时最小滑动距离会播放到下一张或者上一张 | Number | 100 |
| playDirection | 自动轮播时的方向 | String | 'left' |
| duration | 轮播时间间隔 | Number | 3000 (ms) |
| dragDisable | 是否禁止拖拽 | Boolean | false |
| hasDot | 是否生成指示器 | Boolean | true |
| platform | 运行平台 | String | 'mobile' |
| hasControllArrow | 在pc上是否生成控制箭头 | Boolean | true |

## 注意事项
* 要给包裹的容器加上class wa-swiper-wrap

## 可以使用WaSwiper实例的方法
| Function | Description |
| ----- | -----|
| scrollTo(index) | 图片滚动到第index张 |
