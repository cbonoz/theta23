
import React from 'react'
import { titleCase } from '../util'

export default function Listify({object}) {
  return (
    <ul>
        {Object.keys(object).map((key, index) => (
            <li key={index}>{titleCase(key)}: {object[key]}</li>
        ))}
    </ul>
  )
}
