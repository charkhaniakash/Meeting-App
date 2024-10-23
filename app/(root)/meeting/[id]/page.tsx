import React from 'react'

const Meeting = ({params} : {params:{id:string}}) => {
  return (
    <div>
      This is meeting {params.id} page
    </div>
  )
}

export default Meeting
