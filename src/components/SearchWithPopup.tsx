import React, {useState, useRef, useEffect} from 'react';
import debounce from 'lodash/debounce';
import capitalize from 'lodash/capitalize';
import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {EntertainmentItem, UserFirebaseDataShape} from '../types/Types';
import APIService from '../services/APIService';
import globalStyles from '../styles/globalStyles';
import {Icon} from 'react-native-elements';
import {getImage} from '../utils/Utils';

interface Props {
  toggleItemConsumption: (item: EntertainmentItem) => any;
  userData: UserFirebaseDataShape;
  setSearchActive: (val: boolean) => any;
  searchActive: boolean;
}

const SearchWithPopup = ({
  toggleItemConsumption,
  setSearchActive,
  searchActive,
  userData,
}: Props) => {
  const isFirstRun = useRef(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [queryInRun, setQueryInRun] = useState(false);
  const [search, setSearch] = useState('');
  const [searchItems, setSearchItems] = useState<EntertainmentItem[]>([]);
  const makeQuery = async (searchVal: string) => {
    setQueryInRun(true);
    const movieAndSeriesItems = await APIService.getDataFromOMDbAPI(searchVal);
    const gamesItems = await APIService.getDataFromGiantBomb(searchVal);

    setQueryInRun(false);

    setSearchItems([...movieAndSeriesItems, ...gamesItems]);
  };
  const onSearch = (value: string) => {
    setSearchActive(true);

    if (value.length < 4) {
      setSearchItems([]);
      setErrorMessage('Search value is too short. Please specify longer query');
    } else {
      setErrorMessage('');
      makeQuery(value);
    }
  };
  const getItemLabel = (item: EntertainmentItem) => {
    if (item.type === 'movie') {
      return 'Obejrzane';
    } else if (item.type === 'series') {
      return 'Obejrzane';
    } else if (item.type === 'book') {
      return 'Przeczytane';
    } else {
      return 'Zagrane';
    }
  };
  const checkIfItemActive = (item: EntertainmentItem) => {
    return userData[item.id]?.watched;
  };
  const onClose = () => {
    setSearchItems([]);
    setSearchActive(false);
  };
  const debouncedQuery = debounce(onSearch, 1000);
  const debounceRef = useRef(debouncedQuery);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    debounceRef.current(search);
  }, [search]);

  return (
    <View
      style={{
        ...styles.mainContainer,
        ...(searchActive
          ? {
              flexGrow: 1,
            }
          : {}),
      }}>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={globalStyles.input}
          placeholder={'Search Favorites ...'}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {searchActive && (
        <>
          <View style={styles.searchContainer}>
            {!!errorMessage && (
              <View>
                <Text>{errorMessage}</Text>
              </View>
            )}
            <ScrollView
              style={styles.mainScrollView}
              contentInsetAdjustmentBehavior="automatic">
              {queryInRun && (
                <View>
                  <ActivityIndicator size="large" color="#f2be12" />
                </View>
              )}
              {searchItems.map((item, index) => (
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
                      <View onTouchEnd={() => toggleItemConsumption(item)}>
                        {checkIfItemActive(item) ? (
                          <Icon
                            size={25}
                            name="trash"
                            type="font-awesome-5"
                            color="#D50000"
                          />
                        ) : (
                          <Icon
                            size={25}
                            name="add"
                            type="material"
                            color="#4388d6"
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.closeContainer} onTouchEnd={onClose}>
            <Icon size={33} name="close" type="material" color="#D50000" />
          </View>
        </>
      )}
    </View>
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
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 17,
    fontWeight: '700',
  },

  textInputWrapper: {
    marginBottom: 10,
  },
  mainScrollView: {
    paddingLeft: 5,
    paddingRight: 20,
  },
  mainContainer: {
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  searchContainer: {
    //height: 400,
    flexGrow: 1,
    flexBasis: 0,
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
  },
});

export default SearchWithPopup;
