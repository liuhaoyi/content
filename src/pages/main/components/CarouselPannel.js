import React from 'react';
import { WingBlank, Carousel } from 'antd-mobile';
import { connect } from 'dva';

class CarouselPannel extends React.Component {
    state = {
    //   data: ['1', '2', '3'],
      imgHeight: 120,
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
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.props.data.map(val => (
              <a
                key={val.id}
                href="/detail?id={val.id}"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={val.img}
                  alt=""
                  style={{ width: '100%', height:'200px',verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
      );
    }
  }

  function mapStateToProps(state) {
    const {  bigCatalogList } = state.main;
    return { bigCatalogList } ;
  }

export default connect(mapStateToProps)(CarouselPannel);

