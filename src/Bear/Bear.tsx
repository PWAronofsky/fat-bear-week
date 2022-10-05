import React from 'react';
import { BearType } from '../types';
import { a11yLabels } from '../a11yLabels';

export interface BearProps {
  bear?: BearType
  pickThisBear: (id?: number) => void
}

export const Bear = ({ bear, pickThisBear }: BearProps) => {
  const [showAfterPic, setShowAfterPic] = React.useState(true);
  const [imgStyle, setImgStyle] = React.useState("missing-image");
  React.useEffect(() => {
    setImgStyle((showAfterPic && bear?.afterImgSrc) || bear?.beforeImgSrc ? "bear-image" : "missing-image");
  }, [showAfterPic, bear]);
  const afterImage = bear?.afterImgSrc ? require(`../images/${bear?.afterImgSrc}`) : require('../images/confusedBear.png');
  const beforeImage = bear?.beforeImgSrc ? require(`../images/${bear?.beforeImgSrc}`) : require('../images/confusedBear.png');

  return (
    <div className="bear column center">
      <input type="image" 
        onClick={() => setShowAfterPic(!showAfterPic)} 
        className={`${imgStyle} shadowed`}
        src={showAfterPic ? afterImage :beforeImage} 
        alt={a11yLabels.beforeAfterButton(showAfterPic, bear?.tagNumber, bear?.name)}/>
      {/* {bear && (<button aria-label={a11yLabels.pickBear(bear?.tagNumber, bear?.name)} className="btn btn-secondary btn-sm shadowed" onClick={()=> pickThisBear(bear?.id)}>
        {bear?.tagNumber} {bear?.name}
      </button>)} */}
      <div>
        {bear?.tagNumber} {bear?.name}
      </div>
    </div>
  );
}