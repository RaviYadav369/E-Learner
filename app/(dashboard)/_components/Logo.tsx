import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image
    src='./vercel.svg'
    height={54}
    width={54}
    alt='Logo of the application'
    />
  )
}

export default Logo