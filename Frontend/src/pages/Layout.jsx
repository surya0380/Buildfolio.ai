import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading';

export const AuthLayout = () => {
    const { user, loadUser } = useAppContext();
    
    if (loadUser) return <Loading />
    if (!user) return <Navigate to="/login" replace />
    

    return <Outlet />
}


export const GuestLayout = () => {
    const { user, loadUser } = useAppContext();

    if (loadUser) return <Loading />
    if (user) return <Navigate to="/" replace />


    return <Outlet />
}