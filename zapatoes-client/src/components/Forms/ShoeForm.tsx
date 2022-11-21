import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OwnerNavbar from '../partials/OwnerNavbar'

export default function ShoeForm(){

    const [form, setForm] = useState({
        name: '',
        image:'',
        quality: '',
        price: '',

    })

    const navigate = useNavigate()

    const handleSubmit = async (e:any) => {
        try {
            e.preventDefault()
            // post form data to the backend API
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/shoes/create`, form);
            // navigate back to /courses to see the new course
            navigate(`/shoes/get/${response.data.shoe._id}/owner`);
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
                <h5>Create a Shoe card</h5>

                <form action="#" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div >
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
                    {/* "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" */}
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
                    <select id="countries" className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>Choose a brand</option>
                    {/* <option value={goes here like this}> */}
                    <option>Nike</option> 
                    <option>Addidas</option>
                    <option>Jordan</option>
                    <option>FILA</option>
                    </select>
                    {/* more stuff */}

                    <button className='bg-[#111827] hover:bg-[#7188b8] text-white uppercase rounded ' type='submit'>Submit</button>
                    <button className="inline-flex items-center ml-20 mt-10 uppercase text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-bred-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => navigate(-1)}>cancel</button>
                </form>
            </div>
        </div>
    )
}

