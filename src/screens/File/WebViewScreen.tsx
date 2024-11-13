import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from '@components/ui/Footer/Footer';
import Head from '@components/ui/Head/Head';
import text from '@components/ui/Icons/files/text';
import { baseStyles } from '@styles//base.styles';
import { NavigationScreenProps } from '@router';
import { BASE_URL } from '@store//api/api';
import { WebView } from 'react-native-webview';
type ScreenProps = NavigationScreenProps<"WebView">;


export default function WebViewScreen({ navigation, route }: ScreenProps) {

    const { file } = route.params

    return (
        <View style={baseStyles.wrapper}>
            <Head title={file.name} />
            <ScrollView style={baseStyles.scrollView}>
                <WebView
                    source={{ uri: BASE_URL + "/storage/" + file.path }}
                    style={baseStyles.fullScroll}
                />
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}