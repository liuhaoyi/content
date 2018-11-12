import React from 'react';
import './inbox-item.less';
import Avatar from '../../../moudle/avatar/avatar';
import Icon from '../../../moudle/icon/icon';
import UnreadBadge from '../../../moudle/unread/unread-badge';
import {PropTypes as T} from 'prop-types';
import UserName from '../../user/user-name';
import RoomName from '../../team/room-name';
import Immutable from 'immutable';
import classNames from 'classnames';
import colors from '../../../utils/colors';

var INBOX_COLOR = {
	'dms' : 'red',
	'file' : 'purple',
	'link' : 'freen',
	'room' : 'blue',
	'topic' : 'yellow'
};

var ICONS_MAP = {
	'file' : 'parperclip-lean',
	'link' : 'chain',
	'room' : 'sharp',
	'topic' : 'idea'
};


/*
 *   avatar,  body  = [ cap (title + tag)   ] 
 *                    [ info (text + unread)]
 **/
class InboxItem extends React.Component{
	displayName = 'inbox-item';
	handleClickOnComponent = (event) =>{
		this.props.onClick(event, this.props.notification);
	}
	handleClickOnButtonRemove = (event)=> {
		// if (!this.props.isRemovable) {
		//   return;
		// }
		return this.props.onRemove(event, this.props.notification);
	}
	renderAvatar = (notification) => {
	
		const {type, target} = notification;

		var iconName, src;
		switch (type) {
			case 'dms':
				src = target['avatarUrl'];
				break;
			case 'room':
				iconName = ICONS_MAP[type];
				break;
			default:
		}
		return React.createElement(
			Avatar,
			{
				src: src,
				size: 'small',
				shape: 'round',
				className: 'white',
				backgroundColor: colors[INBOX_COLOR[type]]
			}, iconName ? React.createElement(Icon,{
				name: iconName,
				size: 14
				}) : void 0
		)
	}

	renderCap = (isActive, isRemovable, isFake, isClearingUnread, notification) => {

		return React.createElement(
			'div',
			{className: 'inbox-item-cap flex-horiz flex-vcenter'},
			this.renderTitle(notification), this.renderTags(isFake, isRemovable, notification)
		)
	}

	renderTitle = (notification) => {
		const {type, target} = notification;
		return React.createElement(
			'div',
			{className: 'title text-overflow flex-fill'},
			(() => {
				switch (type){
					case 'dms':
					    return React.createElement(
							UserName,
							{
								//_teamId: notification.get('_teamId'),
								_userId: target['_id'],
								name: target['name'],
								isRobot: target['isRobot'],
								service: target['service']
							}
						)
					case 'room':			    
						return React.createElement(
							RoomName,
							{name: target['topic']}
						)
					default:
				}
			}).call()
		)
	}

	renderTags = (isFake, isRemovable, notification) => {
		const {isPinned, unreadNum, isMute} = notification;
		
		let showRemove, csTags, name, className;
		if(isFake) return null;
		showRemove = !isPinned || unreadNum > 0 || !isRemovable;
		csTags = classNames ('tags', 'flex-static', 'flex-horiz', 'flex-vcenter', {'show-remove': showRemove});
		if(isPinned){
			name = 'pin';
			className = 'pin'
		} 
		if(isMute) {
			name = 'mute';
			className = 'mute';
		}
		if(showRemove){
			name = 'remove';
			className = 'remove';
		} 

		return  React.createElement(
			'div',
			{className :csTags},
			React.createElement(
				Icon,
				{
					name: name ,
					className: className,
					onClick: this.handleClickOnButtonRemove
				}
			)
		)

	}

	renderInfo = (isFake, isClearingUnread, notification) => {
		const {text, unreadNum, isMute} = notification;
		return React.createElement(
			'div',
			{className: 'inbox-item-info flex-horiz flex-vcenter'},
			this.renderText(text),this.renderUnread(isFake, isClearingUnread, unreadNum, isMute)
		)
	}

	renderText = (text) => {
		return React.createElement(
			'div',
			{
				className : 'text text-overflow flex-fill'
			},
			text
		)
	}

	renderUnread = (isFake, isClearingUnread, unreadNum, isMute) => {
		if (isFake) return null;
		if (!unreadNum) return null;
		if (isClearingUnread) return null;
		return React.createElement(
			'span',
			{ className: 'unread flex-static'},
			isMute ? React.createElement(
				 UnreadBadge,
				 {
					 size: 8,
					 round :true,
					 number : unreadNum,
					 showNumber: false
				 }
			) : React.createElement(
				UnreadBadge,
				{
					size : 16,
					oval : true,
					number : unreadNum,
					showNumber: true
				}
			)
		)
	}

	renderBody = (isActive, isSelected, isRemovable, isFake, isClearingUnread, notification) => {
		return React.createElement(
			'div',
			{className: 'body'},
			this.renderCap(isActive, isRemovable, isFake, isClearingUnread, notification), this.renderInfo(isFake, isClearingUnread, notification)
		)
	}

