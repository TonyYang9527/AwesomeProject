import React from 'react';
import PopupPicker from '../rmc-picker/Popup';
class PopupCascader extends React.Component {
    constructor() {
        super(...arguments);
        this.onOk = (v) => {
            const { onChange, onOk } = this.props;
            if (onChange) {
                onChange(v);
            }
            if (onOk) {
                onOk(v);
            }
        };
    }
    render() {
        return (<PopupPicker picker={this.props.cascader} {...this.props} onOk={this.onOk}/>);
    }
}
PopupCascader.defaultProps = {
    pickerValueProp: 'value',
    pickerValueChangeProp: 'onChange',
};
export default PopupCascader;
//# sourceMappingURL=Popup.js.map