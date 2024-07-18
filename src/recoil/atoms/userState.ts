import { Profile , UserToken } from "@/types/stateTypes";
import { atom } from "recoil";

export const userDetails = atom<UserToken | null>({
    key : 'user',
    default : null
})

export const userProfile = atom<Profile | null>({
    key : 'profile',
    default : null
})