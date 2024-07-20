import { Profile } from "@/types/stateTypes";
import { SetterOrUpdater } from "recoil";
import axios from "axios";
import toast from "react-hot-toast";

export const getProfileDetails = async(setLoading : SetterOrUpdater<boolean> , 
    setProfile : SetterOrUpdater<Profile>
) => {
    
    setLoading(true);

    try {
        const response = await axios.get('/api/users/progile/getProfileDetails');
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setProfile(response.data.data);
    }   catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const updateProfile = async(data : any,setLoading : SetterOrUpdater<boolean> 
    , setProfile  :SetterOrUpdater<Profile>
) => {

    setLoading(true);

    try { 
        const response = await axios.put('/api/users/profile/updateProfile' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setProfile(response.data.data);
    }  catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}