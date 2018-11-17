import * as svc from '../services/grid'

export default {
    namespace: 'grid',
    state:{
        smallCatalogList:[]
    },
    reducers:{
        loadSmallCatalog(state,{payload}){
            return { ...state,...payload };
        },
    },
    effects:{
        *fetchSmallCatalog({payload},{ call, put, select }){
            let { bigCatalog, bigCatalogName} = payload;
            const { data } = yield call(svc.fetchSmallCatalog, bigCatalog);
            if(!(typeof(data)=="undefined")  && data.state=="1"){
                yield put({
                        type: 'loadSmallCatalog',
                        payload: {
                            bigCatalog: bigCatalog,
                            bigCatalogName: bigCatalogName,
                            smallCatalogList: data.data,
                        },
                    });
                }
        },
    },
    subscriptions: {
    },
}