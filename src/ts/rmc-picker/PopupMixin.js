import * as React from 'react';
export default function PopupMixin(getModal, platformProps) {
    var _a;
    return _a = class extends React.Component {
            constructor(props) {
                super(props);
                this.onPickerChange = (pickerValue) => {
                    if (this.state.pickerValue !== pickerValue) {
                        this.setState({
                            pickerValue,
                        });
                        const { picker, pickerValueChangeProp } = this.props;
                        if (picker && picker.props[pickerValueChangeProp]) {
                            picker.props[pickerValueChangeProp](pickerValue);
                        }
                    }
                };
                this.saveRef = (picker) => {
                    this.picker = picker;
                };
                this.onTriggerClick = (e) => {
                    const child = this.props.children;
                    const childProps = child.props || {};
                    if (childProps[this.props.triggerType]) {
                        childProps[this.props.triggerType](e);
                    }
                    this.fireVisibleChange(!this.state.visible);
                };
                this.onOk = () => {
                    this.props.onOk(this.picker && this.picker.getValue());
                    this.fireVisibleChange(false);
                };
                this.getContent = () => {
                    if (this.props.picker) {
                        let { pickerValue } = this.state;
                        if (pickerValue === null) {
                            pickerValue = this.props.value;
                        }
                        return React.cloneElement(this.props.picker, ({
                            [this.props.pickerValueProp]: pickerValue,
                            [this.props.pickerValueChangeProp]: this.onPickerChange,
                            ref: this.saveRef,
                        }));
                    }
                    else {
                        return this.props.content;
                    }
                };
                this.onDismiss = () => {
                    this.props.onDismiss();
                    this.fireVisibleChange(false);
                };
                this.hide = () => {
                    this.fireVisibleChange(false);
                };
                this.state = {
                    pickerValue: 'value' in this.props ? this.props.value : null,
                    visible: this.props.visible || false,
                };
            }
            UNSAFE_componentWillReceiveProps(nextProps) {
                if ('value' in nextProps) {
                    this.setState({
                        pickerValue: nextProps.value,
                    });
                }
                if ('visible' in nextProps) {
                    this.setVisibleState(nextProps.visible);
                }
            }
            setVisibleState(visible) {
                this.setState({
                    visible,
                });
                if (!visible) {
                    this.setState({
                        pickerValue: null,
                    });
                }
            }
            fireVisibleChange(visible) {
                if (this.state.visible !== visible) {
                    if (!('visible' in this.props)) {
                        this.setVisibleState(visible);
                    }
                    this.props.onVisibleChange(visible);
                }
            }
            getRender() {
                const props = this.props;
                const children = props.children;
                if (!children) {
                    return getModal(props, this.state.visible, {
                        getContent: this.getContent,
                        onOk: this.onOk,
                        hide: this.hide,
                        onDismiss: this.onDismiss,
                    });
                }
                const { WrapComponent, disabled } = this.props;
                const child = children;
                const newChildProps = {};
                if (!disabled) {
                    newChildProps[props.triggerType] = this.onTriggerClick;
                }
                return (<WrapComponent style={props.wrapStyle}>
          {React.cloneElement(child, newChildProps)}
          {getModal(props, this.state.visible, {
                    getContent: this.getContent,
                    onOk: this.onOk,
                    hide: this.hide,
                    onDismiss: this.onDismiss,
                })}
        </WrapComponent>);
            }
            render() {
                return this.getRender();
            }
        },
        _a.defaultProps = Object.assign({ onVisibleChange(_) { }, okText: 'Ok', dismissText: 'Dismiss', title: '', onOk(_) { },
            onDismiss() { } }, platformProps),
        _a;
}
//# sourceMappingURL=PopupMixin.js.map