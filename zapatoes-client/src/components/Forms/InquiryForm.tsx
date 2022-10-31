import {   useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

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
            navigate(`/inquiries/get/${response.data.inquiry._id}`);
        } catch(err) {
            console.warn(err)
        }
    }

    return(
        <div>
            <div>
                <h5>Make a Inquiry</h5>

                <form action="#" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            value={form.name}
                            placeholder='Please enter yout name here'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor='contactInfo'>Contact Info:</label>
                        <input
                            type='text'
                            id='contactInfo'
                            value={form.contactInfo}
                            placeholder='Please enter a way to contact you'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor='question'></label>
                        <input
                            type='text'
                            id='question'
                            value={form.question}
                            placeholder='please enter your inquiry here'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required 
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}