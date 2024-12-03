import React from 'react'

type Props = {
  type: string,
  name: string,
  id: string,
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) =>void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  accept?: string
}

const Input = ({ type, name, id, onChange, onBlur , accept}: Props) => {
  return (
    <input
      type={type}
      className='p-2 rounded-full border-2 border-black outline-none w-full'
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      accept={accept}
    />

  )
}

export default Input
