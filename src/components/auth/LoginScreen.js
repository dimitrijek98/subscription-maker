import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import InfoCard from '../dashboard/InfoCard';
import AuthService from '../../Services/AuthService';
import SubscriptionService from '../../Services/SubscriptionService';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
    this.AuthService = new AuthService();
    this.SubscriptionService = new SubscriptionService();
  }

  login = () => {
    this.setState({loading: true});
    this.AuthService.login(this.state.email.toLowerCase(), this.state.password)
      .then(response => {
        this.setState({loading: false});
        this.props.navigation.navigate('Subscriptions', {user: response.data});
      })
      .catch(err => {
        alert('Problem with login');
        this.setState({loading: false});
        console.log({...err});
      });
  };

  render() {
    return (
      <View style={style.container}>
        <StatusBar backgroundColor={'#37415C'}/>
        <View style={style.formContainer}>
          {this.state.loading &&
          <View style={{flex: 1}}>
            <ActivityIndicator/>
          </View>
          }
          <InfoCard headerText={'Welcome'}>
            <View style={{width: '100%'}}>
              <Input
                containerStyle={style.input}
                placeholder="email"
                onChangeText={(text) => this.setState({email: text})}
              />
              <Input
                containerStyle={style.input}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
              />
              <Button
                title="Login"
                buttonStyle={style.button}
                titleStyle={style.buttonTitle}
                onPress={this.login}
              />
            </View>
          </InfoCard>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#37415C',
  },
  formContainer: {
    width: '100%',
    height: 350,
    justifyContent: 'space-around',
    padding: 10,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  input: {
    width: '100%',
    paddingBottom: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2D4174',
    height: 45,
    borderRadius: 10,
  },
  buttonTitle: {
    color: 'white',
  },
});
export default LoginScreen;
