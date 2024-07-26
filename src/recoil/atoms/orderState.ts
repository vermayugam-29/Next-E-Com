import { Order } from "@/types/stateTypes";
import { atom } from "recoil";

export const allOrders = atom<Order[] | null>({
    key : 'allOrders',
    default : null
})

export const order = atom<Order | null>({
    key : 'order',
    default : null
}) 