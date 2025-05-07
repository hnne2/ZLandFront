import type { ID } from '~/types/ID'
import type { Media } from '~/types/Media'

export interface Product {
  id: ID
  label: string
  image: Media
  isTop: boolean
  parameters: Array<{
    id: ID
    label: string
    value: number
  }>
}
