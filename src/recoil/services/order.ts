import toast from "react-hot-toast";
import { Order } from "@/types/stateTypes";
import axios from "axios";
import { SetterOrUpdater } from "recoil";

export const createOrder = async (data: any, setLoading: (loading: boolean) => void,
    setOrders: SetterOrUpdater<Order[]>): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.post('/api/users/orders/createOrder', data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrders((prev: Order[] | null) => {
            if(!prev) {
                return [response.data.data];
            } else {
                return [
                    ...prev,
                    response.data.data
                ];
            }
        });
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const acceptOrder = async (id: string, setLoading: (loading: boolean) => void,
    setOrder: SetterOrUpdater<Order>): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/orders/acceptOrder', id);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrder(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const cancelOrder = async (id: string, setLoading: SetterOrUpdater<boolean>,
    setOrder: SetterOrUpdater<Order>
): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/orders/cancelOrder', id);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrder(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const rejectOrder = async (id: string, setLoading: SetterOrUpdater<boolean>,
    setOrder: SetterOrUpdater<Order>
): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/orders/rejectOrder', id);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrder(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const deliverOrder = async (id: string, setLoading: SetterOrUpdater<boolean>,
    setOrder: SetterOrUpdater<Order>
): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/orders/deliveredOrder', id);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrder(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getAllOrders = async (setLoading: SetterOrUpdater<boolean>,
    setOrders: SetterOrUpdater<Order[] | null>): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.get('/api/users/orders/getAllOrders');
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrders(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}

export const getorderById = async (id : string, setLoading: SetterOrUpdater<boolean>,
    setOrder: SetterOrUpdater<Order>): Promise<void> => {

    setLoading(true);

    try {
        const response = await axios.put('/api/users/orders/getOrderDetails' , id);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success(`${response.data.message}`);
        setOrder(response.data.data);
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.response.data.error}`)
        }
    }

    setLoading(false);
}
