import React from 'react'
import Refractor from 'react-refractor/all'
import refractor from 'refractor'
refractor.alias({ bash: ['terraform'] })

export function Code(props) {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={props.language ?? 'bash'}
      value={props.code}
      markers={props.highlightedLines}
    />
  )
}
