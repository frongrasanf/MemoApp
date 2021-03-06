import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import firebase from 'firebase';
import { db } from '../../App';

import CircleButton from '../elements/CircleButton';

class MemoCreateScreen extends React.Component {
  state = {
    body: '',
    body2: '',
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    db.collection(`users/${currentUser.uid}/memos`).add({
      body: this.state.body2,
      createdOn: new Date(),
    })
      .then(() => {
        this.setState({ body: this.state.body2 });
        this.props.navigation.goBack();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body2: text }); }}
          textAlignVertical="top"
        />
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'\uf00c'}
        </CircleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoCreateScreen;
