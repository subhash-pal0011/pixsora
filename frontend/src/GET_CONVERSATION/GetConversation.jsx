// ISKO HUME CUSTOMHOOKS KE UNDER LIKHNA THA BUT THIK HII

import { setGetConversationUser } from "@/REDUX/MessageSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetConversation = () => {
       const dispatch = useDispatch();
       useEffect(() => {
              const getChatUser = async () => {
                     try {
                            const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/getconversation", {
                                   withCredentials: true,
                            });

                            if (res.data.success) {
                                   dispatch(setGetConversationUser(res.data.data));
                            }
                     } catch (error) {
                            console.log("error for get conversation:", error);
                     }
              };

              getChatUser();
       }, [dispatch]);

       return null;
};

export default GetConversation;


