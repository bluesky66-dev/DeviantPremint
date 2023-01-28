import Image from 'next/image'
import React from 'react'

function Background({children}) {
    return (
      <div>
        <Image
          src="/background-min.png"
          placeholder="/bg-blur.webp"
          alt="Background Image"
          fill="fill"
          style={{width: "100%", height: "100%"}}
          className="z-0"
        />
              {children}

      </div>
    )
  }

export default Background