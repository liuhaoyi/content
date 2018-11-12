import React from 'react';
import {PropTypes as T} from 'prop-types';
import classNames from 'classnames';
import assign from 'object-assign';


class Icon extends React.Component{

	render() {
		return (
			<div className = {this.getClassName()} style = {this.getStyle()} onClick = {this.onClick}>
				{this.props.children}
			</div>
		)
	}

	getClassName = () => {
		let icon = this.props.type + " " + this.props.type + "-" + this.props.name;
		return classNames(icon, this.props.className);
	}

	getStyle = () => {
		return assign({}, this.props.color ? {
			color: this.props.color
				} : void 0, {
			fontSize: this.props.size
				}, this.props.backgroundColor ? {
			backgroundColor: this.props.backgroundColor
				} : void 0);
	}

	onClick = (event) => {
		return this.props.onClick(event);
	}
}

Icon.propTypes = {
	name:T.string.isRequired,
	size:T.number,
	type:T.string,
	color:T.string,
	onClick:T.func,
	className:T.string,
	backgroundColor:T.string
};

Icon.defaultProps ={
	size:16, 
	type:'ti',
	shape: 'round',
	onClick: () => {},
	className: ''
};

export default Icon;
