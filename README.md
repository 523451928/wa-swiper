# wa-swiper
原生js写的一个兼容pc和移动端的轮播图类

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
  isLoop: true
})

```
