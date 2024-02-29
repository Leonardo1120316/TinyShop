import useUserStore from '@/store/modules/user';
import router from '@/router';
import nprogress from 'nprogress';
import '../node_modules/nprogress/nprogress.css'
import pinia from './store'

let userStore = useUserStore(pinia);

router.beforeEach((to: any,from:any,next:any)=>{
        nprogress.start()
        let token = userStore.token;
        if(token) {
                if(to.path == '/login'){
                        next({path: '/'})
                }else{
                        next();
                }
        }else{
                if(to.path == '/login'){
                        next()
                }else{
                        next({path:'/login'})
                }
        }
    }
)
router.afterEach((to: any,from:any,next:any)=>{
        nprogress.done()
        console.log('222')
})