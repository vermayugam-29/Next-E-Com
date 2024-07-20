import { RatingAndReview } from "@/types/stateTypes";
import axios from "axios";
import toast from "react-hot-toast";
import { SetterOrUpdater } from "recoil";

export const createRating = async(data : any , setLoading : SetterOrUpdater<boolean> , 
    setRatings : SetterOrUpdater<RatingAndReview[]>
) => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/address/createRating' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setRatings((prev : RatingAndReview[]) => {
            return [
                ...prev,
                response.data.data
            ]
        });
    }   catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const deleteRating = async(ratingId : string , setLoading : SetterOrUpdater<boolean> , 
    setRatings : SetterOrUpdater<RatingAndReview[]>
) => {

    setLoading(true);

    try {
        const response = await axios.delete(`/api/users/address/deleteRating/${ratingId}`);
        //change this api route if necessary
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setRatings((prev : RatingAndReview[]) => {
            return prev.filter((e) => e._id !== response.data._id)
        });
    }   catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const editRating = async(data : any , setLoading : SetterOrUpdater<boolean> , 
    setRating : SetterOrUpdater<RatingAndReview>
) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/address/editRating' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setRating(response.data.data);
    }   catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getItemRatings = async(itemId : string , setLoading : SetterOrUpdater<boolean> , 
    setRatings : SetterOrUpdater<RatingAndReview[]>
) => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/address/getItemRatings' , itemId);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setRatings(response.data.data);
    }   catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}