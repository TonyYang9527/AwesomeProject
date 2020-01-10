'use strict';
 import Config from 'react-native-config';

export const ENV = Config.ENV;
export const BASE_URL = Config.BASE_URL;
export const MOLMockURL = Config.MOLMockURL;
export const VESSEL_URL = Config.VESSEL_URL;
export const ATTACHMENT_PREVIEW_URL = Config.ATTACHMENT_PREVIEW_URL;
export const IMMockURL = Config.IMMockURL;
export const USER_AGREEMENT_URL = Config.USER_AGREEMENT_URL;
export const ABOUTUS_URL = Config.ABOUTUS_URL;
export const  CHARTER_URL =Config.CHARTER_URL;

export const TIMEOUT = 20*1000;


// files upload folder
export const UPLOAD_FOLDER_MOL = 'mol/';
export const UPLOAD_FOLDER_IM = 'im/';


// my cargo
export const cargoListCount = 'co/enquiry/count';
export const cargoList = 'co/enquiry/list';
// export const offerList = 'co/offer/recapList';
export const offerList = 'co/offer/list';
export const offerListByEnquiryId = 'co/offer/list';
export const offerDetailByOfferId = 'co/offer';
export const offerDetail = 'co/enquiry/offer';
export const offerRecapSendAction = 'co/offer/recap';
export const liftSubAction = 'co/offer/fix';
export const rejectOfferAction = '/co/offer/reject';
export const closeCargoAction = '/co/enquiry/close';

// home
export const matchVessel = 'sys/match/matchVessel';
export const inviteOffer = 'co/enquiry/init';
export const vesselTypeMap = 'co/vesselTypeMap/list/';

// common
export const allPorts = 'moldata/ports/page/search';
export const allPortsForLanuage = 'mall/location/port';
export const countryCode = 'moldata/data/country/nonsanction';

//for Account
export const register = 'user/register';
export const registerByChartering = 'user/registerByChartering';
export const information = 'user/info';
export const avatar = 'user/avatar';
export const changePWd = 'user/password/change';
export const resend = 'user/email/resend';
export const findPWd = 'user/password/find';

export const pushList = '/message/push';
export const readPush = '/message/push/read';
export const unread = '/message/push/unread';

export const uploadImage = 'oss/oss/file';



export default {
    BASE_URL,
    TIMEOUT,
    ENV
};
