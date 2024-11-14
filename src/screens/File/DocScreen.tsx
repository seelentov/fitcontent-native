import { ScrollView, View } from 'react-native';
import Footer from '@components/ui/Footer/Footer';
import Head from '@components/ui/Head/Head';
import { baseStyles } from '@styles//base.styles';
import { NavigationScreenProps } from '@router';
import { BASE_URL } from '@store//api/api';
import { WebView } from 'react-native-webview';
import { useMemo } from 'react';
type ScreenProps = NavigationScreenProps<"Doc">;


export default function DocScreen({ navigation, route }: ScreenProps) {

    const { file } = route.params

    const url = useMemo(() => BASE_URL + "/storage/" + file.path, [file])

    return (
        <View style={baseStyles.wrapper}>
            <Head title={file.name} />
            <ScrollView style={baseStyles.scrollView}>
                <WebView
                    source={{ uri: `https://docs.google.com/gview?embedded=true&url=${url}` }}
                    style={baseStyles.fullScroll}
                />
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}