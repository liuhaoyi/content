import React from 'react';
import {PropTypes as T} from 'prop-types';
import Immutable from 'immutable';
import classnames from 'classnames';
import debounce from 'debounce';
import './message-area.less';
import MessageTimeline from './message-timeline';
import { connect } from 'dva';


class MessageArea extends React.Component {
    displayName = 'message-area';

    componentDidMount = () =>{
        this.detect = debounce(this.detect, 300);
        this.jumpToBottom();
    }

    componentDidUpdate = () => {
        this.jumpToBottom();
    }
    onWheel = () =>{
        return this.detect();
    }
    jumpToBottom = () => {
        window.requestAnimationFrame (() => {
            let node = this.getScrollEl();
            if (node){
                node.scrollTop = node.scrollHeight;
            }
        })
    }
    // dirtyScrollToBottom = () => {
    //     var node;
    //     if (this.props.isSearch) {
    //       return;
    //     }
    //     node = this.getScrollEl();
    //     return dom.smoothScrollTo(node, 0, node.scrollHeight);
    // }
    // checkUnreadMentions = () => {
    //     return handlers.message.checkUnreadMentions();
    // }

    detect = () => {
        var cachedScrollHeight, isScrollAtBottom;
        isScrollAtBottom = this.isScrollAtBottom();
        if (this.isScrollAtTop()) {
          cachedScrollHeight = this.getScrollEl().scrollHeight;
          this.props.onScrollReachTop((function(_this) {
            return function() {
              return _this.restoreScrollTop(cachedScrollHeight);
            };
          })(this));
        } else if (isScrollAtBottom) {
          this.props.onScrollReachBottom();
        }
        if (isScrollAtBottom !== this.props.isTuned) {
        //   deviceActions.tuned(isScrollAtBottom);
            console.log('deviceActions.tuned(isScrollAtBottom);');
        }
        // return this.checkUnreadMentions();
    }
    restoreScrollTop = (cachedScrollHeight) =>{
        var diff, node;
        node = this.getScrollEl();
        diff = node.scrollHeight - cachedScrollHeight;
        if (diff > 0) {
          return node.scrollTop = node.scrollTop + diff;
        }
    }
    isScrollAtTop = () => {
        var node;
        node = this.getScrollEl();
        return node.scrollTop < 20;
    }
    isScrollAtBottom = () => {
        var node;
        node = this.getScrollEl();
        return node.scrollTop + node.clientHeight + 80 > node.scrollHeight;
    }
    getScrollEl = () => {
        return this.refs.scroll;
    }

    renderTimeline = (_toId, _roomId, messages) => {
        return React.createElement(
            MessageTimeline,
            {
                _toId: _toId,
                _roomId: _roomId,
                messages: messages
            }
        )
    }
    render () {
        
        let {_toId, _roomId, messages} = this.props;
        const messageAreaClass = classnames('message-area flex-space');
        const mockMessages = [{"_id":"5ae3cff71f31e6b7130e66de","to":{"_id":"5ab8ac643fda301f0f3db38a","name":"思恩","py":"se","pinyin":"sien","emailForLogin":"wangcheng@isphere.top","emailDomain":"isphere.top","accountId":"5ab8ac63c97a47bf234eb705","__v":1,"unions":[],"updatedAt":"2018-04-12T08:38:58.162Z","createdAt":"2018-03-26T08:16:36.481Z","isGuest":false,"isRobot":false,"pys":["se"],"pinyins":["sien","saien"],"from":"register","avatarUrl":"https://dn-st.qbox.me/user_default_avatars/16.png","id":"5ab8ac643fda301f0f3db38a","email":"wangcheng@isphere.top"},"team":"572c9493f7e5c8d9475286a5","creator":{"_id":"572c94809e3c72ee38daf950","name":"王琤","py":"wc","pinyin":"wangcheng","accountId":"572c947f45b5e81658178099","__v":2,"subAccountSid":"fae2cdd5138911e6bb9bac853d9f54f2","unions":[{"_id":"5acec1db2aeae2727ee1c717","avatarUrl":"https://avatars0.githubusercontent.com/u/38239481?v=4","name":"qteamcheng","openId":"38239481","refer":"github"}],"updatedAt":"2018-05-04T01:08:40.312Z","createdAt":"2016-05-06T12:56:32.366Z","isGuest":false,"isRobot":false,"pys":["wc"],"pinyins":["wangcheng"],"from":"register","avatarUrl":"https://dn-st.qbox.me/user_default_avatars/20.png","id":"572c94809e3c72ee38daf950"},"body":"hello， are you there ?","__v":0,"receiptors":[],"hasTag":false,"tags":[],"urls":[],"updatedAt":"2018-04-28T01:35:51.480Z","createdAt":"2018-04-28T01:35:51.480Z","displayType":"markdown","icon":"normal","isSystem":false,"attachments":[],"mentions":[],"type":"dms","_targetId":"5ab8ac643fda301f0f3db38a","_teamId":"572c9493f7e5c8d9475286a5","_toId":"5ab8ac643fda301f0f3db38a","_creatorId":"572c94809e3c72ee38daf950","id":"5ae3cff71f31e6b7130e66de"}];
        if(messages == null) messages = mockMessages;
        return React.createElement(
            'div',
            {
                className: messageAreaClass,
            },React.createElement(
                'div',
                {
                    className: 'scroller thin-scroll',
                    ref: 'scroll',
                    onWheel: this.onWheel
                },this.renderTimeline(_toId, _roomId, messages)
            )
        )
    }
}

MessageArea.propTypes = {
    _toId: T.string,
    _roomId: T.string,
    messages: T.instanceOf(Immutable.Map)
}

function mapStateToProps(state) {
    const { target2messages, _targetId } = state.im;
    const messages = target2messages.get(_targetId);
    return  { messages };
}

export default connect(mapStateToProps)(MessageArea);
