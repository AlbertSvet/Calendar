import { Link } from "react-router-dom";
import Error from "../../components/error/Error";

const PageError = () =>{
    return(
        <div>
            <Error/>
            <Link to='/'>Go Home</Link>
        </div>
        
    )
}
export default PageError