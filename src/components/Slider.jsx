import React from "react";
import SliderItem from "./SliderItem";
import plus from "../images/plus.png";
function Slider(props) {
    return (
        <div className="sliderWrapper">
            <div className="slider">
                <button onClick={props.openCategoryForm} className="plusBtn">
                    <img src={plus} alt="" />
                </button>
                {props.categories.map((category) => (
                    <SliderItem
                        key={category.content}
                        done={category.done}
                        content={category.content}
                        color = {category.color}
                    />
                ))}
            </div>
        </div> 
    );
}

export default Slider;
