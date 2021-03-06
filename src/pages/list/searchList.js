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
 
  render(){

    return (
        <div style={{marginTop:"45px"}}>   
        {/* <div> */}
          <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
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
