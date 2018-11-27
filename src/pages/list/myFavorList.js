import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import PureNewsList from './components/PureNewsList';

//收藏
class MyFavorList extends React.Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount(){
    //标题查询；
    // const title = this.props.location.query.title;
    const userId = sessionStorage.getItem("userId");
    
    this.props.dispatch(
      {
        type:"list/fetchFavorList",
        payload:{
          userId,
        }
      }
    );
  }
 
  render(){
    return (
        <div style={{marginTop:"45px"}}>   
          <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
          >收藏</NavBar>
          <div>
            <PureNewsList values = {this.props.favorList} />
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const {  favorList } = state.list;
  return { favorList} ;
}

export default connect(mapStateToProps)(MyFavorList)
