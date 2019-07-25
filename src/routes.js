import VueRouter from 'vue-router';
let routes=[
  {
    path: '/',
    component: require('./components/Home.vue').default
  },
  {
    path: '/historico',
    component: require('./components/Historico.vue').default
  }
];

export default new VueRouter({routes});