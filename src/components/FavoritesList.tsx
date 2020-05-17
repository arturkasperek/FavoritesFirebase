import React from 'react';
import map from 'lodash/map';
import capitalize from 'lodash/capitalize';
import {View, ScrollView, Button, Image, Text, StyleSheet} from 'react-native';
import {EntertainmentItem, UserFirebaseDataShape} from '../types/Types';
import globalStyles from '../styles/globalStyles';
import {Icon} from 'react-native-elements';
import {getImage} from '../utils/Utils';

interface Props {
  userData: UserFirebaseDataShape;
  removeItemConsumption: (item: EntertainmentItem) => any;
}

const FavoritesList = ({userData, removeItemConsumption}: Props) => {
  const items = map(userData, (value) => {
    return value;
  })
    .filter((i) => i.watched)
    .map((i) => i.data);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentInsetAdjustmentBehavior="automatic">
      <Text style={globalStyles.title}>My Favorites</Text>
      {items.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <View style={{width: 100}}>
            <Image
              style={styles.imageItem}
              source={{
                uri: getImage(item.imageURL),
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.itemRightColumn}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View>
                <Text>{capitalize(item.type)}</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
              }}>
              <View onTouchEnd={() => removeItemConsumption(item)}>
                <Icon
                  size={25}
                  name="trash"
                  type="font-awesome-5"
                  color="#D50000"
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemRightColumn: {
    paddingLeft: 20,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageItem: {
    height: 100,
    backgroundColor: '#F5F5F5',
  },
  mainContainer: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 20,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default FavoritesList;
