import { User } from "@/types/stateTypes";
import axios from "axios";
import toast from "react-hot-toast";
import { SetterOrUpdater } from "recoil";


export const generateOtp = async(email : string , setLoading : (loading : boolean) => void) : Promise<void> => {

    setLoading(true);
    
    try {
        const response = await axios.post('/api/otp' , email);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        console.log(response.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}


export const signUp = async(data : any , setLoading : (loading : boolean) => void) : Promise<void> => {
    setLoading(true);

    try {
        const response = await axios.post('/api/users/signup' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success(`${response.data.message}`);
        console.log(response.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}


export const reactivateAccount = async(data : any , setLoading : (loading : boolean) => void) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/reactivateAccount' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}


export const deactivateAccount = async(password : string , setLoading : (loading : boolean) => void) => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/deactivateAccount' , password);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
} 


export const changePassword = async(data : any , setLoading : (loading : boolean) => void) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/changePassword' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}


export const logOut = async(setLoading : (loading : boolean) => void ,
 setUser : SetterOrUpdater<User | null>) : Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/logOut');
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setUser(null);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}


//forgot password