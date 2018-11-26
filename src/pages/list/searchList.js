import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import PureNewsList from './components/PureNewsList';

//搜索列表；
class SearchList extends React.Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount(){
    //标题查询；
    const title = this.props.location.query.title;
    this.props.dispatch(
      {
        type:"list/fetchSearch",
        payload:{
          title,
        }
      }
    );
  }
 
  // refreshListView = (_smallCatalog)=>{
  //   // console.log("this.state.activeTab=" + this.state.activeTab);
  //   // if(this.state.activeTab!=_smallCatalog) return ;
  //     //获取顶部第一条记录时间；
  //     const v   = this.props.catalog2NewsList.get(_smallCatalog);
  //     let time  = ""
  //     if(!(typeof(v)=="undefined") && v.length>0){
  //       //获取最顶端的数据，获取时间；
  //       time  = v[0].modifyDatetime;
  //     }
  //     this.props.dispatch(
  //         {
  //             type:"list/fetchBeforeNewsList",
  //             payload:{
  //               "smallCatalog":_smallCatalog,
  //               "time": time,
  //             }
  //         }
  //     );
  // }
  render(){
    // const bigCatalogName = this.props.location.query.bigCatalogName;

    return (
        <div style={{marginTop:"45px"}}>   
        {/* <div> */}
          <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
        //           rightContent={[
        //   <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
        // ]}
          >搜索结果</NavBar>
          <div>
            <PureNewsList values = {this.props.searchResultList} />
          </div>
        </div>
    );
  }
}

const NUM_ROWS = 20;
let pageIndex = 0;

function mapStateToProps(state) {
  const { bigCatalog, smallCatalog, smallCatalogList,newsList,catalog2NewsList, searchResultList } = state.list;
  return { bigCatalog, smallCatalog, smallCatalogList,newsList,catalog2NewsList,searchResultList} ;
}

export default connect(mapStateToProps)(SearchList);
