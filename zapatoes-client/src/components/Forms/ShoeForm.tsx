import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
            navigate(`/shoes/get/${response.data.shoe._id}`);
        } catch(err) {
            console.warn(err)
        }
    }

    return(
        <div>
            <div>
                <h5>Create a Shoe card</h5>

                <form action="#" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text"
                            id='name'
                            value={form.name}
                            placeholder='Name of shoe here'
                            onChange={e => setForm({...form, name: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input 
                            type="text"
                            id='image'
                            value={form.image}
                            placeholder='link an image here'
                            onChange={e => setForm({...form, image: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="quality">Quality:</label>
                        <input 
                            type="text"
                            value={form.quality}
                            placeholder='put the quality of the shoe here'
                            onChange={e => setForm({...form, quality: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input 
                            type="number"
                            value={form.price}
                            placeholder='price of shoe here'
                            onChange={e => setForm({...form, price: e.target.value})}
                            required
                        />
                        
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}