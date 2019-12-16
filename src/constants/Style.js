import { Platform,StyleSheet } from 'react-native';
import * as Colors from './Colors';
import * as Dimens from './Dimension';


export const ShadowStyle = {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Dimens.radius,
    elevation: 0.6,
    borderRadius: Dimens.radius,
};

export const tbIconStyle = {
    width: 30,
    height: 30,
};

export const LabelStyle = {
    marginBottom: 2,
};


//date picker
export const dateContent = {
    width: '100%'
};
export const dateTouchBody = {
    height: 40,
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#86939e',
};
export const dateLabel = {
    marginBottom: 4,
    color: '#86939e',
    fontSize: 16,
    ...Platform.select({
        ios: {
            fontWeight: Dimens.weight_bold
        },
        android: {
            fontWeight: Dimens.weight_bold
        }
    })
};
export const dateIcon = {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
};
export const dateInput = {
    marginLeft: 0,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center'
};
export const dateText = {
    color: '#333',
    fontSize: 17
};
export const placeholderText = {
    color: '#c9c9c9'
};
export const datePickerMask = {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
};
export const datePickerCon = {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
};
export const btnText = {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
};
export const btnTextText = {
    fontSize: 16,
    color: '#46cf98'
};
export const btnTextCancel = {
    color: '#666'
};
export const btnCancel = {
    left: 0
};
export const btnConfirm = {
    right: 0
};
export const datePicker = {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
};
export const disabled = {
    backgroundColor: '#eee'
};

//
export const error = {
    color: '#ff190c',
    marginLeft: 0,
    marginTop: 5,
    fontSize: 12
};
// PickerInput
export const pickerInputContent = {
    alignContent: 'center'
};
export const pickerInputTouchBody = {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#86939e'
};
export const pickerInputLabel = {
    marginBottom: 4,
    marginTop: 0,
    color: '#86939e',
    fontSize: 16,
    fontWeight: "normal"
};
export const pickerInputText = {
    color: '#333',
    fontSize: 17,
    textAlign: 'left'
};
export const pickerInputPlaceholder = {
    color: '#c9c9c9',
    fontSize: 17,
    textAlign: 'left'
};
export const inputContainerStyle = {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 3
};

export const searchBarStyle = {};

export const SafeAreaStyle = {
    backgroundColor: '#0081cc'
}

export const AccountContentStyle = {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
    height: '100%'
};


// Input Item
// import ButtonStyle from '@ant-design/react-native/lib/button/style/index.native';
const ButtonStyle = StyleSheet.create({
    container: { flexDirection: "row" },
    defaultDisabledRaw: { backgroundColor: "#dddddd", borderColor: "#dddddd" },
    defaultDisabledRawText: { color: "#2E2E2E4D" },
    defaultHighlight: { backgroundColor: "#dddddd", borderColor: "#dddddd" },
    defaultHighlightText: { color: "#2E2E2E" },
    defaultRaw: { backgroundColor: "#ffffff", borderColor: "#dddddd" },
    defaultRawText: { color: "#2E2E2E" },
    ghostDisabledRaw: { borderColor: "#2E2E2E1A" },
    ghostDisabledRawText: { color: "#2E2E2E1A" },
    ghostHighlight: { backgroundColor: "transparent", borderColor: "#108ee999" },
    ghostHighlightText: { color: "#108ee999" },
    ghostRaw: { backgroundColor: "transparent", borderColor: "#108ee9" },
    ghostRawText: { color: "#108ee9" },
    indicator: { marginRight: 8 },
    largeRaw: { height: 47, paddingLeft: 15, paddingRight: 15 },
    largeRawText: { fontSize: 18 },
    primaryDisabledRaw: { opacity: 0.4 },
    primaryDisabledRawText: { color: "#ffffff99" },
    primaryHighlight: { backgroundColor: "#0e80d2", borderColor: "#108ee9" },
    primaryHighlightText: { color: "#ffffff4D" },
    primaryRaw: { backgroundColor: "#108ee9", borderColor: "#108ee9" },
    primaryRawText: { color: "#ffffff" },
    smallRaw: { height: 23, paddingLeft: 5, paddingRight: 5 },
    smallRawText: { fontSize: 12 },
    warningDisabledRaw: { opacity: 0.4 },
    warningDisabledRawText: { color: "#ffffff99" },
    warningHighlight: { backgroundColor: "#d24747", borderColor: "#e94f4f" },
    warningHighlightText: { color: "#ffffff4D" },
    warningRaw: { backgroundColor: "#e94f4f", borderColor: "#e94f4f" },
    warningRawText: { color: "#ffffff" },
    wrapperStyle: { alignItems: "center", justifyContent: "center", borderRadius: 5, borderWidth: 1 },
});

export const LoginButtonStyle = {
    ...ButtonStyle,
    container: {
        ...ButtonStyle.container,
        backgroundColor: '#008ecc',
    }
};

