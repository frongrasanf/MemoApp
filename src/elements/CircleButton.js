import React from 'react';
import { Font } from 'expo';

import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf';

class CircleButton extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentWillMount() {
    await Font.loadAsync({
      FontAwesome: fontAwesome,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { style, color, onPress } = this.props;

    let bgColor = '#E31676';
    let textColor = '#fff';

    if (color === 'white') {
      bgColor = '#fff';
      textColor = '#E31676';
    }
    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={[styles.CircleButton, { backgroundColor: bgColor }]}>
          {
            this.state.fontLoaded ? (
              <Text style={[styles.CircleButtonTitle, { color: textColor }]}>
                {this.props.children}
              </Text>
            ) : null
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 26,
    right: 26,
  },
  CircleButton: {
    width: 48,
    height: 48,
    margin: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  CircleButtonTitle: {
    fontFamily: 'FontAwesome',
    lineHeight: 32,
    fontSize: 24,
  },
});

export default CircleButton;
