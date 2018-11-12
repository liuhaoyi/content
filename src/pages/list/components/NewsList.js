import  React from 'react';
import { ListView, PullToRefresh, Toast} from 'antd-mobile';
import { connect } from 'dva'
import router from 'umi/router';

class NewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: null,
    };
  }
  
  componentDidMount() {
    this.props.dispatch(
      {
          type:"list/fetchBeforeNewsList",
          payload:{
            "smallCatalog":this.props.data,
            "time": "",
          }
        }
      );
  }

  onRowClick=(obj) =>{
      router.push({
        pathname: '/detail',
        query:{
            id: obj.id,
        }
    });
  }

  handlerDownRefresh = (_smallCatalog) => {
      this.props.refreshListView(_smallCatalog);
  };

  handlerRenderFooter(){
    return(
      <div style={{ padding: 5, textAlign: 'center' }} onClick={()=>this.handlerFooterClick()}>
        {this.props.loading.effects['list/fetchAfterNewsList'] ? '正在加载...' : '加载更多...'}
      </div>
    );
  }
  handlerFooterClick(){
    // hasMore: from backend data, indicates whether it is the last page, here is false
    // if (this.state.isLoading && !this.state.hasMore) {
    //   return;
    // }
    // this.setState({ isLoading: true });
    const v = this.props.catalog2NewsList.get(this.props.data);
    let time  = ""
    if(!(typeof(v)=="undefined") && v.length>0){
      //初次没有数据情况下，获取最新的数据；
      time  = v[v.length-1].modifyDatetime;
    }
    this.props.dispatch(
      {
        type:"list/fetchAfterNewsList",
        payload:{
          "smallCatalog":this.props.data,
          "time": time,
        }
      }
    );
  }

  render() {
    const separator = (sectionID, rowID, adjacentRowHighlighted) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 4,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let data = this.props.catalog2NewsList.get(this.props.data);
    //没有数据，初始化为{}空数据；
    if(!data) return null;
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    dataSource = dataSource.cloneWithRows(this.props.catalog2NewsList.get(this.props.data));

    let index = data.length - 1;
    const row = (rowData, sectionID, rowID,highlightRow) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }} onClick={()=>{this.onRowClick(rowData)}}>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '10px 0' }}>
            <img style={{ width:'64px',height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
            </div>
          </div>
        </div>
      );
    };
    
    return (
      <div style={{marginTop:"47px"}}>
        <ListView
          ref={el => this.lv = el}
          dataSource={dataSource}
          renderFooter={() => this.handlerRenderFooter() }
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          // style={{height:"300px"}}
                  // onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={20}
          pullToRefresh={
                <PullToRefresh
                    // refreshing={this.state.refreshing}
                    onRefresh={()=>this.handlerDownRefresh(this.props.data)}
                    direction="down"
                />
            }
        />
    </div>
    );
  }
}
  function mapStateToProps(state) {
    const { bigCatalog, smallCatalog, smallCatalogList, catalog2NewsList} = state.list;
    const { loading } = state;
    return { bigCatalog, smallCatalog, smallCatalogList,catalog2NewsList,loading} ;
  }
  
  export default connect(mapStateToProps)(NewsList);