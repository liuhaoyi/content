import React from 'react';

class UserAlias extends React.Component {
    render () {
        const {defaultName} = this.props;
        return (
            <span className = 'name text-overflow'>
                {defaultName}
            </span>
        )
    }
}

export default UserAlias;