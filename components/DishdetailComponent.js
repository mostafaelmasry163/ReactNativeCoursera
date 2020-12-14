import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return (
            <Card 
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image}}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon 
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()}
                />
                <Icon 
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => props.handleComment()}
                />
            </Card>
        );
    }
    else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments =props.comments;

    const renderCommentItem = ({ item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Rating 
                    imageSize={12}
                    readonly
                    startingValue={parseInt(item.rating)}
                    style={{alignItems: 'center'}}
                />
                <Text style={{fontSize: 12}}>
                    {'-- '+item.author + ', ' +
                        new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(item.date))
                    }
                </Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            author: '',
            comment: '',
            rating: 5,
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 5,
            showModal: false
        });       
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    handleComment={() => this.toggleModal()}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments 
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add Comment</Text>
                        <Rating showRating 
                            startingValue={parseInt(this.state.rating)}
                            onFinishRating={(rating) => this.setState({ rating: rating})}
                        />
                        <Input 
                            style={styles.modalText}
                            placeholder='Author'
                            leftIcon={{type: 'font-awesome', name: 'user'}}
                            onChangeText={(author) => this.setState({author: author})}
                        />
                        <Input 
                            style={styles.modalText}
                            placeholder='Comment'
                            leftIcon={{type: 'font-awesome', name: 'comment'}}
                            onChangeText={(comment) => this.setState({comment: comment})}
                        />
                        <Button onPress={() => {this.handleComment(dishId); this.resetForm()}}
                            color='#512DA8'
                            title='Submit'
                            style={styles.modalText}
                        />
                        <Button onPress={() => this.toggleModal()}
                            color='gray'
                            title='Cancel'
                            style={styles.modalText}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom:20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);