import { SchemaTypeDefinition } from 'sanity'

import blockContent from '~/schemas/blockContent'
import codeInput from '~/schemas/codeInput'
import home from '~/schemas/home'
import post from '~/schemas/post'

export const schemaTypes = [post, blockContent, codeInput, home]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, codeInput, home],
}
