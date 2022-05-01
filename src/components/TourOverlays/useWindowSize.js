import React, { useLayoutEffect, useState } from 'react';

export default function useWindowSize(targetElement, initialStyle , initialX, initialY ) {
  const [style, setStyle] = useState([initialStyle,initialX,initialY]);
  
  useLayoutEffect(() => {
    function updateSize() {
      let pos = targetElement.getBoundingClientRect();
      let x = `${pos.right}px`;
      let y = `${pos.top}px`;
      let style ={


      }

      setStyle([style, x ,y]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return style;
}


// function useWindowSize() {
//   let targetElement = document.getElementById("activity-banner");
//   let pos = targetElement.getBoundingClientRect();
//   let x = `${pos.right - pos.right/3}px`;
//   let y = `${pos.top + pos.top/3.5}px`;

//     const [style, setStyle] = useState([{
//       userSelect: "none",
//       cursor: "pointer",
//       position: "absolute",
//       backgroundColor: "white",
//       width: pos.width,
//       height: pos.height,
//       top: pos.top,
//       left: pos.left,
//       zIndex: 2102,
//       fontWeight: "bold",
//     },x,y]);
    
//     useLayoutEffect(() => {
//       function updateStyle() {
//         targetElement = document.getElementById("activity-banner");
//         pos = targetElement.getBoundingClientRect();
//         x = `${pos.right - pos.right/3}px`;
//         y = `${pos.top + pos.top/3.5}px`;
//         console.log("new x :", x)
//         console.log("new y :", y)
//         setStyle([{
//           userSelect: "none",
//           cursor: "pointer",
//           position: "absolute",
//           backgroundColor: "white",
//           width: pos.width,
//           height: pos.height,
//           top: pos.top,
//           left: pos.left,
//           zIndex: 2102,
//           fontWeight: "bold",
//         },x,y]);
//         console.log("window is resize!")
//       }

//       window.addEventListener('resize', updateStyle);
//       updateStyle();
//       return () => window.removeEventListener('resize', updateStyle);
//     }, []);
//     return style;
//   }