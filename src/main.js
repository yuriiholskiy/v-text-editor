import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VButton from '@/components/ui/VButton';
Vue.component('v-button', VButton);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
