import React, { Component } from 'react';
import {View, FlatList } from 'react-native';
import {Tile, Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Menu extends Component {

    static navigationOptions = {
        title: 'Menu'
    };



    render () {

      const renderMenuItem = ({item, index}) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                />
            // <ListItem key={index}>
            //     <Avatar rounded title={item.name} source={require('./images/uthappizza.png')} />
            //     <ListItem.Content>
            //         <ListItem.Title>{item.name}</ListItem.Title>
            //         <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            //     </ListItem.Content>
            // </ListItem>
            );
         };
    const { navigate } = this.props.navigation;

        return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}  
                />
            );
    }
   
}

export default connect(mapStateToProps)(Menu);