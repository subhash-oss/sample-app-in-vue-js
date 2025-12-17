import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Dashbord from '../views/Dashbord.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/services', component: Services },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    {path: '/dashbord', component: Dashbord}
  ]
})

export default router
