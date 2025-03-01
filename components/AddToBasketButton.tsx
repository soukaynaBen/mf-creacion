"use client"
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import { useBasketStore } from '@/store/store';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';


interface AddToBasketButtonProps {
    product: Product;
     disabled?: boolean
}

function AddToBasketButton({ product, disabled }:AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const itemCount = getItemCount(product._id)
    const [isClient, setIsClient] = useState(false)

    useEffect(()=>{
        setIsClient(true)
    },[])


    if (!isClient) {
        return null;
    }
  return (
    <div className='flex items-center justify-center space-x-2'>
        <button
            className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200", itemCount === 0 ? "bg-gray-100 cursor-not-allowed":"bg-gray-200 hover:bg-gray-300")}
            onClick={()=>removeItem(product._id)}
            disabled={itemCount === 0 || disabled}
        >
            <span
               className={cn("text-xl font-bold p-3",itemCount === 0 ? "text-gray-400":"text-gray-600")}
            ><Minus width={16} height={16}/></span>
        </button>
        <span className='w-8 text-center font-semibold'>{itemCount}</span>
        <button
            onClick={()=>addItem(product)}
            className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200", disabled ? "bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600")}
            disabled={disabled}
        >
            <span
               className="text-xl font-bold text-white"
            ><Plus width={16} height={16}/></span>
        </button>
    </div>
  )
}

export default AddToBasketButton