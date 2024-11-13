import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, CommonActions } from '@react-navigation/native';
import { useActions } from '@hooks//useActions';
import { useGetMeQuery, useRefreshMutation } from '@store//api/auth.api';
import { API_URL } from '@store//api/api';


export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    isSubExist: true,
    isLoadingAuth: true,
    setIsAuthenticated: () => { },
    children: null,
    authorization: async () => { },
    logout: async () => { }
});

export interface AuthContextProps {
    isAuthenticated: boolean;
    isSubExist: boolean;
    isLoadingAuth: boolean;
    setIsAuthenticated?: (isAuthenticated: boolean) => void;
    authorization: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    children: ReactNode;
}



export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isSubExist, setIsSubExist] = useState<boolean>(true);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
    const { setToken } = useActions()

    const navigation: NavigationProp<ParamListBase> = useNavigation()

    const { data: meData, error: meError } = useGetMeQuery(undefined, {
        pollingInterval: 5000
    });

    const [refreshToken] = useRefreshMutation();

    const navigateTo = (screen: string) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: screen }],
            })
        );
    }

    useEffect(() => {
        setIsLoadingAuth(true)
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token') || "";
            if (token != "") {
                console.log(token)
                const res = await refreshToken({ token })

                console.log(res)

                if (res?.error) {
                    navigateTo("Login")
                    return
                }

                authorization(token)
                navigateTo("Folder")
            }
            else {
                navigateTo("Login")
            }
        };

        checkAuth();
        setIsLoadingAuth(false)
    }, []);


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         refreshToken().then(res => {
    //             const token = res?.data?.access_token || "" as string
    //             console.log(res)

    //             if (token) {
    //                 authorization(token)
    //             }
    //         })

    //     }, 1000);

    //     return () => clearInterval(intervalId);
    // }, []);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (meData) {
    //             const subscriptionDate = new Date(meData.subData);
    //             const currentDate = new Date();

    //             if (subscriptionDate < currentDate) {
    //                 setIsSubExist(false);

    //                 if (checkSubInterval === 5000) {
    //                     setCheckSubInterval(60000)
    //                     navigateTo("OnlyInfos");
    //                 }
    //                 Alert.alert("Подписка истекла!", "Обратитесь по контактным данным для продления подписки")
    //                 console.log("Sub: ERR!")
    //             } else {
    //                 if (checkSubInterval === 60000) {
    //                     setCheckSubInterval(5000)
    //                     navigateTo("Home");
    //                 }

    //                 setIsSubExist(true);
    //                 console.log("Sub: OK!")
    //             }
    //         }
    //     }, checkSubInterval);

    //     return () => clearInterval(intervalId);
    // }, [meData, checkSubInterval]);

    const setTokenHandle = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setToken(token)
    }

    const authorization = async (token: string) => {
        await setTokenHandle(token)
        setIsAuthenticated(true);

    };

    const logout = async () => {
        await AsyncStorage.setItem('token', "");
        setToken("")
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authorization, logout, children, isSubExist, isLoadingAuth }
        }>
            {children}
        </AuthContext.Provider>
    );
};