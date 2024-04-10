import React, { useContext, useEffect, useState } from 'react'
import './UserCart.css'
import { AppContext } from '../../AppContext'
import AppUnits from '../../AppUnits'
export default function UserCart() {
  const { userCart } = useContext(AppContext)
  const { handleOrder } = AppUnits()
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  useEffect(() => {
    let price = userCart.reduce((acc, item) => {
      return acc + item.quantity * item.price
    }, 0)
    setTotalPrice(price.toFixed(2))
    let items = userCart.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
    setTotalItems(parseInt(items))
  }, [userCart])

  const [fetchingData, setFetchingData] = useState(false)
  const handleFetch = () => {
    if (fetchingData) {
      return
    }
    setFetchingData(true)
    handleOrder(totalPrice, totalItems)
  }
  useEffect(() => {
    if (Object.values(userCart).length === 0) {
      setFetchingData(false)
    }
  }, [userCart])
  return (
    <div className='UserCart c f'>
      <h2>Your Cart</h2>
      <div className='container c'>
        <div className='cart c'>
          {userCart.map((info, index) => (
            <Game info={info} key={index} />
          ))}
        </div>
        <div className='info c f'>
          <div className='c spa'>
            <strong>Total:</strong>
            <p>{totalPrice}$</p>
          </div>
          <div className='c spa'>
            <strong>Items:</strong>
            <p>{totalItems}</p>
          </div>
          <button onClick={handleFetch}>Finish</button>
        </div>
      </div>
    </div>
  )
}

function Game({ info }) {
  const { handleCart } = AppUnits()
  return (
    <div onClick={() => handleCart('remove', info.name, info.price, info.id, 1)} className='game c f'>
      <div className='c spa' style={{marginBottom: '.5rem'}}>
        <p>{info.name}</p>
        <span>{info.price}$</span>
      </div>
      <div className='c spa'>
        <span>{info.quantity}</span>
        <dfn>{(info.price * info.quantity).toFixed(2)}$</dfn>
      </div>
    </div>
  )
}