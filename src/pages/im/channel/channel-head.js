import React from 'react';
import Immutable from 'immutable';
import {PropTypes as T} from 'prop-types';
import './channel-header.less';

class ChannelHead extends React.Component {

    displayName = 'channel-header';
    isPinned = () => {
        return this.props.notification.get('isPinned');
    }

    isMute = () => {
        return this.props.notification.get('isMute');
    }

    getPermission = () => {
        return this.channel.get('_creatorId') == this.props._userId;
    }

    render() {
        return (
            <div className = 'channel-header flex-between flex-horiz flex-static flex-vcenter'>
                this is channel head.
            </div>
        )
    }
}

ChannelHead.propType = {
    _teamId:T.string,
    _userId:T.string,
    _channelId:T.string,
    _channelType:T.string,

    // 以下部分含义未知2018.04.09
    prefs:T.instanceOf(Immutable.Map),
    channel:T.instanceOf(Immutable.Map),
    memebers:T.instanceOf(Immutable.List),
    contacts: T.instanceOf(Immutable.List),
    notifications:T.instanceOf(Immutable.Map)
}

export default ChannelHead;