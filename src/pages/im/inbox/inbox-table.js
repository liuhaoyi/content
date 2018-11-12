import React from 'react';
import  './inbox-table.less';
import './search-box.less';
import InboxItem from './inbox-item';
import Icon from '../../../moudle/icon/icon';
import { connect } from 'dva';

class InboxTable extends React.Component{


    handleClickOnInBox = (event,notification) => {
        this.props.dispatch(
            {
                type: 'im/fetchMessages',
                payload: {
                    notification: notification,
                },
              }
        );
    }
    handleClickOnInboxRemove = (event,notification) => {
        event.stopPropagation();
        console.log('handleClickOnInboxRemove');
        this.props.dispatch(
            {
                type: 'im/updateNotification',
                payload: {
                    notification: notification,
                }, 
            }
        );
    }
    renderSearchBar = () => {
       return React.createElement(
               'div',
               {className: 'inbox-searchbox flex-static'},
               React.createElement(
                'div',
                {className: 'search-box'},
                    React.createElement(
                        Icon,
                        {className: 'search', name: 'search', size: 18 }
                    ),
                    React.createElement(
                        'input',
                        {type: 'text', className: 'input', id: 'searchBox', placeholder: 'Instant-search (ctrl + /)'}
                    )
                )
        );
    }
    
    renderInboxes = (_notifications) => {
        return React.createElement(
            'div',
            {className:'inbox-scroll flex-space thin-scroll',id:'scroll'},
            React.createElement(
                'ul',
                '',
                _notifications.map(this.renderInbox)
            )
        )
    }

    renderInbox = (notification,index) => {
        return React.createElement(
            'li',
            {className:'list-item'},
                React.createElement(
                    InboxItem,
                    {
                        notification:notification,
                        onClick:this.handleClickOnInBox,
                        onRemove: this.handleClickOnInboxRemove,
                        isActive: this.props._targetId === notification._targetId,
                        isSelected: index === this.props.selectedNotyIndex
                    }
            )
        )
    }
    
    render() {
        
        var { notifications } = this.props;
        if(notifications == null) return null;
        return React.createElement(
                'div',
                {className: 'inbox-table flex-space flex-vert'},
                this.renderSearchBar(),this.renderInboxes(notifications));
     }
}

 function mapStateToProps(state) {
    const { notifications, selectedNotyIndex, _targetId} = state.im;
    return { notifications, selectedNotyIndex, _targetId};
}

export default connect(mapStateToProps)(InboxTable);
//export default InboxTable;