import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import {
  HomeScreenNavigationProp,
  NewsData,
  type RootStackParamList,
} from '../../type';
import {colors} from '../constants';
import {useEffect, useState} from 'react';
import {NEWS_API_KEY} from '../../config';

type NewsScreenRouteProp = RouteProp<RootStackParamList, 'News'>;
const News = () => {
  const route = useRoute<NewsScreenRouteProp>();
  const {item} = route.params;
  const [trendingNews, setTrendingNews] = useState<NewsData>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=science&apiKey=${NEWS_API_KEY}&pageSize=10`,
        );
        const data = await response.json();
        if (data?.status === 'ok') {
          setTrendingNews(data?.articles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingNews();
  }, []);

  const renderTrendingNewsCard = ({item}: {item: NewsData}) => (
    <TouchableOpacity style={styles.trendingCard} onPress={()=>navigation.navigate('News',{item})} >
      {item?.urlToImage && (
        <Image
          source={{uri: item?.urlToImage}}
          style={styles.trendingImage}
          resizeMode="cover"
        />
      )}
      <View style={{paddingHorizontal:5,}}>
        <Text style={styles.trendingTitle}>{item.title}</Text>
        <Text style={styles.trendingAuthor}>By {item.author || 'Unknown Author'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerView}>
      <Header icon={true} />
      <ScrollView style={{paddingBottom:200}}>
        {item?.urlToImage && (
          <Image
            source={{uri: item?.urlToImage}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.author}>{item?.author || 'Unknown Author'}</Text>
          <Text style={styles.publishedAt}>
            Published At: {new Date(item?.publishedAt).toLocaleString()}
          </Text>
          <Text style={styles.description}>{item?.description}</Text>
          <Text style={styles.content}>{item?.content}</Text>
          <Text style={styles.recommendationTitle}>Trending News</Text>
          
          <FlatList
            data={trendingNews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTrendingNewsCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default News;
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 16,
  },
  publishedAt: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    color: colors.gray,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  trendingList:{
    paddingVertical:10,
    paddingBottom:50,
  },
  trendingCard:{
    marginRight: 16,
    width:150,
    borderWidth:1,
    borderColor:colors.lightBlack,
    borderRadius:8,
  },
  trendingImage:{
    width: '100%',
    height: 110,
    borderRadius:8,
  },
  trendingTitle:{
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical:4,
  },
  trendingAuthor:{
    fontSize: 12,
    color: colors.lightGray,
  }
 
});
