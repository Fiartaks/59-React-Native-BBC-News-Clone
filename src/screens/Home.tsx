import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {colors, Tabs} from '../constants';
import {React, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp, type NewsData} from '../../type';
import {NEWS_API_KEY} from '../../config';
import Loader from '../components/Loader';

type Tab = (typeof Tabs)[number];

const CATEGORY_MAP: Record<Tab, string> = {
  'Top Stories': 'general',
  Business: 'business',
  Politics: 'politics',
  Science: 'science',
  Technology: 'technology',
  Sport: 'sport',
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsData[]>([]);
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    getData(1);
    setPage(1);
  }, [selectedTab]);

  const getData = async (page: number) => {
    try {
      setLoading(true);
      const category = CATEGORY_MAP[selectedTab];
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${perPage}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
      );
      const data = await response.json();
      if (data?.status === 'ok') {
        setNews(prevNews =>
          page === 1 ? data?.articles : [...prevNews, ...data?.articles],
        );
      }
    } catch (error) {
      console.log('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      getData(page);
    }
  }, [page]);

  const renderTabItem = ({item}: {item: string}) => (
    <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(item)}>
      <Text
        style={[styles.tabText, item === selectedTab && styles.tabTextActive]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderNewsCard = ({item}: {item: NewsData}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('News',{item})}>
      {item?.urlToImage && (
        <Image
          source={{uri: item?.urlToImage}}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.description}</Text>
        <Text style={styles.author}>{item?.author}</Text>
        <Text style={styles.publishedAt}>
          Published at: {new Date(item.publishedAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header />
      <View style={styles.tabView}>
        <FlatList
          data={Tabs}
          keyExtractor={item => item}
          renderItem={renderTabItem}
          horizontal
          contentContainerStyle={styles.tabContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {loading && page === 1 ? (
        <Loader />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsCard}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <ActivityIndicator
              size="large"
              color={colors.gray}
              style={styles.indicatorStyle}
            />
          }
        />
      )}
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },
  header: {
    backgroundColor: colors.black,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabView: {
    marginVertical: 10,
  },
  tabContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: colors.black,
    fontSize: 16,
  },
  tabTextActive: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.lightBlack,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  publishedAt: {
    fontSize: 12,
    color: colors.lightGray,
  },
  indicatorStyle: {
    marginVertical: 5,
  },
});
