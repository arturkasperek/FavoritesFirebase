import React from 'react';
import map from 'lodash/map';
import capitalize from 'lodash/capitalize';
import {View, Button, Image, Text} from 'react-native';
import {EntertainmentItem, UserFirebaseDataShape} from '../types/Types';

interface Props {
  userData: UserFirebaseDataShape;
}

const FavoritesList = ({userData}: Props) => {
  const items = map(userData, (value) => {
    return value;
  })
    .filter((i) => i.watched)
    .map((i) => i.data);

  return (
    <View>
      {items.map((item, index) => (
        <View key={index}>
          <View>
            <Image
              style={{height: 100}}
              source={{uri: item.imageURL}}
              resizeMode={'contain'}
            />
          </View>
          <View>
            <Text>{item.title}</Text>
          </View>
          <View>
            <Text>{capitalize(item.type)}</Text>
          </View>
          <View>
            <Button title={'Remove'} onPress={() => {}} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default FavoritesList;
