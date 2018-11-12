import React from 'react';
import MessageRich from './message-rich';

import {PropTypes as T} from 'prop-types';
import Immutable from 'immutable';
import classnames from 'classnames';

class MessageTimeline extends React.Component {


    render () {
        const {messages} = this.props;
      //  console.log("this is messages " + messages.);
        let className = classnames('message-timeline');
        return React.createElement(
            'div',
            {
                className:className,
            },
            messages.map(message => {           
                return  React.createElement(
                    MessageRich,
                    {
                        message: message,
                    }
                )
            }))
    }
}

MessageTimeline.propTypes = {
    _toId: T.string,
    _roomId: T.string,
    messages: T.instanceOf(Immutable.Map)
}

export default MessageTimeline;