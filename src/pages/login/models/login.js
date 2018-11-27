import { login } from '../services/login';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
export default {
    namespace: 'login',
     
    state: {
        loginState: null,
    },

    reducers: {
        loadLogin(state,{payload}){
            return { ...state,...payload };
        },
    },

    effects:{
        
        *login({payload},{call,put}){
            const { data }  = yield call(login, payload);
            if(data.data){
                if(data.data.loginName!=null){
                    sessionStorage.setItem('userId',data.data.id);
                    router.push({
                        pathname: '/main',
                        query:{
                        }
                        });
                }else{
                    yield put({
                        type: 'loadLogin',
                        payload: {
                            loginState: "登录信息错误！",
                        },
                    });
                    Toast.info('用户名、手机号或员工编号错误!!!', 1);
                }
            } else{
                yield put({
                    type: 'loadLogin',
                    payload: {
                        loginState: "登录信息错误！",
                    },
                });
                Toast.info('用户名、手机号或员工编号错误!!!', 1);
            }
        },
    },

    subscriptions: {

      },
}

