import { useContext } from 'react';
import AuthContext from '../components/auth/auth-provider';

const useAuth = (): { setAuth: any; auth: any } => {
    return useContext<any>(AuthContext);
};

export default useAuth;
