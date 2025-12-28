// HUM NORMAL TARIKE SE BHI KR SKTE HII BUT IS BEST 😊

import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const User = ({ children }) => {
       const [user, setUser] = useState(() => {

              // isko hata bhi doge to bhi chalega but jo localStorage mea userInfo and userExpiry hai page ko relod krne pr hut jayega fir data nhi ja payega is liye likhna pada.
              const storedUser = localStorage.getItem("userInfo");
              const expiry = localStorage.getItem("userExpiry");  


              if (storedUser && expiry) {
                     const currentTime = new Date().getTime();  // YE TIME CHALTA RhEGA YNI CORRENT TIME DIKHAYEGA


                     // JO HUMNE TIME DIYA HII 5M CURRENT TIME SE BADA HII TABHI TAK  (JSON.parse(storedUser)) LOCAL STORAGE MEA parse type  RKHO. verna else ke case mea jao
                     if (currentTime < Number(expiry)) {
                            return JSON.parse(storedUser); //parse MTLB OBJECT TYPE
                     } 
                     else {
                            localStorage.removeItem("userInfo");
                            localStorage.removeItem("userExpiry");
                            return null;
                     }
              }
              return null;
       });

       useEffect(() => {
              if (user) {  // AGR USER HII.
                     
                     localStorage.setItem("userInfo", JSON.stringify(user));

                     const expiryTime = new Date().getTime() + 5 * 60 * 1000; 

                     localStorage.setItem("userExpiry", expiryTime);

                     const timer = setTimeout(() => {
                            setUser(null);
                            localStorage.removeItem("userInfo");
                            localStorage.removeItem("userExpiry");
                     }, 5 * 60 * 1000);

                     return () => clearTimeout(timer);  // BAD MEA CLEAR KRNA NHI BULNA .
              }
       }, [user]);

       return (
              <UserContext.Provider value={{ user, setUser }}>
                     {children}
              </UserContext.Provider>
       );
};

export const useUser = () => useContext(UserContext);
