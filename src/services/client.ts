import { message } from 'antd'
import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      onError(err) {
        message.error((err as Error).message)
      }
    }
  }
})

export default queryClient
