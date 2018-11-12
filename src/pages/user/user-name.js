import React from 'react';
import classNames from 'classnames';
import {PropTypes as T} from 'prop-types';


class UserName extends React.Component {
    displayName = 'user-name';

    
    render() {
       let name = this.props.name;
       return  React.createElement(
           this.props.component,
           {className: classNames(this.props.className)},
           name
       )
    }
}

UserName.propTypes = {
    _teamId : T.string,
    _userId : T.string,
    isRobot : T.bool,
    name : T.string,
    service : T.string,
    className : T.string,
    component : T.any
}

UserName.defaultProps = {
    component: 'span'
}
export default UserName;