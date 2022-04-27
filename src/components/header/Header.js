import React from 'react'
import "./header.css"
import SliderEvent from '../slider-event/SliderEvent';

const colors = ["#0088FE", "#00C49F", "#FFBB28"];

//Slider delay speed
const delay = 2000;
export default function Header({events}) {

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === events.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {events.map((e, index) => (
          <div
            className="slide"
            key={index}
            
          ><SliderEvent key={index} event={e}/></div>
        ))}
        
      </div>

      <div className="slideshowDots">
        {events.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );



}
