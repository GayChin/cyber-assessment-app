import React from "react";
import {Container} from "react-bootstrap";
import SingleActivityBanner from "../../components/SingleActivityBanner/SingleActivityBanner";
import Footer from "../../components/Footer/Footer";
import styles from "../SingleActivity.module.scss";

const DummySingleActivityPage = () => {
  const dummyActivities = {
    simulation_id: 1,
    status: "Start",
    modules: [
      {
        module_id: 1,
        module_name: "Module 1",
        module_url: "module-1",
        description: "",
      },
    ],
    banner_img_base64:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCADhAOEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+iiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK958C/s6fEDxkLO/8AsR8M6NeruN3rXLlRnppHX5iCBwMnjIIIAB4NRX6M+Hv2Rfh9p+Tr17rHia6xnl/7Dsif7pXSVVePQvnPRRXq9j8DfhJagsvgDQ2A6/bBfaj+mqPJke+KAPyPor9c5vgh8JbtcnwB4aBHe0sVsz36CMqP1yPwrzzW/wBlT4a3wL6KuseGbnGc6fetfWg7AeVqolBIPpID6rQB+Z9FfTXjX9lbx94Z3XvhYWnjCzQAk2qNYa6M9ANPP7lz3Ijkbb3wRXzXNBe2V79hvrL7Fe2H/LlfDr/hnrweAPpQBDRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVseG/Dms+JtZs9E0SyF5rN9kmzJAAAwSSTgYHuR/eOADWbZ2N7e3tlY2Nl9tvb+++xWFlZcG+1DP9SB1x2r9Vvgp8IbL4Z+HDHe/6b4n1Bf8Aie3+NyA5UnTtMJQMmkoeYk3fNk5AI+UA5r4S/s8eGfAH2TXdcW18R+MhGrJqDRMbHRtyqwGkIQGVlOVbWWVZ2OMBCMn6ZoooAKKKKACiiigArx74l/B/wd8TLPGoWi2esIuLHxLYLjUbI7QQ/wB5V1JWGfkk3E4X51wd3sNFAH41fEH4d+JvhnrI0TW7IkH/AI8NasQVsNb08HBUqcMCCCGUgFWBUgHNcJX7J+P/AAFo3xB8N3Wga0mFKbrG/AzdWF6AVW+jYYUOPlJGMbck4yAv5LeL/CuteC/E974V1zH22xHUci/0/p/aQOMEdMHpQBytFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfaP7J3w6W+vbz4h6gAw0UNoehg9DfEf8AE21Eg5BySq4yM7iR0wPv+vO/hp4U/wCEK8E+HPDKAB9P02zF4cg7tQK51IH2MhwAc559ePRKACiiigAooooAKKKKACiiigAr5N/aj+HI8SeGV8aaegXWPCi77wA/8fuhMzNLHx3Vm3DHXLjgJX1lWdf2tpfWV3aXoV7W7tntbtScZR1KsCcHBIc4JU4IHBzigD8QKK6Hxfon/CMeJ/E3hUEEaFrl7ZgqQQR2xxjBGD/nNc9QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdn8ONK/tn4g+DLIn/AI//ABVov/gu/tE5zz1BGeOMcZrjK9Y+B3/JXfh9/wBhwf8Apu1egD9eKKKKACiiigAooooAKKKKACiiigAooooA/Lv9qfSvsfxbvb8/8x7RNGvPfjTzpH/uLPA7/UY+c6+qP2v/APkp+jf9iPY/+pDq9fK9ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV1Xw+1QaN408Ga2RuFj4q0W9IPfTjqPP59D169OmeVooA/dCivM/hN4qXxn8P/DGtnBvDZrZ369MajpR/szUT15/eIxGTjcwHbn0ygAooooAKKKKACiiigAooooAKKKyNUvrTRbC91i9by7OwtLq7u2xk7UCu3B9lZfTpnuaAPzJ/ab1Qaz8WtaAGBoNjo2i8c8nTzq59O+pnPXHPpXz5Wx4k1y88T61rWt33F5r19fXo9ANV7ADoBz27d6x6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+tv2VviWNE1m98E377bDxVfNf6GxbaljroHNg2QwB8Qj51Py7XUfMoYmv0ar8NYZ/wDPHX+ue3Y44x3/AE1+AfxlsviFo6aHrd2jeMdOst18DwdYslU7dTQAEYIJBGRgcgnJFAH0rRRRQAUUUUAFFFFABRRRQAV8Z/tW/EdNJ0Nfh9pzA32vq114gKlf9A8PrIQY2KgZbXWV4gOdvz5+cmvdvip8UdG+GXhr+277/S72+b7HoekDAfUb85IjBGCFAxk5B4AUZLMv5Oa7res+JdZvNb1u8W71m9vheXwAwFUABQAMAADgdsDH0AMiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACr2m397ot7ZX9je3tle2A+22F7Y/8uPb/ADx079DVGvcPhx8BPGfxAIvGszovhlsAa1ras323KsQdL0pQf7VU7G+c7UDfKG3EAgH078I/2ntI8TR2uhfEFrTQ9dINmmuZW10DWXwwyofA0piSPllfYSAN6AV9gI4ce/8An9R/9cV8++Cv2cfhp4NW2e7sf+En1iNTi+10C73nk7ksGZolUYOdyuM9SK+gkQIPf/P6n/6woAfRRRQAUUUUAFfOfxQ/aF8HeAEu7Gyu7PxJ4mVVA0ezu0WzszgfNq2pISsYx0U/NyVZV2jP0ZXiXjT4D/DXxqty93oqaPq7qca1oqvY6ix2hsu6jZqAXncHjc5IXIYcgH5jeMPGOteNNavtd8VXv229/PT7Gw/6B2kDkdex/HriuVr6J+I37NPjHwaLu90TPjHR2BIurSzH9o2YwCf7V0lSVkChgS0bMACM4OQPnagAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACr+m2N7rV7Z2NjZXt7e35+xWFlYc6hfdf88/8A1qNN0q91q+stD0Oy+23l/fCxsLKx9ucHP06cY7iv0++C/wAEtG+GNiL+9H27xlf2QF/f/Ky2SsDusNKJGFjXuckk+iklgDz74RfsyaP4XW11z4hx2uua4jG607RWVrrTdFYLkEuQx1bVgeHm2kcHYshIr7EoooAKKKKACiiigAooooAKKKKACvmD4v8A7O/hn4gC713RPsnhzxmYyz36xMLDWdoZiNXQAsWPCrraqZlPBDE19P0UAfiP4j8O6z4a1m80TWrMWesWQBWzveVYMMghuhBBBDZwR0Oax6/W/wCKXwp0L4m6ObC8H2LWrEl9E1pQPttg+5gV+UZOlsSNyHJ4OCDw/wCWPirwrrXgvWr3wtrll9ivbHBHU/b/APqI6R2+nr+VAHPUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUV9T/sv/AAt/4SbWh431yy/4k3hO/wD+Jf0xfa+OpOD08NcKCM5Zl+hAPoD9nn4NDwTo48U67aBfGOu2I3qAd2h6edm3T+eP7VGW81xgAjZuGHWvqmiigAooooAKKKKACiiigAooooAKKKKACiiigArw341/Caz+JnhwJZFLPxLoqltCvlwuxl+Y2J5wEccAjBDcchvl9yooA/DW8sb2yvb2xvrL7Fe2F99iv7K+5+w6hn+hPbPeoa+4f2qvhbj/AIuhodmDtBs/FdoNu0gMU0zX+pJaFsI+AMBkJJYsB8PUAFFFFABRRRQAUUUUAFFFFABRRRQBf0fSr3WtastDsf8ATL3Xr6ysrDrj0/Dp1Hvx0r9jfBPhWw8FeHNH8MWHlm20+xSNm4D3l9/zEb45+b55W3Y44fHZSfhz9kfwOb3xPrXji9x9j0Kx+wWHtqGrDqAeuNE5I4J/tcdcYr9F6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAxtX0yw1mwu9F1G0S7sNRsrmzvbUkAPZyDYVxkfeyNoBHJzyFr8eviB4PvfAHjLWfC18CBY3oawu2GGvdOIzpWoMM8MO4POa/Z6viT9rzwQ17YaN43sumns2h66RgD+zdUJOkjjH3NaOw5wSdUJ5zkgHwVRRRQAUUUUAFFFFABRRRQAUUV0Pg/Qx4n8T+GNDOAde1yysuw/5iP8AL8O/YUAfqL8BvCo8G/DDwzp7ALd39ous35Y/evtUCu+OMqPL+wIQecgnpXtVMRAg9/8AP6n/AOsKfQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXF+PvC48Y+DvE/hhggGuaJqFkrEgYuyitp7EnACiVVLk9ABz69pRQB+Gk0H2I4/wCX3oRz2/yD/XuIq9W+OGiHwz8WfGdiSPsV/ff21YgcqDqmNWIz32tqRHqDn1rymgAooooAKKKKACiiigAr3v8AZk0r+2vi3oueP7Bsda1rnHU6eNJHbv8A2p/kV4JX1x+x3p+7xn4nvR/zD/C62gHTnU9UD/z0r+p6UAfoxRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB+dP7YulfY/GfhfXBjGoaELMdP+YXqOf5aoPz/P5Fr7z/bIslGjeAroZ+TUNbtT6/vrDTJcevTTf8O1fBlABRRRQAUUUUAFFFFABX2r+xr/AMhn4g/9emh/+jNVoooA++6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPkH9sP/kSvDP/AGNSf+mzVK/O2iigAooooAKKKKAP/9k=",
    name: "Phishing",
    type: "simulation",
    url: "phishing",
    description:
      "Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers. It occurs when an attacker, masquerading as a trusted entity, dupes a victim into opening an email, instant message, or text message.",
    duration_length: 30,
    learning_outcomes: [
      "Point A : Don't share sensitive information hastily",
      "Point B : Attachments can be dangerous",
    ],
  };
  return (
    <>
      <div id="single-activity-banner">
        <SingleActivityBanner
          activity={dummyActivities}
          descId={"single-activity-banner-desc"}
          buttonId={"single-activity-banner-button"}
        />
      </div>
      <Container className={styles["bootstrap-container"]}>
        <div className={styles["single-activity-container"]}>
          <div
            className={styles["learning-outcomes-container"]}
            id="learning-outcomes"
          >
            <div>
              <strong>Learning Outcomes</strong>
            </div>
            <br />
            <ul className="ml-5">
              {dummyActivities.learning_outcomes?.map((point, index) => (
                <li key={index}> {point} </li>
              ))}
            </ul>
          </div>
          <br />
          <hr className={styles["single-activity-hr"]} />
          <br />
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default DummySingleActivityPage;
