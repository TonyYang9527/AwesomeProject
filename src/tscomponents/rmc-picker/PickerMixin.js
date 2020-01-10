/* tslint:disable:no-console */
import * as React from 'react';
;
const Item = (_props) => null;
export default function (ComposedComponent) {
    var _a;
    return _a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.select = (value, itemHeight, scrollTo) => {
                    const children = React.Children.toArray(this.props.children);
                    for (let i = 0, len = children.length; i < len; i++) {
                        if (children[i].props.value === value) {
                            this.selectByIndex(i, itemHeight, scrollTo);
                            return;
                        }
                    }
                    this.selectByIndex(0, itemHeight, scrollTo);
                };
                this.doScrollingComplete = (top, itemHeight, fireValueChange) => {
                    const children = React.Children.toArray(this.props.children);
                    const index = this.computeChildIndex(top, itemHeight, children.length);
                    const child = children[index];
                    if (child) {
                        fireValueChange(child.props.value);
                    }
                    else if (console.warn) {
                        console.warn('child not found', children, index);
                    }
                };
            }
            selectByIndex(index, itemHeight, zscrollTo) {
                if (index < 0 || index >= React.Children.count(this.props.children) || !itemHeight) {
                    return;
                }
                zscrollTo(index * itemHeight);
            }
            computeChildIndex(top, itemHeight, childrenLength) {
                const index = Math.round(top / itemHeight);
                return Math.min(index, childrenLength - 1);
            }
            render() {
                return (<ComposedComponent {...this.props} doScrollingComplete={this.doScrollingComplete} computeChildIndex={this.computeChildIndex} select={this.select}/>);
            }
        },
        _a.Item = Item,
        _a;
}
//# sourceMappingURL=PickerMixin.js.map