import React, { useEffect, useState } from "react";
const MyOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    }, []);
    if (orders.length === 0) {
        return (
            <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">No orders found</h2>
      </div>
    );
  }
           
  return (
     <div className='max-w-5xl mx-auto px-4 py-10'>
                <h1 className='text-2xl font-semibold mb-6'>My Orders</h1>
                
                <div>
                    {orders.map((order) => (
                        <div key={order.id}
                        className='border rounded-xl p-4'
                        >
                            <div className='flex justify-between text-sm text-gray-600 mb-2'>
                                <span>Order ID: {order.id }</span>
                                <span>{order.date }</span>
                            </div>


                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-4 py-2'
                                >
                                    <img src={item.image} alt={item.title}
                                    className='h-12 w-12 object-contain'
                                    />
                                    <div className='flex-1'>
                                        <p className='text-sm font-medium line-clamp-1'>
                                            {item.title}
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className='text-sm font-semibold'>
                                         ₹ {Math.round(item.price * 80 * item.quantity)}
                                    </p>
                                </div>
                            ))}

                            <div className="text-right font-semibold mt-3">
                                Total: ₹ {Math.round(order.total)}
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        )
    }
 
export default MyOrders