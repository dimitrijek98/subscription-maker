import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import SubscriptionService from '../../Services/SubscriptionService';

class SubscriptionList extends Component {
  constructor(props) {
    super(props);
    this.SubscriptionService = new SubscriptionService();
    this.state = {
      loading: true,
      subscriptions: null,
    };
  }

  componentDidMount = () => {
    const {user} = this.props.route.params;
    this.SubscriptionService.getAllContracts(user.email)
      .then(res => {
        console.log(res);
        this.setState({subscriptions: res.data, user, loading: false});
      })
      .catch(err => {
        console.log({...err});
      });
  };

  viewSubscription = (item) => {
    this.props.navigation.navigate('Dashboard', {
      target: item.target,
      user: this.state.user,
    });
  };

  render() {
    return (
      <>
        {this.state.loading &&
        <View style={style.container}>
          <ActivityIndicator/>
        </View>
        }
        {!this.state.loading &&
        <View style={style.container}>
          <FlatList
            style={{backgroundColor: 'transparent', flex: 1}}
            data={this.state.subscriptions}
            renderItem={({item, index}) => (
              <ListItem
                containerStyle={{
                  width: '100%',
                  height: 60,
                  marginBottom: 10,
                  backgroundColor: 'rgba(255,255,255, 0.3)',
                }}
                key={item._id}
                title={item.plan.name}
                titleStyle={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                subtitleStyle={{color: 'white', paddingLeft: 5, fontSize: 13, fontWeight: 'normal'}}
                subtitle={`Targeting: ${item.target}`}
                onPress={() => this.viewSubscription(item)}
              />
            )}
          />
        </View>
        }
      </>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#37415C',
  },
});

export default SubscriptionList;
