import React from 'react'

const Card = ({card}) => {
  console.log(card, "ini card");
  return (
    <div onMouseEnter={()=>{console.log('mouse in')}} className="relative flex items-center justify-center">
        <img className="transition w-10 h-20 hover:scale-110 cursor-pointer" src={"../src/assets/" + card} alt={card} />
    </div>
  )
}

export default Card