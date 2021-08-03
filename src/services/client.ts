import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true
    }
  }
})

export default queryClient
