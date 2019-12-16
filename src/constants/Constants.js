'use strict';

import {OrderStatusColor} from './Colors';
import {images as Resource} from '@resource';

export const productionID = 'MOL';
export const ADMIN_USER_NAME = 'Marine Online';
export const LIST_PAGE_LIMIT = 10;

export const PLACEHOLDER_EMPTY_TEXT = '-';

export const DEFAULT_COMPANY_RATING = 4;

export const PRICE_MIN = 0;
export const PRICE_MAX = 9999999;

export const PRODUCT_PRICE_TYPE= {
    FIXED:'FIXED',
    RANGE:'RANGE',
    QUOTE:'QUOTE',
}

export const VESSEL_TYPE= {
    CONTAINER: 'lang_Container',
    'DRY BULK': 'home_shipsforsale_drybulk',
    OSV: 'home_shipsforsale_offshore',
    TANKER: 'lang_Oil_Tanker',
    YACHT: 'lang_Passenger_Yacht',
    OTHERS: 'lang_Others'
}

export const PRODUCT_PRICE_TYPE_NUMBER={
    FIXED: 0,
    RANGE: 1,
    QUOTE: 2,
}

/**
 * order management status
 */
export const OrderStatus = {
    All: {
        status: '',
        name: 'All',
        text: '',
        statusKey:'lang_RFQ_Status_ALL',
        color: 'transparent',
    },
    Draft: {
        status: 'D',
        name: 'Draft',
        text: 'DRAFT',
        statusKey:'lang_RFQ_Status_DRAFT',
        color: OrderStatusColor.draftColor,
    },
    Open: {
        status: 'O',
        name: 'Open',
        text: 'OPEN',
        statusKey:'lang_RFQ_Status_OPEN',
        color: OrderStatusColor.openColor,
    },
    Appointed: {
        status: 'A',
        name: 'Appointed',
        text: 'APPOINTED',
        statusKey:'lang_RFQ_Status_APPOINTED',
        color: OrderStatusColor.confirmedColor,
    },
    Accepted: {
        status: 'A',
        name: 'Accepted',
        text: 'ACCEPTED',
        statusKey:'lang_RFQ_Status_ACCEPTED',
        color: OrderStatusColor.confirmedColor,
    },
    Confirmed: {
        status: 'A',
        name: 'Confirmed',
        text: 'CONFIRMED',
        statusKey:'lang_RFQ_Status_CONFIRMED',
        color: OrderStatusColor.confirmedColor,
    },
    Cancelled: {
        status: 'C',
        name: 'Cancelled',
        text: 'CANCELLED',
        statusKey:'lang_RFQ_Status_CANCELLED',
        color: OrderStatusColor.cancelledColor,
    },
    Closed: {
        status: 'X',
        name: 'Closed',
        text: 'CLOSED',
        statusKey:'lang_RFQ_Status_CLOSED',
        color: OrderStatusColor.closedColor,
    },
    Expired: {
        status: 'E',
        name: 'Expired',
        text: 'EXPIRED',
        statusKey:'lang_RFQ_Status_EXPIRED',
        color: OrderStatusColor.expiredColor,
    },
    Delivered: {
        status: 'V',
        name: 'Delivered',
        text: 'DELIVERED',
        statusKey:'lang_RFQ_Status_DELIVERED',
        color: OrderStatusColor.deliveredColor,
    },
    Completed: {
        status: 'Z',
        name: 'Completed',
        text: 'COMPLETED',
        statusKey:'lang_RFQ_Status_COMPLETED',
        color: OrderStatusColor.completedColor,
    },
    Processing: {
        status: 'P',
        name: 'Processing',
        text: 'PROCESSING',
        statusKey:'lang_RFQ_Status_PROCESSING',
        color: 'transparent',
    },
    Declined: {
        status: 'R',
        name: 'Declined',
        text: 'DECLINED',
        statusKey:'lang_RFQ_Status_DECLINED',
        color: 'transparent',
    },

    parseOrderStatus(status) {
        switch (status) {
            case OrderStatus.Draft.status: {
                return OrderStatus.Draft;
            }
            case OrderStatus.Open.status: {
                return OrderStatus.Open;
            }
            case OrderStatus.Appointed.status: {
                return OrderStatus.Appointed;
            }
            case OrderStatus.Accepted.status: {
                return OrderStatus.Accepted;
            }
            case OrderStatus.Confirmed.status: {
                return OrderStatus.Confirmed;
            }
            case OrderStatus.Cancelled.status: {
                return OrderStatus.Cancelled;
            }
            case OrderStatus.Closed.status: {
                return OrderStatus.Closed;
            }
            case OrderStatus.Expired.status: {
                return OrderStatus.Expired;
            }
            case OrderStatus.Delivered.status: {
                return OrderStatus.Delivered;
            }
            case OrderStatus.Completed.status: {
                return OrderStatus.Completed;
            }
            case OrderStatus.Processing.status: {
                return OrderStatus.Processing;
            }
            case OrderStatus.Declined.status: {
                return OrderStatus.Declined;
            }
            default: {
                return OrderStatus.All;
            }
        }
    }
};

