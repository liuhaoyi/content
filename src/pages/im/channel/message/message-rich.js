import './message-rich.less';

import React from 'react';
import {PropTypes as T} from 'prop-types';
import Immutable from 'immutable';
import classnames from 'classnames';

import UserAlias from '../../../user/user-alias';
import RelativeTime from '../../../../moudle/relative-time/relative-time';

import obj2string from '../../../../utils/obj2string';



/*
 *   author,  container  = [ title (userAlias + relativeTime)   ] 
 *                         [ body (content)                     ]
 **/

class MessageRich extends React.Component {

    displayName = 'message-rich';

    renderMessageAuthor = (message) =>{

        const {creator, authorAvatarUrl} = message;

        if(creator == null) return null;

        const authorDefaultAvatarUrl = creator.avatarUrl;

        const style = authorAvatarUrl != null ? {
            backgroundImage: `url(${authorAvatarUrl})`
        } : {
            backgroundImage : `url(${authorDefaultAvatarUrl})`
        }

        return React.createElement(
            'div',{
                ref: 'author',
                className : 'author flex-static'
            },React.createElement(
                'span',
                {
                    className : 'avatar flex-static img-circle background-cover',
                    style: style,                  
                }
            )
        )
    }

    renderMessageTitle = message => {
        const {_teamId, _creatorId, creator, createdAt, updateAt} = message;

        return React.createElement(
            'div',
            {
                className: 'title flex-fill flex-horiz flex-vcenter'
            },React.createElement(
                UserAlias,
                {
                    _teamId: _teamId,
                    _userId: _creatorId,
                    defaultName: creator.name,
                }
            ),React.createElement(
                RelativeTime,
                {
                    data: createdAt,
                    edited: updateAt
                }
            )
        )

    }

    renderMessageContent = message => {
        const {body} = message;
        if (body == null || body.length === 0 ) return 
        return React.createElement(
            'div',
            {
                className: 'content'
            },
            body
        )
    }

    renderMessageContainer = message => {
        return React.createElement(
            'div',
            {
                className: 'container flex-fill flex-vert'  
            },
            this.renderMessageTitle(message),this.renderMessageBody(message)
        )
    }

    renderMessageBody = message => {
        const cxBody = classnames('body', 'flex-vend', 'flex-horiz') ;
        return React.createElement(
            'div',
            {
                className: cxBody
            },this.renderMessageContent(message)

        )

    }


    render () {
        let {message} = this.props;

      //  if(message == null) return null;
        let mockMessage = {
            "_id": "5ae90da41f31e6b7130ee188",
            "to": {
                "_id": "572c94809e3c72ee38daf950",
                "name": "王琤",
                "py": "wc",
                "pinyin": "wangcheng",
                "accountId": "572c947f45b5e81658178099",
                "__v": 2,
                "subAccountSid": "fae2cdd5138911e6bb9bac853d9f54f2",
                "unions": [{
                    "_id": "5acec1db2aeae2727ee1c717",
                    "avatarUrl": "https://avatars0.githubusercontent.com/u/38239481?v=4",
                    "name": "qteamcheng",
                    "openId": "38239481",
                    "refer": "github"
                }],
                "updatedAt": "2018-05-02T00:52:09.733Z",
                "createdAt": "2016-05-06T12:56:32.366Z",
                "isGuest": false,
                "isRobot": false,
                "pys": ["wc"],
                "pinyins": ["wangcheng"],
                "from": "register",
                "avatarUrl": "https://dn-st.qbox.me/user_default_avatars/20.png",
                "id": "572c94809e3c72ee38daf950"
            },
            "team": "572c9493f7e5c8d9475286a5",
            "creator": {
                "_id": "5acb1da2384e3c007b0637e0",
                "name": "刘好义",
                "py": "lhy",
                "pinyin": "liuhaoyi",
                "emailForLogin": "25436136@qq.com",
                "emailDomain": "qq.com",
                "accountId": "5acb1da27c8c81787e7bb201",
                "__v": 2,
                "unions": [{
                    "_id": "5acec5ab2aeae2727ee1c718",
                    "avatarUrl": "https://avatars2.githubusercontent.com/u/37434399?v=4",
                    "name": "liuhaoyi",
                    "openId": "37434399",
                    "refer": "github"
                }],
                "updatedAt": "2018-05-02T00:52:45.488Z",
                "createdAt": "2018-04-09T08:00:34.873Z",
                "isGuest": false,
                "isRobot": false,
                "pys": ["lhy"],
                "pinyins": ["liuhaoyi"],
                "from": "register",
                "avatarUrl": "https://striker.teambition.net/thumbnail/1113b798c50732d54a833cc5cc2f47e6145c/w/200/h/200",
                "id": "5acb1da2384e3c007b0637e0",
                "email": "25436136@qq.com"
            },
            "body": "最近干什么呢",
            "__v": 0,
            "receiptors": [],
            "hasTag": false,
            "tags": [],
            "urls": [],
            "updatedAt": "2018-05-02T01:00:20.468Z",
            "createdAt": "2018-05-02T01:00:20.468Z",
            "displayType": "markdown",
            "icon": "normal",
            "isSystem": false,
            "attachments": [],
            "mentions": [],
            "type": "dms",
            "_targetId": "572c94809e3c72ee38daf950",
            "_teamId": "572c9493f7e5c8d9475286a5",
            "_toId": "572c94809e3c72ee38daf950",
            "_creatorId": "5acb1da2384e3c007b0637e0",
            "id": "5ae90da41f31e6b7130ee188"
        }

        if(message == null ) message = mockMessage;


        let classMessage = classnames('message-rich', 'flex-horiz', 'flex-vstart');
        return (
            React.createElement(
                'div',
                {
                    className: classMessage,
                },this.renderMessageAuthor(message),this.renderMessageContainer(message)
            )
        )
    }
}

MessageRich.propTypes = {
    isFavorite: T.bool,
    isDuplicated:T.bool,
    isUnread:T.bool,
    selected: T.bool,
    showActions: T.bool,
    showTags: T.bool,
    /*
     *  The message sended by current user which can edit
     */
    canEdit: T.bool,
    onClick: T.func,
    onFileClick: T.func,
    onTagClick: T.func,
    message: T.instanceOf(Immutable.Map),
    isEditMode: T.bool
}

MessageRich.defaultProps = {
    isFavorite: false,
    isDuplicated: false,
    isUnread: false,
    selected: false,
    showActions: false,
    showTags: false,
    canEdit: true,
    isEditMode: false
}

export default MessageRich;