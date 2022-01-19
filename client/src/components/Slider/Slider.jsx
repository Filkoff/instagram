import { Slider } from "@mui/material";
import styles from "./Slider.module.scss";

function MySlider({ min, max, value, handleChange, name }) {
  return (
    <div className={styles.sliderContainer}>
      <label>
        <div>{name}:</div>
        <div>
          <Slider
            type="range"
            className="slider"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            name={name}
            valueLabelDisplay="auto"
          />
        </div>
      </label>
    </div>
  );
}

export default MySlider;
