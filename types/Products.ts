export interface Products {
  category: {
    name: string
    link: string
    icon: string
  }
  products: {
    id: number
    name: string
    image: string
    label: string | null
    parameter: { name: string; value: number }[]
  }[]
}
