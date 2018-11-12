import React from 'react';
import './channel-body.less';
import MessageArea from './message/message-area';
import MessageEditor from './message/message-editor';

class ChannelBody extends React.Component {

    onScrollReachTop = (cb) => {
        // if (this.state.isSearch) {
        //   return this.fetchSearchBefore(cb);
        // } else {
        //   return this.fetchHistory(cb);
        // }
        cb();
    }

    onScrollReachBottom = () => {
        // if (this.state.isSearch && (!this.state.isJoined)) {
        //     return this.fetchSearchAfter();
        // } else {
        //     return this.clearUnread();
        // }
    }

    renderMessageArea = () =>{
        return React.createElement(
            MessageArea,
            {
                onScrollReachBottom: this.onScrollReachBottom,
                onScrollReachTop: this.onScrollReachTop
            }
        )
    }

    renderMessageEditor = () =>{
        return React.createElement(
            MessageEditor,
            ''
        )
    }
    render () {
        return React.createElement(
            'div',
            {
                className: 'channel-body flex-space flex-vert'
            },
            this.renderMessageArea(),this.renderMessageEditor()
        )
        // (
        //     <div className = 'channel-body flex-space flex-vert' >
        //         <MessageArea/>
        //         <MessageEditor/>
        //     </div>
        // )
    }
}

export default ChannelBody;