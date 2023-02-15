import Carousel from "./index.js";
import imgData from './imgData.js'

const home: Carousel = new Carousel(
    document.querySelector('.container'),
    imgData,
)

home.start()
