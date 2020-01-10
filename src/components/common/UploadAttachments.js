
import React from 'react'
import { Image, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { Progress } from '@ant-design/react-native'
import { Observer } from 'mobx-react'
import { BrowseImages, ImagePickerModal } from '@components/common/ImageManager'
import ImgTxtItem from '@components/common/ImgTxtItem'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import { images as Resource } from '@resource'
import { getAttachmentIcon, bytesToSize, isEmpty, getImageSouce } from '@utils/Utils'
import { ShowMessage } from '@utils/MyAlert'
import UploadAttachStore from "@stores/image/UploadAttachStore";
import { observable, action, toJS } from 'mobx';
import i18n from '@utils/i18n'
import * as CommonStyle from '@constants/Style'

export const AttachmentItem = ({ index, item, isLastItem, srcArr, disabled, onRemove, navi }) => {
	let { filename, name, mime, size, url } = item;
	let curItem = toJS(item)
	let iconSource = getImageSouce(curItem);
	let sizeStr = bytesToSize(size);
	let _style = isLastItem ? {} : { marginRight:Dimens.MySize(11) }
	return (
		<View style={[Styles.attchItem, _style]}>
			<TouchableOpacity
				onPress={() => {
					BrowseImages(navi, toJS(srcArr.list), index)
				}}>
				<Image style={Styles.attachmentIcon} resizeMode={'contain'}
					source={iconSource} />
			</TouchableOpacity>
			<Observer render={() => {
				let percent = (size == null) ? 0 : (item.progress * size)
				let status = '';
				if (item.progress < 1) {
                    status = i18n.t('mobile.attchment.processing');
				} else if (item.progress === 1){
					if (isEmpty(item.url)) {
                        status = i18n.t('mobile.attchment.failed');
                    } else {
                        status = i18n.t('mobile.attchment.uploaded');
					}
				}

				if (item.progress == null) {
					item.progress = 1
					percent = (size == null) ? 0 : size
					status = isEmpty(item.url) ? i18n.t('mobile.attchment.invaild.file') : i18n.t('mobile.attchment.uploaded')
				}
				return (
				<View style={Styles.itemCenter} >
					<Progress
						style={Styles.progress}
						barStyle={Styles.progressBar}
						percent={isEmpty(item.url) ? 0 : (item.progress * 100)} />
					< View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
						<Text style={Styles.attachmentSize}>
							{bytesToSize(percent) + ' / ' + sizeStr + '  ' + status}
						</Text>
					</View>
				</View>)
			}} />

			<Observer render={() => {
				let _onPress = null, _icon = null
				if (item.progress == null || item.progress == 1 || item.isCanceled) {
					_onPress = () => {
						srcArr.remove(index, 1)
						onRemove(index, 1)
					}
					_icon = Resource.icon.image_close()
				} else {
					_onPress = () => srcArr.cancelUpload(index)
					_icon = Resource.icon.image_close()
				}
				return <TouchableOpacity
					activeOpacity={Dimens.opacity}
					style={{ position: 'absolute',top: Dimens.MySize(13.5),right:  Dimens.MySize(3.5), }}
					disabled={disabled}
					onPress={_onPress}>
					<Image style={Styles.cancel}
						source={_icon} />
				</TouchableOpacity>
			}} />
		</View>
	);
}

interface Props{
	navi: any,
	must: boolean,
	label: string,
	onChange: (index:number, num:number)=>void,
	uploadCallback: (value:any)=>void,
	defValue: [],
	enable: boolean,
	singleUpload:boolean,
	maxFiles: number,
}
export default class UploadAttachments extends React.Component<Props> {

	static defaultProps = {
		maxFiles: 6,
		singleUpload: false,
	};

	constructor(props) {
		super(props)
		this.navi = props.navi
		this.must = props.must
		this.onChange = props.onChange
		this.uploadCallback = props.uploadCallback
		this.defValue = props.defValue
		this.srcArr = new UploadAttachStore({ key: 'filename' })
		this.updateList(this.defValue)
		this.enable = props.enable
        this.dashStyle = props.dashStyle;
        this.singleUpload = props.singleUpload;
		this.maxFiles = props.singleUpload ? 1 : props.maxFiles;
		
		this.state = {
			canSelectSize:this.maxFiles 
		}
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.enable = props.enable
	}

	updateList = (list) => {
		if (Array.isArray(list)) {
			let nlist = list.map((item) => ({
				...item,
				'filename': item.fileName,
			}))
			this.srcArr.replace(nlist)
		}
	}
	renderAdd = () => {
		const { canSelectSize } = this.state
		if (canSelectSize === 0) {
			return null
		}
		return (
			<ImagePickerModal
                maxFiles={canSelectSize}
				onCallback={({ error, source }) => {
					if (error) {
						try {
							const errorJson = JSON.stringify(error).toLowerCase();
							if (!errorJson.includes('cancel')) {
								ShowMessage(i18n.t('mobile.attachment.toast.fail'));
							}
						} catch (e) {
                            ShowMessage(i18n.t('mobile.attachment.toast.fail'));
						}
					} else {
						const uploadArr = Array.isArray(source) ? source : [source]
						let size = canSelectSize
						this.setState({
							canSelectSize: size - uploadArr.length
						})
						this.srcArr.initAttachmentUpload(uploadArr)
						this.srcArr.updateAttachments(this.uploadCallback)
					}
				}}>
               <TouchableOpacity style={[Styles.attchItem]}>
					   <Image style={Styles.attachmentIconAdd}
					   	resizeMode={'contain'}
						source={Resource.icon.image_add()} />
				</TouchableOpacity>
			</ImagePickerModal >
		)
	}

	render() {
		const { canSelectSize } = this.state
		let lineItems = this.props.lineItems || 3
		return <View style={{ width: '100%',backgroundColor:Colors.white,paddingHorizontal:0 }}>
			{
				this.props.title 
				&& <Text style={[CommonStyle.textNormalBlack,{paddingTop:Dimens.MySize(17)}]}>
					{this.props.title || ''}
				</Text>
			}
			{
				this.props.label 
				&& <Text style={[CommonStyle.textSmallGrey,{paddingVertical:Dimens.MySize(7)}]}>
					{this.props.label || ''}
				</Text>
			}

			<Observer render={() => (
				<View
					style={{ flexDirection:'row',flexWrap:'wrap',}}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}>
					{this.srcArr.list.map((item, index) => {
						return <AttachmentItem
							key={index + '-'}
							item={item}
							index={index}
							navi={this.navi}
							disabled={!this.enable}
							onRemove={()=>{
								let size = canSelectSize
								this.setState({
									canSelectSize: size + 1
								})
								this.onChange && this.onChange(index)
							}}
							isLastItem={(index+1)%lineItems === 0}
							canSelectSize={canSelectSize}
							srcArr={this.srcArr} />
					})}
					{this.renderAdd()}
				</View>
			)} />

			<Text style={Styles.hintWord}>{i18n.t('mobile.attachments.supported')}</Text>
			
		</View>
	}
}

