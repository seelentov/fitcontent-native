interface IFolder extends IEntity {
    name: string
    user_id: number
    parent_id: number | null
}