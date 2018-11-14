import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva'
import React from 'react'

class App extends React.Component {
  state = {
    docked: true,
  }
  onDock = (d) => {
    this.setState({
      [d]: !this.state[d],
    });
  }
  render() {
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (<div style={{ height: '100%' }}>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={() => this.onDock('docked')}>
        Docked in document
      </NavBar>
      <Drawer
        // className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        docked={this.state.docked}
      >
        Click upper-left corner
      </Drawer>
    </div>);
  }
}

function mapStateToProps(s) {
    const {  bigCatalogList } = s.main;
    return { bigCatalogList } ;
  }
  export default connect(mapStateToProps)(App);// .my-drawer {
//   position: relative;
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
// }
// .my-drawer .am-drawer-sidebar {
//   background-color: #fff;
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
// }
// .my-drawer .am-drawer-sidebar .am-list {
//   width: 300px;
//   padding: 0;
// }