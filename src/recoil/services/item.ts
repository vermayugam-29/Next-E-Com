import { Item } from '@/types/stateTypes';
import axios from 'axios'
import toast from 'react-hot-toast';
import { SetterOrUpdater } from 'recoil';

export const createItem = async(data : any , setLoading : (loading : boolean) => void ,
setItems: SetterOrUpdater<Item[]>): Promise<void> => {
    setLoading(true);

    try {
        const response = await axios.post('/api/items/createItem' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        setItems((prevItems: Item[]) => {
            return [
                ...prevItems,
                response.data.data
            ];
        });
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

//ask from sourav about what to do ?? should i use array.filter and update items or should i get 
//response from data as the items which are present not deleted
// export const deleteItem

export const getAllItems = async(setLoading : (loading : boolean) => void , 
                setItems : SetterOrUpdater<Item[]>) : Promise<void> => {
    
    setLoading(true);

    try {
        const response = await axios.get('/api/items/getAll');
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        setItems(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getItemById = async(data : any , setLoading : (loading : boolean) => void ,
setItem : SetterOrUpdater<Item>) : Promise<void> => {
    
    setLoading(true);
    
    try {
        const response = await axios.post('/api/items/getById' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        setItem(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const updateItem = async(data : any , setLoading : (loading : boolean) => void ,
setItem : SetterOrUpdater<Item>) : Promise<any> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/items/updateItem' , data);
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        setItem(response.data.data);
    } catch (err : any) {
        if(err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

//update search api