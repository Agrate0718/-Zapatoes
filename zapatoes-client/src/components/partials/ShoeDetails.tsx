import { useParams, useNavigate, Link } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ShoeDetails(){
    const [shoe, setShoe] = useState({
        name: '',
        image:'',
        quality: '',
        price: '',
    })

    const { shoeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getShoe = async () => {
            try{
                //axios to the backend for get shoe
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/shoes/get/${shoeId}`)
                setShoe(response.data.shoe)
                console.log(response.data)
            }catch (err) {
                console.warn(err)
            }
        }
        getShoe()
    }, [])

    return(
        <div>
            {shoe.name}
        </div>
    )
}