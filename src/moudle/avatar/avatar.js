import React from 'react';
import './avatar.less';
import {PropTypes as T} from 'prop-types';
import classNames from 'classnames';
import assign from 'object-assign';


class Avatar extends React.Component{

	render() {
		return (
			/* className can be no-avatar */
			<div className = {this.getClassName()} style = {this.getStyle()} onClick = {this.onClick}>
				{this.props.children}
			</div>
		)
	}

	getClassName = () => {
		return classNames(this.props.className, 'avatar', this.props.size, this.props.shape);
	}

	getStyle = () => {
		var backgroundColor, backgroundImage;
		if ((this.props.backgroundColor != null) && !this.props.src) {
			backgroundColor = {
				backgroundColor: this.props.backgroundColor
			};
		}
		if (this.props.src.length > 0) {
			backgroundImage = {
				backgroundImage: "url(" + this.props.src + ")"
			};
		}
		return assign({}, backgroundColor, backgroundImage);
	}

	onClick = (event) => {
		return this.props.onClick(event);
	}
}

Avatar.propTypes = {
	//backgound image location
	src:T.string,
	size:T.oneOf(['small','normal','large','medium']),
	color: T.string,
	shape: T.oneOf(['corner','round']),
	onClick: T.func,
	className: T.string,
	backgroundColor: T.string
};

Avatar.defaultProps ={
	src:'', 
	size:'normal',
	shape: 'round',
	onClick: () => {},
	className: ''
};

export default Avatar;
