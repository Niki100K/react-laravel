import React, { useContext, useState } from 'react'
import './MainPage.css'
import { AppContext } from '../../AppContext'
import AppUnits from '../../AppUnits'
import { useSelector } from 'react-redux'

import Filter from '../Filter/Filter'
import UserCart from '../UserCart/UserCart'
import Sign from '../Sign/Sign'
export default function MainPage() {
  const { gamesData } = useContext(AppContext)
  const [correctLeft, setCorrectLeft] = useState('')
  const handleLeft = (type) => {
    setCorrectLeft(type)
  }
  const userData = useSelector(state => state.userData)
  return (
    <div className='MainPage c'>
      <div className='left c f'>
        <button onClick={() => handleLeft('filter')}>Filter</button>
        {Object.values(userData).length > 0 ? (
          <button onClick={() => handleLeft('cart')}>Your Cart</button>
        ) : (
          <button onClick={() => handleLeft('sign')}>Sign</button>
        )}
        {correctLeft === 'filter' && <Filter handle={handleLeft} />}
        {correctLeft === 'cart' && <UserCart handle={handleLeft} />}
        {correctLeft === 'sign' && <Sign handle={handleLeft} />}
      </div>
      <div className='games c spa'>
        {gamesData.map((info, index) => (
          <Game info={info} key={index} />
        ))}
      </div>
    </div>
  )
}

function Game({ info }) {
  const { handleCart } = AppUnits()
  return (
    <div onClick={() => handleCart('add', info.name, info.price, info.id, 1)} className='game c'>
      <div className='img c'>
        <img src={info.image} alt="" loading='lazzy' />
        <dfn>{info.name}</dfn>
      </div>
    </div>
  )
}