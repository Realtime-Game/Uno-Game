import React from 'react'

const Card = ({card}) => {
  return (
    <div onMouseEnter={()=>{console.log('mouse in')}} className="relative flex items-center justify-center">
        <img className="transition w-30 h-40 hover:scale-110 cursor-pointer" src={"../src/assets/" + card} alt={card} />
        {console.log(card)}
    </div>
  )
}

export default Card