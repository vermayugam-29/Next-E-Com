import { Item } from '@/types/stateTypes';
import {atom} from 'recoil';

export const allItems = atom<Item[]>({
    key : 'items',
    default : []
})

export const currItem = atom<Item | null>({
    key : 'item',
    default : null
})

export const filteredItems = atom<Item[]>({
    key : 'filteredItems',
    default : []
})