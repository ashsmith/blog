import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import codeInput from './codeInput'
import home from './home'
import post from './post'

export const schemaTypes = [post, blockContent, codeInput, home]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, codeInput, home],
}
