import React, { useState } from 'react'
import "./style.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardData from './CardData';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {

  const [cartData, setCartData] = useState(cardData);

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item Added to Your Cart");
  }

  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className='px-4' style={{fontWeight: 400}}>Restaurants in Ahmedabad Open Now</h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
         {
            cartData.map((item, index) => {
              return (
                <Card style={{width:"22rem",border:"none"}} className='hove mb-4'>
                  <Card.Img src={item.imgdata} />
      
                  <div className="card_body">
                    <div className="upper_data d-flex justify-content-around align-items-center">
                      <h4 className='mt-2'>{item.dish}</h4>
                      <span>{item.rating} &nbsp; ★</span>
                    </div>
      
                    <div className="lower_data d-flex justify-content-around">
                      <h5>{item.address}</h5>
                      <span>{item.price}</span>
                    </div>
      
                    <div className="extra"></div>
      
                    <div className="last_data d-flex justify-content-around align-items-center">
                      <img src={item.arrimg} alt="" className='limg' />

                      <Button onClick={() => send(item) } style={{width: "150px", background: "#ff3054db", border:"none"}} variant="outline-light" className='mt-2 mb-2'>
                        Add To Cart
                      </Button>
      
                      <img src={item.delimg} alt="" className='laimg' />
      
                    </div>
      
                  </div>
                </Card>
              )
            })
         }
        </div>
      </section>
    </>
  )
}

export default Home
