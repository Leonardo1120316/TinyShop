import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import useUserStore from '@/store/modules/user';
import nprogress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css'
import pinia from '../store'

let userStore = useUserStore(pinia);
const router = createRouter({
    routes: routes,
    history: createWebHashHistory(),
    scrollBehavior() {
        return {
          left: 0,
          top: 0,
        }
      },
});
router.beforeEach(async (to: any,from:any,next:any)=>{
  nprogress.start()
  let token = userStore.token;
  let username = userStore.username;
  if(token) {
          if(to.path == '/login'){
                  next({path: '/'})
          }else{
                  if(username){
                        next()
                  }else{
                        try{
                                await userStore.userInfo();
                        }catch(error){
                                userStore.userLogout();
                                next({path:'/login'})
                        }
                  }
          }
  }else{
          if(to.path == '/login'|| to.path =='/register' ){
                  next()
          }else{
                  next({path:'/login'})
          }
  }
}
)
router.afterEach((to: any,from:any,next:any)=>{
  nprogress.done()
})
export default router