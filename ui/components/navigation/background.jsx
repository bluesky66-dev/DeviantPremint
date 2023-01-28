import Image from 'next/image'
import React from 'react'

function Background({children, style}) {
    return (
      <div className='w-full h-full' style={{minHeight: 'fit-content'}}>
        <Image
          src="/background-min.png"
          placeholder="/bg-blur.webp"
          alt="Background Image"
          loader={({src, width, quality}) => {
                return `${src}?w=${width || 1337}&q=${quality || 75}`
            }}
            fill
          style={style}
          className="z-0"
        />
              {children}

      </div>
    )
  }

export default Background