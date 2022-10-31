import { useParams, useNavigate, Link } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import OwnerNavbar from './components/partials/OwnerNavbar'

export default function OwnerShoeDetails(){
    const [errorMessage, setErrorMessage] = useState('')
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

    const handleDelete = async () => {
        try {
            // axios to the backend to delete this Course
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/shoes/delete/${shoeId}`)
            // after deletion, navigate back to /courses
            navigate('/owner/View')
        } catch(err:any) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    const handleEdit = () => {
        navigate(`/edit/${shoeId}`)
    }

    return(
        <div>
                <header className='text-center'>
        <OwnerNavbar />
      </header>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={shoe.image} alt=""/>
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{shoe.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Quality: {shoe.quality}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: ${shoe.price}</p>
        {/* <Link to={'/Inquiry'} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Inquire */}
            {/* <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
        {/* </Link> */}
        <button className="inline-flex items-center uppercase  font-medium  text-center text-white bg-red-700 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleEdit}>edit</button>
        {/* <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-bred-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => navigate(-1)}>cancel</button> */}
        <button className="inline-flex items-center ml-20 mt-10 font-medium uppercase text-center text-white bg-red-700 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleDelete}>delete</button>

    </div>
</div>
</div>
  

    )
}