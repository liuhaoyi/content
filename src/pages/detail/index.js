import React from 'react';
import ReactDOM from 'react-dom';

import { NavBar, Icon, ActionSheet ,ActivityIndicator} from 'antd-mobile';
import { connect } from 'dva'
import sharesdk  from "../../layouts/ShareSDK"
import styles from './index.less'
import router from 'umi/router';
import ContentPannel from './content'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
@connect(({ detail, loading }) => ({
  id:detail.id,
  detail,
  loading: loading.effects['detail/fetchDetail']
}))
class ContentDetailPannel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
      fontSize: "medium",
    };
    console.log("global.$sharesdk" + global.$sharesdk);

  }
  // dataList = [
  //   { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
  //   { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
  //   { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
  //   { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
  //   { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  // ].map(obj => ({
  //   icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
  //   title: obj.title,
  // }));
  // componentDidMount(){

  // }

  handlerRefresh=()=>{
    // this.forceUpdate();
    // console.log(this.props.detail.id);
    // this.props.location.reload();
    // this.props.location.reload();
    // console.log("location=",JSON.stringify(this.props.location));
  }
  setFontSize=(fontsize)=>{
    localStorage.setItem("fontsize",fontsize);
  }

  setDayOrNight=(value)=>{
    localStorage.setItem("day_night",value);
  }

  showReadModeActionSheet = () => {
    const BUTTONS = ['正常模式', '夜间模式', '关闭'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // destructiveButtonIndex: BUTTONS.length - 2,
      title: '阅读模式',
      // message: '阅读模式',
      maskClosable: true,
      // 'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
      if(buttonIndex===0){
        //正常模式
        this.setDayOrNight("day");
      }else if(buttonIndex===1){
        //夜间模式
        this.setDayOrNight("night");
      }
    });
  }
  showFontSizeActionSheet = () => {
    const BUTTONS = ['较大字体', '正常字体', '较小字体', '关闭'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // destructiveButtonIndex: BUTTONS.length - 2,
      title: '字体大小',
      // message: '阅读模式',
      maskClosable: true,
      // 'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
      // this.setState({ clicked: BUTTONS[buttonIndex] });
      //大：0，正常：1，小：2
      console.log("buttonIndex=",buttonIndex);
      if(buttonIndex===0){
        this.setState({ fontSize: "large" });
        this.setFontSize("large");
      }else if(buttonIndex===1){
        this.setState({ fontSize: "medium" });
        this.setFontSize("medium");
      }else{
        this.setState({ fontSize: "small" });
        this.setFontSize("small");
      }
    });
  }
  showShareActionSheetMulpitleLine = () => {
    var params = {
      "text" : this.props.location.query.title,
      "imageUrl" : "http://img0.bdstatic.com/img/image/shouye/tangwei.jpg",
      "title" : this.props.location.query.title,
      "titleUrl" : "http://localhost:8001/detail/content?id=" + this.props.location.query.id,
      "description" : "测试的描述",
      "site" : "ShareSDK",
      "siteUrl" : "http://sharesdk.cn",
      "type" : global.$sharesdk.ContentType.Text
    };
    global.$sharesdk.showShareMenu(null, params, 100, 100, function (reqId, platform, state, shareInfo, error) {
      alert("state = " + state + "\n shareInfo = " + shareInfo + "\n error = " + error);
    });
  }
  //评论
  showDiscuss=()=>{

  }
  onClickHandler=()=>{
    this.props.history.goBack();
  }
  render(){
    let fontsize = localStorage.getItem("fontsize");
    if(!fontsize){
      localStorage.setItem("fontsize","medium");
      fontsize = "medium";
    }
    let day_night = localStorage.getItem("day_night");
    let color = null;
    let backgroundColor = null;
    if(!day_night){
      localStorage.setItem("day_night","day");
      color = "#000000";
      backgroundColor = "#ffffff";
    }else{
      if(day_night==="night"){
        color = "#ffffff";
        backgroundColor = "#000000";
      }else{
        color = "#000000";
        backgroundColor = "#ffffff";
      }
    }
   
    return (
      <div style={{marginTop:"45px"}}>   
        <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.onClickHandler()} />,]}
                  mode="light"
                  rightContent={[
          <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
        ]}
          >详细内容</NavBar>
        <div style={{ height:document.body.clientHeight, overflow:"scroll" ,marginTop:"45px",paddingBottom:"100px" ,backgroundColor:backgroundColor,color:color}}>
          <ContentPannel id={ this.props.location.query.id } fontSize = { fontsize }/>
        </div>
        <div style ={{display:"flex",backgroundColor:"#6e0a07",color:"#fff",height:"42px",width: "100%",position: "fixed",bottom:"0",valign:"center","justify-content":"space-around","align-items":"center"}}> 
          <div onClick={()=>{this.handlerRefresh()}}>刷新</div>
          <div  onClick={()=>{this.showReadModeActionSheet()}}>模式</div>
          <div  onClick={()=>{this.showFontSizeActionSheet()}}>字体</div>
          <div  onClick={()=>{this.showShareActionSheetMulpitleLine()}}>分享</div>
          {/* <div  onClick={()=>{this.showShareActionSheetMulpitleLine()}}>评论</div> */}
        </div>
        <ActivityIndicator
                toast
                text="Loading..."
                animating={ this.props.loading ?true:false}
              />
      </div>

    );
  }
}

export default ContentDetailPannel
