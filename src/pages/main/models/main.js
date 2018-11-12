import * as svc from '../services/main';

export default {
    namespace: 'main',
     
    state: {
        bigCatalogList:[],
        mainPicList:[],
         // [{
        //    id:"",
        //    title:"",
        //    img:"",
        //    catalog:"",
        // }]
    },

    reducers: {

        loadBigCatalog(state,{payload}){
            return { ...state,...payload };
        },
        loadMainPicList(state,{payload}){
            return { ...state,...payload };
        },
    },

    effects:{
        //查询大类列表；
        *fetchBigCatalog({payload},{call,put,select}){
            const { data } = yield call(svc.fetchBigCatalog);
            yield put({
                        type: 'loadBigCatalog',
                        payload: {
                            bigCatalogList: data,
                        },
                    });
        },
        //查询图片列表
        *fetchMainPicList({payload},{call,put,select}){
            const { data } = yield call(svc.fetchMainPicList);
            yield put({
                        type: 'loadMainPicList',
                        payload: {
                            mainPicList: data,
                        },
                    });
        },
    },

    subscriptions: {
        // setup({ dispatch, history }) {
        //   return history.listen(({ pathname, query }) => {
        //     if (pathname === '/main') {
        //       dispatch({ type: 'fetchBigCatalog', payload: query });
        //     }
        //   });
        // },
      },
}

