import React from 'react'
import ImageUpload from './ImageUplode'
import ImagePreview from './ImagePreview'
function Home() {
  return (
    <div className='w-full'>
        <ImageUpload />
        <ImagePreview />
    </div>
  )
}

export default Home