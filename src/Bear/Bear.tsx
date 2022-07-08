import React from 'react';
import { BearType } from '../mockData';

export interface BearProps extends BearType {
  pickThisBear: (id: number) => void
}

export const Bear = ({id, tagNumber, name, beforeImgSrc, afterImgSrc, pickThisBear }: BearProps) => {
  const [showAfterPic, setShowAfterPic] = React.useState(true);
  return (
    <div className="bear">
      <button className="profile-pic" onClick={() => setShowAfterPic(!showAfterPic)}>
          <img src={showAfterPic ? afterImgSrc : beforeImgSrc} />
      </button>
      <button className="bear-name" onClick={()=> pickThisBear(id)}>
        {tagNumber} {name}
      </button>
    </div>
  );
}