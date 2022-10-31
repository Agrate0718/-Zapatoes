import { useParams, useNavigate, Link } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import OwnerNavbar from './OwnerNavbar'

export default function InquiryDetails(){
    const [errorMessage, setErrorMessage] = useState('')
    const [inquiry, setInquiry] = useState({
        name: '',
        contactInfo: '',
        question: ''
    })

    const { inquiryId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getInquiry = async () => {
            try{
                //axios to the backend for get inquiry
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/inquiries/get/${inquiryId}`)
                setInquiry(response.data.inquiry)
                console.log(response.data)
            }catch (err) {
                console.warn(err)
            }
        }
        getInquiry()
    }, [])

    const handleDelete = async () => {
        try {
            // axios to the backend to delete this Course
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/inquiries/delete/${inquiryId}`)
            // after deletion, navigate back to /courses
            navigate('/inquiries')
        } catch(err:any) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }


    return(
        <div>
            <header className='text-center'>
            <OwnerNavbar />
        </header>
            <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 "> 
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{inquiry.name}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{inquiry.contactInfo}</p>
        <h4 className="font-normal text-gray-700 dark:text-gray-400">{inquiry.question}</h4>
        <button className="bg-[#981634] hover:bg-[#d01d46] text-white uppercase rounded" onClick={handleDelete}>delete</button>
    </div>
        </div>
    
    )
}