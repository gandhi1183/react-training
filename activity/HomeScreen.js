import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, ScrollView, AsyncStorage, ListView, Linking } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Swiper from 'react-native-swiper';

console.disableYellowBox = false;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var widthMenuBoxDashboard = (width/3) - 10;
var widthMenuBox = (width/4) - 10;
var user;

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };
  
  constructor(props) {
    
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      isLoading: true,
      dsHead: [],
      textOten: "",
      dataSource: ds
    }
  
  }

  componentDidMount() {
    
    fetch(
      'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=3e63783bbd95447a8ea06d644c3727c3',{ 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((result) => result.json())
    .then((res) => {
      // console.warn("data from api", res)
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        isLoading: false,
        status : res.status,
        dataSource: ds.cloneWithRows(res.articles),
      }) 

      // console.warn(this.state.dataSource);
    })
    .catch((error) =>{
      alert('NETWORK ERROR');
    });
  }

  render() {
    // console.warn(this.state);
    return (
      // console.warn(this.state.dataSource);
      <View style={styles.container}>
        <ScrollView>
          <ListView
                  dataSource={this.state.dataSource}
                  renderRow={
                  (rowData) =>
          <TouchableHighlight
          onPress={() => this.props.navigation.navigate(
              "DetailBerita",
              {
                urlBerita : rowData.url,
                title: rowData.title
              }
              )}
          underlayColor="white">
          <View>
            <Text style={{fontSize:20}}>{rowData.author}</Text>
            <Image
              style={{width: width, height: 200}}
              source={{uri: rowData.urlToImage}}
            />
            <View
              style={{
                flex:1,
                flexDirection:"row",
                marginTop:10
              }}
            >
              <Icon name="comment" size={25} style={{color:'gray', marginLeft:5, marginRight: 5}} />
              <Icon name="done" size={25} style={{color:'gray', marginLeft:5, marginRight: 5}} />
              <Icon name="share" size={25} style={{color:'gray', marginLeft:5, marginRight: 5}} />
            </View>
            <Text style={styles.header1}>{rowData.title}</Text>
            <Text style={styles.body1}>{rowData.content}</Text>
            <Text style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginTop:10,
              marginBottom:10
            }}></Text>
          </View>
          </TouchableHighlight>
                  }
          />

        </ScrollView>
      </View>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FCFCFC",
    marginLeft:10,
    marginRight:10
  },
  header1: {
    fontSize: 16,
    marginBottom:10,
    marginTop:10,
    fontWeight:"bold"
  },
  body1: {
    fontSize: 12
  }
});