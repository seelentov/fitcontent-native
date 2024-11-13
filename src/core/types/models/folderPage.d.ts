type IFolderPage = IEntity & {
    files: IFile[]
    folders: IFolder[]
    name?: string
    user_id?: number
    parent_id: number | null
}