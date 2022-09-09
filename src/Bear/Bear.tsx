import React from 'react';
import { BearType } from '../types';

export interface BearProps {
  bear?: BearType
  pickThisBear: (id?: number) => void
}

export const Bear = ({ bear, pickThisBear }: BearProps) => {
  const [showAfterPic, setShowAfterPic] = React.useState(true);
  const [imgStyle, setImgStyle] = React.useState("missing-image");
  React.useEffect(() => {
    setImgStyle(showAfterPic && bear?.afterImgSrc || bear?.beforeImgSrc ? "bear-image" : "missing-image");
  }, [showAfterPic, bear]);
  const afterImage = bear?.afterImgSrc ? require(`../images/${bear?.afterImgSrc}`) : require('../images/confusedBear.png');
  const beforeImage = bear?.beforeImgSrc ? require(`../images/${bear?.beforeImgSrc}`) : require('../images/confusedBear.png');

  return (
    <div className="bear">
      <button className="profile-pic" onClick={() => setShowAfterPic(!showAfterPic)}>
          <img className={imgStyle} src={showAfterPic ? afterImage :beforeImage} />
      </button>
      <button className="bear-name" onClick={()=> pickThisBear(bear?.id)}>
        {bear?.tagNumber} {bear?.name}
      </button>
    </div>
  );
}