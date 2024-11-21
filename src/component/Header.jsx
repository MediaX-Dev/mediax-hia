import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-blue.png'

function Header() {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log(auth.currentUser)
        setUser(auth.currentUser)
    }, [])
    const logoutHandler = () => {
        auth.signOut()
        navigate('/sign-in')
    }
    return (

        <header id="header" className='px-3 py-2 p-sm-4'>
            {/* <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                        <h3 className='m-0'>{user.displayName}</h3> 
                        <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                    </div> */}
            <div className="container-xxl p-0">
                <div className="headerContainer">
                    {user ? (
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="nav-brand">
                                    <Link to='/'><img src={logo} className='w-100' alt="" /></Link>
                                </div>
                                <div className="nav-auth">
                                    <div className="sign-out" title="Sign Out" onClick={logoutHandler}>
                                    <i class="fas fa-sign-out"></i>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                                <h3 className='m-0'><Link to='/admin/dashboard'>{user.displayName}</Link></h3>
                                <h3 className='m-0'>{user.displayName}</h3>
                                <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                            </div> */}
                        </>
                    ) :
                        (
                            <>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="nav-brand">
                                        <Link to='/'><img src={logo} className='w-100' alt="" /></Link>
                                    </div>
                                    <div className="nav-auth">
                                    <a href='#book-obituary'>
                                                <div className="sign-up">
                                                    Register now
                                                </div>
                                            </a>
                                        {/* <div className="d-flex gap-1 gap-sm-3 align-items-center">
                                            <Link to='/sign-in'>
                                                <div className="sign-in">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                            </Link>
                                            <a href='#book-obituary'>
                                                <div className="sign-up">
                                                    Register now
                                                </div>
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <Link to='/sign-in' className='btn btn-primary'>Sign In</Link> */}
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
