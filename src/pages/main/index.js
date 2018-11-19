import React from 'react';
import styles from './index.less';
import { NavBar, Icon, WhiteSpace, Modal} from 'antd-mobile';
import GridPannel from './components/GridPannel'
import CarouselPannel from './components/CarouselPannel'
import router from 'umi/router';

import { connect } from 'dva'
const prompt = Modal.prompt;

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
    //加载首页动图列表；
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
  }
  state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  //显示查询对话框；
  onShowSearchWindow=()=>{
    prompt('搜索', '', [
      { text: '取消' },
      { text: '提交', onPress: value => this.onSearchHandler(value)},
    ], 'default', '');
  }
  //查询数据；
  onSearchHandler=(title)=>{
    router.push({
        pathname: '/list/searchList',
        query:{
          title,
        }
    });
  }
  render(){
    return (
      <div style={{marginTop:"45px"}}>   
        <NavBar leftContent={[
            <Icon key="1" type="ellipsis" onClick={()=>this.onOpenChange}/>]}
                  mode="light"

                  rightContent={[
            <Icon key="2" type="search" onClick={()=>this.onShowSearchWindow()} />
        ]}
        >华云合创</NavBar>
        <WhiteSpace />
        <CarouselPannel  data={this.props.mainPicList}/>
        <div>
          <GridPannel data={this.props.bigCatalogList}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(s) {
  const {  bigCatalogList, mainPicList} = s.main;
  return { bigCatalogList, mainPicList } ;
}
export default connect(mapStateToProps)(MainPage);