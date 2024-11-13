import { Text, View } from 'react-native';
import Footer from '@components/ui/Footer/Footer';
import Head from '@components/ui/Head/Head';
import text from '@components/ui/Icons/files/text';
import { baseStyles } from '@styles//base.styles';
import { NavigationScreenProps } from '@router';

type ScreenProps = NavigationScreenProps<"Music">;


export default function MusicScreen({ navigation, route }: ScreenProps) {

    const { file } = route.params

    return (
        <View style={baseStyles.wrapper}>
            <Head title={file.name} />
            <Text>{text}</Text>
            <Footer navigation={navigation} />
        </View>
    );
}