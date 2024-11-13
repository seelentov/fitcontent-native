import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View, Text, Alert } from 'react-native';
import { RootStackParamList } from '../../Router';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import Header from '../../components/ui/Header/Header';
import Br from '../../components/ui/Br/Br';
import { useSignUpMutation } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import { AuthContext, AuthContextProps } from '@components/providers/AuthProvider';
import { baseStyles } from '@styles//base.styles';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: LoginScreenProps) {

    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPass] = useState<string>('')
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')

    const [signUpMutation, { isLoading }] = useSignUpMutation()

    const defaultErrors = {
        name: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        message: undefined
    }

    const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(defaultErrors);

    const setError = (key: string, value: string[]) => {
        setErrors(prev => { return { ...prev, [key]: value } })
    }

    const { isAuthenticated, authorization } = useContext<AuthContextProps>(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.popToTop()
            navigation.replace('Folder', { folder_id: null })
        }
    }, [isAuthenticated])

    const fetch = async () => {
        setErrors(defaultErrors);

        if (password !== passwordRepeat) {
            setError("message", ["Пароль и подтверждение пароля отличаются"]);
            return
        }

        signUpMutation({
            name,
            phone,
            email,
            password
        })
            .then((response: any) => {
                if (response.error) {
                    const errors = response.error.data.errors as { [key: string]: string[] };

                    if (errors) {
                        Object.entries(errors).forEach((error) => {
                            setError(error[0], error[1])
                        })
                    }

                    const message = response?.error?.data?.message

                    if (!errors && message) {
                        setError("message", [message])
                    }

                } else if (response?.data?.access_token) {
                    const token = response.data.access_token || "" as string
                    authorization(token)
                } else {
                    Alert.alert("Error", JSON.stringify(response))
                }
            })
            .catch((e) => Alert.alert("Error", JSON.stringify(e)))
    }

    return (
        <>
            <View style={baseStyles.wrapperFull}>
                {isLoading && <Loading />}
                {!isLoading && <>
                    <Header>Регистрация</Header>
                    <Input
                        value={name}
                        setValue={setName}
                        placeholder="Логин"
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name[0]}</Text>}
                    <Br />
                    <Input
                        value={phone}
                        setValue={setPhone}
                        placeholder="Номер телефона"
                        inputMode={'numeric'}
                    />
                    {errors.phone && <Text style={{ color: 'red' }}>{errors.phone[0]}</Text>}
                    <Br />
                    <Input
                        value={email}
                        setValue={setEmail}
                        placeholder="E-mail"
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email[0]}</Text>}
                    <Br />
                    <Input
                        value={password}
                        setValue={setPass}
                        placeholder="Пароль"
                        secureTextEntry={true}
                    />
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password[0]}</Text>}
                    <Br />
                    <Input
                        value={passwordRepeat}
                        setValue={setPasswordRepeat}
                        placeholder="Повторите пароль"
                        secureTextEntry={true}
                    />
                    <Br />
                    <Button onPress={() => fetch()}>Регистрация</Button>
                    {errors.message && <Text style={{ color: 'red' }}>{errors.message[0]}</Text>}
                    <Br />
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text>Есть аккаунт? Войти</Text>
                    </Pressable>
                </>}
            </View>
        </>
    );
}