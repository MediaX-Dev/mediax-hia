import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"

function SignIn() {
  const navigate = useNavigate()


  const [email, setEmail] = useState('')

  const onChangeHandler = (e) => setEmail(e.target.value)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was send')
    } catch (error) {
      toast.error('Could not send reset email');
    }
  }
  return (
    <div id="login">
      <section className="login">
        <div className="row">
          <div className="col-md-5 d-none d-md-block p-0">
            <div className="lo-box left">
              <div className="lo-img">
                <img src={Logo} alt="" className="w-100" />
              </div>
            </div>
          </div>
          <div className="col-md-7 p-0">
            <div className="lo-box right">
              <div className="lo-text">
                <h3>Forgot Password</h3>
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="email" value={email} placeholder="Email" onChange={onChangeHandler} />
                  </div>
                  <button type="submit" className="th-btn fill w-100">Send Reset Link</button>
                </form>

                <div className="dont-have">
                  <p className="m-0"><Link to="/admin/sign-in">Sign In</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn