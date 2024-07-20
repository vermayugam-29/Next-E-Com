import { Cart } from "@/types/stateTypes";
import axios from "axios";
import toast from "react-hot-toast";
import { SetterOrUpdater } from "recoil";

export const addToCart = async(data : any , setLoading : SetterOrUpdater<boolean> ,
    setCart : SetterOrUpdater<Cart>
) => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/cart/addToCart' , data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setCart(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const removeFromCart = async(data : any , setLoading : SetterOrUpdater<boolean> ,
    setCart : SetterOrUpdater<Cart>
) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/cart/removeFromCart' , data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setCart(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const emptyCart = async(setLoading : SetterOrUpdater<boolean> ,
    setCart : SetterOrUpdater<Cart | null>
) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/cart/emptyCart');
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setCart(null);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getCart = async(setLoading : SetterOrUpdater<boolean> ,
    setCart : SetterOrUpdater<Cart>
) => {

    setLoading(true);

    try {
        const response = await axios.get('/api/users/cart/getCart');
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setCart(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const updateCart = async(data : any , setLoading : SetterOrUpdater<boolean> ,
    setCart : SetterOrUpdater<Cart>
) => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/cart/updateCart' , data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setCart(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}