import { reqUserInfo } from './../../api/user/index';
import { ElMessage, resultProps } from 'element-plus';
//创建用户相关仓库
import { defineStore } from 'pinia';
import { reqLogin, reqRegister } from '@/api/user/index';
import { loginForm } from '@/api/user/type';
import type { UserState } from './types/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { routes } from '@/router/routes'

const useUserStore = defineStore('User',{
    //状态管理
    state: ():UserState => {
        return {
          token: GET_TOKEN(),
          menuRoutes: routes,
          username: '',
          avatar: ''
        }
    },
    //异步逻辑处理
    actions: {
       async userLogin(data:loginForm){
         const resp = await reqLogin(data);
         if( resp.code == 0 ){
          //pinia,vuex等集中状态管理本质使用js对象存储
          this.token = resp.data.token;
          //需要持久化存储
          SET_TOKEN(resp.data.token)
          return "ok"
         }else{
          return Promise.reject(new Error(resp.data.message));
         }
       },
       async userRegister(data:loginForm){
        const resp = await reqRegister(data);
        if( resp.code == 0 ){
         return "ok"
        }else{
         return Promise.reject(new Error(resp.data.message));
        }
      },
       async userInfo(){
           let result = await reqUserInfo();
           if(result.code==200){
                this.username=result.data.checkUser.username;
                this.avatar=result.data.checkUser.avatar;
           }
       },
       async userLogout(){
        this.token='';
        this.username='';
        this.avatar='';
        REMOVE_TOKEN();
       }
    },
    //计算属性
    getters: {

    }
})
//暴露仓库
export default useUserStore