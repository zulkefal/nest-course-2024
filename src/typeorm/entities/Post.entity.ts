import exp from "constants";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name: 'post'})
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string

    @Column()
    description:string

    @ManyToOne(()=>User,(user)=>user.posts)
    user:User

}