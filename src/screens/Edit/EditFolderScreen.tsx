import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View, Text, Alert } from 'react-native';
import { RootStackParamList } from '../../Router';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import Header from '../../components/ui/Header/Header';
import Br from '../../components/ui/Br/Br';
import { useLoginMutation } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import { baseStyles } from '@styles//base.styles';
import { AuthContext, AuthContextProps } from '@components/providers/AuthProvider';
import { useCreateFolderMutation } from '@store//api/folder.api';
import Head from '@components/ui/Head/Head';
import Footer from '@components/ui/Footer/Footer';

type EditFolderScreenProps = NativeStackScreenProps<RootStackParamList, 'EditFolder'>;

export default function LoginScreen({ navigation, route }: EditFolderScreenProps) {

    const { folder } = route.params

    const [name, setName] = useState<string>(folder.name)
    const [parent_id, setParentId] = useState<number | null>(folder.parent_id)
    const [createFolder, isLoading] = useCreateFolderMutation()

    const defaultErrors = {
        name: undefined,
        parent_id: undefined,
    }

    const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(defaultErrors);

    const setError = (key: string, value: string[]) => {
        setErrors(prev => { return { ...prev, [key]: value } })

        const fetch = async () => {
            setErrors(defaultErrors);
            createFolder(
                { name, parent_id }
            )
                .then((response: any) => {
                    console.log(response)
                    if (response.error) {
                        const errors = response.error.data.errors as { [key: string]: string[] };
                        Object.entries(errors).forEach((error) => {
                            setError(error[0], error[1])
                        })
                    } else if (response?.data?.token) {
                        Alert.alert("Папка успешно создана", JSON.stringify(response))
                    } else {
                        Alert.alert("Error", JSON.stringify(response))
                    }
                })
                .catch(console.log)
        }

        return (
            <View style={baseStyles.wrapper}>
                <Head title={"Редактирование " + folder.name} />
                <View style={baseStyles.wrapperFull}>
                    {isLoading && <Loading />}
                    {!isLoading &&
                        <>
                            <Header>Редактирование папки { }</Header>
                            <Input
                                value={name}
                                setValue={setName}
                                placeholder="Имя"
                            />
                            {errors.Login && <Text style={{ color: 'red' }}>{errors.Login[0]}</Text>}
                            <Br />
                        </>
                    }
                </View>
                <Footer navigation={navigation} />
            </View>

        );
    }
}