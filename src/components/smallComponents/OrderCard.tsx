import { Order } from '@/types/stateTypes'
import React from 'react'

interface OrderProps {
    order : Order
}

const OrderCard : React.FC<OrderProps> = ({order}) => {
  return (
    <div className='w-full h-[200px] bg-white bg-opacity-50 rounded-2xl'>

    </div>
  )
}

export default OrderCard