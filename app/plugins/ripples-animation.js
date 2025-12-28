import {
    Ripples as ripplesAnimation
} from '@app/utils/animation/ripples';

export default defineNuxtPlugin((nuxtApp) => {
    const ripplesAnimationRirective = {
        // inserted(el) { // 直接使用vue時使用的掛載生命週期
        //   console.log(el);
        // },
        mounted(el, binding) {
            ripplesAnimation.ripples(el, binding.value);
        },
        updated(el, binding) {
            ripplesAnimation.ripples(el, binding.value);
        }
        // getSSRProps(binding, vnode) { // 使用nuxt時使用的伺服器端掛載生命週期
        //   // you can provide SSR-specific props here
        //   return {}
        // }
    };
    nuxtApp.vueApp.directive('ripples-animation', ripplesAnimationRirective);
    nuxtApp.vueApp.directive('ripplesAnimation', ripplesAnimationRirective);

    return {
        provide: {
            ripplesAnimation
        }
    };
});