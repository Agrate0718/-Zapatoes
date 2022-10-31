import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import OwnerNavbar from '../partials/OwnerNavbar'

export default function ShoeEditForm(){
    const [form, setForm] = useState({
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
                setForm(response.data.shoe)
                console.log(response.data)
            }catch (err) {
                console.warn(err)
            }
        }
        getShoe()
    }, [])

    const handleSubmit = async (e:any) => {
        try {
            e.preventDefault()
            // axios.put/.post('url', data for the reqeust body)
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/shoes/update/${shoeId}`, form)
            // navigate back to the details page for this bounty
            navigate(`/owner/view`)
            
        } catch(err) {
            console.warn(err)
        }
    }
    return(
        <div>
            <header className='text-center'>
            <OwnerNavbar />
        </header>
            <div className=" w-full max-w-xs">
                <h5>Edit a Shoe card</h5>
                
                <form action='#' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"  onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text"
                            id='name'
                            value={form.name}
                            placeholder='Name of shoe here'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text"
                            id='image'
                            value={form.image}
                            placeholder='link an image here'
                            onChange={e => setForm({...form, image: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quality">Quality:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text"
                            value={form.quality}
                            placeholder='put the quality of the shoe here'
                            onChange={e => setForm({...form, quality: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="number"
                            value={form.price}
                            placeholder='price of shoe here'
                            onChange={e => setForm({...form, price: e.target.value})}
                            required
                        />
                        
                    </div>
                    <button className='bg-[#111827] hover:bg-[#7188b8] text-white uppercase rounded ' type='submit'>Submit</button>          
                    <Link to={`/shoes/get/${shoeId}/owner`}> <button className="inline-flex items-center  uppercase ml-20 mt-10 font-medium text-center text-white bg-red-700 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-bred-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >cancel</button> </Link>
                </form>
               
                
            </div>
        </div>
    )
}