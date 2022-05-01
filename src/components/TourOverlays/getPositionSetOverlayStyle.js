export function getPositionSetOverlayStyle(elementId, elementId2) {
  // nav-modules
  console.log("element id is : ", elementId);
  console.log("element id 2 is : ", elementId2);

  let element = document.getElementById(elementId);
  let pos = element.getBoundingClientRect();
  let x, y, element2, pos2;
  let offset = 0;

  if (elementId2) {
    element2 = document.getElementById(elementId2);
    pos2 = element2.getBoundingClientRect();
    console.log(pos.right);
  }

  switch (elementId) {
    case "activity-banner":
    case "module-banner":
      x = `${pos2.right + 100}px`;
      y = `${pos2.top - pos2.top / 3.5}px`;
      break;
    case "modules-list":
    case "activity-list-container":
      x = `${pos.right / 2}px`;
      y = `${pos.top / 2}px`;
      break;
    case "activity-card-1":
    case "module-card-1":
      offset = 15;
      x = `${pos.right + offset * 2}px`;
      y = `${pos.top - offset}px`;
      break;
    case "learning-outcomes":
      offset = 15;
      x = `${pos.right / 1.7}px`;
      y = `${pos.top / 1.3}px`;
      break;
    case "single-activity-banner-button":
      offset = 10;
      x = `${pos.right + offset * 2}px`;
      y = `${pos.top - offset * 2.5}px`;
      break;
    case "single-activity-banner-desc":
      offset = 10;
      x = `${pos.right / 1.7}px`;
      y = `${pos.top * 1.3}px`;
      break;
    case "nav-modules":
      offset = 15;
      x = `${pos.left - offset}px`;
      y = `${pos.bottom + 25}px`;
      break;
    case "nav-db":
      offset = 15;
      x = `${pos.left - offset}px`;
      y = `${pos.bottom + 25}px`;
      break;
    case "dashboard-progress":
      offset = 15;
      x = `${pos.right - pos.width / 2.5}px`;
      y = `${pos.top - pos.height}px`;
      break;
    case "dashboard-improvement":
      offset = 15;
      x = `${pos.right - pos.width / 2.5}px`;
      y = `${pos.top - pos.height / 1.2}px`;
      break;
    case "dashboard-recommended":
      offset = 10;
      x = `${pos.right - pos.width / 1.4}px`;
      y = `${pos.top - pos.height / 2.5 - offset}px`;
      break;
    default:
      x = `${pos.left}px`;
      y = `${pos.bottom + 15}px`;
  }

  let leftStyle = `top: ${pos.top - offset}px; width: ${
    pos.left - offset
  }px; height: ${pos.height + offset * 2}px`;
  let topStyle = `height: ${pos.top - offset}px`;
  let rightStyle = `top: ${pos.top - offset}px; left: ${
    pos.right + offset
  }px; height: ${pos.height + offset * 2}px`;
  let bottomStyle = `top: ${pos.bottom + offset}px`;

  document.getElementById("left-overlay").style.cssText = leftStyle;
  document.getElementById("right-overlay").style.cssText = rightStyle;
  document.getElementById("top-overlay").style.cssText = topStyle;
  document.getElementById("bottom-overlay").style.cssText = bottomStyle;

  return [x, y];
}
