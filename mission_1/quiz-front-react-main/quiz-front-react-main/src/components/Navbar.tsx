import { NavLink} from "react-router-dom";
import { useRef } from "react";

function Navbar(){
	const btn = useRef("");
	const menu = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (menu.current !== null) menu.current.classList.toggle("hidden");
	}
    return(
        <nav className="bg-white shadow-lg w-[100%]">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7 justify-between">
						<div className="hidden md:flex items-center space-x-1">
                            <NavLink to="/"><p className="py-4 px-2 text-green-500  font-semibold ">Home</p></NavLink>
						</div>
					</div>

					<div className="hidden md:flex items-center space-x-3 ">
						<NavLink to="/admin"><p className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Login</p></NavLink>
					</div>

					<div className="md:hidden flex items-center">
						<button className="outline-none mobile-menu-button" onClick={handleClick}>
						<svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>

			<div className="hidden mobile-menu" ref={menu}>
				<ul className="">
					<li className="active"><NavLink to="/"><p className="py-4 px-2 text-green-500  font-semibold ">Home</p></NavLink></li>
					<li className="active"><NavLink to="/admin"><p className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Login</p></NavLink></li>		
				</ul>
			</div>

		</nav>
    )
}

export default Navbar; 