const Styles = StyleSheet.create({
	attchItem: {
		paddingTop: Dimens.space_least,
		paddingBottom: Dimens.space_least,
		alignItems: 'center',
		width: Dimens.MySize(107),
		height: Dimens.MySize(145),
	},
	attachmentIcon: {
		width: Dimens.MySize(105),
		height: Dimens.MySize(105),
		borderColor:"#DFDFDF",
		borderRadius:Dimens.MySize(10),
		borderWidth:Dimens.MySize(2),
	},
	attachmentIconAdd: {
		width: Dimens.MySize(107),
		height: Dimens.MySize(107),
	},
	itemCenter: {
		flex: 1,
	},
	attachmentName: {
		fontSize: Dimens.font_size_normal,
		color: Colors.textColor
	},
	progress: {
		height: Dimens.MySize(2),
		width: Dimens.MySize(100),
		marginTop: Dimens.MySize(2),
		backgroundColor: Colors.white,
	},
	progressBar: {
		height: 3,
		backgroundColor: Colors.baseColor,
	},
	attachmentSize: {
		fontSize: Dimens.MySize(6),
		color: Colors.labelColor,
	},
	hintWord: {
		paddingTop: Dimens.MySize(5),
		paddingBottom: Dimens.MySize(53),
		color: Colors.textLabel,
		fontSize: Dimens.font_size_small,
		// fontStyle: 'italic',
	},
	cancel: {
		width: Dimens.MySize(23),
		height: Dimens.MySize(23),
	},

    dashButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 4,
        height: 43,
        margin: 12,
        borderColor: Colors.baseColor
    }
})