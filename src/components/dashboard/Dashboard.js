import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import InfoCard from './InfoCard';
import {Button} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscription: null,
      selected: 0,
      selectedExtra: -1,
    };
  }

  componentDidMount = () => {
    let subscription = {
      user: {
        email: 'user@user.com',
      },
      target: 'phone or address',
      plan: {
        name: 'Plan name',
        price: 3500,
        services: [
          {
            type: 'internet',
            speed: '100/10',
            amount: 'unlimited',
            IPAddress: 'Static',
            extras: ['Static IP'],
          },
          {
            type: 'phone',
            minutes: 500,
            extras: ['Roaming 100'],
          },
          {
            type: 'cable',
            channels: 160,
            extras: ['HBO'],
          },
        ],
      },
    };
    this.setState({subscription});
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
    if(this.state.selectedExtra === index){
      this.setState({selectedExtra: -1});
    } else {
      this.setState({selectedExtra: index});
    }

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
              />
              }
            </TouchableOpacity>
          );
        })
      }
      <TouchableOpacity style={style.addExtraItem}>
        <Text style={style.accentText}>+</Text>
      </TouchableOpacity>
    </>;

  };

  changeSelected = (selected) => {
    this.setState({selected});
  }

  render() {
    return (
      this.state.subscription &&
      <ScrollView>
        <StatusBar backgroundColor={'#37415C'} />
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
                this.state.subscription.plan.services.map((extra ,index) => {
                  return <TouchableOpacity key={index} onPress={() => this.changeSelected(index)} style={index === this.state.selected ?
                    {...style.activeTab, width: (width - 100) / this.state.subscription.plan.services.length} :
                    {...style.inactiveTab, width: (width - 100) / this.state.subscription.plan.services.length}}>
                    <Text style={index === this.state.selected ? style.activeText : style.inactiveText}>{extra.type}</Text>
                  </TouchableOpacity>
                })
              }

            </View>
            <InfoCard headerText={'Info'}>
              {this.renderInfo()}
            </InfoCard>
            <InfoCard headerText={'Info'}>
              {this.renderExtras()}
            </InfoCard>
          </View>

        </View>
      </ScrollView>

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
