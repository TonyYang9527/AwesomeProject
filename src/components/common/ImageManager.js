import React from 'react';
import {
	ActivityIndicator, Alert, Image, Modal,
	PermissionsAndroid, Platform, TouchableOpacity, View
} from 'react-native';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import ActionSheetModal from './ActionSheetModal';
import * as Colors from '@constants/Colors'
import ImageUtils from '@utils/ImageUtils';
import { isAndroid } from '@utils/Utils';
import { showErrorDelay } from '@utils/MyAlert';
import { images as Resource } from '@resource';
import i18n from '@utils/i18n'
declare interface ImagePickerModalProps {
	title: string,//title for whole view
	visible: boolean,
	onCallback: () => void,

	options: Array<string>,
	optionsIcon: Array<object>,
	destructiveButtonIndex: number,
	onPress: () => void,

	//picker props
	multiple: boolean,
	maxFiles: number,
	cropping: boolean,
	freeStyleCropEnabled: boolean,
	cropWidth: number,
	cropHeight: number,
}

export class ImagePickerModal extends React.Component<ImagePickerModalProps> {

	static defaultProps = {
		visible: false,
		tintColor: '#007AFF',
		onPress: (index) => { },
		multiple: true,
		cropping: false,
		maxFiles: 6,
		freeStyleCropEnabled: true,
		cropWidth: 2400,
		cropHeight: 2400
	};

	constructor(props) {
		super(props);
		this.timers = []
		if (props.options) {
			this.options = [i18n.t('mobile.TakePhoto'), i18n.t('mobile.SelectFromLibrary')].concat(props.options)
			this.options.push(i18n.t('editprodinfo.button.cancel'))
			this.optionsIcon = [Resource.icon.camera_select(), Resource.icon.default()].concat(props.optionsIcon)
		} else {
			this.options = [i18n.t('mobile.TakePhoto'), i18n.t('mobile.SelectFromLibrary'), i18n.t('editprodinfo.button.cancel')]
			this.optionsIcon = [Resource.icon.camera_select(), Resource.icon.default()]
		}
	}

	UNSAFE_componentWillReceiveProps(newp) {
		this._toggle(newp.visible)
	}

	componentDidMount() {
		this.timers.push(setTimeout(() => {
			this._toggle(this.props)
		}, 100))
	}

	componentWillUnmount() {
		while (this.timers.length > 0) {
			clearTimeout(this.timers.pop())
		}
	}

	_toggle = ({ visible }) => {
		if (this.ActionSheetModal) {
			if (visible) {
				this.ActionSheetModal.show()
			}
		}
	}

	openPicker = () => {
		ImagePicker.openPicker({
			mediaType: 'photo',
			multiple: this.props.multiple,
			maxFiles: this.props.maxFiles,
			cropping: this.props.cropping,
			freeStyleCropEnabled: this.props.freeStyleCropEnabled,
			width: this.props.cropWidth,
			height: this.props.cropHeight,
			forceJpg: true,
		}).then(source => {
			this.props.onCallback && this.props.onCallback({ source });
		}).catch(error => { // error or cancel picking
			if (error.code === 'E_PERMISSION_MISSING') {
				Permissions.check('photo').then(response => {
					// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
					if (response === 'denied' || response === 'undetermined') {
						Platform.OS === 'ios' ?
							showErrorDelay(i18n.t('mobile.PleaseAllowAppToAccessPhotos'), i18n.t('mobile.NoPhotoPermission'))
							: showErrorDelay(i18n.t('mobile.PleaseAllowAppToAccessStorage'), i18n.t('mobile.NoStoragePermission'))
					}
				})
			} else if (error.code === 'E_NO_IMAGE_DATA_FOUND') {
				showErrorDelay(i18n.t('lang_Not_aupport_this_format'))
			} else if (error.code === 'UN_SPICIFIED_ERROR') {
				showErrorDelay(i18n.t('lang_UN_SPICIFIED_ERROR'))
			}

			this.props.onCallback && this.props.onCallback({ error });
		})
	}

