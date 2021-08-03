export default {
  fund: {
    suggestions(keyword: string) {
      return `/api/fund/suggestions?keyword=${keyword}`
    },
    estimated(codes: string[]) {
      return `/api/fund/estimated?codes=${codes.join(',')}`
    },
    net(codes: string[]) {
      return `/api/fund/net?codes=${codes.join(',')}`
    }
  },
  stock: {}
}
