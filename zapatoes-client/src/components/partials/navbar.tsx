import { Link } from 'react-router-dom'

export default function Navbar(){
    return(
        <div>
            <Link to='/'>Home</Link>
            {" | "}
            <Link to='/Inquiries'>Inquiries</Link>
            {" | "}
            <Link to='/View'>View</Link>
            {" | "}
            <Link to='/Details'>Details</Link>
        </div>
    )
}