	openCamera = () => {
		ImagePicker.openCamera({
			multiple: this.props.multiple,
			cropping: this.props.cropping,
			freeStyleCropEnabled: this.props.freeStyleCropEnabled,
			width: this.props.cropWidth,
			height: this.props.cropHeight,
		}).then(source => {
			if (!Array.isArray(source)) source = [source]
			this.props.onCallback && this.props.onCallback({ source })
		}).catch(error => {
			this.props.onCallback && this.props.onCallback({ error })
			if (error.code.includes('PERMISSION')) {
				// ios can take photo without Photo Permission, error_code is E_PICKER_NO_CAMERA_PERMISSION
				Permissions.check('camera').then(response => {
					if (response === 'denied' || response === 'undetermined') {
						showErrorDelay(i18n.t('lang_PleaseAllowAppToAccessCamera'), i18n.t('lang_NoCameraPermission'))
					} else if (Platform.OS === 'android') {
						// android must has storage and camera permission as well
						Permissions.check('photo').then(response => {
							// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
							if (response === 'denied' || response === 'undetermined') {
								showErrorDelay(i18n.t('mobile.PleaseAllowAppToAccessStorage'), i18n.t('mobile.NoStoragePermission'))
							}
						})
					}
				})
			}
		})
	}

	_onPress = (index) => {
		switch (index) {
			case 0: {
				this.timers.push(setTimeout(() => {
					this.openCamera()
				}, Platform.OS === 'ios' ? 100 : 10))
				break
			}
			case 1: {
				this.timers.push(setTimeout(() => {
					this.openPicker()
				}, Platform.OS === 'ios' ? 100 : 10))
				break
			}
			default: {
				let { onPress } = this.props
				onPress && onPress(this.options[index], index)
			}
		}
	}

	_renderChildren = (props) => {
		return (React.createElement(
			View, null,
			React.Children.map(props.children, (child) => {
				return React.cloneElement(child, {
					onPress: () => {
						child.props.onPress && child.props.onPress()
						this._toggle({ visible: true })
					}
				});
			})
		))
	}

	render() {
		const { cancelButtonIndex, destructiveButtonIndex } = this.props
		let cindex = cancelButtonIndex ? cancelButtonIndex : (this.options.length - 1)
		return <View style={this.props.style}>
			<ActionSheetModal
				ref={c => this.ActionSheetModal = c}
				title={this.props.title}
				cancelButtonIndex={cindex}
				destructiveButtonIndex={destructiveButtonIndex}
				options={this.options}
				optionsIcon={this.optionsIcon}
				onPress={this._onPress}
			/>
			{this._renderChildren(this.props)}
		</View>
	}
}

// ImageBrowserModal source
class ModalSource {
	static imgArray = []
	static curindex = 0
	static isShow = observable.box(false)

	static showModal = action((tmp, iindex) => {
		ModalSource.imgArray = tmp
		ModalSource.curindex = iindex
		ModalSource.isShow.set(true)
	})

	static reset = action(() => {
		ModalSource.imgArray = []
		ModalSource.curindex = 0
		ModalSource.isShow.set(false)
	})
}

function LoadingView() {
	return <View style={{ backgroundColor: 'black', width: '100%', height: '100%', justifyContent: 'center' }}>
		<ActivityIndicator size='large' color={Colors.baseColor} />
	</View>
}

function CloseButton(onPress) {
	return <TouchableOpacity
		style={{ position: 'absolute', right: 10, top: 35, padding: 5 }}
		onPress={onPress}>
		<Image
			style={{ width: 24, height: 24 }}
			source={Resource.icon.close_w()} />
	</TouchableOpacity>
}

function DownloadButton(onPress) {
	return <TouchableOpacity
		style={{ position: 'absolute', right: 10, bottom: 35, padding: 5, backgroundColor: Colors.whiteAlpha }}
		onPress={onPress}>
		<Image
			style={{ width: 24, height: 24, tintColor: Colors.white }}
			source={Resource.icon.download()} />
	</TouchableOpacity>
}

function OptionMenus(_this) {
	return <ActionSheetModal
		ref={o => _this.ActionSheetModal = o}
		title={i18n.t('would_u_like_save_image_msg')}
		options={[i18n.t('would_u_like_save_image_msg_y'), i18n.t('editprodinfo.button.cancel')]}
		cancelButtonIndex={1}
		destructiveButtonIndex={1}
		onPress={(index) => {
			_this.onSave2Album(index);
		}}
	/>
}

@observer // This is router that defined in the App's route map
export class ImageBrowserModal extends React.Component {
	static defaultProps = { enableSave: false }

	constructor(props) {
		super(props)
		this.currentImageUrl = '';
	}

	onSave2Album = (index) => {
		if (index === 0) {// dont need PhotoPermission
			if (this.currentImageUrl) ImageUtils.save2Album(this.currentImageUrl);
		}
	}

	render() {
		return <Modal visible={ModalSource.isShow.get()}
			animationType='none'
			onRequestClose={() => { ModalSource.reset() }}>
			<ImageViewer
				imageUrls={ModalSource.imgArray}
				index={ModalSource.curindex}
				saveToLocalByLongPress={false}
				enableSwipeDown={true}
				loadingRender={LoadingView}
				onSwipeDown={() => { ModalSource.reset() }}
			/>

			{CloseButton(() => { ModalSource.reset() })}

			{this.props.enableSave && DownloadButton(() => { this.onSave2Album(0) })}

			{OptionMenus(this)}
		</Modal>
	}
}

