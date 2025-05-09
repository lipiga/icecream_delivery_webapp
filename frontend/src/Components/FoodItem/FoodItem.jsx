import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { Link } from 'react-router-dom'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

    const handleCartClick = (e, action) => {
        e.stopPropagation();
        action(id);
    }

    return (
        <div className='food-item'>
            <div className='food-item-image-container'>
                <img className='food-item-image' alt='' src={url + "/images/" + image} />
                {!cartItems[id]
                    ? <img
                        className='add'
                        onClick={(e) => handleCartClick(e, addToCart)}
                        src={assets.add_icon_white}
                        alt=''
                    />
                    : <div className='food-item-counter'>
                        <img
                            onClick={(e) => handleCartClick(e, removeFromCart)}
                            src={assets.remove_icon_red}
                            alt=''
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            onClick={(e) => handleCartClick(e, addToCart)}
                            src={assets.add_icon_green}
                            alt=''
                        />
                    </div>
                }
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <Link to={`/${id}`} className='food-item-name-link'>
                        <p>{name}</p>
                    </Link>
                    <img alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>₹{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
