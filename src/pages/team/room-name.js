import React from 'react';
import classnames from 'classnames';
import {PropTypes as T} from 'prop-types';

class RoomName extends React.Component {
    displayName = 'room-name';

    render() {
        let name = this.props.name;
        return React.createElement(
            'span',
            {className : classnames(this.props.className)},
            name
        )
    }
}

RoomName.propTypes = {
    name: T.string.isRequired,
    className :T.string
}

export default RoomName;