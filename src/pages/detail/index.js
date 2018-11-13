import React from 'react';
import { NavBar, Icon, ActionSheet ,Toast} from 'antd-mobile';
import { connect } from 'dva'
import sharesdk  from "../../layouts/ShareSDK"
import styles from './index.less'
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
class ContentDetailPannel extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
    console.log("global.$sharesdk" + global.$sharesdk);

  }
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));
  componentDidMount(){
    this.props.dispatch(
      {
        type:"detail/fetchDetail",
        payload:{
          "id":this.props.location.query.id,
        }
      }
    );
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  handlerRefresh=()=>{
    
    console.log(this.props.detail.id);
    // this.props.location.reload();
  }
  showReadModeActionSheet = () => {
    const BUTTONS = ['正常模式', '夜间模式', '关闭'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      title: '阅读模式',
      // message: '阅读模式',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
  showFontSizeActionSheet = () => {
    const BUTTONS = ['较大字体', '正常字体', '较小字体', '关闭'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      title: '字体大小',
      // message: '阅读模式',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
  showShareActionSheetMulpitleLine = () => {
    // const data = [[...this.dataList, this.dataList[2]], [this.dataList[3], this.dataList[4]]];
    // ActionSheet.showShareActionSheetWithOptions({
    //   options: data,
    //   // message: 'I am description, description, description',
    // },
    // (buttonIndex, rowIndex) => {
    //   this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
    // });
      // let sinaConf = 
      //         {
      //         "Id" : "1",
      //         "SortId" : "1",
      //         "AppKey" : "568898243",
      //         "AppSecret" : "38a4f8204cc784f81f9f0daaf31e02e3",
      //         "RedirectUrl" : "http://www.sharesdk.cn",
      //         "ShareByAppClient" : "true",
      //         "Enable" : "true"
      //         };
      //       //platformConfig平台配置信息可为null，此时用ShareSDK.xml
      // let platformConfig = {}; 
      // platformConfig[global.$sharesdk.PlatformID.SinaWeibo] = sinaConf;
      // global.$sharesdk.initSDKAndSetPlatfromConfig("androidv1101", platformConfig);

    // var params = {
    //   "text" : this.props.detail.title,
    //   "imageUrl" : "",
    //   "title" : this.props.detail.title,
    //   "titleUrl" : "http://sharesdk.cn",
    //   "description" : "",
    //   "site" : "mysit",
    //   "siteUrl" : "http://sharesdk.cn",
    //   "type" : global.$sharesdk.ContentType.Text
    // };
    var params = {
      "text" : "测试的文字",
      "imageUrl" : "http://img0.bdstatic.com/img/image/shouye/tangwei.jpg",
      "title" : "测试的标题",
      "titleUrl" : "http://sharesdk.cn",
      "description" : "测试的描述",
      "site" : "ShareSDK",
      "siteUrl" : "http://sharesdk.cn",
      "type" : global.$sharesdk.ContentType.Text
    };
    global.$sharesdk.showShareMenu(null, params, 100, 100, function (reqId, platform, state, shareInfo, error) {
      alert("state = " + state + "\n shareInfo = " + shareInfo + "\n error = " + error);
      // console.log("---");
    });
  }
  //评论
  showDiscuss=()=>{

  }
  render(){
    if(!this.props.detail) return null;
    return (
      <div style={{marginTop:"45px"}}>   
        <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
                  rightContent={[
          <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
        ]}
          >详细内容</NavBar>
        <div>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: "<p>dangerouslySetInnerHTML我是后台传过来的数据，你就直接把我放在特定标签，剩下的不劳您费心</p><input type='text'>"}}></div>
            <div style={{textAlign:"center"}}>标题：{this.props.detail.title}</div>
            <hr/>
            <div style={{textAlign:"center"}}>时间:{this.props.detail.date}</div>
            <hr/>
            <div>{this.props.detail.content} </div>
            <hr/>
            <div>编辑:{this.props.detail.editor}</div>
            <hr/>
            <div>阅读:{this.props.detail.readCount}</div>
           

        </div>

        {/* <div className={styles.nav}> */}
        <div style ={{display:"flex",backgroundColor:"#ffccee",height:"42px",width: "100%",position: "fixed",bottom:"0",valign:"center","justify-content":"space-around","align-items":"center"}}> 
          <div onClick={()=>{this.handlerRefresh()}}>刷新</div>
          <div  onClick={()=>{this.showReadModeActionSheet()}}>模式</div>
          <div  onClick={()=>{this.showFontSizeActionSheet()}}>字体</div>
          <div  onClick={()=>{this.showShareActionSheetMulpitleLine()}}>分享</div>
          <div  onClick={()=>{this.showShareActionSheetMulpitleLine()}}>评论</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id , detail} = state.detail;
  return { id , detail} ;
}

export default connect(mapStateToProps)(ContentDetailPannel);
