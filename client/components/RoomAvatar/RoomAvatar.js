import React from "react";
import styles from "./roomavatar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

function RoomAvatar({ id, avatar, name }) {
  const router = useRouter();
  const changeUrl = () => {
    router.push(`?channel=${id}&name=${name}`);
  };
  return (
    <div className={styles.wrapper} onClick={changeUrl}>
      <div className={styles.roomAvatar}>
        <Image
          src={avatar}
          className={styles.roomAvatarImage}
          height={40}
          width={40}
          alt={name}
        />
      </div>
    </div>
  );
}

export default RoomAvatar;
