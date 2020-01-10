import {observable,action} from "mobx";
import versionApi from '@backend/version/VersionApi';
import DeviceInfo from "react-native-device-info";

 class VersionStore {

    @observable
    headerBackgroundColor= 'transparent' ;

    @observable
    needForcedUpdate=false;

    @observable
    needUpdate=false;

    @observable
    version='';

    @observable
    updateDesc='';

    @observable
    appLink= '';

    @action
    init(){
        this.headerBackgroundColor='transparent' ;
        this.version='';
        this.updateDesc='';
        this.appLink='';
        this.needForcedUpdate=false;
        this.needUpdate=false;
    };


    @action
    checkVersion = async (UpgradeAlert)=>{
        let currentVersionNo =  DeviceInfo.getVersion();
        let response = await versionApi.versionControl();
        const {data} = response.data;
        console.log(`<<<<APP Version Upgrade currentVersionNo >>>>>: ${currentVersionNo}`);
        console.log(`<<<<APP Version Upgrade checkVersion response>>>>>: ${JSON.stringify(response)}`);
        if (data && Array.isArray(data) && data.length > 0) {
            let activeList = data.filter((item)=>{ return item.status===1;}); 
            if (activeList.length === 0) {
                console.log('<<<<APP Version Upgrade>>>>>: No Need Upgrade');
                this.needForcedUpdate=false;
                this.needUpdate=false;
                return;
            }else{
                let minVersionItem = activeList[data.length-1];
                let maxVersionItem = activeList[0];
                let minVersion = minVersionItem.version.replace(/\W+/gi,'') + 0;
                let maxVersion = maxVersionItem.version.replace(/\W+/gi,'') + 0;
                currentVersionNo = currentVersionNo.replace(/\W+/gi,'') + 0;

                let {version,description,link} = maxVersionItem;
                if (currentVersionNo < minVersion){ 
                   console.log(`<<<<<APP Version Upgrade>>>>>:Force to Upgrade Version:${version}`)
                   await  this.forceUpgrade(version,description,link);
                   setTimeout(()=>{
                        UpgradeAlert && UpgradeAlert.open()
                    },100);
                }else if (currentVersionNo < maxVersion){
                    console.log(`<<<<<APP Version Upgrade>>>>>:Regular Upgrade Version:${version}`);
                    await this.regularUpgrade(version,description,link);
                    setTimeout(()=>{
                        UpgradeAlert && UpgradeAlert.open()
                    },100);
                }else{
                    this.needForcedUpdate=false;
                    this.needUpdate=false;
                }
            }

        }
    };


    @action
    handleOnScroll(offsetY,statusBarHeigth){
        if (offsetY > 0) {
            // scroll down
            const alpha = Math.abs(offsetY) / statusBarHeigth;
            this.needForcedUpdate=`rgba(0, 129, 204, ${alpha})`;
        } else {
            // scroll up
            this.needForcedUpdate='transparent';
        }
    };

    @action
    forceUpgrade(version,description,link){
        this.needForcedUpdate=true;
        commonUpgrade(version,description,link);
    };

    @action
    regularUpgrade(version,description,link){
       this.needForcedUpdate=false;
       commonUpgrade(version,description,link);
    };

    @action
    commonUpgrade(version,description,link){
        // this.needForcedUpdate=true;
        this.needUpdate=true;
        this.version=version;
        this.updateDesc=description;
        this.appLink=link;
    };
 
};
const versionStore = new VersionStore();
export default versionStore;