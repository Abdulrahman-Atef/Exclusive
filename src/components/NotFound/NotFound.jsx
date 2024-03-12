import React from 'react'
import { Link } from 'react-router-dom'
import style from './notfound.module.css'
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return <>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
      <div className="my-5">
        <Link to={'/'} className="text3 opacity-50"> Home / </Link>
        <span> 404 Error </span>
      </div>
      <div className={`${style.notFound} my-80 text-center`}>
        <h1> 404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
        <Link to={'/'} className='button2 border-0 rounded-1 text1 px-4 py-3 fs-14'>Back to home page</Link>
      </div>
    </>
}
