import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  SignIn: undefined;
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>


  export interface NewsData{
    author:string,
    content:string,
    description:string,
    publishedAt:string,
    source:{
        id:string,
        name:string
    };
    title:string,
    url:string,
    urlToImage:string,
  }