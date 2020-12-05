import React, { Component } from 'react';
import { View, Platform} from 'react-native';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contactus from './ContactusComponent';
import Aboutus from './AboutusComponent';
import Dishdetail from './DishdetailComponent';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
}, 
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const AboutusNavigator = createStackNavigator({
    Aboutus: { screen: Aboutus }
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const ContactusNavigator = createStackNavigator({
    Contactus: { screen: Contactus }
}, 
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions:{
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions:{
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    Aboutus: {
        screen: AboutusNavigator,
        navigationOptions:{
            title: 'About us',
            drawerLabel: 'About us'
        }
    },
    Contactus: {
        screen: ContactusNavigator,
        navigationOptions:{
            title: 'Contact us',
            drawerLabel: 'Contact us'
        }
    },
},{
    drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {

    render() {
        return(
           <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;