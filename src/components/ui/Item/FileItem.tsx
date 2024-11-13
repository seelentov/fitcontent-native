import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Item.stylesheet'
import { SvgXml } from 'react-native-svg';
import file from '@components/ui/Icons/files/file'
import image from '@components/ui/Icons/files/image'
import text from '@components/ui/Icons/files/text'
import doc from '@components/ui/Icons/files/doc'
import audio from '@components/ui/Icons/files/audio'
import video from '@components/ui/Icons/files/video'
import archive from '@components/ui/Icons/files/archive'
import { useCallback, useMemo } from 'react';
import { INavigation } from '@router';
import { useNavigation } from '@react-navigation/native';

type IFileItemProps = {
    item: IFile
};

export default function FileItem({ item }: IFileItemProps) {

    const navigation = useNavigation<INavigation>();


    const size = useMemo(() => {
        if (item.size >= 1073741824) {
            return (item.size / 1073741824).toFixed(2) + " GB";
        } else if (item.size >= 1048576) {
            return (item.size / 1048576).toFixed(2) + " MB";
        } else if (item.size >= 1024) {
            return (item.size / 1024).toFixed(2) + " KB";
        } else {
            return item.size + " B";
        }
    }, [item]);

    const icon = useMemo(() => {
        if (item.type === "image") {
            return image
        } else if (item.type === "text") {
            return text
        } else if (item.type === "doc") {
            return doc
        } else if (item.type === "audio") {
            return audio
        } else if (item.type === "video") {
            return video
        } else if (item.type === "archive") {
            return archive
        } else {
            return file
        }
    }, [item])

    const handleOpen = useCallback(() => {
        if (item.type === "image") {
            navigation.navigate("Image", { file: item })
        } else if (item.type === "audio") {
            navigation.navigate("Music", { file: item })

        } else if (item.type === "video") {
            navigation.navigate("Video", { file: item })
        } else if (item.type === "doc") {
            navigation.navigate("Doc", { file: item })
        } else {
            navigation.navigate("WebView", { file: item })
        }
    }, [item])

    const canOpen = useMemo(() => ["image", "text", "audio", "video"].includes(item.type), [item])

    return (
        <TouchableOpacity style={styles.main} onPress={() => handleOpen()} disabled={!canOpen}>
            <SvgXml xml={icon} width="50" height="50" />
            <View style={styles.text}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.created_at} | {size}</Text>
            </View>
        </TouchableOpacity>
    );
}