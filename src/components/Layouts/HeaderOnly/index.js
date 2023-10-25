import Header from "./Header";
import Sidebar from "./SideBar";

function HeaderOnly({ children }) {
    return <div>
        <Header />
        <div className="container">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    </div>;
}

export default HeaderOnly;