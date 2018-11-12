import React from 'react';
import ReactDOM from 'react-dom';
import withRouter from 'umi/withRouter';
import { NavBar, Icon,  ListView ,Tabs, WhiteSpace} from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'dva';
import NewsList from './components/NewsList';




class MyCatalog extends React.Component {
  componentDidMount(){
    console.log(this.props.location)
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
      <div>
          <NavBar leftContent={[
          <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                  mode="light"
                  rightContent={[
          <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
        ]}
          >{bigCatalogName}</NavBar>
          <NewsList data={this.props.newsList}/>
          {/* <Demo/> */}
        </div>
    );
  }
}

// const tabs = [
//   { title: 'First Tab' },
//   { title: 'Second Tab' },
//   { title: '集团风采' },
//   { title: 'Four Tab' },
// ];

// class CatalogList extends React.Component {
//   renderTabBar=(props)=> {
//     return (<Sticky>
//       {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
//     </Sticky>);
//   }
//   render(){
//     return (
//       <div>
//         <WhiteSpace />
//         <StickyContainer>
//           <Tabs tabs={this.props.data}
//             initalPage={'t2'}
//             renderTabBar={this.renderTabBar}
//           >
//             {this.props.data.map(item=>{
//               return (
//                 <div>
//                   <NewsList data = {item.id} />
//                 </div>
//               )
//             })}
//           </Tabs>
//         </StickyContainer>
//         <WhiteSpace />
//       </div>
//     )
//   }
// }

// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//     title: 'McDonald\'s invites you',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//     title: 'Eat the week',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
// ];
const NUM_ROWS = 20;
let pageIndex = 0;

// function genData(pIndex = 0) {
//   const dataBlob = {};
//   for (let i = 0; i < NUM_ROWS; i++) {
//     const ii = (pIndex * NUM_ROWS) + i;
//     dataBlob[`${ii}`] = `row - ${ii}`;
//   }
//   return dataBlob;
// }



//  //新闻大类
//  bigCatalog: null,
//  //新闻大类名称
//  bigCatalogName: null,
 
//  //新闻小类
//  smallCatalog: null,
//  //新闻小类名称
//  smallCatalogName: null,

//  //新闻时间
//  time:null,
//  smallCatalogList:[],
//  // [{
//  //     id: null,
//  //     title: null,
//  // }]
//  newsList: [],
// export default withRouter(Layout);

function mapStateToProps(state) {
  const { bigCatalog, smallCatalog, smallCatalogList,newsList} = state.list;
  return { bigCatalog, smallCatalog, smallCatalogList,newsList} ;
}

export default connect(mapStateToProps)(MyCatalog);
