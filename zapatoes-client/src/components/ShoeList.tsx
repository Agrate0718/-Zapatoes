

function ShoeList(shoe:any){
    
    return(
        <div>
            <div>
            <h5>name:{shoe.shoe.name}</h5>
            </div>
            <div>
            <h5>image:{shoe.shoe.image}</h5>
            </div>
            <div>
            <h5>quality:{shoe.shoe.quality}</h5>
            </div>
            <div>
            <h5>price:{shoe.shoe.price}</h5>
            </div>
            </div>
    )
}

export default ShoeList