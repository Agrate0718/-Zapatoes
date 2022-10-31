import { useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import { Navigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../partials/navbar"
import OwnerNavbar from "../partials/OwnerNavbar"

export default function Login(){
     // State
  const [currentUser, setCurrentUser] = useState(null)
  // state for the controlled form
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

  // Hooks
   useEffect(() => {
     // check to see if token is in storage
     const token = localStorage.getItem('jwt')
     if (token) {
       // if so, we will decode it and set the user in app state
       setCurrentUser(jwt_decode(token))
     } else {
       setCurrentUser(null)
     }
   }, []) // happen only once

    // Handlers
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
        // post form data to the backend
        const reqBody = {
            userName, 
            password
        }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sellers/login`, reqBody)

        // save the token in localstorage
        const { token } = response.data
        localStorage.setItem('jwt', token)

    
        // set the user in App's state to be the decoded token
        setCurrentUser(jwt_decode(token))

    } catch (err:any) {
        console.warn(err)
        if (err.response) {
            setMsg(err.response.data.msg)
        }
    }
 }
console.log('msg:',msg)
console.log(currentUser)
// conditionally render a navigate component
// if (currentUser) {
//     return <Navigate to={'/'} />
// }

return (
    <div>
        <header className='text-center'>
            <OwnerNavbar />
        </header>
        <p>{msg}</p>

        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                        src="/loginNew.svg"
                        className="w-full"
                        alt="Phone image"
                        />
                    </div>

                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <form onSubmit={handleSubmit}>
                            <p>Login to your Account:</p>
                            <br></br>

                            {/* <!-- userName input --> */}
                            <div className="mb-6 ">
                                <input 
                                    type="userName"
                                    id="userName"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="username"
                                    onChange={e => setUserName(e.target.value)}
                                    value={userName}
                                    required
                                />
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="mb-6">
                                <input 
                                    type="password"
                                    id="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>

                            {/* <!-- Submit button --> */}
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-[#898e59] hover:bg-[#aab161] text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg focus:bg-[#b7bf61] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#b7bf61] active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Sign in
                            </button>
                            <button onClick={handleLogout}>logout</button>

                            {/* <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>

    </div>
)
}