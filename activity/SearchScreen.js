import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, ScrollView, AsyncStorage, ListView, Linking, Picker, Alert } from "react-native";
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var widthMenuBoxDashboard = (width/3) - 10;
var widthMenuBox = (width/4) - 10;
var user;

class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      isLoading: true,
      dataSource: ds,
    //   language: ""
    }
  
  }

  onSubmitForm = () => {
    // Alert.alert(this.state.pickerCategory);
    const { pickerLanguage, pickerCategory } = this.state;
    // console.warn(this.state);
    fetch(
        'https://newsapi.org/v2/top-headlines?country='+pickerLanguage+'&category='+pickerCategory+'&apiKey=3e63783bbd95447a8ea06d644c3727c3',{ 
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
    return (

      <View style={styles.container}>
        <ScrollView>
        <View>
            <Picker
            selectedValue={this.state.pickerLanguage}
            style={{height: 50, width: width}}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({pickerLanguage: itemValue})
            }>
            <Picker.Item label="-- Pilih Negara --" value="" />
            <Picker.Item label="Indonesia" value="id" />
            <Picker.Item label="US" value="us"  />
            </Picker>
        </View>

        <View>
            <Picker
            selectedValue={this.state.pickerCategory}
            style={{height: 50, width: width}}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({pickerCategory: itemValue})
            }>
            <Picker.Item label="-- Pilih Kategori --" value="" />
            <Picker.Item label="Business" value="business" />
            <Picker.Item label="Entertainment" value="entertainment" />
            <Picker.Item label="General" value="general" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="Science" value="science" />
            <Picker.Item label="Sports" value="sports" />
            <Picker.Item label="Technology" value="technology" />
            </Picker>
        </View>

        <View>
            <Button
                raised
                title='Cari'
                onPress={this.onSubmitForm} />
        </View>

        <View style={styles.container}>
            
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
                    <Text style={{fontSize:20}}>{rowData.title}</Text>
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
                    <Text style={styles.header1}>{rowData.author}</Text>
                    <Text style={styles.body1}>{rowData.description}</Text>
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
        </View>
        </ScrollView>
      </View>
    );
  }
}
export default SearchScreen;

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