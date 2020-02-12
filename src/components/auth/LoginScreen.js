import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';
import InfoCard from '../dashboard/InfoCard';

class LoginScreen extends Component {
  login = () => {
    this.props.navigation.navigate('Dashboard');
  };
  render() {
    return (
      <View style={style.container}>
        <StatusBar backgroundColor={'#37415C'}/>
        <View style={style.formContainer}>
         <InfoCard headerText={'Welcome'}>
           <View style={{width:'100%'}}>
             <Input
               containerStyle={style.input}
               placeholder="email"
             />
             <Input
               containerStyle={style.input}
               placeholder="password"
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