export const DeliveryStatus = {
    PendingAppointed: 'PA'
};

/**
 * quotation status
 */
export const QuotationStatus = {
    Draft: {
        status: 'D',
    },
    Open: {
        status: 'O',
    },
    Cancelled: {
        status: 'C',
    },
    Expired: {
        status: 'E',
    },
    Appointed: {
        status: 'A',
    },
    Closed: {
        status: 'X',
    },
};

export const SelectCurrencyType={
    FROM:0,
    TO:1,
}



/**
 * order management - quotation
 * @type {ReadonlyArray<any>}
 */
export const QuotationTag = {
    Interested: {
        status: '1',
        name: 'Interested',
        nameKey:'lang_Quotation_Interested',
        icon: Resource.icon.showInterest(),
    },
    Shortlist: {
        status: '2',
        name: 'Shortlisted',
        nameKey:'lang_Quotation_Shortlisted',
        icon: Resource.icon.shortlisted(),
    },
    Awarded: {
        status: '3',
        name: 'Awarded',
        nameKey:'lang_Quotation_Awarded',
        icon: Resource.icon.appointed(),
    },

    // NoResponse: {
    //     status: 1,
    //     name: 'No Response',
    //     icon: Resource.icon.noResponse,
    // },
    // Quoting: {
    //     status: 3,
    //     name: 'Quoting',
    //     icon: Resource.icon.quoting,
    // },
    // Quoted: {
    //     status: 4,
    //     name: 'Quoted',
    //     icon: Resource.icon.quoted,
    // },

    getQuotationTag: function (status) {
        switch (status) {
            case QuotationTag.Interested.status: {
                return QuotationTag.Interested;
            }
            case QuotationTag.Shortlist.status: {
                return QuotationTag.Shortlist;
            }
            case QuotationTag.Awarded.status: {
                return QuotationTag.Awarded;
            }
            default: {
                return {};
            }
        }
    }
};

export const PostPlatfrom = {
    Mobile: 'M',
    Web: 'W',
};

export const ErrorCode = {
    SUCCESS: 0,
    NETWORK_UNAVAILABLE: -1,
    NETWORK_UNKNOWN_ERROR: -2,
    LOGIN_EXPIRED: -3,
};

export const CategoryCode = {
    SPARE_PART: 'SSSPA',
    SHIP_STORE: 'SSSSO',
    PROVISION: 'SSPRV',
    OIL: 'SSLUB',
    BUNKERING: 'BUBUS',
    INSURANCE: 'IN',
    MANNING_AGENCY: 'CWMAN',
    TRAINING_CENTER: 'CWTRA',
    PORT_AGENCY: 'PA',
    SNP: 'SP',
};

export const RegionId = {
    BUNKERING_AP: '195119874480012000',
    BUNKERING_MEA: '195119874496856000',
    BUNKERING_EU: '195119874496790000',
    BUNKERING_US: '195119874463236000',
    PORT_AGENCY_BALTIC: '195119874580807008',
    PORT_AGENCY_BLACK: '195119874597452992',
    PORT_AGENCY_CASPIAN: '195119874597584000',
    PORT_AGENCY_CUS: '195119874513567008',
    PORT_AGENCY_CEU: '195119874614231008',
    PORT_AGENCY_EA: '195119874480012992',
};

