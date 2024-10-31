import React from 'react'

interface MeetingMoodalProps={
    isOpen:boolean;
    buttonText:string;
    onClose:()=>void;
    handleClick:()=>void;
}

const MeetingModel = ({isOpen ,buttonText,buttonText,onClose,handleClick}:MeetingMoodalProps) => {
  return (
    <div>
      MeetingModel
    </div>
  )
}

export default MeetingModel
