import React, {useState, useRef, useEffect} from 'react';
import debounce from 'lodash/debounce';
import capitalize from 'lodash/capitalize';
import {View, Text, Image, TextInput, ActivityIndicator} from 'react-native';
import {EntertainmentItem} from '../types/Types';
import APIService from '../services/APIService';

interface Props {}

const SearchWithPopup = ({}: Props) => {
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
    if (value.length < 4) {
      setSearchItems([]);
      setErrorMessage('Search value is too short. Please specify longer query');
    } else {
      setErrorMessage('');
      makeQuery(value);
    }
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
    <View>
      <Text>Search with Popup</Text>
      <View>
        <TextInput
          placeholder={'Search'}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {queryInRun && (
        <View>
          <ActivityIndicator size="large" color="#f2be12" />
        </View>
      )}
      {searchItems.length > 0 && (
        <View>
          {searchItems.map((item, index) => (
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
            </View>
          ))}
        </View>
      )}
      {!!errorMessage && (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default SearchWithPopup;
