import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'codeInput',
  // [...]
  fields: [
    defineField({
      type: 'code',
      name: 'myCodeField',
      title: 'My code field',
    }),
  ],
})
