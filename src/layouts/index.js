import React from 'react';
import './index.less';
import Header from './Header';
import withRouter from 'umi/withRouter';
import { NavBar, Icon } from 'antd-mobile';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

function Layout({ children, location }) {
	return (
		<div>
			{/* <Header location = {location} /> */}
			{/* <div className = "content"> */}
				{/* <div className = "main"> */}
					  {children}
				{/* </div> */}
			{/* </div> */}
		</div>
	);
}

export default withRouter(Layout);
