import { ScrollView, StyleSheet, View } from 'react-native';
import { INavigation } from '@router';
import { baseStyles } from '@styles//base.styles';

type IFooterProps = {
    navigation: INavigation
};

export default function Footer({ navigation }: IFooterProps) {

    return (
        <View style={baseStyles.footer}>

        </View>
    );
}