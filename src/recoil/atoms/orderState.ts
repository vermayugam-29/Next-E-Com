import { Order } from "@/types/stateTypes";
import { atom } from "recoil";

export const allOrders = atom<Order[]>({
    key : 'orders',
    default : []
})

export const order = atom<Order | null>({
    key : 'order',
    default : null
}) 