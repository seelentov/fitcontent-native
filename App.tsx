import { Alert, NativeModules, PermissionsAndroid, Platform, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router';
import theme from './src/core/config/theme';
import { store } from '@store//store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@components/providers/AuthProvider';

const { StatusBarManager } = NativeModules;

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS !== 'android' ? StatusBarManager.HEIGHT : 0,
      }}>
        <Text>asd</Text>
        {/* <NavigationContainer>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </NavigationContainer> */}
      </SafeAreaView>
    </Provider>
  );
}
