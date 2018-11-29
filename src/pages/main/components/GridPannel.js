import React from 'react';
import { Grid } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';

class GridPannel extends React.Component{
    handlerClick=(item,b)=>{
        console.log(item,b);
        if(item.catalog==='0'){
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

    render(){
        return (
            // <div style={{ padding: '12.5px'}}>
                <Grid data={this.props.data}
                  columnNum={3} 
                  onClick={(item,b)=>this.handlerClick(item,b)}
                //   itemStyle={{  background: "#990000" ,alignItems:"center",alignContent:"center"}}
                  renderItem={dataItem => (
                    // <div>
                        <div>
                            <img src={dataItem.img} style={{ width: '96px', height: '96px' }} alt="" />
                            {/* <div style={{fontSize: '14px'}}>
                                <span>{dataItem.title}</span>
                            </div> */}
                       </div>
                    // </div>
                  )}
                />
          );
    }
}
function mapStateToProps(state) {
    const {  bigCatalogList } = state.main;
    return { bigCatalogList } ;
}

export default connect(mapStateToProps)(GridPannel);