// Alternative, this also is router that defined in the App's route map
export class ImageBrowser extends React.Component {
	static defaultProps = { enableSave: false }

	constructor(props) {
		super(props)
		this.navi = props.navigation;
		this.images = this.navi.getParam('images', []);
		let index = this.navi.getParam('index', 0);
		this.curindex = index % this.images.length;
		this.currentImageUrl = '';
	}

	async  requestPhotoPermission() {
		try {
			await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					'title': i18n.t('photo_permission_title'),
					'message': i18n.t('photo_permission_msg')
				}
			);
		} catch (err) {
			console.error('requestPhoto Persion error:' + err);
		}
	}

	android_request_permission() {
		if (isAndroid() && Platform.Version >= 23) {
			this.requestPhotoPermission();
		}
	}

	android_check_permission() {
		if (!isAndroid()) {
			return;
		}
		Permissions.check('photo').then(response => {
			if (response === 'denied') {
			} else if (response === 'undetermined') {
				this.android_request_permission();
				this.timers.push(setTimeout(() => {
					this.android_check_permission();
				}, 2000))
			} else if (response === 'authorized') {
				if (this.currentImageUrl) ImageUtils.save2Album(this.currentImageUrl);
			}
		});
	}

	onSave2Album = (index) => {
		if (index === 0) {
			if (isAndroid()) {
				this.android_check_permission();
			} else {
				Permissions.check('photo').then(response => {
					if (response === 'denied') {
						if (!isAndroid()) {
							this.timers.push(setTimeout(() => {
								// Works on both iOS and Android
								Alert.alert(
									i18n.t('alert'),
									i18n.t('alert_photo_permission_failure'),
									[{ text: 'OK' }],
									{ cancelable: false }
								);
							}, 200))
						}
					} else if (response === 'authorized') {
						if (this.currentImageUrl) ImageUtils.save2Album(this.currentImageUrl);
					}
				});
			}
		}
	}

	UNSAFE_componentWillMount() {
		if (this.images && this.images.length > 0) {
			this.newSrc = [];
			this.images.forEach((element, index) => {
				if (element.hasOwnProperty('documentUrl') && element.documentUrl != null && element.documentUrl.length > 0) {
					this.newSrc.push({ url: element.documentUrl })
				} else if (element.hasOwnProperty('url') && element.url != null && element.url.length > 0) {
					this.newSrc.push(element)
				} else if (index < this.curindex) {
					this.curindex--;
				}
			})
		}
	}

	render() {
		return this.images.length === 0 ? null
			: <Modal visible={true} animationType="none" onRequestClose={() => { }}>
				<ImageViewer
					imageUrls={this.newSrc}
					index={this.curindex}
					saveToLocalByLongPress={false}
					enableSwipeDown={true}
					loadingRender={LoadingView}
					onSwipeDown={() => { this.navi.goBack() }}
				// onLongPress={(image) => {
				// 	this.currentImageUrl = image.url;
				// 	this.ActionSheetModal.show();
				// }}
				/>

				{CloseButton(() => { this.navi.goBack() })}

				{this.props.enableSave && DownloadButton(() => { this.onSave2Album(0) })}

				{OptionMenus(this)}
			</Modal>
	}
}

// This is action that called by the user
export function BrowseImages(navigation, array, iindex = 0) {
	let source = []
	array.forEach((element, index) => {
		if (element.hasOwnProperty('path') && element.path != null && element.path.length > 0) {
			source.push({ url: element.path })
		}else if (element.hasOwnProperty('uri') && element.uri != null && element.uri.length > 0) {
			source.push({ url: element.uri })
		} else if (element.hasOwnProperty('url') && element.url != null && element.url.length > 0) {
			source.push(element)
		} else if (element.hasOwnProperty('documentUrl') && element.documentUrl != null && element.documentUrl.length > 0) {
			source.push({ url: element.documentUrl })
		} else if (typeof element === 'string' && element.startsWith('http')) {
			source.push({ url: element })
		} else if (arguments.length === 4) {
            const imageKey = arguments[3];
            if(element.hasOwnProperty(imageKey)) {
                source.push({ url: element[imageKey] })
			}
		} 
	})

	if (Platform.OS === 'ios') {
		ModalSource.showModal(source, iindex)
	} else {
		navigation.navigate('ImageBrowser', { images: source, index: iindex })
	}
}
