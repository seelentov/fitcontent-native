interface IUser extends Omit<IEntity, "created_at" | "updated_at"> {
    name: string
    phone: string
    email: string
    sub_date?: string
    role: "user" | "admin"
}