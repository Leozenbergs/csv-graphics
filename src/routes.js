import VueRouter from 'vue-router';
let routes=[
  {
    path: '/',
    component: require('./components/Home.vue').default
  },
  {
    path: '/ultimas',
    component: require('./components/Ultimas.vue').default //Ações que a empresa fez nos ultimos 20 dias
  },
  {
    path: '/destaque',
    component: require('./components/Destaque.vue').default //Email e empresa do usuário que realizou a maior quantidade de ações dentro do sistema
  },
  {
    path: '/favoritos',
    component: require('./components/Favoritos.vue').default // Qual a parte do sistema que os usuários mais acessam
  }
];

export default new VueRouter({routes});