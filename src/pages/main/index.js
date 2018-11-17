import React from 'react';
import styles from './index.less';
import { Drawer, List, NavBar, Icon, WhiteSpace} from 'antd-mobile';

import GridPannel from './components/GridPannel'
import CarouselPannel from './components/CarouselPannel'
// import Setting from './components/Setting'

import { connect } from 'dva'

class MainPage extends React.Component{

  componentDidMount(){
    //加载大类型数据；
    this.props.dispatch(
      {
        type:"main/fetchBigCatalog",
        payload:{
        }
      }
    );
    //-------
    this.props.dispatch(
      {
        type:"main/fetchMainPicList",
        payload:{
          "smallCatalog": "shouyedongtu",
          "currentPage": "1",
          "pageSize": "8",
        }
      }
    );
    // this.props.dispatch(
    //   {
    //     type:"list/fetchBeforeNewsList",
    //     payload:{
    //       "smallCatalog":this.props.data,
    //       "time": "",
    //      }
    //   }
    // );
  }
  // state = {
  //   docked: true,
  // }
  // onDock = (d) => {
  //   console.log(d);
  //   this.setState({
  //     [d]: !this.state[d],
  //   });
  // }

  state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render(){

    // const sidebar = (<List>
    //   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
    //     if (index === 0) {
    //       return (<List.Item key={index}
    //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //         multipleLine
    //       >Category</List.Item>);
    //     }
    //     return (<List.Item key={index}
    //       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //     >Category{index}</List.Item>);
    //   })}
    // </List>);
// fix in codepen
// const sidebar = (<List>
//   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
//     if (index === 0) {
//       return (<List.Item key={index}
//         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//         multipleLine
//       >Category</List.Item>);
//     }
//     return (<List.Item key={index}
//       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//     >Category{index}</List.Item>);
//   })}
// </List>);
    return (
      <div style={{marginTop:"45px"}}>   
           <NavBar leftContent={[
                <Icon key="1" type="ellipsis" onClick={()=>this.onOpenChange}/>]}
                      mode="light"
    
                      rightContent={[
                <Icon key="2" type="search" onClick={()=>console.log("click right search")} />
            ]}
            >华云合创</NavBar>
            {/* <Drawer
              className="my-drawer"
              style={{ minHeight: document.documentElement.clientHeight }}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 100 }}
              sidebar={sidebar}
              open={this.state.open}
              onOpenChange={this.onOpenChange}
            >
          </Drawer> */}
          <WhiteSpace />
            <CarouselPannel  data={this.props.mainPicList}/>
          <div>
            <GridPannel data={this.props.bigCatalogList}/>
          </div>
          <WhiteSpace />
        </div>
    );
  }
}

function mapStateToProps(s) {
  const {  bigCatalogList, mainPicList} = s.main;
  return { bigCatalogList, mainPicList } ;
}
export default connect(mapStateToProps)(MainPage);