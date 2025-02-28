"use client"
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import React, { useState } from 'react'
import { Lens } from './ui/lens';
import { Product } from '@/sanity.types';
import { ValueOf } from 'next/dist/shared/lib/constants';

function ImageZoom({name,image, isOutOfStock }:{name: string | undefined, image: ValueOf<Pick<Product,"image">> | undefined, isOutOfStock:boolean}) {
    const [hovering, setHovering] = useState(false);

    return (
    <Lens {...{setHovering,hovering:! isOutOfStock && hovering}}  zoomFactor={2}>
        <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg z-10"  ${isOutOfStock? "opacity-50":""}`}>
        {
        image &&(
            <Image
                src={imageUrl(image).url()}
                alt={name ?? "Product image"}
                fill
                className="object-contain"
            />
        )
        }
        {
            isOutOfStock && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <span className='text-white font-bold text-lg'>Out of Stock</span>
            </div>
            )
        }
        </div>
    </Lens>
  )
}

export default ImageZoom