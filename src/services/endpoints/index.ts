export default {
  fund: {
    suggestions(keyword: string) {
      return `/api/fund/suggestions?keyword=${keyword}`
    }
  },
  stock: {}
}
