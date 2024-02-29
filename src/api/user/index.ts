//统一管理项目用户相关接口
import request from "@/utils/request";
//统一管理接口
enum API {
    LOGIN_URL = "/user/login",
    USERINFO_URL = "/user/info",
    REGISTER_URL = "/user/register"
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: any)=>request.post<any, any>(API.LOGIN_URL,data);
export const reqUserInfo = ()=> request.get<any,any>(API.USERINFO_URL);
export const reqRegister = (data: any)=>request.post<any, any>(API.REGISTER_URL,data);