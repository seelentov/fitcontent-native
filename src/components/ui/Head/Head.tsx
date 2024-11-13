import { Text, TouchableOpacity, View } from 'react-native';
import { baseStyles } from '@styles//base.styles';
import { styles } from './Head.stylesheet';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import leftArrow from '@components/ui/Icons/left-arrow'

type IHeadProps = {
    title?: string,
    goBackFunc?: () => void,
    canGoBack?: boolean
};

export default function Head({ title = "Fit Content", goBackFunc, canGoBack = false }: IHeadProps) {

    const navigation = useNavigation();
    const canGoBackEvery = (canGoBack && goBackFunc) || navigation.canGoBack()
    const goBackFuncEvery = goBackFunc || (() => navigation.goBack())

    return (
        <View style={baseStyles.header}>
            {canGoBackEvery && (
                <TouchableOpacity onPress={() => goBackFuncEvery()} style={styles.backBtn}>
                    <SvgXml xml={leftArrow} width="20" height="20" />
                </TouchableOpacity>
            )}
            <View><Text style={styles.title}>{title}</Text></View>
        </View>
    );
}