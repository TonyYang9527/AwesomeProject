'use strict';
import {toJS} from 'mobx'
import i18n from '@utils/i18n'

export const RoleType = {
    Buyer: '0',
    Seller: '1',
    Both: '2',
    None: '3'
}

export const Role = {
    Bunkering: 'BU',
    Chartering: 'CH',
    Crewing: 'CW',
    PortAgency: 'PA',
    ShipSupply: 'SS',
    MarlineService: 'MS',
    SaleNPurchase: 'SP',
    Insurance: 'IN',        // Dont have this any more ?
    Other: 'OTH'            // Add Temparory, Wireframe have this type
}

export const SubCategory = {
    CH: {
        'CHCVC': 'CHCVC',   // VoyageCharter
        'CHCTC': 'CHCTC',   // TimeCharter
        'OFFER': 'OFF'
    },
    BU: {
        'BUBUS': 'BUBUS',   // Bunkering
        'BUSUR': 'BUSUR',    // Service
        'BUOIL': 'BUOIL',    // Service
    },
    CW: {
        'CWMAN': 'CWMAN',
    },
    PA: {
        'PAPAS': 'PAPAS',
    },
    SS: {
        'SSSPA': 'SSSPA',   // ShipSupply
        'SSLUB': 'SSLUB',   // ShipSupply
        'SSSSO': 'SSSSO',   // ShipSupply
        'SSPRV': 'SSPRV',   // ShipSupply
        'SSMSU': 'SSMSU',   // Service
        'SSCIN': 'SSCIN',   // Service
        'SSLOG': 'SSLOG',   // Service
        'SSRPS': 'SSRPS',   // Service
    },
    MS: {
        'MSLOG': 'MSLOG',
        'MSSRP': 'MSSRP',
        'MSISS': 'MSISS',
        'MSSYS': 'MSSYS',
        'MSSCL': 'MSSCL',
        'MSSRN': 'MSSRN',
        'MSMLS': 'MSMLS',
        'MSMIN': 'MSMIN',
        'MSSFN': 'MSSFN',
        'MSOMS': 'MSOMS',
    },
    SP: {
        'SNP': 'SNP', // TODO: check this value
        'SNPP': 'SNPP', // TODO: check this value
    },
    OTH: {
        'OTHER': 'OTHER' // TODO: check this value
    }
};

export const SubCategoryName = {
    SS: {
        SSSPA: 'Spare Parts',
        SSSSO: 'Ship Store',
        SSLUB: 'Lubricant Oil',
        SSPRV: 'Provision',
    }
};

export const BusinessType = {
    CargoOwner: {
        code: 'cargo_owner',
        title: 'Cargo Owner',
        titleKey: 'lang_Company_CargoOwner',
        roleType: RoleType.Buyer, // Buyer
        role: 'cargo',
    },
    ShipOwner: {
        code: 'shipowner',
        title: 'Ship Owner',
        titleKey: 'lang_Company_ShipOwner',
        roleType: RoleType.Both, // Both
        role: 'ship'
    },
    ManningAgency: {
        code: 'manning_agency',
        title: 'Manning Agency',
        titleKey: 'lang_Company_ManningAgency',
        roleType: RoleType.Both, // Both
        role: 'agency'
    },
    Supplier: {
        code: 'supplier',
        title: 'Supplier',
        titleKey: 'lang_Company_Supplier',
        roleType: RoleType.Seller, // Seller
        role: 'supplier'
    }
}

export function GetSubCategory(role, subCate) {
    let subRole = subCate
    if (role === subCate) {
        let subObj = SubCategory[role]
        if (subObj && subObj[subCate]) {
            // if subCategory have this type, just return it
            subRole = subCate
        } else if (subObj) {
            // if subCategory dont have this category, get the default one (first item)
            let k = Object.keys(subObj)[0]
            subRole = subObj[k]
        } else {
            // if subCategory dont have this biztype
            subRole = 'NONE_BIZ'
        }
    }

    return subRole
}

export function HasRole(info, role) {
    if (!info) return false

    let {bizType, categories: roles} = toJS(info)
    let fd = roles.find((r) => {
        return r.startsWith(role)
    })

    return fd != null ? true : false
}

export function GetRoleType(info) {
    if (!info) return null

    let {bizType, categories: roles} = toJS(info)
    if (!bizType) return null

    if (bizType === 'cargo_owner') {
        return RoleType.Buyer

    } else if (bizType === 'supplier') {
        return RoleType.Seller

    } else if (bizType === 'manning_agency') {
        // return RoleType.Both
        return RoleType.Seller

        // } else if (HasRole(info, Role.Chartering)) { // shipowner
        //     return roles.length == 1 ? RoleType.Seller : RoleType.Both

    } else { // shipowner
        return RoleType.Buyer
    }
}

let _functionMap = null;

