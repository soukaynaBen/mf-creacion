import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 bordder-blue-500'></div>
    </div>
  )
}

export default Loader