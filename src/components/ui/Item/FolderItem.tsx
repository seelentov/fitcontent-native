import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Item.stylesheet'
import { SvgXml } from 'react-native-svg';
import folder from '@components/ui/Icons/folder'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { INavigation, NavigationScreenProps } from '@router';

type IFolderItemProps = {
    item: IFolder
};

export default function FolderItem({ item }: IFolderItemProps) {
    const navigation = useNavigation<INavigation>();

    return (
        <TouchableOpacity style={styles.main} onPress={() => navigation.navigate("Folder", { folder_id: item.id })}>
            <SvgXml xml={folder} width="50" height="50" />
            <View style={styles.text}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.created_at}</Text>
            </View>
        </TouchableOpacity>
    );
}