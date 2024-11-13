import theme from '@config/theme';
import { StyleSheet, ViewStyle } from 'react-native';

const uploadBtn: ViewStyle = {
    backgroundColor: theme.color,
    width: 50,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,

}

export const styles = StyleSheet.create({
    uploadBtns: {
        position: 'relative',
        flexDirection: 'row',
        height: 30,
        width: 100,
    },
    centerIcon: {
        pointerEvents: "none",
        position: 'absolute',
        left: 35,
        top: -5,
        zIndex: 2
    },
    uploadFileBtn: {
        ...uploadBtn,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    uploadFolderBtn: {
        ...uploadBtn,
        marginLeft: -1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
})