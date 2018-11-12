import * as imService from '../services/im';

export default {
    namespace: 'im',
     
    state: {
        notifications: [],
        target2messages: new Map(),
        // [{
        //     _targetId:'',
        //     messages:[
        //         {

        //         },
        //         {

        //         }
        //     ]
        // }]
        _targetId: null,   
        selectedNotyIndex: null,
        teamid : 1,
    },

    reducers: {
        loadNotifications(state, { payload } ){
            return { ...state,...payload };
        },
        loadMessages(state, { payload } ){
           // let target2messages = Object.assign({},state.target2messages);
            let newState = {target2messages: state.target2messages.set(payload._targetId, payload.messages), _targetId: payload._targetId};
            return { ...state,  ...newState };
        },
        updateNotification(state,{ payload }){
            let { notification } = payload;
            let notys = state.notifications.filter(item => {
                return item._id != notification._id;
            });
            return {...state, notifications: notys};
        },
        targetSelected(state, { payload }){
            return { ...state, ...{ _targetId: payload._targetId}}
        },

        updateMessages(state, { payload }){
            const message = payload.message;
            const targetId =  message._targetId;
            let messages = [...state.target2messages.get(targetId), message];

            let newState = {target2messages: state.target2messages.set(targetId, messages)};
            return { ...state, ...newState};
        }
    },

    effects:{
        *fetchNotifications({ payload }, { call, put }){
            const { data } = yield call(imService.fetch);
            data.sort((a,b) => {
                if(b.createdAt > a.createdAt) return 1;
                if(b.createdAt === a.createdAt) return 0;
                if(b.createdAt < a.createdAt) return -1;
            })
            yield put({
                type: 'loadNotifications',
                payload: {
                  notifications: data,
                },
              });
        } ,
        *fetchMessages({ payload }, { call, put, select}){
            let { notification } = payload;
            const _target2messages =yield select( state => state.im.target2messages);
           
            if(_target2messages.has(notification._targetId)){
                yield put({
                    type: 'targetSelected',
                    payload: {
                        _targetId: notification._targetId
                    },
                });
            }else{
                const { data } = yield call(imService.fetchMessages, notification);
                data.sort((a,b) => {
                    if(b.createdAt < a.createdAt) return 1;
                    if(b.createdAt === a.createdAt) return 0;
                    if(b.createdAt > a.createdAt) return -1;
                })
                yield put({
                    type: 'loadMessages',
                    payload: {
                        _targetId: notification._targetId,
                        messages: data,
                    },
                });
            }
        } ,
        *sendMessage({ payload: values },{ call, put, select }){
           // const { text } = payload;
            const { data } = yield call(imService.sendMessages, values);
            yield put(
                {
                    type: 'updateMessages',
                    payload: {
                        message: data,
                    }
                }
            ) 
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, query }) => {
            if (pathname === '/im') {
              dispatch({ type: 'fetchNotifications', payload: query });
            }
          });
        },
        watcherChatEvent({dispatch}){
            return window.ChatWatcher.chatEvent((from,type,data)=>{
                 let v = {
                             from:from,
                             to:window.ChatWatcher.myJid,
                             body:data,
                             time:'',
                             type:'RECV',
                         };
                 console.log(`${v.from}:${v.body}` );        
                 dispatch({
                     type:'receive',
                     payload:{recv_messages:[v]},
                 });
            });
         },
      },
}

