import React from 'react';
import { Grid } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';

class GridPannel extends React.Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       data,
    //     };
    //   }
    componentDidMount(){

    }
    handlerClick=(item,b)=>{
        console.log(item,b);
        if(item.catalog==='0'){
            //跳转到tab列表页面；
            // this.props.dispatch(
            //     {
            //       type:"list/fetchSmallCatalog",
            //       payload:{
            //         bigCatalog: item.id,
            //         bigCatalogName: item.title,
            //       }
            //     }
            //   );

            router.push({
                pathname: '/list',
                query:{
                    bigCatalogId:item.id,
                    bigCatalogName:item.title,
                }
            });
        }else if (item.catalog==='1'){
            //跳转到单页页面；
            router.push({
                pathname: 'list/singleList',
                query:{
                    bigCatalogId:item.id,
                    bigCatalogName:item.title,
                }
            });

        }else if(item.catalog==='2'){
            //跳转到服务页；
            router.push({
                pathname: '/grid',
                query:{
                    bigCatalogId:item.id,
                    bigCatalogName:item.title,
                }
            });
        }
    }

    // handleRenderItem=(dataItem)=>{
    //     return (

    //     );
    // }
    render(){
        return (
            <div style={{ padding: '12.5px'}}>
                <Grid data={this.props.data}
                  columnNum={3} 
                  onClick={(item,b)=>this.handlerClick(item,b)}
                  renderItem={dataItem => (
                    <div style={{ padding: '12.5px'}}>
                        <div>
                            <img src={dataItem.img} style={{ width: '64px', height: '64px' }} alt="" />
                            <div style={{fontSize: '14px'}}>
                                <span>{dataItem.title}</span>
                            </div>
                       </div>
                    </div>
                  )}
                />
            </div>
          );
    }
}
function mapStateToProps(state) {
    const {  bigCatalogList } = state.main;
    return { bigCatalogList } ;
  }
  
export default connect(mapStateToProps)(GridPannel);
