import theme from '@config/theme';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        gap: 30,
        backgroundColor: "white",
        borderColor: theme.desc,
        borderWidth: 1
    },
    text: {

    },
    name: {
        fontSize: 16
    },
    desc: {
        color: theme.desc,
        fontSize: 12
    }
})