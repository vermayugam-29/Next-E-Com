import { Address } from "@/types/stateTypes";
import { atom } from "recoil";

export const address = atom<Address | null>({
    key : 'address',
    default : null
})