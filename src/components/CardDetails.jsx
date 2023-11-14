import React, { useEffect, useState } from 'react'
import "./cartstyle.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQnty, emptyCartItem, removeToCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';


const CardDetails = () => {

  const dispatch = useDispatch();

  const { carts } = useSelector((state) => state.allCart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQnty, setTotalQnty] = useState(0);

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  }

  // remove single cart
  const handleDelete = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove From Your Cart");
  }

  // remove single item
  const handleDecrement = (e) => {
    dispatch(decrementQnty(e));
  }

  const emptyCart = () => {
    dispatch(emptyCartItem());
    toast.success("All Items are removed from your cart");
  }

  const total = () => {
    let totalPrice = 0;
    carts.map((item, index) => {
      totalPrice = totalPrice + item.price * item.qnty;
    })

    setTotalPrice(totalPrice);
  }

  const countqunatity = () => {
    let totalQuantity = 0;

    carts.map((item, index) => {
      totalQuantity = totalQuantity + item.qnty;
    })

    setTotalQnty(totalQuantity);
  }

  useEffect(() => {
    total();

  }, [total]);

  useEffect(() => {
    countqunatity();

  }, [countqunatity]);

  // payment integration
  const makePayment = async (e) => {
      const stripe = await loadStripe("pk_test_51O5NVySAFD3cnMxg3n0Mw0hNB5y18WgsKZjbpN7bRJva7dFfomqPqYcZ3CQEcXzbWjOcT7NUP9JtTdypm0wLSNd600L0ajuFuV");

      const body = {
        products: carts
      }
      const headers = {
        "Content-Type": "application/json"
      }

      const base_url = "https://mern-e-comm-backend.onrender.com";

      const response = await fetch(`${base_url}/api/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      })

      if(result.error){
        console.log(result.error);
      }
  }

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card ">
            <div className="card-header bg-dark p-3">
              <div className='card-header-flex'>
                <h5 className='text-white m-0'>Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""} </h5>
                {
                  carts.length > 0 ?
                   <button onClick={() => emptyCart() } className='btn btn-danger mt-0 btn-sm'><i className="fa fa-trash-alt mr-2"></i>Empty Cart</button> : ""
                }
              </div>

            </div>

            <div className="card-body p-0">
              {
                carts.length === 0 ? <table className='table cart-table mb-0'>
                  <tbody>
                    <tr>
                      <td>
                        <div className='cart-empty'>
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your cart is empty</p>

                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table> : 
                <table className='table cart-table mb-0 table-responsive-sm'>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className='text-right'>
                        <span id='amount' className='amount'>Total Amount</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      carts.map((data, index) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <button onClick={() => handleDelete(data.id)} className="prdct-delete"><i className="fa fa-trash-alt mr-2"></i></button>
                              </td>
                              <td><div className="product-img"><img src={data.imgdata} alt="" /></div></td>
                              <td><div className="product-name"><p>{data.dish}</p></div></td>
                              <td>{data.price}</td>
                              <td>
                                <div className="prdct-qty-container">
                                  <button className='prdct-qty-btn' onClick={data.qnty <= 1 ? () => handleDelete(data.id) : () => handleDecrement(data) }>
                                    <i className="fa fa-minus"></i>
                                  </button>
                                  <input type="text" className='qty-input-box' value={data.qnty} disabled />

                                  <button className='prdct-qty-btn' onClick={() => handleIncrement(data) }>
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-right ">{data.qnty * data.price}</td>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th>Items In Cart <span className="ml-2 mr-2">:</span> <span className="text-danger">{totalQnty}</span> </th>
                      <th className='text-right'>Total Price <span className="ml-2 mr-2">:</span> <span className="text-danger">{totalPrice}</span> </th>
                      <th className='text-right'><button className='btn btn-success' onClick={makePayment}>Checkout</button></th>
                    </tr>
                  </tfoot>
                </table>
              }
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CardDetails
