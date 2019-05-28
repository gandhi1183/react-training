import React, {Component} from 'react';
import {WebView} from 'react-native';

class DetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        // console.warn(navigation.state.params);  
        const title = navigation.state.params && navigation.state.params.title ? navigation.state.params.title: '';
          return {
              title
          };
      };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            isLoading: true,
            stateUrlBerita : navigation.state.params.urlBerita,
        };
    // console.warn(navigation.state.params.urlBerita);
    }

  render() {
    return (
      <WebView
        source={{uri: this.state.stateUrlBerita}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default DetailScreen;