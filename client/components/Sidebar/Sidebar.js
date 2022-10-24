import React from 'react'
import { useEffect,useState } from 'react';
import { router }from "next"
import styles from "./Sidebar.module.css" 
import RoomAvatar from '../RoomAvatar/RoomAvatar';


import avatar1 from "../../assets/avatar-1.webp"
import avatar2 from "../../assets/avatar-2.png"
import avatar3 from "../../assets/avatar-3.webp"
import avatar4 from "../../assets/avatar-4.webp"
import { useRouter } from 'next/router';








function Sidebar() {
  const router = useRouter()
  const [channels,setChannels]= useState([])


  // const getresponse = async ()=>{
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getchannels`)
  //     console.log(response);
  //     const data = await response.json()
  //     console.log(data)
  //     setChannels(data)
  //     router.push(`?channels=${data[0].roomId}&name=${data[0].roomName}`)
  // }

  // useEffect(() => {
  //   getresponse();
  // }, [])


  const getchannelsO = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
      )

      const data = await response.json()
      setChannels(data)
      
      {data.map((data,index)=>(
        router.push(`?channel=${data[index].roomId}&name=${data[index].roomName}`)
      ))

      }
      // router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
    } catch (error) {
      console.error(error)
    }
    return () => {
      console.log("This will be logged on unmount");
    }
  };

  useEffect(()=>{
    getchannelsO();
  })


  // useEffect(async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
  //     )

  //     const data = await response.json()
  //     setChannels(data)

  //     router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   return () => {
  //     console.log("This will be logged on unmount");
  //   }
  // }, [])
  
  


  return (
    <div className={styles.wrapper}>
      {channels.map((channel,index)=>(
        <RoomAvatar
        key={index}
        id={channel.roomId}
        avatar={channel.avatar}
        name={channel.roomName}
        />
      ))

      }
    </div>
  )
}

export default Sidebar