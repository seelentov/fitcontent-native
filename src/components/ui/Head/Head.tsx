import { Text, View } from 'react-native';
import { baseStyles } from '@styles//base.styles';
import { styles } from './Head.stylesheet';

type IHeadProps = {
    title?: string
};

export default function Head({ title = "Fit Content" }: IHeadProps) {

    return (
        <View style={baseStyles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}