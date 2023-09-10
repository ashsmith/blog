import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import codeInput from './codeInput'
import post from './post'

export const schemaTypes = [post, blockContent, codeInput]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, codeInput],
}
