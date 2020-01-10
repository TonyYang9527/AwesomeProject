'use strict';

import {Toast as AntdToast , Portal} from '@ant-design/react-native';
import i18n from '@utils/i18n'

const Toast = new function(){
    this.SHORT = AntdToast.SHORT,
    this.LONG = AntdToast.LONG,

    this.key = null;

    this.show = (content, duration = this.SHORT, mask = false, onClose) => {
        this.hide();
        this.key = AntdToast.info(content, duration, onClose, mask);
    };
    
    this.info = (content, duration = this.SHORT, mask = false, onClose) => {
        this.hide();
        this.key = AntdToast.info(content, duration, onClose, mask);
    };
    this.success = (content, duration = this.SHORT, mask = false, onClose) => {
        this.hide();
        this.key =  AntdToast.success(content, duration, onClose, mask);
    };

    this.fail = (content=i18n.t('mobile.NETWORK.UNKNOWN.ERROR'), duration = this.SHORT, mask = false, onClose) => {
        this.hide();
        if (!content) {
            content=i18n.t('mobile.NETWORK.UNKNOWN.ERROR')
        }
        this.key = AntdToast.fail(content, duration, onClose, mask);
    };
    this.offline = (content, duration = this.SHORT, mask = false, onClose) => {
        this.hide();
        this.key = AntdToast.offline(content, duration, onClose, mask);
    };
    this.loading = (content, duration = this.SHORT, mask = true, onClose) => {
        this.hide();
        this.key = AntdToast.loading(content, duration, onClose, mask);
    };
    this.hide = () => {
        if(this.key){
            Portal.remove(this.key);
            this.key = null;
        }
    };
};

export default Toast;

