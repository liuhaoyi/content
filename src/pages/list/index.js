import React from 'react';
import ReactDOM from 'react-dom';
import withRouter from 'umi/withRouter';
import { NavBar, Icon,  ListView ,Tabs, WhiteSpace} from 'antd-mobile';
import { connect } from 'dva';
import CatalogList from './components/CatalogList';
import styles from './index.less'

class MyCatalog extends React.Component {

  componentDidMount(){

    const bigCatalogId = this.props.location.query.bigCatalogId;
    this.props.dispatch(
      {
        type:"list/fetchSmallCatalog",
        payload:{
          "bigCatalog":bigCatalogId
        }
      }
    )
  }

  render(){

    const bigCatalogName = this.props.location.query.bigCatalogName;
    return (
        <div style={{marginTop:"45px"}}>   
        {/* <div> */}
          <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
        //           rightContent={[
        //   <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
        // ]}
          >{bigCatalogName}</NavBar>
          <div>
          <CatalogList data={this.props.smallCatalogList} />
          </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
  const { bigCatalog, smallCatalog, smallCatalogList,newsList} = state.list;
  return { bigCatalog, smallCatalog, smallCatalogList,newsList} ;
}

export default connect(mapStateToProps)(MyCatalog);
