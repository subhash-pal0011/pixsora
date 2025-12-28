import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setNotification } from "@/REDUX/getNotiCountSlice";
import socket from "@/socket";

const GetAllNotiCount = () => {
       const dispatch = useDispatch();
       const { notification } = useSelector(
              (state) => state.notificationCount
       );

       useEffect(() => {
              const getAllCount = async () => {
                     try {
                            const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/countNotification", {
                                   withCredentials: true,
                            });
                            if (res.data.success) {
                                   dispatch(setNotification(res.data.data));
                            }
                     } catch (error) {
                            console.log("error get notification count:", error);
                     }
              };
              getAllCount();
       }, [dispatch]);


       // ✅ issse  REAL-TIME COUNT UPDATE
       useEffect(() => {
              const handleNewNotification = () => {
                     dispatch(setNotification(notification + 1));
              };

              socket.on("newNotification", handleNewNotification);

              return () => {
                     socket.off("newNotification", handleNewNotification);
              };
       }, [notification, dispatch]);

       return null;
};

export default GetAllNotiCount;
