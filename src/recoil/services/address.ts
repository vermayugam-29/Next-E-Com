import { Profile } from "@/types/stateTypes";
import { SetterOrUpdater } from "recoil";
import toast from "react-hot-toast";
import axios from "axios";
import { Address } from "cluster";

export const createNewAddress = async(data : any , setLoading : SetterOrUpdater<boolean> ,
    setProfile : SetterOrUpdater<Profile>
)  => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/address/createAddress' , data);
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

export const deleteAddress = async(id : any /*string handle this later*/ , setLoading : SetterOrUpdater<boolean> ,
    setProfile : SetterOrUpdater<Profile>
)  => {

    setLoading(true);

    try {
        const response = await axios.delete('/api/users/address/deleteAddress' , id);
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

export const editAddress = async(data : any , setLoading : SetterOrUpdater<boolean> ,
    setProfile : SetterOrUpdater<Profile>
)  => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/address/editAddress' , data);
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

export const getAddress = async(id : string, setLoading : SetterOrUpdater<boolean> ,
    setAddress : SetterOrUpdater<Address>
)  => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/address/getAddress' , id);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setAddress(response.data.data);
    }  catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getAllAddress = async(setLoading : SetterOrUpdater<boolean> ,
    setProfile : SetterOrUpdater<Profile>
)  => {

    setLoading(true);

    try {
        const response = await axios.get('/api/users/address/getAllAddress');
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

export const setDefaultAddress = async(id : string , setLoading : SetterOrUpdater<boolean> ,
    setProfile : SetterOrUpdater<Profile>
)  => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/address/setDefault' , id);
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