import React from 'react';
import ReactDOM from 'react-dom';

import { ActionSheet ,ActivityIndicator} from 'antd-mobile';
import { connect } from 'dva'

// function Layout({ children, location }) {
// 	return (
// 		<div>
//         <NavBar leftContent={[
//           <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
//                   mode="light"
//                   rightContent={[
//           <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
//         ]}
//           >详细内容</NavBar>
//         <ContentDetail/>
//         </div>
//   )
// }
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
@connect(({ detail, loading }) => ({
  detail: detail.detail,
  loading: loading.effects['detail/fetchDetail']
}))
class ContentPannel extends React.Component{

  componentDidMount(){
    let id  = "";
    if(this.props.location){
      id = this.props.location.query.id;
    }else {
      id = this.props.id;
    }
    this.props.dispatch(
      {
        type:"detail/fetchDetail",
        payload:{
          "id": id,
        }
      }
    );
  }

  
  render(){
    if(!this.props.detail) return null;
    const fontSize = this.props.fontSize?this.props.fontSize:"medium" ;
    return (
        <div style={{padding:"10px","font-size": fontSize}}>

            <div style={{textAlign:"center",fontWeight:"bold",paddingTop:"20px"}}>{this.props.detail.title}</div>
            <div style={{textAlign:"center"}}>{this.props.detail.publishDate}</div>
            <hr/>
            <div dangerouslySetInnerHTML={{__html:this.props.detail.content}}></div>
            <hr/>
            <div>编辑:&nbsp;&nbsp;{this.props.detail.editor}</div>
            <hr/>
            <div>阅读:&nbsp;&nbsp;{this.props.detail.readCount}</div>
        </div>
    );
  }
}
export default ContentPannel
