/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Constants,
  Spacings,
  View,
  Text,
  Carousel,
  Image,
  Colors,
} from 'react-native-ui-lib';

const screenWidth = Dimensions.get('window').width;
const INITIAL_PAGE = 2;
const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];
const BACKGROUND_COLORS = [
  Colors.red50,
  Colors.yellow20,
  Colors.purple50,
  Colors.green50,
  Colors.cyan50,
  Colors.purple20,
  Colors.blue60,
  Colors.red10,
  Colors.green20,
  Colors.purple60,
];

class CarouselScreen extends Component {
  carousel = React.createRef();
  dimensionsChangeListener = {};

  constructor(props) {
    super(props);

    this.state = {
      orientation: Constants.orientation,
      width: this.getWidth(),
      limitShownPages: false,
      numberOfPagesShown: 3,
      currentPage: INITIAL_PAGE,
      autoplay: true,
    };
  }

  componentDidMount() {
    this.dimensionsChangeListener = Constants.addDimensionsEventListener(
      this.onOrientationChange,
    );
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(
      this.dimensionsChangeListener || this.onOrientationChange,
    );
  }

  onOrientationChange = () => {
    if (this.state.orientation !== Constants.orientation) {
      this.setState({
        orientation: Constants.orientation,
        width: this.getWidth(),
      });
    }
  };

  getWidth = () => {
    return screenWidth - 20;
  };

  onChangePage = currentPage => {
    this.setState({currentPage});
  };

  onPagePress = index => {
    if (this.carousel && this.carousel.current) {
      this.carousel.current.goToPage(index, true);
    }
  };

  render() {
    const {limitShownPages, numberOfPagesShown, autoplay, width} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          key={numberOfPagesShown}
          ref={this.carousel}
          //loop
          autoplay={autoplay}
          onChangePage={this.onChangePage}
          pageWidth={width}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={INITIAL_PAGE}
          containerStyle={{height: 160}}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          pageControlProps={{onPagePress: this.onPagePress, limitShownPages}}
          // showCounter
          allowAccessibleLayout>
          {_.map([...Array(numberOfPagesShown)], (item, index) => (
            <Page style={{}} key={index}>
              <Image
                source={{uri: IMAGES[index]}}
                resizeMode={'stretch'}
                style={{height: '100%', width: '100%'}}
              />
            </Page>
          ))}
        </Carousel>
      </ScrollView>
    );
  }
}

// @ts-ignore
const Page = ({children, style, ...others}) => {
  return (
    <View {...others} style={[styles.page]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    // marginHorizontal: 20,
  },
  page: {
    flex: 1,
    borderWidth: 1,
  },
  loopCarousel: {
    position: 'absolute',
    bottom: 15,
    // left: 10,
  },
});

export default CarouselScreen;
