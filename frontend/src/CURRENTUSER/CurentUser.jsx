import { setUsers } from '@/REDUX/UserSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useCurrentUser = () => {

       const dispatch = useDispatch();

       useEffect(() => {
              const fetchUser = async () => {
                     try {
                            const res = await axios.get("/api/me", {
                                   withCredentials: true
                            });

                            if (res.data.success) {
                                   dispatch(setUsers(res.data.data));
                            }
                     } 
                     catch (error) {
                            console.log("Error fetching current user:", error);
                     }
              };
              fetchUser();
       }, [dispatch]);  // JB JB DATA HATEGA USESELECTER SE  TB TB USEEFECT KE SATH ISKE UNDER VALE API BHI CALL HO JAYENGE.
};
export default useCurrentUser;
