import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CircleButton from '../elements/CircleButton';

const dateString = (date) => {
  if (date == null) { return ''; }
  // firebaseのtimestampであれば、Date型に変換する
  const dateObject = typeof date.toDate === 'undefined' ? date : date.toDate();
  return dateObject.toISOString().split('T')[0];
};

class MemoDetailScreen extends React.Component {
  state = {
    memo: {},
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ memo: params.memo });
  }

  returnMemo(memo) {
    this.setState({ memo });
  }

  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.memoHeader}>
          <View>
            <Text style={styles.memoHeaderTitle}>{memo.body.substring(0, 10)}</Text>
            <Text style={styles.memoHeaderDate}>{dateString(memo.createdOn)}</Text>
          </View>
        </View>

        <View style={styles.memoContent}>
          <Text style={styles.memoBody}>
            {memo.body}
          </Text>
        </View>
        <CircleButton
          color="white"
          style={styles.editButton}
          onPress={() => { this.props.navigation.navigate('MemoEdit', { ...memo, returnMemo: this.returnMemo.bind(this) }); }}
        >
          {'\uf040'}
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
  memoHeader: {
    height: 100,
    backgroundColor: '#17313C',
    justifyContent: 'center',
    padding: 10,
  },
  memoHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    fontSize: 14,
    color: '#fff',
  },
  memoContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 68,
  },
});

export default MemoDetailScreen;
