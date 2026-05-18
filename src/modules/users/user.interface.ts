export interface UserType{
    name:string,
    email:string,
    password:string,
    age:number,
    is_active?:boolean,
    role:"user"|"admin"|"agent"
}