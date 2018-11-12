import React from 'react';

class RelativeTime extends React.Component {
    render () {
        const {data, edited} = this.props;
        return (
            <span className = 'relative-time muted'>
                {data}
            </span>
        )
    }
}

export default RelativeTime;