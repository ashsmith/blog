import { SchemaTypeDefinition } from 'sanity'

import about from '~/schemas/about'
import blockContent from '~/schemas/blockContent'
import codeInput from '~/schemas/codeInput'
import home from '~/schemas/home'
import post from '~/schemas/post'

export const schemaTypes = [post, blockContent, codeInput, home, about]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
