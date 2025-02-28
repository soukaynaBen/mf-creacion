import { Category, Product } from '@/sanity.types'
import React from 'react'
import ProductGrid from './ProductGrid';
import CategorySelectorComponent from './Category-selector';



interface ProductsViewProps {
    products: Product[];
    categories: Category[]
}

function ProductsView({ products , categories }: ProductsViewProps) {
  return (
    <div className='flex flex-col'>
        <div className='w-full sm:w-[200px] relative z-10'>
            <CategorySelectorComponent categories={categories} />
        </div>

        <div className='flex-1'>
            <div>
                <ProductGrid products={products}/>
                <hr className="w-1/2 sm:w-3/4" />
            </div>
        </div>
    </div>
  )
}

export default ProductsView