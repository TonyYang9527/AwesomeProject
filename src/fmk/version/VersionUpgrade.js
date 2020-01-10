import React, { Component } from "react";
import PropTypes from "prop-types";
import {Text, View, Animated, Modal, TouchableOpacity, StyleSheet, Image} from "react-native";
import { images as Resource } from "@resource";
import ImageLayout from "@components/common/ImageLayout";
import Colors from "@constants/Colors";
import { withNamespaces } from "react-i18next";
import {observer,inject} from "mobx-react";

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

class VersionUpgrade extends Component {
    constructor() {
        super();
        this.state = { visible: false };
        this.springValue = new Animated.Value(0);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onClose = this.onClose.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    onCancel() {
        const { onCancel } = this.props;
        if (typeof onCancel === "function") onCancel();
    }

    onConfirm() {
        const { onConfirm } = this.props;
        if (typeof onConfirm === "function") onConfirm();
    }

    onClose() {
        const { onClose } = this.props;
        if (typeof onClose === "function") onClose();
    }

    open() {
        this.setState({ visible: true }, () => this.animatedConfirm());
    }

    close() {
        this.setState({ visible: false }, () => {
            this.springValue.setValue(0);
            this.onClose();
        });
    }

    animatedConfirm() {
        Animated.spring(this.springValue, {
            toValue: 1,
            speed: 15
        }).start();
    }

    render() {
        const {
            title,
            message,
            showCancel,
            showConfirm,
            textCancel,
            textConfirm,
            customStyles,
            closeOnPressMask
        } = this.props;

        const { visible } = this.state;

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                supportedOrientations={SUPPORTED_ORIENTATIONS}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={closeOnPressMask ? this.close : null}
                    style={[styles.background, customStyles.mask]}
                >
                    <Animated.View
                        style={[
                            styles.container,
                            {
                                transform: [{ scale: this.springValue }]
                            },
                            customStyles.container
                        ]}
                    >
                        <View style={{backgroundColor:'transparent', height:155}}>
                            <ImageLayout style={{flex:1}}
                                         source={Resource.icon.upgradeHeader()}
                                         resizeMode={'cover'}
                                         needResize={true}
                            />
                        </View>
                        <TouchableOpacity style={{backgroundColor:'white'}} activeOpacity={1}>

                            <View style={styles.content}>
                                <Text style={[styles.title, customStyles.title]}>{title}</Text>
                                {message ? (
                                    <Text style={[styles.message, customStyles.message]}>{message}</Text>
                                ) : null}
                            </View>

                            <View style={styles.buttonContainer}>
                                {showConfirm ? (
                                    <TouchableOpacity
                                        testID="buttonConfirm"
                                        onPress={this.onConfirm}
                                        style={[styles.button, customStyles.buttonConfirm]}
                                    >
                                        <Text style={[styles.textButton, customStyles.textConfirm]}>{textConfirm}</Text>
                                    </TouchableOpacity>
                                ) : null}
                                {showCancel ? (
                                    <TouchableOpacity
                                        testID="buttonCancel"
                                        onPress={this.onCancel}
                                        style={[styles.button, styles.buttonCancel, customStyles.buttonCancel]}
                                    >
                                        <Text style={[styles.textButtonCancel, customStyles.textCancel]}>{textCancel}</Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

VersionUpgrade.propTypes = {
    customStyles: PropTypes.objectOf(PropTypes.object),
    title: PropTypes.string,
    message: PropTypes.string,
    showCancel: PropTypes.bool,
    showConfirm: PropTypes.bool,
    textCancel: PropTypes.string,
    textConfirm: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    closeOnPressMask: PropTypes.bool
};

VersionUpgrade.defaultProps = {
    customStyles: {},
    title: "Do you want to continue?",
    message: "",
    showCancel: true,
    showConfirm: true,
    textCancel: "No",
    textConfirm: "Yes",
    closeOnPressMask: true,
    onCancel: null,
    onConfirm: null,
    onClose: null
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "transparent",
        marginLeft:25,
        marginRight:25,
        marginHorizontal: 30,
        borderRadius: 5
    },
    content: {
        justifyContent: "center",
        marginLeft:25,
        marginRight:25,
        padding: 20
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        color: "#0081CC",
        fontWeight: "500",
        // lineHeight: 30
    },
    message: {
        textAlign: "left",
        fontSize: 14,
        color: "#666",
        paddingTop: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        flexWrap: "wrap"
    },
    button: {
        backgroundColor: "#0081CC",
        marginBottom: 20,
        marginHorizontal: 10,
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 5,
        minWidth: 110,
        borderWidth:1,
        borderColor:'#0081CC'
    },
    buttonCancel: {
        backgroundColor: "#FFF",
    },
    textButton: {
        fontSize: 15,
        textAlign: "center",
        color: "#FFF",
        fontWeight: "600"
    },

    textButtonCancel: {
        fontSize: 15,
        textAlign: "center",
        color: "#0081CC",
        fontWeight: "600"
    }
});

export default VersionUpgrade;
