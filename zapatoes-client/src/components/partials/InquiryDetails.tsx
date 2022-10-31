import { useParams, useNavigate, Link } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function inquiryDetails(){
    const [inquiry, setInquiry] = useState({
        name: '',
        image:'',
        quality: '',
        price: '',
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

    return(
        <div>
            {inquiry.name}
        </div>
    )
}