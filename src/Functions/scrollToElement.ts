import { scroller } from "react-scroll";

const scrollToElement = (elementName: string) => {
  scroller.scrollTo(elementName, {
    duration: 200,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};

export default scrollToElement;