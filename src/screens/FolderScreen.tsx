import { NavigationScreenProps } from '../Router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { baseStyles } from '../styles/base.styles';
import Header from '@components/ui/Header/Header';
import Footer from '@components/ui/Footer/Footer';
import { useGetFolderQuery } from '@store//api/folder.api';
import Loading from '@components/ui/Loading/Loading';
import Head from '@components/ui/Head/Head';

type StandScreenProps = NavigationScreenProps<"Folder">;

export default function FolderScreen({ navigation, route }: StandScreenProps) {

    const folder_id = route.params?.folder_id

    const { data, isLoading, error } = useGetFolderQuery({ id: folder_id })

    return (
        <View style={baseStyles.wrapper}>
            <Head title={data?.name} />
            <ScrollView style={baseStyles.scrollView}>
                {isLoading ? <Loading /> : data ?
                    <>
                        {data?.folders.map(el => <View><Text>{el.name}</Text></View>)}
                    </>
                    : String(error) || "Error"}
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}