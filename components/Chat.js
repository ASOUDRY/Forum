import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name:  this.props.route.params.name
    }
  }

  componentDidMount() {
    this.setState({
      // default messages dispatched when the user enters the chat
      messages: [
        {
          _id: 1,
          text: 'Hello' + ' ' + this.state.name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'Welcome to the Forum',
          createdAt: new Date(),
          system: true,
         },
         {
          _id: 3,
          text: this.state.name + ' ' + 'has entered the chat',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }
// function to send the messages in the message state to chat.
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
// changes the speach bubble to set a color, in this case black.""
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  
  render() {
    // sets name on the top of the chatroom
      let { name } = this.props.route.params; 
      this.props.navigation.setOptions({ title: name });

      return (
        // wraps the return in a single wrapper. Style is needed for View to render.
       <View style={{
        height: '100%', width: '100%'}} >
          {/* Fixes height for for Android phones and Ioss Ipad */}
         <KeyboardAvoidingView behavior="height" />
         {/* The actual chatroom component */}
         <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />      
       </View>
          
    ) 
  }
}