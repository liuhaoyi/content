import {auth} from '../services/login';
import router from 'umi/router';
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
            // let { userId, } = payload;
            const response = yield call(auth, payload);
            router.push({
                pathname: '/main',
                query:{
                    
                }
                });
            if (response.status === 200) {    
                const userid = response.userId; 
            //     const token = response.data.ticket;
                sessionStorage.setItem('userId',userid);
            //     sessionStorage.setItem('token',token);
            //    // reloadAuthorized();
            //     const urlParams = new URL(window.location.href);
            //     const params = getPageQuery();
            //     let { redirect } = params;
            //     if (redirect) {
            //       const redirectUrlParams = new URL(redirect);
            //       if (redirectUrlParams.origin === urlParams.origin) {
            //         redirect = redirect.substr(urlParams.origin.length);
            //         if (redirect.startsWith('/#')) {
            //           redirect = redirect.substr(2);
            //         }
            //       } else {
            //         window.location.href = redirect;
            //         return;
            //       }
            //     }
                // yield put(routerRedux.replace(redirect || '/'));
                router.push({
                    pathname: '/main',
                    });

                    // router.push({
                    //     pathname: '/main',
                    //     query: {
                    //       topicId,
                    //     },});
              }else{
                //   message.error("用户名或密码错误");
              }
        },
       
    },

    subscriptions: {
        // setup({ dispatch, history }) {
        //   return history.listen(({ pathname, query }) => {
        //     if (pathname === '/login') {
        //       dispatch({ type: 'fetchLogin', payload: query });
        //     }
        //   });
        // },
        // watcherChatEvent({dispatch}){
        //     return window.ChatWatcher.chatEvent((from,type,data)=>{
        //          let v = {
        //                      from:from,
        //                      to:window.ChatWatcher.myJid,
        //                      body:data,
        //                      time:'',
        //                      type:'RECV',
        //                  };
        //          console.log(`${v.from}:${v.body}` );        
        //          dispatch({
        //              type:'receive',
        //              payload:{recv_messages:[v]},
        //          });
        //     });
        //  },
      },
}

