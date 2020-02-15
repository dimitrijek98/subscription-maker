import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import SubscriptionService from '../../Services/SubscriptionService';
import {Button, ListItem} from 'react-native-elements';

class AllExtras extends Component {
  constructor(props) {
    super(props);
    this.SubscriptionService = new SubscriptionService();
    this.state = {
      extras: [],
      selected: [],
      subscription: {},
      type: '',
      myExtras: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    const {myExtras, type, subscription} = this.props.route.params;
    console.log(myExtras);
    this.setState({myExtras, subscription, type});
    this.SubscriptionService.getAllExtras(type)
      .then(res => {
        this.filterExtras(res.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  };

  filterExtras = (extras) => {
    let filteredExtras = extras.filter(
      extra => this.state.myExtras.indexOf(extra.name) === -1 && this.state.selected.indexOf(extra) === -1,
    );
    this.setState({extras: filteredExtras, loading: false}, () => console.log(this.state.extras));
  };

  addExtra = (extra) => {
    let extras = [...this.state.selected];
    extras.push(extra);
    let data = {
      email: this.state.subscription.user.email,
      target: this.state.subscription.target,
      type: this.state.type,
      name: extra.name,
    };
    this.SubscriptionService.setNewExtras(data)
      .then(res => {
        console.log(res);
        this.setState({selected: extras}, () => this.filterExtras(this.state.extras));
      })
      .catch(err => {
        console.log({...err});
      });
  };

  removeExtra = (extra) => {
    let extras = [...this.state.selected];
    extras = extras.filter(e => e !== extra);
    let data = {
      email: this.state.subscription.user.email,
      target: this.state.subscription.target,
      type: this.state.type,
      name: extra.name,
    };
    this.SubscriptionService.deleteExtras(data)
      .then(res => {
        console.log(res);
        this.setState({selected: extras}, () => this.filterExtras([...this.state.extras, extra]));
      })
      .catch(err => {
        console.log({...err});
      });

  };

  emptyList = () => {
    return <View style={{flex: 1, paddingTop: 30}}>
      <Text style={style.header}>There are no additional extras to choose.</Text>
    </View>;
  };

  addExtras = () => {
    this.props.navigation.navigate('Dashboard', {
      target: this.state.subscription.target,
      user: this.state.user,
    });
  };

  render() {
    return (
      <>
        {this.state.loading &&
        <View style={style.container}>
          <ActivityIndicator/>
        </View>}
        {!this.state.loading &&
        <View style={style.container}>
          {this.state.selected.length > 0 &&
          <>
            <Text style={style.header}>Choosen Extras</Text>
            <FlatList
              style={{backgroundColor: 'transparent', flex: 1}}
              data={this.state.selected}
              renderItem={({item, index}) => (
                <ListItem
                  containerStyle={{
                    width: '100%',
                    height: 60,
                    marginBottom: 10,
                    backgroundColor: 'rgba(255,255,255, 0.3)',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}
                  key={item._id}
                  title={item.name}
                  rightTitle={'Remove item'}
                  rightTitleStyle={{color: 'red', fontSize: 15, fontWeight: 'bold'}}
                  titleStyle={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                  onPress={() => this.removeExtra(item)}
                />
              )}
            />
          </>}
          <FlatList
            style={{backgroundColor: 'transparent', flex: 1}}
            data={this.state.extras}
            ListEmptyComponent={this.emptyList}
            renderItem={({item, index}) => (
              <ListItem
                containerStyle={{
                  width: '100%',
                  height: 60,
                  marginBottom: 10,
                  backgroundColor: 'rgba(255,255,255, 0.3)',
                }}
                key={item._id}
                title={item.name}
                titleStyle={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                rightTitle={'Add item'}
                rightTitleStyle={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}
                onPress={() => this.addExtra(item)}

              />
            )}
          />
          {this.state.selected.length > 0 &&
          <Button
            title="Submit changes"
            buttonStyle={style.button}
            titleStyle={style.buttonTitle}
            onPress={this.addExtras}
          />}
        </View>}
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
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 45,
    borderRadius: 10,
  },
  buttonTitle: {
    color: '#2D4174',
  },
});

export default AllExtras;
