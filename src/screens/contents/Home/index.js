/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import {Colors, Image, Card} from 'react-native-ui-lib';
import CarouselScreen from './CarouselScreen';

const data = [
  {
    text: 'Veg Food',
  },
  {
    text: 'Cold Drinks',
  },
  {
    text: 'Indian Food',
  },
];

const cleaning = [
  {
    text: 'Laundry Service',
  },
  {
    text: 'Press Service',
  },
  {
    text: 'Press Provider',
  },
];

const resto = [
  {
    text: 'Hotel Service',
  },
  {
    text: 'Hotel Provider',
  },
  {
    text: 'Hotel Menus',
  },
];

const width = Dimensions.get('window').width / 2.8;

export default function Home() {
  const CardView = ({item, title, image}) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.darkText}> {title} </Text>
        <View style={styles.rowCard}>
          {item.map(d => {
            return (
              <Card
                // flex
                width={100}
                center
                style={styles.card}>
                <Card.Image style={styles.cardImage} source={{uri: image}} />
                <Card.Section
                  content={[{text: d.text, text80: true}]}
                  contentStyle={{alignItems: 'center'}}
                />
              </Card>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={[{flex: 0.4}, styles.box]}>
            <Image
              assetName={'suitcase'}
              style={styles.image}
              resizeMode={'contain'}
            />
            <Text style={styles.darkText}>All Service Provider</Text>
          </View>
          <View style={styles.line} />
          <View style={[{flex: 0.6}, styles.box]}>
            <Image
              assetName={'searchIcon'}
              style={styles.image}
              resizeMode={'contain'}
            />
            <TextInput placeholder={'Search'} />
          </View>
        </View>
      </View>
      <View>
        <CarouselScreen />
      </View>
      <CardView
        item={data}
        title={'Most Used Services'}
        image={
          'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      />
      <CardView
        item={cleaning}
        title={'Home Cleaning'}
        image={
          'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      />
      <CardView
        item={resto}
        title={'Resto'}
        image={
          'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  rowCard: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    marginRight: 5,
    width: width,
    height: 100,
    padding: 5,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
  },
  darkText: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
    flexWrap: 'wrap',
  },
  line: {
    height: '100%',
    width: 0.5,
    backgroundColor: Colors.lightGray,
  },

  cardImage: {
    height: 50,
    width: 50,
  },
});
