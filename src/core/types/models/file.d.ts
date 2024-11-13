interface IFile extends IEntity {
    name: string
    user_id: number
    folder_id: number | null
    type: "image" | "text" | "doc" | "audio" | "video" | "archive"
    size: number
    path: string
}