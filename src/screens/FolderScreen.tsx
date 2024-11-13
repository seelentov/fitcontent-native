import { NavigationScreenProps } from '../Router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { baseStyles } from '../styles/base.styles';
import Header from '@components/ui/Header/Header';
import Footer from '@components/ui/Footer/Footer';
import { useGetFolderQuery } from '@store//api/folder.api';
import Loading from '@components/ui/Loading/Loading';
import Head from '@components/ui/Head/Head';
import { useBaseQuery } from '@store//api/api';
import FolderItem from '@components/ui/Item/FolderItem';
import FileItem from '@components/ui/Item/FileItem';
import { useCallback, useMemo, useState } from 'react';
import Input from '@components/ui/Input/Input';
import NotFound from '@components/ui/NotFound/NotFound';

type StandScreenProps = NavigationScreenProps<"Folder">;

export default function FolderScreen({ navigation, route }: StandScreenProps) {

    const [search, setSearch] = useState<string>("")

    const folder_id = route.params?.folder_id

    const { data, isFetching: isLoading, error } = useGetFolderQuery({ id: folder_id })

    const goBack = useCallback(() => {
        navigation.navigate("Folder", { folder_id: data?.parent_id || null })
    }, [data])

    const filtredFolders = useMemo(() => (search != "") ? data?.folders.filter(el => el.name.toLowerCase().includes(search.toLowerCase())) : data?.folders, [data, search])

    const filtredFiles = useMemo(() => (search != "") ? data?.files.filter(el => el.name.toLowerCase().includes(search.toLowerCase())) : data?.files, [data, search])

    const isEmpty = useMemo(() => filtredFolders && filtredFiles && filtredFolders.length < 1 && filtredFiles.length < 1, [filtredFolders, filtredFiles])

    return (
        <View style={baseStyles.wrapper}>
            <Head title={data?.name} goBackFunc={goBack} canGoBack={folder_id != undefined} />
            <Input
                value={search}
                setValue={setSearch}
                placeholder="Поиск"
            />
            <ScrollView style={baseStyles.scrollView}>
                {isLoading ? <Loading /> : error ?
                    <Text>{(JSON.stringify(error) + '\n' + JSON.stringify(data)) || "Error"}</Text> :
                    <>
                        {filtredFolders && filtredFolders.map(el => <FolderItem key={el.id} item={el} />)}
                        {filtredFiles && filtredFiles.map(el => <FileItem key={el.id} item={el} />)}
                        {isEmpty && <NotFound title={"Пусто"} />}
                    </>}
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}