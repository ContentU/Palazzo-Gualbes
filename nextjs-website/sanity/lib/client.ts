import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // dati in "use cache" e revalidateTag dal webhook: serve la versione appena pubblicata
})