export const UnderlineButtonStyle = {
    ...ButtonStyle,
    container: {
        ...ButtonStyle.container,
        backgroundColor: Colors.background,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#008ecc',
        height: 24,
        paddingRight: 0,
        paddingLeft: 2,
        alignItems: 'flex-end'
    },
    ghostRaw: {
        backgroundColor: Colors.background,
        borderColor: Colors.background,
    },
    ghostHighlight: {
        backgroundColor: Colors.background,
        borderColor: Colors.background,
    }
};

export const SignUpButtonStyle = StyleSheet.create({
    ...ButtonStyle,
    ghostRaw: {
        backgroundColor: Colors.background,
        borderColor: Colors.background
    },
    ghostHighlight: {
        backgroundColor: Colors.background,
        borderColor: Colors.background
    },
    largeRaw: {
        paddingLeft: 2
    }
});

// Input Item
// import InputItemStyle from '@ant-design/react-native/lib/input-item/style/index.native';
const InputItemStyle = StyleSheet.create({
    clear: { backgroundColor: "#cccccc", borderRadius: 15, padding: 2 },
    container: {
        alignItems: "center",
        borderBottomColor: "#dddddd",
        borderBottomWidth: 0.3333333333333333,
        flexDirection: "row",
        height: 44.5,
        marginBottom: 0,
        marginLeft: 15,
        marginTop: 0,
        paddingRight: 15,
    },
    errorIcon: { marginLeft: 5, width: 21, height: 21 },
    extra: { marginLeft: 5, fontSize: 15, color: "#888888" },
    input: { flex: 1, height: 44, backgroundColor: "transparent", fontSize: 14, color: "#2E2E2E" },
    inputErrorColor: { color: "#f50" },
    text: { marginRight: 5, textAlignVertical: "center", fontSize: 14, color: "#2E2E2E" },
});

export const BMOInputItemStyle = {
    ...InputItemStyle,
    container: {
        ...InputItemStyle.container,
        marginRight: 16,
        marginLeft: 16,
        borderBottomColor: Colors.background
    }
};

export const InputSingleLines = StyleSheet.create({
    ...InputItemStyle,
    container: {
        height: 42,
        borderBottomWidth: Dimens.line,
        borderBottomColor: Colors.line,
        backgroundColor: 'white',
        paddingLeft: Dimens.padding,
        paddingRight: Dimens.padding,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0
    },
    input: {
        ...InputItemStyle.input,
        padding: 0,
        fontSize: 14,
        fontWeight: 'normal'
    }
});

// import TextAreaStyle from '@ant-design/react-native/lib/textarea-item/style/index.native';
const TextAreaStyle = StyleSheet.create({
    container: { borderBottomWidth: 0.5, borderBottomColor: "#dddddd" },
    count: { position: "absolute", right: 8, bottom: 8 },
    errorIcon: { position: "absolute", right: 18, top: 12 },
    icon: { position: "absolute", top: 8, width: 18, height: 18 },
    input: { paddingHorizontal: 8, backgroundColor: "#ffffff", fontSize: 14, lineHeight: 18, textAlignVertical: "top" },

});
export const MyTextAreaStyle = {
    ...TextAreaStyle,
    container: {
        borderBottomWidth: 0,
        borderBottomColor: Colors.transparent
    },
    input: {
        ...TextAreaStyle.input,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: Dimens.font_size_normal,
        paddingLeft: 10,
    },
    count: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
}

// import CheckboxStyle from '@ant-design/react-native/lib/checkbox/style/index.native';
const CheckboxStyle = StyleSheet.create({
    wrapper: {
        flexDirection: "row", alignItems: "center"
    },
    icon: { width: 21, height: 21 },
    iconRight: { marginLeft: 8 },
    agreeItem: { flexDirection: "row", alignItems: "center" },
    agreeItemCheckbox: {
        marginLeft: 15,
        marginRight: 8
    },
    checkboxItemCheckbox: { marginRight: 8, alignSelf: "center" }
});
export const AgreeStyle = {
    ...CheckboxStyle,
    agreeItem: {
        ...CheckboxStyle.agreeItem,
        alignItems: 'flex-start'
    }
};

export default {
    ShadowStyle,
    tbIconStyle,
    LabelStyle,
    dateContent,
    dateTouchBody,
    dateLabel,
    dateIcon,
    dateInput,
    dateText,
    placeholderText,
    datePickerMask,
    datePickerCon,
    btnText,
    btnTextText,
    btnTextCancel,
    btnCancel,
    btnConfirm,
    datePicker,
    disabled,
    error,
    pickerInputContent,
    pickerInputTouchBody,
    pickerInputLabel,
    pickerInputText,
    pickerInputPlaceholder,
    inputContainerStyle,
    searchBarStyle,
}
