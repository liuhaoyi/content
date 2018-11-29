import React from 'react';
import styles from './index.less';
import { NavBar, Icon, WhiteSpace, Modal, Drawer, List, Toast} from 'antd-mobile';
import GridPannel from './components/GridPannel'
import CarouselPannel from './components/CarouselPannel'
import router from 'umi/router';
import { connect } from 'dva'
import settingURL from './setting.png';

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
    open: false,
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
  onDrawerItemClick=(index)=>{
    console.log("index=" + index);
    if(index=="1"){
      //显示收藏
      router.push({
        pathname: '/list/myFavorList',
        query:{
        }
    });
    }else if(index=="2"){
      //软件说明
      Toast.info("哈尔滨石化移动客户端V1.0.1");
    }else if(index =="3"){
      //关闭菜单
    }
    this.onOpenChange();
  }
  render(){
    const sidebar = (<List>
      {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })} */}

        <List.Item key={1}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              multipleLine
              onClick={()=>this.onDrawerItemClick("1")}

            >我的收藏</List.Item>
        <List.Item key={2}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              multipleLine
              onClick={()=>this.onDrawerItemClick("2")}

            >软件说明</List.Item>
        <List.Item key={3}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              multipleLine
              onClick={()=>this.onDrawerItemClick("3")}

            >关闭菜单</List.Item>
    </List>);
    return (
      <div style={{marginTop:"45px"}}>   

        <NavBar leftContent={[
            <img src={ settingURL } onClick={()=>this.onOpenChange()}/>]}
                  mode="light"

                  rightContent={[
            <Icon key="2" type="search" onClick={()=>this.onShowSearchWindow()} />
        ]}
        >哈尔滨石化</NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >       
          <div style={{padding:"2px"}}>
            <CarouselPannel  data={this.props.mainPicList} />
            <GridPannel data={this.props.bigCatalogList}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(s) {
  const {  bigCatalogList, mainPicList} = s.main;
  return { bigCatalogList, mainPicList } ;
}
export default connect(mapStateToProps)(MainPage);