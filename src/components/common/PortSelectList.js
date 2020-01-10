import React, {Component} from 'react'
import CommonStore from "@stores/common/CommonStore";
import { observe } from 'mobx';
import { withNamespaces } from "react-i18next";
import CommonHeader from '@components/common/CommonHeader'
import SearchableLetterSectionList from './sectionList/SearchableLetterSectionList';

@withNamespaces()
export default class PortSelectList extends Component {

	static navigationOptions = ({ navigation ,screenProps}) => ({
        headerLeft: null,
        headerTitle: <CommonHeader
            navigation={navigation}
            title={screenProps.t('mobile.Select.Port')}
            />
    });

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            sectionSize: []
		}
    }

    componentDidMount(){
		let allPorts = CommonStore.allPorts
		if (allPorts.length > 0) {
			this.getPortInfos(allPorts)
		}else{
			CommonStore.getAllPorts();
		}
		this.disposer = observe(CommonStore, 'havaPorts', (change) => {
            if (change.newValue === true) {
				this.getPortInfos(CommonStore.allPorts)
				this.disposer && this.disposer();
            }
        });
	}

	componentWillUnmount() {
		this.disposer && this.disposer();
	}
	
	
	getPortInfos = (data) =>{
        let jsonData = data
        //每组的开头在列表中的位置
        let totalSize = 0;
        //SectionList的数据源
        let cityInfos = [];
        //分组头的数据源
        let citySection = [];
        //分组头在列表中的位置
        let citySectionSize = [];
        for (let i = 0; i < jsonData.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = jsonData[i].title;
            let section = {}
            section.key = jsonData[i].title;
            section.data = jsonData[i].portList;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.setState({data: cityInfos, sections: citySection, sectionSize: citySectionSize})
    }

    render() {
        let { key, selectCallBack } = this.props.navigation.state.params;
        return (
            <SearchableLetterSectionList
                sections={this.state.data}
                letters={this.state.sections}
                key={key}
                selectCallBack={selectCallBack}
                navigation={this.props.navigation}
                itemTextKey={'display'}
            />
        )
    }
}
