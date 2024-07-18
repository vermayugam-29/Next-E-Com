import { Chat, Message } from "@/types/stateTypes";
import { atom } from "recoil";

export const chats = atom<Chat[]>({
    key : 'allChats',
    default : []
})

export const currChat = atom<Chat | null>({
    key : 'chat',
    default : null
})

export const messages = atom<Message[]>({
    key : 'messages',
    default : []
})