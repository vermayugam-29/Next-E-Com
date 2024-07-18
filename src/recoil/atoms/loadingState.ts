import { atom } from "recoil";

export const loading = atom<boolean>({
    key : 'loading',
    default : false
})