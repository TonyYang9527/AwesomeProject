import { Alert, Platform, ToastAndroid } from "react-native";
import i18n from '@utils/i18n'

export class SingleAlert {
	static isShowing = false;
	static timer = null;

	static clear() {
		this.timer = null
		this.isShowing = false
	}

	static show({ msg, title = '', delay = 100, onOkPress }) {
		if (this.timer != null) return

		if (Platform.OS === 'ios')
			delay *= 2
		this.timer = setTimeout(() => {
			if (!this.isShowing) {
				const onPress = (e) => {
					onOkPress && onOkPress(e);
					this.clear()
				};

				Alert.alert(
					title,
					msg,
					[
						{ text: i18n.t('mobile.OK'), onPress }
					],
					{
						cancelable: false,
						onDismiss: this.clear
					}
				);
				this.isShowing = true;
			}
		}, delay);
	}
}

export function showErrorDelay(msg, title = 'Oops!') {
	setTimeout(() => {
		Alert.alert(title, msg, [{ text: 'OK' }]);
	}, Platform.OS === 'ios' ? 300 : 100);
}

export function ShowMessage(message: string, timeout: number = undefined, title = '') {
	let messageTimer

	const onClear = () => {
		if (messageTimer !== undefined) {
			clearTimeout(messageTimer);
			messageTimer = undefined;
		}
	}

	const showIOSAlert = (title, message) => {
		Alert.alert(
			title, message,
			[{ text: "OK", onPress: onClear }],
			{ cancelable: true, onDismiss: onClear }
		);
	}

	if (Platform.OS === 'android') {
		ToastAndroid.show(message, ToastAndroid.LONG);
	} else {
		onClear()

		if (timeout > 0) {
			messageTimer = setTimeout(() => {
				showIOSAlert(title, message);
			}, timeout);
		} else {
			showIOSAlert(title, message);
		}

	}
}
