import React from 'react';
import { WingBlank, Carousel } from 'antd-mobile';
import { connect } from 'dva';

class CarouselPannel extends React.Component {
    state = {
    //   data: ['1', '2', '3'],
      imgHeight: '180px',
    }
    componentDidMount() {
      // simulate img loading
    //   setTimeout(() => {
    //     this.setState({
    //       data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    //     });
    //   }, 100);
    }
    render() {
      if(!this.props.data) return;
      return (
          <Carousel
            autoplay={true}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.props.data.map(val => (
              <div style={{padding:"2px"}}>
              <a
                key={val.id}
                href={"/detail?id=" + val.id}
                style={{ display: 'inline-block', width: '100%', height: "180px" }}
              >
                <img
                  src={val.img}
                  alt=""
                  style={{ width: '100%', height:'180px',verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
              </div>
            ))}
          </Carousel>
      );
    }
  }

  function mapStateToProps(state) {
    const {  bigCatalogList } = state.main;
    return { bigCatalogList } ;
  }

export default connect(mapStateToProps)(CarouselPannel);

