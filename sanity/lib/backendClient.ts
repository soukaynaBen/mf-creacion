import {createClient} from '@sanity/client'
import { projectId , dataset, apiVersion} from '../env'

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  token: process.env.SANITY_API_TOKEN
})

