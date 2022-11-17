import {   useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../partials/navbar'

export default function InquiryForm(){
    const [form, setForm] = useState({
        name: '',

        contactInfo: '',

        question: ''
    })

    const navigate = useNavigate()

    const handleSubmit = async (e:any) => {
        try {
            e.preventDefault()
            // post form data to the backend API
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/inquiries/create`, form);
            // navigate back to /courses to see the new course
            // navigate(`/inquiries/get/${response.data.inquiry._id}`);
            navigate('/view')
        } catch(err) {
            console.warn(err)
        }
    }

    return(
        <div className=''>
            <header className=' '>
            <Navbar />
        </header>
            <div className=" flex justify-center pt-20 max-w-full ">
               

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={handleSubmit}><h1>Make a Inquiry</h1>
                    <div> 
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='name'>Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='text'
                            id='name'
                            value={form.name}
                            placeholder='Please enter yout name here'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='contactInfo'>Contact Info</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type='text'
                            id='contactInfo'
                            value={form.contactInfo}
                            placeholder='Please enter a way to contact you'
                            onChange={e => setForm({...form, contactInfo: e.target.value})}
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='question'>Inquiry</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                            type='text'
                            id='question'
                            value={form.question}
                            placeholder='please enter your inquiry here'
                            onChange={e => setForm({...form, question: e.target.value})}
                            required 
                        />
                    </div>
                    <button className='bg-[#111827] hover:bg-[#7188b8] text-white uppercase rounded  ' type='submit'>Submit</button>
                    <button className="ml-20 mt-10 inline-flex items-center uppercase rounded   text-center text-white bg-red-700  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-bred-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => navigate(-1)}>cancel</button>

                </form>
            </div>
        </div>
    )
}
