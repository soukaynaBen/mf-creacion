import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
      *[_type == "product"] | order( name asc)`)

      try {

        const product = await sanityFetch({
            query: ALL_PRODUCTS_QUERY
        })

        return product.data || []

      } catch (error) {
        console.error("Error fetching all products:", error)
        return [];
      }

}


