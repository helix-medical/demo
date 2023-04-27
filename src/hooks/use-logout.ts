import useAuth from './use-auth';
import setNotification from '../pages/system/errors/feedback-notif';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem('auth');
        setNotification(false, 'Logout successfull');
    };

    return logout;
};

export default useLogout;
