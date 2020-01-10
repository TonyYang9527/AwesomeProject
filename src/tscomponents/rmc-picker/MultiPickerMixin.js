import * as React from 'react';
export default function (ComposedComponent) {
    var _a;
    return _a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.getValue = () => {
                    const { children, selectedValue } = this.props;
                    if (selectedValue && selectedValue.length) {
                        return selectedValue;
                    }
                    else {
                        if (!children) {
                            return [];
                        }
                        return React.Children.map(children, (c) => {
                            const cc = React.Children.toArray(c.children || c.props.children);
                            return cc && cc[0] && cc[0].props.value;
                        });
                    }
                };
                this.onChange = (i, v, cb) => {
                    const value = this.getValue().concat();
                    value[i] = v;
                    if (cb) {
                        cb(value, i);
                    }
                };
                this.onValueChange = (i, v) => {
                    this.onChange(i, v, this.props.onValueChange);
                };
                this.onScrollChange = (i, v) => {
                    this.onChange(i, v, this.props.onScrollChange);
                };
            }
            render() {
                return (<ComposedComponent {...this.props} getValue={this.getValue} onValueChange={this.onValueChange} onScrollChange={this.props.onScrollChange && this.onScrollChange}/>);
            }
        },
        _a.defaultProps = {
            prefixCls: 'rmc-multi-picker',
            onValueChange() {
            },
        },
        _a;
}
;
//# sourceMappingURL=MultiPickerMixin.js.map