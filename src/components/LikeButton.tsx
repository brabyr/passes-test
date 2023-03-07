import React, { useEffect, useState } from 'react';
import { HeartIcon } from '../icons/HeartIcon';

const backendURI = 'http://127.0.0.1:3001/api/v1';

export const LikeButton = () => {
  const likedId = '123';
  const userId = 'asdasdsdfsd';

  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
        const isLiked = await fetch(backendURI + `/like/${likedId}/user/${userId}`).then(re => re.json());
        setLiked(isLiked.data);
        const count = await fetch(backendURI + '/like/123/count').then(re => re.json());
        setLikedCount(count?.data);
    }

    fetchData();
  }, []);

  const toggleLiked = async () => {
    if (liked) {
        setLiked(false);
        await fetch(backendURI + '/like/remove', {
            method: 'POST',
            body: JSON.stringify({
                "likeId": likedId,
                "userId": userId,
            }),
        });

        setLikedCount((likedCount) => likedCount - 1);
    } else {
        setLiked(true);
        await fetch(backendURI + '/like/add', {
            method: 'POST',
            body: JSON.stringify({
                "likeId": likedId,
                "userId": userId,
            }),
        });

        setLikedCount((likedCount) => likedCount + 1);
    }
  };

  const formattedCount = (num: number) => {
    if (num > 999) {
        return String(Math.floor(num / 100) / 10) + 'k';
    }
    return num.toString();
  }

  return (
    <button onClick={toggleLiked} className="like_btn">
        <HeartIcon fill={liked ? "#F4245E" : "none"} />
        {formattedCount(likedCount)}
    </button>
  );
}

export default LikeButton;
