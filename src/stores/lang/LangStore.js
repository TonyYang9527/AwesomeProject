import {observable,action} from "mobx";
import _storage  from'@fmk/storage/StorageManager';
import i18n from '@fmk/i18n/i18n'

const CHINESE = 'zh';
const ENGLISH = 'en';

 class LangStore {

    @observable
    lng = ENGLISH;

    @observable
    selected ;

    @action
    setLanguage(language){
        if(language){
            this.lng=language;
            _storage.saveLanguage(language)
            i18n.changeLanguage(language)
        }
    };

    @action
    initselected(){
        this.selected =this.lng;
    };
    @action
    setSelected(lng){
        this.selected =lng;
    };
    getLanguage(){
        return this.lng;
    };
};
const langStore = new LangStore();
export { langStore ,CHINESE, ENGLISH,};
