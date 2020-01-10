
import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

class CommonModal extends React.Component {

  props: {
    animationType?: string,
    modalVisible: boolean,
    render: (result: LoadResult) => React$Element<any>,
    onRequestClose?: Function,
    onClickModal?: Function, // 可以用来点击关闭这个modal
    style?: View.propTypes.style,
  }


  static defaultProps = {
    modalVisible: false,
    animationType: 'fade',
    onRequestClose() { console.log('modal已关闭'); },
    onClickModal() { console.log('。。。'); },
  }

  _callBack = (e) => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(e);
    }
  }
  onClickModal = () => {
    this.props.onClickModal && this.props.onClickModal();
  }


  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent
        visible={this.props.modalVisible}
        onRequestClose={this._callBack}
      >
        <TouchableWithoutFeedback onPress={this.onClickModal}>
          <View style={[styles.container, this.props.style]}>
            {this.props.render()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },

  title: {
    flex: 1,
    fontFamily: 'SimHei',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    flex: 2,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sure: {
    flex: 1,
    fontFamily: 'SimHei',
    fontSize: 12,
    textAlign: 'center',
  },
});

// make this component available to the app
export default CommonModal;

