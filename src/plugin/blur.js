import style from './style.scss'
let tag = true
let count = 0
let keyList = []
export default {
    install(Vue, option = {
        blur: 80,
        maskColor: 'rgba(0,0,0,.2)'
    }) {
        //自定义背景虚化指令
        Vue.directive('imgBlur', (...rest) => {
            const key = rest[0].getAttribute('b-key') || ''
            let divImg 
            let divMask 
            if(keyList.indexOf(key) == -1){
                divImg = document.createElement('div');
                divMask = document.createElement('div');
                keyList.push(key)         
            } else{
                 divImg = document.querySelector(`._mybg${key}`) || document.createElement('div');
                 divMask = document.querySelector(`._my_mask${key}`) || document.createElement('div');
            }    
            rest[0].classList.add('blur')
            divMask.classList.add(`my_mask` ,`_my_mask${key}`)
            divImg.classList.add(`__bg`  ,`_mybg${key}`)
            divImg.style.background = `url(${rest[1].value}) center`
            divImg.style.backgroundSize = `cover`
            divImg.style.filter = `blur(${option.blur}px)`
            divMask.style.backgroundColor = option.maskColor
            rest[0].appendChild(divImg)
            rest[0].appendChild(divMask) 
        })
    }
}