import { Link } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt,  FaUser, FaCloud } from "react-icons/fa";
import "./index.scss"

const Sidebar = () => (
    <div className = "nav-bar" >
        <Link to="/" className='logo' > BS<FaCloud /> </Link>
            <p className="sub-logo">store safer store better...</p>
    </div>
)

export default Sidebar