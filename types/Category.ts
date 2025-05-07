import type { ID } from '~/types/ID'
import type { Link } from '~/types/Link'
import type { Media } from '~/types/Media'

export interface Category {
  id: ID
  name: string
  link: Link
  icon: Media
}
