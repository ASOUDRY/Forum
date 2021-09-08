import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import React from 'react';
import { View, KeyboardAvoidingView, Button } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import MapView from 'react-native-maps';

import CustomActions from './CustomActions';

import { AsyncStorage } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name:  this.props.route.params.name,
      test: "error"
    }

    // firebase configuration
    let firebaseConfig = {
    apiKey: "AIzaSyBRDZym0HeoUzADYSuRtCxkrhY5f32Hqbs",
    authDomain: "forum-292a4.firebaseapp.com",
    projectId: "forum-292a4",
    storageBucket: "forum-292a4.appspot.com",
    messagingSenderId: "642873887082",
    appId: "1:642873887082:web:7c770526331c3eca277d13",
    measurementId: "G-XH2J9YX9ZH"
    };

     // Initialize Firebase
     if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app()
    }
  }

  // puts messages from async into message state.
  getMessages = async () => {
    let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
  }

  // deletes messages from async and the message state
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // This checks if the app is offline.
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({
          connected: true
        })

        // This function connects to the chatroom object
        this.chatroomMessages = firebase.firestore().collection('chatroom')

        // This authorizes the user anonymoussly
        this.auth = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
        
          //update user state with currently active user data
          this.setState({
            uid: user.uid,
            // preloads initial messages
            messages: [
              {
                _id: 1,
                text: `Hello ${this.state.name}`,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
               },
               {
                _id: 2,
                text: `Welcome to the Forum`,
                createdAt: new Date(),
                system: true,
               },
               {
                _id: 3,
                text: `${this.state.name} has entered the chat`,
                createdAt: new Date(),
                system: true,
               }
            ]
          });

        // This takes a snapshot of the collection, orders it by creation date, and sends it to this.onCollectionUpdate
        this.messageSnapshot = this.chatroomMessages.orderBy('createdAt').onSnapshot(this.onCollectionUpdate);
        });
          } else {
            this.setState({
              connected: false
            })
            console.log('offline');
            this.getMessages()
          }
        });
  }
  
  componentWillUnmount() {
  this.auth()
  this.messageSnapshot()
 }

 //  Function that adds new messages to the collection
 addMessages = (messages) => {
   this.chatroomMessages.add({
     _id: messages[0]._id,
     createdAt: messages[0].createdAt,
     text: messages[0].text || "",
     user: messages[0].user,
     image: messages[0].image || "",
     location: messages[0].location || null,
   })
 }
// function that adds messages from the collection to the state
 onCollectionUpdate = (querySnapshot) => {
  //  makes sure it doesn't add functions, except when it loads the first time.
   if (this.state.messages.length <= 3) {
    querySnapshot.forEach(
      (doc) => {
       var data = (doc.data())
       this.setState(previousState => ({
         messages: GiftedChat.append(previousState.messages, {
           _id: data._id,
           createdAt: data._createdAt,
           text: data.text || "",
           user: data.user,
           image: data.image || "",
           location: data.location || null,
         }),
       }));
       }
      )
   }
 }

//  Store messages in Async.
 saveMessages = async () => {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

// function to send the messages in the message state to chat.
  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.saveMessages()
    },
    )
    this.addMessages(messages);
  }
// changes the speach bubble to set a color, in this case black.""
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'red'
          }
        }}
      />
    )
  }

  renderInputToolbar = (props) => {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }


  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }
  
  render() {
    // sets name on the top of the chatroom
      let { name } = this.props.route.params; 
      let color = this.props.route.params.color

      console.log(color);
      this.props.navigation.setOptions({ title: name });

      return (
        // wraps the return in a single wrapper. Style is needed for View to render.
       <View style={{
        height: '100%', 
        width: '100%',
        backgroundColor: color
        }} >
          {/* Fixes height for for Android phones and Ioss Ipad */}
         <KeyboardAvoidingView behavior="height" />
         {/* The actual chatroom component */}
         <GiftedChat
          renderCustomView={this.renderCustomView}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar}
          messages={this.state.messages}
          onSend={messages => {
              this.onSend(messages)
            }}
            user={{
              _id: this.state.uid,
            }}
          />
          <Button
          onPress={() => {
            this.deleteMessages()
          }}
          title="Delete"
          ></Button>      
       </View>       
    ) 
  }
}