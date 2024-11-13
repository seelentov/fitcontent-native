import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from '@components/ui/Footer/Footer';
import Head from '@components/ui/Head/Head';
import text from '@components/ui/Icons/files/text';
import { baseStyles } from '@styles//base.styles';
import { NavigationScreenProps } from '@router';
import { BASE_URL } from '@store//api/api';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');


type ScreenProps = NavigationScreenProps<"Image">;


export default function ImageScreen({ navigation, route }: ScreenProps) {

    const { file } = route.params

    return (
        <View style={baseStyles.wrapper}>
            <Head title={file.name} />
            <ScrollView style={baseStyles.scrollView}>

                <Image
                    style={{ ...styles.main, ...baseStyles.fullScroll }}
                    source={{ uri: BASE_URL + "/storage/" + file.path }}
                />
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}

export const styles = StyleSheet.create({
    main: {
        objectFit: 'contain'
    }
})