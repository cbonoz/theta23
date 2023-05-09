
import React from 'react'
import { titleCase } from '../util'

export default function Listify({object, bold=true}) {
  return (
    <ul>
        {Object.keys(object).map((key, index) => (
            <li key={index}>
              <span className={`${bold ? 'bold' : ''}`}>{titleCase(key)}:</span> {JSON.stringify(object[key]).replaceAll('"', "")}
            </li>
        ))}
    </ul>
  )
}
