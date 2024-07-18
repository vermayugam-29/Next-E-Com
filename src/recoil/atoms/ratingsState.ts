import { RatingAndReview } from "@/types/stateTypes";
import { atom } from "recoil";

export const ratings = atom<RatingAndReview[]>({
    key : 'ratings',
    default : []
})