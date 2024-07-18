import { Profile, User } from "@/types/stateTypes";
import { atom } from "recoil";

export const user = atom<User | null>({
    key : 'user',
    default : null
})

export const userProfile = atom<Profile | null>({
    key : 'profile',
    default : null
})