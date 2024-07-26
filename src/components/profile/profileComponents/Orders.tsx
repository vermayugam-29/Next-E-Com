import Loading from '@/components/loading/Loading';
import OrderCard from '@/components/smallComponents/OrderCard';
import { loadingState } from '@/recoil/atoms/loadingState'
import { allOrders } from '@/recoil/atoms/orderState';
import { getAllOrders } from '@/recoil/services/order';
import { Order } from '@/types/stateTypes';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const Orders = () => {

  const [loading, setLoading] = useRecoilState(loadingState);
  const [orders, setOrders] = useRecoilState(allOrders);

  useEffect(() => {
    return () => {
      if (!orders) {
        getAllOrders(setLoading, setOrders);
      }
      console.log(orders)
    }
  }, [orders])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex items-center flex-col p-10 w-full gap-5'>
      {
        orders?.map((order : Order) => {
          return (
            <OrderCard order={order} />
          )
        })
      }
    </div>
  )
}

export default Orders
