import Image from 'next/image'
import React from 'react'

function Background({children, style}) {
    return (
      <div className='w-full h-full' style={{minHeight: 'fit-content'}}>
        <Image
          src="/background-min.png"
          placeholder="/bg-blur.webp"
          alt="Background Image"
          fill
          style={style}
          className="z-0"
        />
              {children}

      </div>
    )
  }

export default Background