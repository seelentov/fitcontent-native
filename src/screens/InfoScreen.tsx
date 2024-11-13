import { NavigationScreenProps } from '../Router';
import { Text, View } from 'react-native';
import { baseStyles } from '../styles/base.styles';
import Footer from '@components/ui/Footer/Footer';
import Head from '@components/ui/Head/Head';

type InfoScreenProps = NavigationScreenProps<"Info">;

export default function InfoScreen({ navigation, route }: InfoScreenProps) {

    const { title, text } = route.params

    return (
        <View style={baseStyles.wrapper}>
            <Head title={title} />
            <Text>{text}</Text>
            <Footer navigation={navigation} />
        </View>
    );
}