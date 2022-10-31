import ShoeEditForm from "../Forms/ShoeEditForm";
import ShoeForm from "../Forms/ShoeForm";
import Inquiries from "../partials/Inquiries";
import Navbar from "../partials/navbar";

export default function TestPage(){
    return(
        <div>
             <header className='text-center'>
        <Navbar />
      </header>
            < Inquiries />
        </div>
    )
}