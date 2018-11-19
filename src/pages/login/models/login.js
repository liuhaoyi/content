import { login } from '../services/login';
import router from 'umi/router';
// import { Toast } from 'antd-mobile';
export default {
    namespace: 'login',
     
    state: {
        phone: null,
        userId: null,
        password: null,
    },

    reducers: {

        // login(state,{payload}){
        //     return { ...state,...payload };
        // },
       
    },

    effects:{
        
        *login({payload},{call,put}){
            const { data }  = yield call(login, payload);
            if(data.data){
                if(data.data.loginName!=null){
                    sessionStorage.setItem('user',data.data);
                    router.push({
                        pathname: '/main',
                        query:{
                        }
                        });
                }else{
                    // Toast.error("用户名或密码错误");
                }
            } else{
                // Toast.error("用户名或密码错误");
            }
        },
    },

    subscriptions: {

      },
}

