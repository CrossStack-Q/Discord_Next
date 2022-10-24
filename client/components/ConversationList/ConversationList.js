import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import friends from '../../assets/icons/friends.svg'
import nitro from '../../assets/icons/nitro.svg'
import DmCard from './DmCard'
import styles from './ConversationList.module.css'
import avatar1 from "../../assets/avatar-1.webp"
import avatar2 from "../../assets/avatar-2.png"
import avatar3 from "../../assets/avatar-3.webp"
import avatar4 from "../../assets/avatar-4.webp"
import { useRouter } from 'next/router'

const dummydms = [
  {
    Id: 1,
    Name: 'Ram',
    avatar: avatar1,
  },
  {
    Id: 2,
    Name: 'Nistha',
    avatar: avatar2,
  },
  {
    Id: 3,
    Name: 'Anurag',
    avatar: avatar3,
  },
  {
    Id: 4,
    Name: 'Subh',
    avatar: avatar4,
  },
]




function ConversationList() {

  const [dms, setDms] = useState([]);
  const getdmsO = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getdms`,
      )

      const data = await response.json()
      setDms(data)
      
      // {data.map((data,index)=>(
      //   router.push(`?name=${data[index].name}`)
      // ))

      // }


      // router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
    } catch (error) {
      console.error(error)
    }
    return () => {
      console.log("This will be logged on unmount");
    }
  };

  useEffect(()=>{
    getdmsO();
  })

  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type='search' placeholder='Find or start a conversation' />
      </div>
      <div className={styles.conversationsContainer}>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={friends}
              className={styles.svg}
              alt='friends'
            />
          </div>
          <p>Fiends</p>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={nitro}
              className={styles.svg}
              alt='nitro'
            />
          </div>
          <p>Nitro</p>
        </div>
        <div className={styles.dmTitle}>DIRECT MESSAGES</div>
        {dms.map((dm, index) => (
          <DmCard
            key={index}
            name={dm.name}
            id={dm.id}
            avatar={
              dm.avatar ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU'
            }
            status='online'
          />
        ))}
      </div>
    </div>
  )
}

export default ConversationList