import React from 'react';
import { BearType } from '../types';
import { a11yLabels } from '../a11yLabels';
import { useUserContext } from '../contexts/userContext';
import { useXarrow } from 'react-xarrows';

export interface BearProps {
  bear?: BearType
  pickThisBear: (id?: number) => void
  nodeId: string,
  offsetTop?: number,
  offsetBottom?: number,
}

export const Bear = ({ bear, pickThisBear, nodeId, offsetTop, offsetBottom }: BearProps) => {
  const [showAfterPic, setShowAfterPic] = React.useState(true);
  const [imgStyle, setImgStyle] = React.useState("missing-image");
  const { canEditBracket } = useUserContext();

  const inputRef = React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {
    setImgStyle((showAfterPic && bear?.afterImgSrc) || bear?.beforeImgSrc ? "bear-image" : "missing-image");
  }, [showAfterPic, bear]);
  const afterImage = bear?.afterImgSrc ? require(`../images/${bear?.afterImgSrc}`) : require('../images/confusedBear.png');
  const beforeImage = bear?.beforeImgSrc ? require(`../images/${bear?.beforeImgSrc}`) : require('../images/confusedBear.png');

  // Re-renders arrows after Bear image loads
  useXarrow()
  
  return (
    <div className="bear column center" style={{ marginTop: offsetTop, marginBottom: offsetBottom }}>
      <input id={nodeId} ref={inputRef} type="image" 
        onClick={() => setShowAfterPic(!showAfterPic)} 
        className={`${imgStyle} shadowed`}
        src={showAfterPic ? afterImage : beforeImage} 
        alt={a11yLabels.beforeAfterButton(showAfterPic, bear?.tagNumber, bear?.name)}/>
      { bear && (canEditBracket ? (
          <button aria-label={a11yLabels.pickBear(bear.tagNumber, bear?.name)} className="btn btn-secondary btn-sm shadowed" onClick={()=> pickThisBear(bear.id)}>
            {bear.tagNumber} {bear.name}
          </button>
        ) : (
          <div>
            {bear?.tagNumber} {bear?.name}
          </div>
        )) 
      }
    </div>
  );
}