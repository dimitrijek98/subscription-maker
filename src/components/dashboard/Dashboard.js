import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar, ActivityIndicator,
} from 'react-native';
import InfoCard from './InfoCard';
import {Button} from 'react-native-elements';
import SubscriptionService from '../../Services/SubscriptionService';

const {width, height} = Dimensions.get('window');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.SubscriptionService = new SubscriptionService();
    this.state = {
      subscription: null,
      selected: 0,
      selectedExtra: -1,
      loading: true,
    };
  }

  componentDidMount = () => {
    const {target, user} = this.props.route.params;
    const focusEvent = this.props.navigation.addListener('focus', () => {
      this.fetchContract(user.email, target);
    });
    this.setState({user});
    this.SubscriptionService.getConcreteContract(user.email, target)
      .then(response => {
        this.setState({subscription: response.data, loading: false});
      })
      .catch(err => {
        console.log({...err});
      });
  };

  fetchContract = (email, target) => {
    console.log('fetching');
    this.setState({loading: true});
    this.SubscriptionService.getConcreteContract(email, target)
      .then(response => {
        this.setState({subscription: response.data, loading: false});
      })
      .catch(err => {
        console.log({...err});
      });
  };

  renderInfo = () => {
    return Object.entries(this.state.subscription.plan.services[this.state.selected]).map((res, index) => {
      if (index < Object.keys(this.state.subscription.plan.services[this.state.selected]).length - 1 && index > 0) {
        return (
          <View style={style.infoLine} key={index}>
            <Text style={style.label}>{res[0]}</Text>
            <Text style={style.accentText}>{res[1]}</Text>
          </View>);
      }
    });
  };

  selectExtra = (index) => {
    if (this.state.selectedExtra === index) {
      this.setState({selectedExtra: -1});
    } else {
      this.setState({selectedExtra: index});
    }
  };

  addExtra = () => {
    this.props.navigation.navigate('AllExtras', {
      myExtras: [
        ...this.state.subscription.plan.services[this.state.selected].extras,
      ],
      type: this.state.subscription.plan.services[this.state.selected].type,
      subscription: this.state.subscription,
      user: this.state.user,
    });
  };

  removeExtra = (extra) => {
    let data = {
      email: this.state.subscription.user.email,
      target: this.state.subscription.target,
      type: this.state.subscription.plan.services[this.state.selected].type,
      name: extra,
    };
    console.log(data);
    this.SubscriptionService.deleteExtras(data)
      .then(res => {
        console.log('delete',res);
        this.fetchContract(this.state.subscription.user.email, this.state.subscription.target);
      })
      .catch(err => {
        console.log({...err});
      });
  };

  renderExtras = () => {
    return <>
      {
        this.state.subscription.plan.services[this.state.selected].extras.map((ext, index) => {
          return (
            <TouchableOpacity onPress={() => this.selectExtra(index)} key={index} style={style.extraItem}>
              <Text style={style.coverText}>{ext}</Text>
              {this.state.selectedExtra === index &&
              <Button
                title="Cancel"
                buttonStyle={style.cancelButton}
                titleStyle={{color: 'white'}}
                onPress={() => this.removeExtra(ext)}
              />
              }
            </TouchableOpacity>
          );
        })
      }
      <TouchableOpacity onPress={() => this.addExtra()} style={style.addExtraItem}>
        <Text style={style.accentText}>+</Text>
      </TouchableOpacity>
    </>;

  };

  changeSelected = (selected) => {
    this.setState({selected});
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
        <ScrollView>
          <StatusBar backgroundColor={'#37415C'}/>
          <View style={style.container}>
            <View style={style.coverContainer}>
              <ImageBackground source={require('../../assets/cover.jpg')} style={style.coverImage}>
                <Text style={style.coverText}>{this.state.subscription.plan.name}</Text>
              </ImageBackground>
              <View style={style.targetContainer}>
                <Text style={style.label}>Target: </Text>
                <Text style={style.accentText}>{this.state.subscription.target}</Text>
              </View>
            </View>
            <View style={style.detailContainer}>
              <View style={style.tabContainer}>
                {
                  this.state.subscription.plan.services.map((extra, index) => {
                    return <TouchableOpacity key={index} onPress={() => this.changeSelected(index)}
                                             style={index === this.state.selected ?
                                               {
                                                 ...style.activeTab,
                                                 width: (width - 100) / this.state.subscription.plan.services.length,
                                               } :
                                               {
                                                 ...style.inactiveTab,
                                                 width: (width - 100) / this.state.subscription.plan.services.length,
                                               }}>
                      <Text
                        style={index === this.state.selected ? style.activeText : style.inactiveText}>{extra.type}</Text>
                    </TouchableOpacity>;
                  })
                }

              </View>
              <InfoCard headerText={'Info'}>
                {this.renderInfo()}
              </InfoCard>
              <InfoCard headerText={'Extras'}>
                {this.renderExtras()}
              </InfoCard>
            </View>

          </View>
        </ScrollView>}
      </>

    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37415C',
  },
  coverContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  coverText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    elevation: 10,
  },
  coverImage: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
  targetContainer: {
    width: width - 50,
    marginBottom: -40,
    backgroundColor: '#F5F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    borderRadius: 10,
    elevation: 10,
  },
  label: {
    color: '#707070',
    fontSize: 20,
  },
  accentText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D4174',
  },
  detailContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: width - 100,
    height: 40,
    borderColor: '#F5F6FF',
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 30,
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6FF',
    borderRadius: 50,
    height: 40,
  },
  inactiveTab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    height: 40,
  },
  activeText: {
    fontSize: 15,
    color: '#2D4174',
  },
  inactiveText: {
    fontSize: 15,
    color: '#F5F6FF',
  },
  infoLine: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraItem: {
    alignItems: 'center',
    backgroundColor: '#2D4174',
    width: '100%',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  addExtraItem: {
    alignItems: 'center',
    backgroundColor: '#F5F6FF',
    borderColor: '#2D4174',
    borderWidth: 2,
    width: '100%',
    borderRadius: 20,
    padding: 10,
  },
  cancelButton: {
    borderRadius: 100,
    width: width - 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#D96060',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  input: {
    paddingBottom: 15,
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 45,
  },
  buttonTitle: {
    color: '#202334',
  },
});
export default Dashboard;
