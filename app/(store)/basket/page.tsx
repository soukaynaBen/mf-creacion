"use client"
import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession';
import AddToBasketButton from '@/components/AddToBasketButton';
import Loader from '@/components/Loader';
import { imageUrl } from '@/lib/imageUrl';
import { useBasketStore } from '@/store/store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';


function BasketPage() {

    const groupedItems = useBasketStore((state)=> state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const [isClient, setIsClient]= useState(false);
    const [isLoading, setIsLoading]  = useState(false);

     useEffect(()=>{
        setIsClient(true)
     },[])

        if (!isClient) {
            return <Loader />
        }   

      if (groupedItems.length === 0) {
        return (<div className='container mx-auto p-4  flex flex-col items-center justify-center min-h-[50vh]'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Your basket</h1>
            <p className='text-gray-600 text-lg'>Your basket is empty.</p>
        </div>)
      }
    const handleCheckout = async ()=>{
        if (!isSignedIn || !user) {
            return;
        }
        setIsLoading(true)
        try {
            const metadata : Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            }

            const checkoutUrl = await createCheckoutSession(groupedItems, metadata) 
            if (checkoutUrl) {
                window.location.href = checkoutUrl
            }

        } catch (error) {
            console.error("Error creating checkout session:"+error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
        <h1 className='text-2xl font-bold mb-4'>Your Basket</h1>
        <div className='flex flex-col lg:flex-row gap-8'>
            <div className='flex-grow'>
                {
                    groupedItems?.map((item)=>(
                        <div
                        key={item.product._id}
                        className='mb-4 p-4 border rounded flex items-center justify-between'
                        >
                            <div 
                                className='flex items-center cursor-pointer flex-1 min-w-0'
                                onClick={()=>{router.push(`/product/${item.product.slug?.current}`)}}
                            >
                                <div className='w-20 h-20 sm:h-24 sm:w-24 flex-shrink-0 mr-4 overflow-hidden'>
                                    {
                                        item.product.image && (<Image
                                             width={96}
                                             height={96}
                                             alt={item.product.name ?? "product image"}
                                             src={imageUrl(item.product.image).url()}
                                        />)
                                    }
                                </div>
                                <div className='min-w-0'>
                                    <h2 className='text-lg sm:text-xl font-semibold truncate'>
                                        {item.product.name}
                                    </h2>       
                                    <p className='text-sm sm:text-base'>
                                        Price: € {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center ml-4 flex-shrink-0'>
                                    <AddToBasketButton product={item.product}/>
                            </div>
                        </div>
                    ))
                }
            </div>  
            <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded orders-first lg:order-last fixed bottom-0 left-0 lg:left-auto'>
                <h3 className='text-xl font-semibold'>Order Summary</h3>
                <div className='mt-4 space-y-2'>
                    <p className='flex justify-between'>
                        <span>Items:</span>
                        <span>
                            {groupedItems.reduce((total,item)=> total + item.quantity,0)}
                        </span>
                    </p>
                    <p className='flex justify-between'>
                        <span>Total:</span>
                        <span>
                            € {useBasketStore.getState().getTotalPrice().toFixed(2)}
                        </span>
                    </p>
                </div>
                {
                    isSignedIn ? (<button 
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 '
                        >
                            { isLoading ? "Processing..." : "Checkout" }
                        </button>)
                        :
                        (<SignInButton mode="modal">
                            <button className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                Sign in Checkout
                            </button>
                        </SignInButton>)
                }
            </div>

            <div className='h-64 lg:h-0'>

            </div>
        </div>
    </div>
  )
}

export default BasketPage