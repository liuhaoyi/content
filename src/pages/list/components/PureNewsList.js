import  React from 'react';
import { ListView, PullToRefresh, Toast} from 'antd-mobile';
import { connect } from 'dva'
import router from 'umi/router';

class PureNewsList extends React.Component {

  //显示详细信息；
  onRowClick=(obj) =>{
      router.push({
        pathname: '/detail',
        query:{
            id: obj.id,
        }
    });
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
    //属性传入数据；
    let data = this.props.values ; 
    if(!data) return null;
    //没有数据，初始化为{}空数据；
    // if(!data) return null;
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    dataSource = dataSource.cloneWithRows(data);

    const row = (rowData, sectionID, rowID,highlightRow) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }} onClick={()=>{this.onRowClick(rowData)}}>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '10px 0' }}>
            <img style={{ width:'64px',height: '64px', marginRight: '15px' }} src={rowData.img} alt="" />
            <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontSize: '16px'}}>{rowData.title}</div>
              {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowData.title}</span>¥</div> */}
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
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={20}
         
        />
    </div>
    );
  }
}

export default connect()(PureNewsList);