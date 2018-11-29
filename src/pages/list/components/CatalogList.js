import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import NewsList from './NewsList';
import { connect } from 'dva';

class CatalogList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     activeTab: null,
    };
  }

  componentDidMount(){
  
  }

  renderTabBar=(props)=> {
    return (
      <Sticky>
          {({ style }) => <div style={{ ...style, zIndex: 1 ,position:"fixed",top:"45px",width:"100%"}}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>
    );
  }
  handlerTabClick =(data,number)=>{
    console.log("handlerTabClick=" + data.id);
    this.setState(
      {
        activeTab: data.id,
      }
    )
  }
  refreshListView = (_smallCatalog)=>{

    if(!this.state.activeTab){
      //没有被选中的，默认第一个；
      this.setState(
        {
          activeTab: this.props.data[0].id,
        }
      )
    }
    console.log("this.state.activeTab=" ,this.state.activeTab,"===",_smallCatalog);

    if(this.state.activeTab==_smallCatalog) {
      //获取顶部第一条记录时间；
      const v   = this.props.catalog2NewsList.get(_smallCatalog);
      let time  = ""
      if(!(typeof(v)=="undefined") && v.length>0){
        //获取最顶端的数据，获取时间；
        time  = v[0].modifyDatetime;
      }
      this.props.dispatch(
          {
              type:"list/fetchBeforeNewsList",
              payload:{
                "smallCatalog":_smallCatalog,
                "time": time,
              }
          }
      );
    }
  }
  render(){
    // const { data } = this.props;
    // //初次加载时，设置activeTab默认为第一个tab页。
    // if(!data) return;
    // if(data.length>0 && !this.state.activeTab){
    //   this.setState(
    //     {
    //       activeTab: data[0].id,
    //     }
    //   )
    // }
    return (
      <div>
        <StickyContainer>
          <Tabs tabs={this.props.data}
            initalPage={4}
            renderTabBar={this.renderTabBar}
            onChange = {(data,number)=>this.handlerTabClick(data,number)}
            swipeable = {false}
          >
            {
              this.props.data.map(item=>{
                return (
                        <NewsList data = {item.id} refreshListView={this.refreshListView}/>
                    )
              })
            }
          </Tabs>
        </StickyContainer>
        <WhiteSpace />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { catalog2NewsList ,smallCatalogList } = state.list;
  return { catalog2NewsList ,smallCatalogList} ;
}
  
export default connect(mapStateToProps)(CatalogList);