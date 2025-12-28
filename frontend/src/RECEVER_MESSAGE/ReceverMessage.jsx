import React, { useEffect, useRef } from 'react'

const ReceverMessage = ({ message }) => {
       const videoRef = useRef()

       useEffect(() => {
              if (!videoRef.current) return
              const observer = new IntersectionObserver(
                     (entry) => {
                            if (!entry.isIntersecting) {
                                   videoRef.current.pause()
                            }
                     },
                     {
                            threshold: 0.5,
                     }
              )
              observer.observe(videoRef.current)

              return () => {
                     observer.disconnect();
              };
       }, [])


       const formatTime = (date) => {
              return new Date(date).toLocaleTimeString("en-IN", {
                     hour: "2-digit",
                     minute: "2-digit",
                     hour12: true,
              });
       };

       return (
              <div className="w-full flex justify-start mb-3">
                     <div className="bg-gray-800 text-white px-3 py-2 ml-5 rounded-lg rounded-bl-none rounded-tr-none max-w-md">
                            {message?.media && message?.mediaType === "image" && (
                                   <>
                                          <img src={message.media} className="mb-2 md:max-h-60 max-h-30 rounded-sm" />
                                          <p className='text-[10px] text-white/70 text-left'>
                                                 {formatTime(message.createdAt)}
                                          </p>
                                   </>
                            )}

                            {message?.media && message?.mediaType === "video" && (
                                   <>
                                          <video ref={videoRef} src={message.media} controls className="max-h-60" />
                                          <p className='text-[10px] text-white/70 text-left'>
                                                 {formatTime(message.createdAt)}
                                          </p>
                                   </>
                            )}

                            {message?.message && (
                                   <>
                                          <p className="text-sm font-semibold">{message.message}</p>
                                          <p className='text-[10px] text-white/70 text-left'>
                                                 {formatTime(message.createdAt)}
                                          </p>
                                   </>
                            )}
                     </div>
              </div>
       );
};

export default ReceverMessage;

