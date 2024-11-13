import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { INavigation } from '@router';
import { baseStyles } from '@styles//base.styles';

import { styles } from './Footer.stylesheet'

import folderWhite from '@components/ui/Icons/folder-white'
import fileWhite from '@components/ui/Icons/file-white'
import plusWhite from '@components/ui/Icons/plus-white'

import { SvgXml } from 'react-native-svg';

type IFooterProps = {
    navigation: INavigation
};

export default function Footer({ navigation }: IFooterProps) {

    return (
        <View style={baseStyles.footer}>
            <View style={styles.uploadBtns}>
                <TouchableOpacity style={styles.uploadFileBtn}>
                    <SvgXml xml={fileWhite} width="20" height="20" />
                </TouchableOpacity>
                <View style={styles.centerIcon}>
                    <SvgXml xml={plusWhite} width="30" height="30" />
                </View>
                <TouchableOpacity style={styles.uploadFolderBtn}>
                    <SvgXml xml={folderWhite} width="20" height="20" />
                </TouchableOpacity>
            </View>
        </View>
    );
}