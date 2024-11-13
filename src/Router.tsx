import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import theme from './core/config/theme';
import FolderScreen from './screens/FolderScreen';

export type RootStackParamList = {
    Folder: {
        folder_id: number
    } | undefined
    Login: undefined
    SignUp: undefined
};

export type NavigationScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type INavigation = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList, undefined>

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Folder"
                    component={FolderScreen}
                />

            </Stack.Navigator>
            <StatusBar
                animated={false}
                backgroundColor={theme.text}
            />
        </>
    );
}
