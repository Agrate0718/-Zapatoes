

function InquiriesList(inquiry:any){
    console.log('inquiry:', inquiry)
    return(
        <div>
            <div>
            <h5>name:{inquiry.inquiry.name}</h5>
            </div>
            <div>
            <h5>contactInfo:{inquiry.inquiry.contactInfo}</h5>
            </div>
            <div>
            <h5>question:{inquiry.inquiry.question}</h5>
            </div>
            </div>
    )
}

export default InquiriesList