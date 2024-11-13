import theme from '@config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const headerHeight = 50
const footerHeight = 80

export const baseStyles = StyleSheet.create({
    wrapper: {
        height: height + 30,
    },
    container: {
        marginVertical: 30
    },
    header: {
        height: headerHeight,
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    scrollView: {
        height: height - (headerHeight + footerHeight) + 30,
        backgroundColor: theme.background,

    },
    footer: {
        display: 'flex',
        gap: 10,
        height: footerHeight,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    vertContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        height: '100%'
    },
    wrapperFull: {
        height: "100%",
        width: '100%',
        backgroundColor: "white",
        display: "flex",
        justifyContent: 'center',
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    fullScroll: {
        width: "100%",
        height: height - (headerHeight + footerHeight) + 30,
    }
});