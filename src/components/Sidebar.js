import SidebarData from "./SidebarData";
import "../CSS/sidebar.scss"
import {NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidenav navbar navbar-vertical navbar-expand-xs my-3 fixed-start ms-3">
            <div className="navbar-collapse">
                <ul className="navbar-nav">
                    {
                        SidebarData.map((data, index) => {
                            return (
                                <li className="mx-2 mt-2 li" key={index}>
                                    <NavLink className="nav-link shadow ps-3" activeClassName="active" to={data.link}>
                                        <i className={data.icon}></i>
                                        <span className="ms-2">{data.title}</span>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>

    )
}

export default Sidebar