import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

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
            navigate(`/view`)
            
        } catch(err) {
            console.warn(err)
        }
    }
    return(
        <div>
            <div>
                <h5>Edit a Shoe card</h5>

                <form action='#'  onSubmit={handleSubmit}>
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