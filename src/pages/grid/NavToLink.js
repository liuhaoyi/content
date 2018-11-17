import React from 'react'
import { NavBar, Icon} from 'antd-mobile'
import { connect } from 'dva'
class NavToLink extends React.Component{
    
    componentDidMount(){

    }
    render(){
        const url = this.props.location.query.url;
        return (
            <div style={{marginTop:"45px"}}>   
                <NavBar leftContent={[
                <Icon key="1" type="left" onClick={()=>this.props.history.goBack()} />,]}
                        mode="light"
                        rightContent={[
                <Icon key="1" type="ellipsis" onClick={()=>console.log("click ellipsis")} />,
                ]}
                >{ this.props.location.query.title }</NavBar>
                <div style={{position:"absolute",width:"100%",top:"50px",bottom:"0",marginBottom:"0px" ,overflow:"auto","-webkit-overflow-scrolling": "touch",
                "overflow-y": "scroll"}}>
                <iframe 
                    style={{ overflow:"scroll"}}
                    ref="iframe" 
                    src={ url } 
                    width="100%" 
                    height="100%"
                    scrolling="yes" 
                    frameBorder="0"
                    />
            </div>
        </div>
    );
  }
}

// function mapStateToProps(state) {
//     const { smallCatalogList} = state.grid;
//     return { smallCatalogList} ;
//   }
  
  export default connect()(NavToLink);