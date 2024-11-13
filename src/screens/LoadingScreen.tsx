import { NavigationScreenProps } from '../Router';
import { View } from 'react-native';
import { baseStyles } from '../styles/base.styles';
import Loading from '@components/ui/Loading/Loading';

type InfoScreenProps = NavigationScreenProps<"Loading">;

export default function LoadingScreen({ navigation }: InfoScreenProps) {

    return (
        <View style={baseStyles.wrapperFull}>
            <Loading />
        </View>
    );
}