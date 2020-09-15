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
        Vue.directive('blur', (...rest) => {
             let   divImg =  rest[0].querySelector(`.__bg`) || document.createElement('div') ;
            let  divMask  = rest[0].querySelector(`.my_mask`) || document.createElement('div') ;
            rest[0].classList.add('blur');
            divMask.classList.add(`my_mask` );
            divImg.classList.add(`__bg`  );
            divImg.style.background = `url(${rest[1].value}) center`;
            divImg.style.backgroundSize = `cover`;
            divImg.style.filter = `blur(${option.blur}px)`;
            divMask.style.backgroundColor = option.maskColor;
            rest[0].appendChild(divImg);
            rest[0].appendChild(divMask) ;
        });
    }
}