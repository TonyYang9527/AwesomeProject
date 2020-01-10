'use strict';

import React, {Fragment} from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as Colors from "@constants/Colors";
import * as Dimens from "@constants/Dimension";
import { BrowseImages } from '@components/common/ImageManager'
import {browseAttachment, getAttachmentIcon, isEmpty,getImageSouce,isImage} from "@utils/Utils";
import { images as Resource } from '@resource'
import i18n from '@utils/i18n'
import * as CommonStyle from '@constants/Style'
import { isObservable, toJS } from 'mobx'

const Attachment = ({navigation, style, files, onItemPress, lineItems=3,title,label}) => {
    files = toJS(files)
    
    if (!files) return null;
    if (files && files.length === 0) return null;
    let normalFiels = files.filter(item => {return !isImage(item.fileType)})
    let images = files.filter(item => {return isImage(item.fileType)})

    const renderAttachment = function(item, index) {
        let {documentName, fileType} = item
        let fileName = documentName
        const iconSource = getAttachmentIcon(fileType);
        let onPressFunc;
        if(onItemPress) {
            onPressFunc = () => {
                onItemPress(index, item)
            };
        }else if(navigation != null){
            onPressFunc = () => {
                const { documentUrl } = item;
                let title = i18n.t('mobile.attachments');
                if(!isEmpty(fileName)) {
                    title = fileName;
                }
                browseAttachment({navigation, title, type: fileType, path:documentUrl, images})
            }
        }
        return (
            <Fragment key={'attachment-' + index}>
                <TouchableOpacity onPress={onPressFunc}>
                    <View style={Styles.attachment}>
                        <Image style={Styles.iconContainer}
                            source={iconSource}
                            resizeMode='contain'/>
                        <Text style={Styles.attachmentName}
                            numberOfLines={2}>
                            {fileName}
                        </Text>
                        <Image
                            style={[Styles.rightImg]}
                            source={Resource.icon.next()}
                        />
                    </View>
                </TouchableOpacity>
            </Fragment>
        );
    };
    const renderImage = function(item, index) {
        let iconSource = getImageSouce(item);
        let curLineItems = lineItems || 3
        let isLastItem= (index+1)%curLineItems === 0
        let _style = isLastItem ? {} : { marginRight:Dimens.MySize(11) }
        let onPressFunc;
        if(onItemPress) {
            onPressFunc = () => {
                onItemPress(index, item)
            };
        }else if(navigation != null){
            onPressFunc = () => {
                BrowseImages(navigation, images, index)
            }
        }
        return (
            <Fragment key={'image-' + index}>
                <TouchableOpacity onPress={onPressFunc}>
                    <Image style={[Styles.attachmentIcon,_style]}
                        source={iconSource} />
                </TouchableOpacity>
            </Fragment>
        );
    };

    return (
        <View style={[ Styles.container, style, ]}>
            {
				title  && <Text style={[CommonStyle.textNormalBlack,{paddingTop:Dimens.MySize(17)}]}>
					{title || ''} </Text>
			}
			{
				label  && <Text style={[CommonStyle.textSmallGrey,{paddingTop:Dimens.MySize(7),}]}>
					{label || ''} </Text>
			}
            <View style={{paddingTop:Dimens.MySize(10),flexDirection:'row',flexWrap:'wrap'}}>
                { images && images.map(renderImage) }   
            </View>
            { normalFiels && normalFiels.map(renderAttachment) }
        </View>
    )
};

const Styles = StyleSheet.create({
    container: {
        // paddingHorizontal:Dimens.padding
    },
    attachment: {
        flexDirection: 'row',
        paddingBottom:Dimens.MySize(15),
        alignItems:'center'
    },
    iconContainer: {
        width: Dimens.MySize(37),
        height: Dimens.MySize(49),
    },
    attachmentName: {
        flex: 1,
        marginLeft: Dimens.MySize(20),
        fontSize: Dimens.MySize(16),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: Colors.textColor,
        textAlignVertical: 'center',
        alignSelf: 'center',
    },
    rightImg: {
        width: Dimens.MySize(22),
        height: Dimens.MySize(22),
        tintColor: Colors.lightGrey
    },
    attachmentIcon: {
		width: Dimens.MySize(105),
		height: Dimens.MySize(105),
		borderColor:"#DFDFDF",
		borderRadius:Dimens.MySize(10),
        borderWidth:Dimens.MySize(2),
        marginBottom:Dimens.MySize(20),
	},
});

export default Attachment;
