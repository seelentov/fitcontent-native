import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import theme from './core/config/theme';
import FolderScreen from './screens/FolderScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import LoadingScreen from './screens/LoadingScreen';
import ImageScreen from './screens/File/ImageScreen';
import MusicScreen from './screens/File/MusicScreen';
import TextScreen from './screens/File/WebViewScreen';
import VideoScreen from './screens/File/VideoScreen';
import WebViewScreen from './screens/File/WebViewScreen';
import DocScreen from './screens/File/DocScreen';

interface FileScreen {
    file: IFile
}

export type RootStackParamList = {
    Folder: {
        folder_id: number | null
    }
    EditFolder: {
        folder: IFolder
    }
    EditFile: {
        file: IFile
    }
    Login: undefined
    SignUp: undefined
    Info: {
        title: string,
        text: string
    }
    Loading: undefined,
    Image: FileScreen
    Music: FileScreen
    WebView: FileScreen
    Video: FileScreen
    Doc: FileScreen
};

export type NavigationScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type INavigation = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList, undefined>

const defaultOptions = {
    title: 'Smart Quick',
    headerShown: false,
}


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Folder"
                    component={FolderScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Image"
                    component={ImageScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Music"
                    component={MusicScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="WebView"
                    component={WebViewScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Video"
                    component={VideoScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Doc"
                    component={DocScreen}
                    options={defaultOptions}
                />

            </Stack.Navigator>
            <StatusBar
                animated={false}
                backgroundColor={theme.text}
            />
        </>
    );
}
