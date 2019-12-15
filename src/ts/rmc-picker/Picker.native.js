import * as React from 'react';
import NativePicker from './NativePicker';
const Item = NativePicker.Item;
class Picker extends React.Component {
    static Item() {
    }
    getValue() {
        if ('selectedValue' in this.props) {
            return this.props.selectedValue;
        }
        const children = React.Children.toArray(this.props.children);
        return children && children[0] && children[0].props.value;
    }
    shouldComponentUpdate(nextProps) {
        return this.props.selectedValue !== nextProps.selectedValue
            || this.props.children !== nextProps.children;
    }
    render() {
        const children = React.Children.map(this.props.children, (c) => {
            return <Item label={c.props.children + ''} value={c.props.value + ''} key={c.key}/>;
        });
        return <NativePicker {...this.props}>{children}</NativePicker>;
    }
}
Picker.defaultProps = {
    children: [],
};
export default Picker;
//# sourceMappingURL=Picker.native.js.map