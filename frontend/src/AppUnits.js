import { useContext } from 'react'
import { AppContext } from './AppContext'
import { useSelector } from 'react-redux'
export default function AppUnits() {
    const userData = useSelector(state => state.userData)
    const { setUserCart, userCart, API } = useContext(AppContext)

    const handleCart = (method, name, price, id, quantity) => {
        setUserCart(prev => {
            const gameIndex = prev.findIndex(obj => obj.id === id)
            switch (method) {
                case 'add':
                    if (gameIndex !== -1) {
                        const addQuantity = prev.map(obj => {
                            if (obj.id === id) {
                                return {...obj, quantity: obj.quantity + quantity}
                            }
                            return obj
                        })
                        return addQuantity
                    } else {
                        return [...prev, {name, price, id, quantity}]
                    }
                case 'remove':
                    if (gameIndex !== -1) {
                        const newQuantity = prev[gameIndex].quantity - quantity
                        if (newQuantity > 0) {
                            const removeQuantity = prev.map(obj => {
                                if (obj.id === id) {
                                    return {...obj, quantity: obj.quantity - quantity}
                                }
                                return obj
                            })
                            return removeQuantity
                        } else {
                            return prev.filter(obj => obj.id !== id)
                        }
                    } else {
                        return prev
                    }
                case 'clear': 
                    return []
                default:
                    return
            }
        })
    }

    const handleOrder = async (price, items) => {
        if (userCart.length === 0) {
            return
        }
        try {
            const response = await fetch(`${API}/api/upload-order/${userData.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    price: price,
                    items: items,
                    data: userCart,
                })
            });
            const data = await response.json();
            if (response.status === 200) {
                setUserCart([])
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

  return {
    handleCart,
    handleOrder
  }
}
