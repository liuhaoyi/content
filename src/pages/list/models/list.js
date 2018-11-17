import * as svc from '../services/list';

export default {
    namespace: 'list',
     
    state: {
        // notifications: [],
        // target2messages: new Map(),
        // // [{
        // //     _targetId:'',
        // //     messages:[
        // //         {

        // //         },
        // //         {

        // //         }
        // //     ]
        // // }]
        // _targetId: null,   
        // selectedNotyIndex: null,
        // teamid : 1,
        //新闻大类
        bigCatalog: null,
        //新闻大类名称
        bigCatalogName: null,
        
        //新闻小类
        smallCatalog: null,
        //新闻小类名称
        smallCatalogName: null,

        //新闻时间
        time:null,
        smallCatalogList:[],
        // [{
        //     id: null,
        //     title: null,
        // }]
        newsList: [],
        // [{
        //    id:"",
        //    title:"",
        //    content:"",
        //    date:""  ,
        //    catalog:"",
        // }]

        //存储所有的信息数据；
        catalog2NewsList: new Map(),
        // [
        //     {
        //         key:'1',
        //         value:
        //         [
        //             {
        //               id:'',
        //               title:'',
        //               content:'',
        //               date:'',
        //               catalog:'',  
        //             }

        //         ]
        //     },
        // ]
    },

    reducers: {

        // loadMessages(state, { payload } ){
        //     // let target2messages = Object.assign({},state.target2messages);
        //      let newState = {target2messages: state.target2messages.set(payload._targetId, payload.messages), _targetId: payload._targetId};
        //      return { ...state,  ...newState };
        //  },
        loadSmallCatalog(state,{payload}){
            return { ...state,...payload };
        },

        loadBeforeNewsList(state,{payload}){
            let newState = {catalog2NewsList: state.catalog2NewsList.set(payload.smallCatalog, payload.newsList), newsList: state.catalog2NewsList.get(payload.smallCatalog),smallCatalog: payload.smallCatalog};
            // state.catalog2NewsList.push({payload.smallCatalog: payload.newsList});
            // state.catalog2NewsList.push({ smallCatalog: payload.newsList});

            // let newState = {catalog2NewsList: state.catalog2NewsList, smallCatalog: payload.smallCatalog};

            return { ...state,...newState };
        },
        loadAfterNewsList(state,{payload}){
            let newState = {catalog2NewsList: state.catalog2NewsList.set(payload.smallCatalog, payload.newsList), newsList: state.catalog2NewsList.get(payload.smallCatalog),smallCatalog: payload.smallCatalog};
            // state.catalog2NewsList.push({payload.smallCatalog: payload.newsList});
            // state.catalog2NewsList.push({ smallCatalog: payload.newsList});

            // let newState = {catalog2NewsList: state.catalog2NewsList, smallCatalog: payload.smallCatalog};

            return { ...state,...newState };
        },

        targetSelected(state, { payload }){
            return { ...state, ...{ smallCatalog: payload.smallCatalog}}
        },
       
    },

    effects:{
        
        //依据大类查询小类；
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

        *fetchBeforeNewsList({ payload }, { call, put, select }){
            let { smallCatalog,time } = payload;
            console.log("---time--" + time);
            const _catalog2newsList = yield select( state => state.list.catalog2NewsList);
            console.log("-----1" + "---smallCatalog=" + smallCatalog);

            if (typeof(_catalog2newsList) != "undefined"  &&  _catalog2newsList.has(smallCatalog)){
                console.log("-----2.1" + "---smallCatalog=" + smallCatalog);
                if(time!=""){
                    console.log("顶部刷新加载当前time前的新数据；");
                    //顶部刷新加载当前time前的新数据；
                    const { data } = yield call(svc.fetchBeforeNewsList, smallCatalog,time);
                    //返回数据为undefined，不做任何处理；
                    if(!(typeof(data)=="undefined")  && data.state=="1"){
                        //将数据增加到，当前catalog2NewsList对应catalog的数据列表的顶部；
                        const _newslist = _catalog2newsList.get(smallCatalog);
                        _newslist.unshift(...(data.data));
                        yield put({
                            type: 'loadBeforeNewsList',
                            payload: {
                                smallCatalog: smallCatalog,
                                newsList: _newslist,
                            },
                        });
                    }
                }else{
                    //理论应该不会执行，需要认证核实。
                    // yield put({
                    //     type: 'targetSelected',
                    //     payload: {
                    //         smallCatalog: smallCatalog
                    //     },
                    // });
                     //第一次加载数据，time="".
                    const _time = "";
                    console.log("-----3" + "---smallCatalog=" + smallCatalog);
                    const { data } = yield call(svc.fetchBeforeNewsList, smallCatalog,_time);
                    if(!(typeof(data)=="undefined")  && data.state=="1"){
                        yield put({
                            type: 'loadBeforeNewsList',
                            payload: {
                                smallCatalog: smallCatalog,
                                newsList: data.data,
                            },
                        });
                    }
                }
            }else{
                //第一次加载数据，time="".
                const _time = "";
                console.log("-----3" + "---smallCatalog=" + smallCatalog);
                const { data } = yield call(svc.fetchBeforeNewsList, smallCatalog,_time);
                if(!(typeof(data)=="undefined")  && data.state=="1"){
                    yield put({
                        type: 'loadBeforeNewsList',
                        payload: {
                            smallCatalog: smallCatalog,
                            newsList: data.data,
                        },
                    });
                }
            }
        } ,
        *fetchAfterNewsList({ payload }, { call, put,select}){
            let { smallCatalog,time } = payload;
            console.log("---time--" + time);
            // const { data } = yield call(svc.fetchAfterNewsList, smallCatalog,time);
            const _catalog2newsList = yield select( state => state.list.catalog2NewsList);
            console.log("-----1" + "---smallCatalog=" + smallCatalog);
            if (typeof(_catalog2newsList) != "undefined"  &&  _catalog2newsList.has(smallCatalog)){
                console.log("-----2" + "---smallCatalog=" + smallCatalog);
                if(time!=""){
                    console.log("底部加载当前time前的新数据；");
                    //底部刷新加载当前time前的新数据；
                    const { data } = yield call(svc.fetchAfterNewsList, smallCatalog);
                    if(!(typeof(data)=="undefined")  && data.state=="1"){
                        if(data.data.length>0){
                            //将数据增加到，当前catalog2NewsList对应catalog的数据列表的顶部；
                            const _newslist = _catalog2newsList.get(smallCatalog);
                            //加载数组到尾部；
                            _newslist.push(...(data.data));
                            yield put({
                                type: 'loadAfterNewsList',
                                payload: {
                                    smallCatalog: smallCatalog,
                                    newsList: _newslist,
                                },
                            });
                        }
                    }
                }else{
                    //理论应该不会执行，需要认证核实。
                    yield put({
                        type: 'targetSelected',
                        payload: {
                            smallCatalog: smallCatalog
                        },
                    });
                }
            }else{
                //第一次加载数据，time="".
                console.log("-----3" + "---smallCatalog=" + smallCatalog);
                const { data } = yield call(svc.fetchAfterNewsList, smallCatalog);
                if(!(typeof(data)=="undefined")  && data.state=="1"){
                    if(data.data.length>0){
                        yield put({
                            type: 'loadAfterNewsList',
                            payload: {
                                smallCatalog: smallCatalog,
                                newsList: data.data,
                            },
                        });
                    }
                }
            }
        } ,
    },

    subscriptions: {
    },
}

