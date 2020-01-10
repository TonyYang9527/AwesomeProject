import { observable } from 'mobx'
import { images as Resource } from '@resource'

const ob = observable({

    shipType: {
        'cargo': Resource.vessels.Cargo,
        'fishing': Resource.vessels.Fishing,
        'other': Resource.vessels.Other,
        'passenger': Resource.vessels.Passenger,
        'pleasurecraft': Resource.vessels.Pleasure_Craft,
        'sailing': Resource.vessels.Sailing,
        'tanker': Resource.vessels.Tanker,
        'tug': Resource.vessels.Tug,
        'Anchor': Resource.vessels.Anchor
    },

    shipTypeColor: {
        'tanker': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(255,108,108,0.5)', color: 'rgba(96,0,0,0.8)', },
        'cargo': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(255,251,128,0.5)', color: 'rgba(135,84,0,0.8)', },
        'fishing': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(255,108,250,0.5)', color: 'rgba(104,0,90,0.8)', },
        'other': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(239,239,239,0.5)', color: 'rgba(108,108,108,0.8)', },
        'passenger': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(173,165,255,0.5)', color: 'rgba(17,0,94,0.8)', },
        'pleasurecraft': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(255,203,130,0.5)', color: 'rgba(90,35,0,0.8)', },
        'sailing': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgba(90,255,127,0.5)', color: 'rgba(1,82,30,0.8)', },
        'tug': { fontSize: 12, paddingLeft: 4, paddingRight: 4, borderRadius: 7, overflow: "hidden", backgroundColor: 'rgb(164,243,255,0.5)', color: 'rgb(0,92,121,0.8)', },
    },

    getTopHeight: {
        '812': { detailTop: (812 * 0.39), favTop: (812 / 5) },
        '667': { detailTop: (667 * 0.43), favTop: (812 / 5) },
        '602': { detailTop: (602 * 0.49), favTop: (812 / 5.70) },
        '592': { detailTop: (592 * 0.50), favTop: (812 / 5.70) },
        '640': { detailTop: (640 * 0.50), favTop: (812 / 5) },
    },
    
    navStatusList: {
        0: 'Underway',
        1: 'Anchored',
        2: 'Not under command',
        3: 'Restricted maneuverability',
        4: 'Ship draught limiting movement',
        5: 'Moored',
        6: 'Aground',
        7: 'Engaged in fishing',
        8: 'Under way sailing',
        9: '(Res. for dangerous goods)',
        10: '(Res. for dangerous goods)',
        11: 'Power-driven towing astern',
        12: 'Power-driven towing alongside',
        13: '(Res. for future use)',
        14: 'AIS-SART / AIS-MOB / AIS-EPIRB',
        15: 'Undefined (default)',
    }
}
)

export default { ob }