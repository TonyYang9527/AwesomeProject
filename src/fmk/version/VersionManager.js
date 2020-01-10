import DeviceInfo from 'react-native-device-info';
import {ErrorCode} from '@constants/Constants';
import versionApi from '@backend/version/VersionApi';

let isFetching = false; // 是否正在请求版本更新接口

export async function checkVersion() {
    if (isFetching) {
        return { requestIsIgnore: true };
    }

    isFetching = true;
    try {
        return await checkVersionInternally();
    } catch (e) {
        throw e;
    } finally {
        isFetching = false;
    }
}

async function checkVersionInternally() {
    let currentVersion = DeviceInfo.getVersion();
    console.log(
        `<<<<APP Version Upgrade currentVersion >>>>>: ${currentVersion}`,
    );
    let response = await versionApi.versionControl(true);
    const {errorCode, errorMessage, data: outerData} = response || {};
    if (errorCode !== ErrorCode.SUCCESS) {
        throw new Error(errorMessage);
    }

    const {data} = outerData || {};
    if (data && Array.isArray(data) && data.length > 0) {
        let activeList = data.filter(item => {
            return item.status === 1;
        });
        if (activeList.length === 0) {
            console.log('<<<<<<<<<<<< APP Version Upgrade : No Need Upgrade');
            return {needForcedUpdate: false, needUpdate: false};
        }

        let minVersionItem = activeList[data.length - 1];
        let maxVersionItem = activeList[0];
        let minVersion = minVersionItem.version.replace(/\W+/gi, '') + 0;
        let maxVersion = maxVersionItem.version.replace(/\W+/gi, '') + 0;
        currentVersion = currentVersion.replace(/\W+/gi, '') + 0;

        if (currentVersion < minVersion) {
            //强制更新
            console.log(
                `<<<<<APP Version Upgrade>>>>:Force to Upgrade ${
                    maxVersionItem.version
                }`,
            );
            return {
                needForcedUpdate: true,
                needUpdate: true,
                version: maxVersionItem.version,
                description: maxVersionItem.description,
                link: maxVersionItem.link,
            };
        } else if (currentVersion < maxVersion) {
            //普通更新
            console.log(
                `<<<<<APP Version Upgrade>>>>:Regular to Upgrade ${
                    maxVersionItem.version
                }`,
            );
            return {
                needForcedUpdate: false,
                needUpdate: true,
                version: maxVersionItem.version,
                description: maxVersionItem.description,
                link: maxVersionItem.link,
            };
        } else {
            return {needForcedUpdate: false, needUpdate: false};
        }
    } else {
        return {needForcedUpdate: false, needUpdate: false};
    }
}
