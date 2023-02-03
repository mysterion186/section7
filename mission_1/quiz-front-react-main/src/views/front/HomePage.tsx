import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function HomePage() {
    return (
        <div className='flex justify-center flex-col items-center w-[100%] w-screen'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default HomePage;