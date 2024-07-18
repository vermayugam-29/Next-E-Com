import { Cart } from "@/types/stateTypes";
import { atom } from "recoil";

export const userCart = atom<Cart | null>({
    key : 'cart' ,
    default : null
})