export const ErrorMessage = {
};
export const AddToCartMessage = {
    SUCCESS: 'added successfully.',
    FAILURE: 'added failed.',
};


export const RFQBusinessType = {
    cargo: 'cargo',
    bunkering: 'bunkering'
};

export const cargoType = {
    DRY: [
        'Dry Bulk / Commodities',
        'General Cargo / Equipments',
        'Heavylifts',
        'Military Equipments / Explosives'
    ],
    TANKER: ['DPP', 'CPP', 'LNG', 'LPG', 'CHEMICAL'],
};

export const ITUtoISO = {
    201: 'AL', //Albania
    202: 'AD', //Andorra
    203: 'AT', //Austria
    204: 'PT', //Azores
    205: 'BE', //Belgium
    206: 'BY', //Belarus
    207: 'BG', //Bulgaria
    208: 'VA', //Vatican City
    209: 'CY', //Cyprus
    210: 'CY', //Cyprus
    211: 'DE', //Germany
    212: 'CY', //Cyprus
    213: 'GE', //Georgia
    214: 'MD', //Moldova
    215: 'MT', //Malta
    216: 'AM', //Armenia
    218: 'DE', //Germany
    219: 'DK', //Denmark
    220: 'DK', //Denmark
    224: 'ES', //Spain
    225: 'ES', //Spain
    226: 'FR', //France
    227: 'FR', //France
    228: 'FR', //France
    229: 'MT', //Malta
    230: 'FI', //Finland
    231: 'FO', //Faroe Islands
    232: 'GB', //UK
    233: 'GB', //UK
    234: 'GB', //UK
    235: 'GB', //UK
    236: 'GI', //Gibraltar
    237: 'GR', //Greece
    238: 'HR', //Croatia
    239: 'GR', //Greece
    240: 'GR', //Greece
    241: 'GR', //Greece
    242: 'MA', //Morocco
    243: 'HU', //Hungary
    244: 'NL', //Netherlands
    245: 'NL', //Netherlands
    246: 'NL', //Netherlands
    247: 'IT', //Italy
    248: 'MT', //Malta
    249: 'MT', //Malta
    250: 'IE', //Ireland
    251: 'IS', //Iceland
    252: 'LI', //Liechtenstein
    253: 'LU', //Luxembourg
    254: 'MC', //Monaco
    255: 'PT', //Madeira
    256: 'MT', //Malta
    257: 'NO', //Norway
    258: 'NO', //Norway
    259: 'NO', //Norway
    261: 'PL', //Poland
    262: 'ME', //Montenegro
    263: 'PT', //Portugal
    264: 'RO', //Romania
    265: 'SE', //Sweden
    266: 'SE', //Sweden
    267: 'SK', //Slovakia
    268: 'SM', //San Marino
    269: 'CH', //Switzerland
    270: 'CZ', //Czech Republic
    271: 'TR', //Turkey
    272: 'UA', //Ukraine
    273: 'RU', //Russian Federation
    274: 'MK', //Macedonia
    275: 'LV', //Latvia
    276: 'EE', //Estonia
    277: 'LT', //Lithuania
    278: 'SI', //Slovenia
    279: 'RS', //Serbia
    301: 'AI', //Anguilla
    303: 'US', //Alaska
    304: 'AG', //Antigua and Barbuda
    305: 'AG', //Antigua and Barbuda
    306: 'CW', //Netherlands Antilles
    307: 'AW', //Aruba
    308: 'BS', //Azores
    309: 'BS', //Azores
    310: 'BM', //Bermuda
    311: 'BS', //Bahamas
    312: 'BZ', //Belize
    314: 'BB', //Barbados
    316: 'CA', //Canada
    319: 'KY', //Cayman Islands
    321: 'CR', //Costa Rica
    323: 'CU', //Cuba
    325: 'DM', //Dominica
    327: 'DO', //Dominican Republic
    329: 'GP', //Guadeloupe
    330: 'GD', //Grenada
    331: 'GL', //Greenland
    332: 'GT', //Guatemala
    334: 'HN', //Honduras
    336: 'HT', //Haiti
    338: 'US', //USA
    339: 'JM', //Jamaica
    341: 'KN', //Saint Kitts and Nevis
    343: 'LC', //Saint Lucia
    345: 'MX', //Mexico
    347: 'MQ', //Martinique
    348: 'MS', //Montserrat
    350: 'NI', //Nicaragua
    351: 'PA', //Panama
    352: 'PA', //Panama
    353: 'PA', //Panama
    354: 'PA', //Panama
    355: 'PA', //Panama
    356: 'PA', //Panama
    357: 'PA', //Panama
    358: 'PR', //Puerto Rico
    359: 'SV', //El Salvador
    361: 'PM', //Saint Pierre and Miquelon
    362: 'TT', //Trinidad and Tobago
    364: 'TC', //Turks and Caicos Islands
    366: 'US', //USA
    367: 'US', //USA
    368: 'US', //USA
    369: 'US', //USA
    370: 'PA', //Panama
    371: 'PA', //Panama
    372: 'PA', //Panama
    373: 'PA', //Panama
    374: 'PA', //Panama
    375: 'VC', //Saint Vincent and the Grenadines
    376: 'VC', //Saint Vincent and the Grenadines
    377: 'VC', //Saint Vincent and the Grenadines
    378: 'VG', //British Virgin Islands
    379: 'VI', //US Virgin Islands
    401: 'AF', //Afghanistan
    403: 'SA', //Saudi Arabia
    405: 'BD', //Bangladesh
    408: 'BH', //Bahrain
    410: 'BT', //Bhutan
    412: 'CN', //China
    413: 'CN', //China
    414: 'CN', //China
    416: 'TW', //China-Taiwan
    417: 'LK', //Sri Lanka
    419: 'IN', //India
    422: 'IR', //Iran
    423: 'AZ', //Azerbaijan
    425: 'IQ', //Iraq
    428: 'IL', //Israel
    431: 'JP', //Japan
    432: 'JP', //Japan
    434: 'TM', //Turkmenistan
    436: 'KZ', //Kazakhstan
    437: 'UZ', //Uzbekistan
    438: 'JO', //Jordan
    440: 'KR', //South Korea
    441: 'KR', //South Korea
    443: 'PS', //Palestine
    445: 'KP', //North Korea
    447: 'KW', //Kuwait
    450: 'LB', //Lebanon
    451: 'KG', //Kyrgyzstan
    453: 'MO', //Macao
    455: 'MV', //Maldives
    457: 'MN', //Mongolia
    459: 'NP', //Nepal
    461: 'OM', //Oman
    463: 'PK', //Pakistan
    466: 'QA', //Qatar
    468: 'SY', //Syria
    470: 'AE', //United Arab Emirates
    471: 'AE', //United Arab Emirates
    472: 'TJ', //Tajikistan
    473: 'YE', //Yemen
    475: 'YE', //Yemen
    477: 'HK', //China-Hong Kong
    478: 'BA', //Bosnia and Herzegovina
    501: 'FR', //Adelie Land
    503: 'AU', //Australia
    506: 'MM', //Myanmar
    508: 'BN', //Brunei
    510: 'FM', //Micronesia
    511: 'PW', //Palau
    512: 'NZ', //New Zealand
    514: 'KH', //Cambodia
    515: 'KH', //Cambodia
    516: 'CX', //Christmas Island
    518: 'CK', //Cook Islands
    520: 'FJ', //Fiji
    523: 'CC', //Cocos Islands
    525: 'ID', //Indonesia
    529: 'KI', //Kiribati
    531: 'LA', //Laos
    533: 'MY', //Malaysia
    536: 'MP', //Northern Mariana
    538: 'MH', //Marshall Islands
    540: 'NC', //New Caledonia
    542: 'NU', //Niue
    544: 'NR', //Nauru
    546: 'PF', //Tahiti
    548: 'PH', //Philippines
    553: 'PG', //Papua New Guinea
    555: 'PN', //Pitcairn Island
    557: 'SB', //Solomon Islands
    559: 'AS', //American Samoa
    561: 'WS', //Samoa
    563: 'SG', //Singapore
    564: 'SG', //Singapore
    565: 'SG', //Singapore
    566: 'SG', //Singapore
    567: 'TH', //Thailand
    570: 'TO', //Tonga
    572: 'TV', //Tuvalu
    574: 'VN', //Vietnam
    576: 'VU', //Vanuatu
    577: 'VU', //Vanuatu
    578: 'WF', //Wallis and Futuna Islands
    601: 'ZA', //South Africa
    603: 'AO', //Angola
    605: 'DZ', //Algeria
    607: 'FR', //Saint Paul and Amsterdam Islands
    608: 'GB', //Ascension Island
    609: 'BI', //Burundi
    610: 'BJ', //Benin
    611: 'BW', //Botswana
    612: 'CF', //Central African Republic
    613: 'CM', //Cameroon
    615: 'CG', //Congo
    616: 'KM', //Comoros
    617: 'CV', //Cape Verde
    618: 'FR', //Crozet Archipelago
    619: 'CI', //Ivory Coast
    620: 'KM', //Comoros
    621: 'DJ', //Djibouti
    622: 'EG', //Egypt
    624: 'ET', //Ethiopia
    625: 'ER', //Eritrea
    626: 'GA', //Gabon
    627: 'GH', //Ghana
    629: 'GM', //Gambia
    630: 'GW', //Guinea-Bissau
    631: 'GQ', //Equatorial Guinea
    632: 'GN', //Guinea
    633: 'BF', //Burkina Faso
    634: 'KE', //Kenya
    635: 'FR', //Kerguelen Islands
    636: 'LR', //Liberia
    637: 'LR', //Liberia
    638: 'SS', //South Sudan
    642: 'LY', //Libya
    644: 'LS', //Lesotho
    645: 'MU', //Mauritius
    647: 'MG', //Madagascar
    649: 'ML', //Mali
    650: 'MZ', //Mozambique
    654: 'MR', //Mauritania
    655: 'MW', //Malawi
    656: 'NE', //Niger
    657: 'NG', //Nigeria
    659: 'NA', //Namibia
    660: 'RE', //Reunion
    661: 'RW', //Rwanda
    662: 'SD', //Sudan
    663: 'SN', //Senegal
    664: 'SC', //Seychelles
    665: 'SH', //Saint Helena
    666: 'SO', //Somalia
    667: 'SL', //Sierra Leone
    668: 'ST', //Sao Tome and Principe
    669: 'SZ', //Swaziland
    671: 'TG', //Togo
    672: 'TN', //Tunisia
    674: 'TZ', //Tanzania
    675: 'UG', //Uganda
    676: 'CD', //Congo
    677: 'TZ', //Tanzania
    678: 'ZM', //Zambia
    679: 'ZW', //Zimbabwe
    701: 'AR', //Argentina
    710: 'BR', //Brazil
    720: 'BO', //Bolivia
    725: 'CL', //Chile
    730: 'CO', //Colombia
    735: 'EC', //Ecuador
    740: 'FK', //Falkland Islands
    745: 'GF', //French Guiana
    750: 'GY', //Guyana
    755: 'PY', //Paraguay
    760: 'PE', //Peru
    765: 'SR', //Suriname
    770: 'UY', //Uruguay
    775: 'VE' //Venezuela
}

/**
 * Quotation display status
 * @type 0 - normal, 1- create, 2 - edit
 */
export const QuotationDisplayStatus = {
  normal: '0',
  create: '1',
  edit: '2',
};

/**
 * RFQ edit type
 * @type 0 - normal(cannot edit), 1- edit, 2 - only edit validity time
 */
export const RFQEditType = {
  normal: '0',
  edit: '1',
  edit_validity: '2',
};

export const ShipSupplyDeliveryMethod = {
    mol: 'mol',
    self: 'self',
};

export const ShipSupplyProductType = {
    table: 'table',
    attachment: 'attachment',
};
