import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,
  ImageBackground 
} from 'react-native';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: '',
          color: '' };
      }
        
  render() {
    // button that triggers Onpress to go to the next page.
    const AppButton = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
    );
    return (
      // the background element
      <ImageBackground source={require(`../assets/background.png`)} style={styles.backImage}>
        <Text style={styles.title} >Forum</Text>
        <View style={styles.container}>

          {/* Name input box */}
        <TextInput styles={styles.nameBox}
         
          onChangeText={(name) => this.setState(
            {name}
            )}
          value={this.state.name}
          // template literal does not work
          placeholder='Enter your Username'
        />
         <Text style={styles.text}>
          Choose Background Color:
        </Text>
        {/* The foor buttons to choose the background style. Choosing color is still not operational though */}
        <View style={styles.colorSelection}>
          <TouchableOpacity
            onPress={() => this.setState({ color: '#090C08'})}
            style={[styles.colorButton, styles.color1]}
          />
          <TouchableOpacity
            onPress={() => this.setState({ color: '#474056'})}
            style={[styles.colorButton, styles.color2]}
          />
          <TouchableOpacity
            onPress={() => this.setState({ color: '#8A95A5'})}
            style={[styles.colorButton, styles.color3]}
          />
          <TouchableOpacity
            onPress={() => this.setState({ color: '#B9C6AE'})}
            style={[styles.colorButton, styles.color4]}
          />
        </View>
        {/* the actual button when rendered */}
        <AppButton size="sm" backgroundColor="#007bff" 
        title='Enter the Forum'
        onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name, color: this.state.name})}
        />
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    // height: '44%',
    width: '88%'
  },
  backImage:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  nameBox: {
    fontSize: 20,
    fontWeight: "600",
    color: '#000000',
    borderWidth: 1,
    borderColor: 'black',
    width: '88%'
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "300",
    color: 'black'
  },
  title:{
    flex: 1,
    alignItems: 'center',
    fontSize: 45,
    fontWeight: "600",
    color: '#FFFFFF',
    marginTop: 75,
  },
  colorSelection:{
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 15
  },
  colorButton:{
      height: 35,
      width: 35,
      borderRadius: 70,
      margin: 20
  },
  color1:{
    backgroundColor: '#090C08'
  },
  color2:{
    backgroundColor: '#474056'
  },
  color3:{
    backgroundColor: '#8A95A5'
  },
  color4:{
    backgroundColor: '#B9C6AE'
  },
  button: {
    fontSize: 24,
    fontWeight: "600",
    color: 'white',
    backgroundColor: 'grey',
    width: '88%',   
  },
  appButtonContainer: {
    backgroundColor: "#009688",
    width: '88%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});