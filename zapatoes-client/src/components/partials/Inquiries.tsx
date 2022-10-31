import { useEffect, useState } from "react";
import axios from 'axios'
import InquiriesList from "./InquiriesList";
import InquirySearch from "./InquirySearch";


export default function Inquiries(){
    const [inquiries, setInquiries] = useState([])
    const [search, setSearch] = useState("");
    
     useEffect(() => {
         const getInquiries = async () => {
         
             try{
             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/inquiries/get`)
             const filteredInquiries = response.data.inquiries.filter((inquiry:any) => {
                return inquiry.name.toLowerCase().includes(search.toLowerCase());
            });
 
             setInquiries(filteredInquiries);
             // console.log(response.data)
            
         }catch(err) {
             console.warn(err)
            
         }
         }
         getInquiries()
     }, [search])
 
     console.log(inquiries)
     const InquiriesListComponents = inquiries.map((inquiry:any) => {
         return <InquiriesList inquiry={inquiry} key={inquiry._id} />
     })
     return(
        <div className="p-10">
            <h1>All Inquiries</h1>
            <div>
            <input type="search" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-white border rounded-full shadow-sm overflow-visible focus:text-gray-700 focus:border-blue-600 focus:outline-none" placeholder="Search for anything" aria-label="Search" 
            />
            </div>
             <div className='mt-3 flex flex-wrap justify-center gap-8'>
             {InquiriesListComponents}
            </div>
        </div>
        
     )
 }