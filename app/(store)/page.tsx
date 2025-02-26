import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";

export default async function Home() {
  const  products = await getAllProducts()
  const  categories = await getAllCategories()

  console.log()
  return (
   <div>
    <h1>Hello world</h1>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ProductsView products={products} categories={categories}/>
    </div>
   </div>
  );
}