export const FunctionName = {
    CharteringAddCargo: 'Chartering-OpenCargo-AddCargo',
    CharteringAddOffer: 'Chartering-OpenCargo-Offer',
    CharteringInviteOffer: 'Chartering-Invite-Offer',
    CharteringOpenVessel: 'Chartering-OpenVessel-UpdateOpenPosition',

    ShipSupplyAddToCart: 'ShipSupply-Products-AddToCart',
    ShipSupplySendEnquiry: 'ShipSupply-Products-SendEnquiry',
    ShipSupplySendRFQ: 'ShipSupply-Products-SendRFQ',

    BunkeringAddToCart: 'Bunkering Add To Cart',
    BunkeringRequestForQuotation: 'BunkeringRequestForQuotation',
    BunkeringSendEnquiry: 'BunkeringSendEnquiry',
    BunkeringAddToEnquiryList: 'BunkeringAddToEnquiryList',

    PortAgencyAddToCart: 'PortAgencyAddToCart',
    PortAgencyRequestForQuotation: 'PortAgencyRequestForQuotation',
    PortAgencySendEnquiry: 'PortAgencySendEnquiry',
    PortAgencyAddToEnquiryList: 'PortAgencyAddToEnquiryList',

    CrewingTrainingCoursesAddToCart: 'CrewingTrainingCoursesAddToCart',
    CrewingManningAgenciesRequestForQuotation: 'CrewingManningAgenciesRequestForQuotation',
    CrewingManningAgenciesSendEnquiry: 'CrewingManningAgenciesSendEnquiry',
    CrewingManningAgenciesAddToEnquiryList: 'CrewingManningAgenciesAddToEnquiryList',

    ShipsForSaleSendPurchaseEnquiry: 'ShipsForSaleSendPurchaseEnquiry',
    ShipsForSaleCrewingPostVesselForSale: 'ShipsForSaleCrewingPostVesselForSale',
    ShipsForSaleVesselValuation: 'ShipsForSaleVesselValuation',

    MarineService: 'MarineService',
};

export const getFunctionMap = () => {
    if (!_functionMap) {
        let functionMAp = {};
        // Chartering
        functionMAp[FunctionName.CharteringAddCargo] = {
            BusinessType: [BusinessType.CargoOwner.code],
            SubCategory: [Role.Chartering],
            errorMessage: i18n.t('lang_Permission_Required_cargo_owner')
        };
        functionMAp[FunctionName.CharteringAddOffer] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Chartering],
            errorMessage: i18n.t('lang_Permission_Required_ship_owner')
        };
        functionMAp[FunctionName.CharteringInviteOffer] = {
            BusinessType: [BusinessType.CargoOwner.code],
            SubCategory: [Role.Chartering],
            errorMessage: i18n.t('lang_Permission_Required_cargo_owner')
        };
        functionMAp[FunctionName.CharteringOpenVessel] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Chartering],
            errorMessage: i18n.t('lang_Permission_Required_ship_owner')
        };

        functionMAp[FunctionName.ShipSupplyAddToCart] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_contact_customer_support')
        };
        functionMAp[FunctionName.ShipSupplySendEnquiry] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.ShipSupplySendRFQ] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };

        // Bunkering
        functionMAp[FunctionName.BunkeringAddToCart] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Bunkering],
            errorMessage: i18n.t('lang_Permission_Required_request')
        };
        functionMAp[FunctionName.BunkeringRequestForQuotation] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Bunkering],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.BunkeringSendEnquiry] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Bunkering],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.BunkeringAddToEnquiryList] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Bunkering],
            errorMessage: i18n.t('lang_Permission_Required_contact_customer_support')
        };

        //PortAgency
        functionMAp[FunctionName.PortAgencyAddToCart] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.PortAgency],
            errorMessage: i18n.t('lang_Permission_Required_contact_customer_support')
        };
        functionMAp[FunctionName.PortAgencyRequestForQuotation] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.PortAgency],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.PortAgencySendEnquiry] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.PortAgency],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.PortAgencyAddToEnquiryList] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.PortAgency],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };

        // Crewing
        functionMAp[FunctionName.CrewingTrainingCoursesAddToCart] = {
            BusinessType: [BusinessType.ShipOwner.code, BusinessType.ManningAgency.code],
            SubCategory: [Role.Crewing],
            errorMessage: i18n.t('lang_Permission_Required_contact_customer_support')
        };
        functionMAp[FunctionName.CrewingManningAgenciesRequestForQuotation] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Crewing],
            errorMessage: i18n.t('lang_Permission_Required_rfq_ship_owner')
        };
        functionMAp[FunctionName.CrewingManningAgenciesSendEnquiry] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Crewing],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.CrewingManningAgenciesAddToEnquiryList] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Crewing],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };

        //SNP
        functionMAp[FunctionName.ShipsForSaleSendPurchaseEnquiry] = {
            BusinessType: [BusinessType.ShipOwner.code, BusinessType.CargoOwner.code],
            SubCategory: [Role.Chartering, Role.PortAgency, Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_rfq_ship_owner')
        };
        functionMAp[FunctionName.ShipsForSaleCrewingPostVesselForSale] = {
            BusinessType: [BusinessType.ShipOwner.code, BusinessType.CargoOwner.code],
            SubCategory: [Role.Chartering, Role.PortAgency, Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        functionMAp[FunctionName.ShipsForSaleVesselValuation] = {
            BusinessType: [BusinessType.ShipOwner.code, BusinessType.CargoOwner.code],
            SubCategory: [Role.Chartering, Role.SaleNPurchase, Role.PortAgency, Role.ShipSupply],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };

        //Marine Service
        functionMAp[FunctionName.MarineService] = {
            BusinessType: [BusinessType.ShipOwner.code],
            SubCategory: [Role.Bunkering, Role.Chartering, Role.Crewing, Role.PortAgency, Role.ShipSupply, Role.MarlineService, Role.SaleNPurchase, Role.Insurance, Role.Other],
            errorMessage: i18n.t('lang_Permission_Required_rfq')
        };
        _functionMap = functionMAp;
    }
    return _functionMap;
};
