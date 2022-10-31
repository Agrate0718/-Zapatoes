import OwnerNavbar from "./OwnerNavbar"


function InquiriesList(inquiry:any){
    console.log('inquiry:', inquiry)
    return(
        <div>
        <a href={`inquiries/get/${inquiry.inquiry._id}`} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{inquiry.inquiry.name}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{inquiry.inquiry.contactInfo}</p>
</a>
        </div>
       
    )
    
}

export default InquiriesList