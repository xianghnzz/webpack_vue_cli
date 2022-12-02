import count from './js/count';
import sum from './js/sum';
import {mul} from './js/math'; // 按需引入 treeshakeing
import './scss/style.scss';
import './scss/iconfont.scss';

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5));
const oBtn = document.querySelector('#btn');
oBtn.addEventListener('click', () => {
    import('./js/math').then(({mul})=> {
        console.log(mul(2, 3));
    })
})