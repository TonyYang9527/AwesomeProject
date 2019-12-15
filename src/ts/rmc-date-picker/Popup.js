import React from 'react';
import PopupPicker from '../rmc-picker/Popup';
class PopupDatePicker extends React.Component {
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
        return (<PopupPicker picker={this.props.datePicker} value={this.props.date} {...this.props} onOk={this.onOk}/>);
    }
}
PopupDatePicker.defaultProps = {
    pickerValueProp: 'date',
    pickerValueChangeProp: 'onDateChange',
};
export default PopupDatePicker;
//# sourceMappingURL=Popup.js.map