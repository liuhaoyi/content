import React from 'react'
import { connect } from 'dva';
import { NavBar, Icon} from 'antd-mobile';
import GridNavPannel from './components/GridNavPannel'
import router from 'umi/router';

// @connect(({ grid }) => ({
//     gridNavList: grid.gridNavList,
// }))
class MyGrid extends React.Component {

    componentDidMount(){
        const bigCatalogId = this.props.location.query.bigCatalogId;
        //加载图片列表；
        this.props.dispatch({
            type: "grid/fetchSmallCatalog",
            payload: {
                bigCatalog: bigCatalogId, 
                bigCatalogName: ""
            }
        });
    }
    handlerClick=(item,b)=>{
        if(!item.link){
            console.log("link == null");
            //跳转到单页页面；
            router.push({
                pathname: 'list/singleList',
                query:{
                    bigCatalogId:item.id,
                    bigCatalogName:item.title,
                }
            });
        }else{
            console.log("link not null");
            //跳转到单页页面；
            router.push({
                pathname: 'grid/NavToLink',
                query:{
                    url: item.link,
                    title: item.title,
                }
            });
        }
    }
    render(){
        const bigCatalogName = this.props.location.query.bigCatalogName;
        return (
            <div style={{marginTop:"45px"}}>   
                {/* <div> */}
                <NavBar leftContent={[
                <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                        mode="light"
                //         rightContent={[
                // <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
                // ]}
                >{bigCatalogName}</NavBar>
                <div style={{padding:"4px"}}>
                    <GridNavPannel data={this.props.smallCatalogList} handlerClick={this.handlerClick}/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { smallCatalogList} = state.grid;
    return { smallCatalogList} ;
  }
  
  export default connect(mapStateToProps)(MyGrid);