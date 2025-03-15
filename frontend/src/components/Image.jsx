import React from 'react'
import { IKImage } from 'imagekitio-react'

function Image({src, className, w, h}) {
  return (
    <IKImage

      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      className={className}
      path = {src}
      width ={ w}
      height = {h}
      alt=""
      lqip ={{active: true, quality : 20}} 
      transformation={[
        {
          width : w,
          height : h
        },
      ]
      }
    />
  )
}

export default Image