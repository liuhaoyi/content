import { fetchDetail_ } from '../services/detail';

export default {
    namespace: 'detail',
     
    state: {
        
        id: null,
        detail: null,
    },

    reducers: {

        loadDetail(state,{payload}){
            return { ...state,...payload };
        },
    },

    effects:{
       
        //查询详细信息
        *fetchDetail({payload},{call,put}){
            let { id } = payload;
            const { data } = yield call(fetchDetail_, id);
            yield put({
                        type: 'loadDetail',
                        payload: {
                            detail: data.data,
                        },
                    });
        },
       
    },

    subscriptions: {
        // setup({ dispatch, history }) {
        //     return history.listen(({ pathname, query }) => {
        //       if (pathname === '/detail') {
        //         dispatch({ type: 'fetchDetail', payload: query });
        //       }
        //     });
        //   },
      },
}

