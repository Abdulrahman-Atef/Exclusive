import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './navBar.module.css'
import {useDispatch, useSelector } from 'react-redux'
import UserSection from './UserSection/UserSection';
import { getCart } from '../../../redux/cartSlice';
import { getWishList } from '../../../redux/wishListSlice';

export default function NavBar() {
  let dispatch = useDispatch();
  let {userToken} = useSelector((state)=>state.userToken);
  let {numOfCartItems} = useSelector((state)=>state.cart);
  let {wishListIds} = useSelector((state)=> state.wishList);

  // change NavBar Color

  const [Color, setColor] = useState(false);
  const changeColor = () =>{
    window.scrollY > 65 ? setColor(true) : setColor(false);
  }
  window.addEventListener('scroll', changeColor)

  useEffect(()=>{
    if (userToken) {
      dispatch(getCart())
      dispatch(getWishList())
    }
  },[])

  return <>
    <nav className={`${style.navbar} navbar navbar-expand-lg ${Color? 'navbar-bg': 'bg-1'}`}>
  <div className="container">
    <Link className="LogoColor navbar-brand ff-inter fs-4 fw-bold me-5 pe-5" to={'/'}>Exclusive</Link>
    <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
        <li className="nav-item">
          <NavLink className="nav-link text3" aria-current="page" to={'/'}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text3" to={'/products/allproducts'}>Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text3" to={'/contact'}>Contact</NavLink>
        </li>
        {!userToken?<li className="nav-item">
          <NavLink className="nav-link text3" to={'/signUp'}>sign Up</NavLink>
        </li>:''}
      </ul>
      <ul className='ms-auto mb-0 d-flex justify-content-center align-items-center gap-4'>
        <li>
          <div className="input-group">
            <input type="text" className="form-control border-0 fs-12 secondry1" id="autoSizingInputGroup" placeholder="What Are You Looking For ?"/>
            <div className="input-group-text border-0 secondry1"><i className="fa-solid fa-magnifying-glass"></i></div>
          </div>
        </li>
        <li className='position-relative'>
          <Link to={'/wishList'} aria-label='WishList'>
            <i className="bi bi-heart fs-5"></i>
            {userToken && wishListIds?.length?<span className={style.cartNum}>{wishListIds?.length}</span>:''}
          </Link>
        </li>
        <li className='position-relative'>
          <Link to={'/cart'} aria-label='Cart'>
            <i className="bi bi-cart3 fs-5"></i>
            {userToken && numOfCartItems?<span className={style.cartNum}>{numOfCartItems}</span>:''}
          </Link>
        </li>
        {userToken? <UserSection />
        :
        <li>
          <Link to={'/login'} className='btn btn-outline-dark d-flex align-items-center p-1 px-2'>Login<i className="bi bi-person ms-1"></i></Link>
        </li>
        }
      </ul>
    </div>
  </div>
</nav>
  </>
}