	render(){

		var {_teamId, isActive, isSelected, isRemovable, isFake, isClearingUnread, notification,onClick} = this.props;
		//mock props
		const mockNoti =  {
			"_id": "5acb1ffd5b2ed8983b93c70c", 
			"type": "dms", 
			"target": {
				"_id": "5acb1da2384e3c007b0637e0", 
				"name": "刘好义", 
				"py": "lhy", 
				"pinyin": "liuhaoyi", 
				"emailForLogin": "25436136@qq.com", 
				"emailDomain": "qq.com", 
				"accountId": "5acb1da27c8c81787e7bb201", 
				"__v": 2, 
				"unions": [
					{
						"_id": "5acec5ab2aeae2727ee1c718", 
						"avatarUrl": "https://avatars2.githubusercontent.com/u/37434399?v=4", 
						"name": "liuhaoyi", 
						"openId": "37434399", 
						"refer": "github"
					}
				], 
				"updatedAt": "2018-04-23T07:21:43.228Z", 
				"createdAt": "2018-04-09T08:00:34.873Z", 
				"isGuest": false, 
				"isRobot": false, 
				"pys": [
					"lhy"
				], 
				"pinyins": [
					"liuhaoyi"
				], 
				"from": "register", 
				"avatarUrl": "https://striker.teambition.net/thumbnail/1113b798c50732d54a833cc5cc2f47e6145c/w/200/h/200", 
				"id": "5acb1da2384e3c007b0637e0", 
				"email": "25436136@qq.com"
			}, 
			"user": "572c94809e3c72ee38daf950", 
			"_emitterId": "5add899d1f31e6b71308c6c8", 
			"creator": {
				"_id": "5acb1da2384e3c007b0637e0", 
				"name": "刘好义", 
				"py": "lhy", 
				"pinyin": "liuhaoyi", 
				"emailForLogin": "25436136@qq.com", 
				"emailDomain": "qq.com", 
				"accountId": "5acb1da27c8c81787e7bb201", 
				"__v": 2, 
				"unions": [
					{
						"_id": "5acec5ab2aeae2727ee1c718", 
						"avatarUrl": "https://avatars2.githubusercontent.com/u/37434399?v=4", 
						"name": "liuhaoyi", 
						"openId": "37434399", 
						"refer": "github"
					}
				], 
				"updatedAt": "2018-04-23T07:21:43.228Z", 
				"createdAt": "2018-04-09T08:00:34.873Z", 
				"isGuest": false, 
				"isRobot": false, 
				"pys": [
					"lhy"
				], 
				"pinyins": [
					"liuhaoyi"
				], 
				"from": "register", 
				"avatarUrl": "https://striker.teambition.net/thumbnail/1113b798c50732d54a833cc5cc2f47e6145c/w/200/h/200", 
				"id": "5acb1da2384e3c007b0637e0", 
				"email": "25436136@qq.com"
			}, 
			"team": "572c9493f7e5c8d9475286a5", 
			"__v": 0, 
			"_latestReadMessageId": "5add899d1f31e6b71308c6c8", 
			"pinnedAt": "2018-04-10T07:15:38.825Z", 
			"updatedAt": "2018-04-23T07:22:05.280Z", 
			"createdAt": "2018-04-09T08:10:37.964Z", 
			"isHidden": false, 
			"isMute": false, 
			"isPinned": true, 
			"unreadNum": 0, 
			"text": "最近有啥进展？？？", 
			"_creatorId": "5acb1da2384e3c007b0637e0", 
			"_targetId": "5acb1da2384e3c007b0637e0", 
			"_teamId": "572c9493f7e5c8d9475286a5", 
			"_userId": "572c94809e3c72ee38daf950", 
			"id": "5acb1ffd5b2ed8983b93c70c"
		};
		
		//if (notification == null || notification == undefined) {
		//	notification = mockNoti1;
		//}

		const {isPinned} = notification;
		const inboxItemClass = classNames('inbox-item', {
			'active': isActive,
			'pinned': isPinned,
			'selected': isSelected
				});
			return React.createElement(
				'div',
				{
					className: inboxItemClass, 
					onClick: this.handleClickOnComponent 
				},
				this.renderAvatar(notification), 
				this.renderBody(isActive, isSelected, isRemovable, isFake, isClearingUnread, notification)
			)
	}
}

InboxItem.propTypes = {
	isFake: T.bool,
//	isMute: T.bool,
	isActive: T.bool,
//	isPinned: T.bool,
	isSelected: T.bool,
	isRemovable: T.bool,
	isClearingUnread: T.bool,
	onClick: T.func,
	onRemove: T.func,
//	unreadNum: T.number,
	notification: T.instanceOf(Immutable.Map).isRequired
}

InboxItem.defaultProps = {
	isFake: false,
//	isMute: true,
	isActive: false,
//	isPinned: false,
	isSelected: false,
	isRemovable: false,
	onClick : () => {},
	onRemove: () => {}
}
export default InboxItem;
