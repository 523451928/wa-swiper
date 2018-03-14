import './main.css'
import './styles/wa-swiper.css'
// import greeter from './js/Greeter'
import Loadmore from './js/loadmore'
import WaSwiper from './js/wa-swiper'
let swiper = new WaSwiper({
  el: document.querySelector('.wa-swiper-wrap'),
  imgArr: [
    { imgUrl: require('./imgs/banner-01.jpg'), href: 'javascript:void(0);', },
    { imgUrl: require('./imgs/banner-02.jpg'), href: 'javascript:void(0);' },
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
// let loadmoreInstance = new Loadmore({
//   el: document.querySelector('.loadmore-content'),
//   scrollLoad: false,
//   topMethod() {
//     setTimeout(() => {
//       loadmoreInstance.onTopLoaded()
//     }, 1000)
//   },
//   bottomMethod: function () {
//     loadBottom()
//   }
// })
// let count = 10
// let endCount = 0
// function loadBottom() {
//   loadmoreInstance.trigger('changeBottomStatus', 'loading')
//   setTimeout(() => {
//     for (let i = 0 + endCount; i < count + endCount; i++) {
//       let liDom = document.createElement('li')
//       liDom.innerText = i
//       document.querySelector('.container').appendChild(liDom)
//     }
//     loadmoreInstance.trigger('changeBottomStatus', 'pull')
//     endCount += 10
//     if (endCount > 50) {
//       loadmoreInstance.destroy()
//     }
//     loadmoreInstance.onBottomLoaded()
//   }, 500)
// }
// loadmoreInstance.on('translate', (distance) => {
//   // console.log(distance)
// })
