import Vue from 'vue';
import App from './App.vue';
import VButton from '@/components/ui/VButton';
Vue.component('v-button', VButton);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
