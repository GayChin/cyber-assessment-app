export function resetOverlayStyle(){

  let leftStyle = 'top: 0; left: 0; height:100%; width:100%';
  let topStyle = 'top: 0; left: 0; height:0%; width:0%';
  let rightStyle = 'top: 0; left: 0; height:0%; width:0%';
  let bottomStyle = 'top: 0; left: 0; height:0%; width:0%';

  document.getElementById("left-overlay").style.cssText = leftStyle;
  document.getElementById("right-overlay").style.cssText = rightStyle;
  document.getElementById("top-overlay").style.cssText = topStyle;
  document.getElementById("bottom-overlay").style.cssText = bottomStyle;
}   