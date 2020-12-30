/*
 * @LastEditors: afei
 * @LastEditTime: 2020-12-30 14:14:19
*/
import vueWangeditorBlock from './vueWangeditorBlock';
const comment = {
    install(Vue) {
        Vue.component('vueWangeditorBlock', vueWangeditorBlock);
    },
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(comment);
}
export default comment;