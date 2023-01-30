import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idCart: number;
    @Column({type: "varchar", length: 255})
    status: string;
    @Column({type: "int"})
    quantity: number;
    @Column({type: "int"})
    product: number;
    @Column({type: "int"})
    user: number;
}

