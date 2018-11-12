import classnames from 'classnames';
import React from 'react';

import {PropTypes as T} from 'prop-types';

class UnreadBadge extends React.Component {
    displayName = 'UnreadBadge';

    render () {
      var className,number,style;
      if (this.props.number > 0) {
          className = classnames('unread-badge',{round: this.props.round});
      if (this.props.oval){
        style = {
          height: this.props.size,
          minWidth: this.props.size,
          borderRadious: this.props.size/ 2
        };
      } else {
        style = {
          height: this.props.size,
          width: this.props.size
        };
      }
      if(!this.props.showNumber){
        style.padding = 0;
      }
      number = this.pros.showNumber? this.pros.number > 99 ?  99 : this.props.number : '';
      return React.createElement(
        'i',
        {className : className, style : style},
        number
      );
    }
    }
}

UnreadBadge.propTypes = {
  size : T.number,
  round : T.bool,
  oval : T.bool,
  number : T.number,
  showNumber : T.bool
}

UnreadBadge.defaultProps = {
  size : 14,
  round : false,
  oval :false,
  number : 0,
  showNumber : true
}
export default UnreadBadge;