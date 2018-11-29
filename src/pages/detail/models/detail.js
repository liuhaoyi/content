import { fetchDetail_ , queryFavorByUserIdAndArticleId , addFavor, removeFavor} from '../services/detail';

export default {
    namespace: 'detail',
     
    state: {
        
        id: null,
        detail: null,
        favor: null,
    },

    reducers: {

        loadDetail(state,{payload}){
            return { ...state,...payload };
        },
        loadFavor(state,{payload}){
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
       *fetchFavorByUserIdAndArticleId({payload},{call,put}){
            const { data } = yield call(queryFavorByUserIdAndArticleId, payload);
            yield put({
                type: 'loadFavor',
                payload: {
                    favor: data.data,
                },
            });
        },

        *fetchFavorByUserIdAndArticleId({payload},{call,put}){
            const { data } = yield call(queryFavorByUserIdAndArticleId, payload);
            yield put({
                type: 'loadFavor',
                payload: {
                    favor: data.data,
                },
            });
        },

        *addFavor({payload},{call,put}){
            const { data } = yield call(addFavor, payload);
            yield put({
                type: 'loadFavor',
                payload: {
                    favor: data.data,
                },
            });
        },
        *removeFavor({payload},{call,put}){
            const { data } = yield call(removeFavor, payload);
            yield put({
                type: 'loadFavor',
                payload: {
                    favor: null,
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

