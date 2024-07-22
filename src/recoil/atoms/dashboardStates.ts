import { atom } from "recoil";

export const dashboardClick = atom<boolean>({
    key : 'dashboard',
    default : true
})

export const profileClick = atom<boolean>({
    key : 'profile',
    default : false
})

export const settingsClick = atom<boolean>({
    key : 'settings',
    default : false
})

export const itemsClick = atom<boolean>({
    key : 'items',
    default : false
})

export const logoutClick = atom<boolean>({
    key : 'logout',
    default : false
})

export const ordersClick = atom<boolean>({
    key : 'orders',
    default : false
})

export const selectedLinkState = atom<string>({
    key : 'selectedLink',
    default : 'Dashboard'
})