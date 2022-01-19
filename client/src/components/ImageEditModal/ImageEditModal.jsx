import { useState } from "react";
import MyModalWindow from "../MyModal/MyModalWindow";
import DEFAULT_OPTIONS from "../../utils/filtersOtions";
import styles from "./ImageEditModal.module.css";
import { useEffect } from "react";
import MySlider from "../Slider/Slider";
import Filters from "../Filters/Filters";
import User from "../Sidebar/User";
import Canvas from "../Canvas/Canvas";

function ImageEditModal({ isModalOpen, setIsModalOpen, user }) {
  const [caption, setCaption] = useState("");
  const [isShowSliders, setIsShowSliders] = useState(false);
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [imageSrc, setImageSrc] = useState("");

  function handleSliderChange(e) {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.name !== e.target.name) return option;
        return { ...option, value: e.target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  }

  function reset(name) {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.name !== name) return option;
        return { ...option, value: option.resetValue };
      });
    });
  }

  useEffect(() => {
    if (!isModalOpen) {
      setStep(0);
      setImageSrc("");
    }
  }, [isModalOpen]);

  return (
    <MyModalWindow show={isModalOpen} setShow={setIsModalOpen}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <span
            className={styles.navigateButton}
            onClick={() => {
              setStep((prev) => prev - 1);
              if (step === 0) {
                setIsModalOpen(false);
                setStep(0);
              }
            }}
          >
            Back
          </span>

          <span
            className={styles.navigateButton}
            onClick={() => {
              if (imageSrc) {
                setStep((prev) => prev + 1);
              }
            }}
          >
            {step < 2 ? "Next" : "Post"}
          </span>
        </div>
        <div className={styles.modalPhoto}>
          <div className={styles.imageHandler}>
            {step === 0 ? (
              <div className={styles.centerContainer}>
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  color="#262626"
                  fill="#262626"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
                <label className={styles.labelButton} htmlFor="file">
                  Choose photo
                </label>
              </div>
            ) : (
              <div>
                <img
                  className={styles.imagePreviev}
                  src={imageSrc}
                  alt="editedImage"
                  style={getImageStyle()}
                />
              </div>
            )}
            <div>
              <input
                id="file"
                name="image"
                className={styles.fileInput}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="Load picture"
                onInput={(e) => {
                  const file = URL.createObjectURL(e.target.files[0]);
                  //   setIsShowFilters(true);
                  setImageSrc(file);
                  setStep((prev) => prev + 1);
                }}
              />
            </div>
          </div>
          <div className={styles.editPhotoContainer}>
            {step === 1 ? (
              <div className={styles.allFilters}>
                <div className={styles.filtersNavigation}>
                  <div
                    className={
                      !isShowSliders
                        ? `${styles.filtersOption} ${styles.filtersOptionActive}`
                        : `${styles.filtersOption}`
                    }
                    onClick={() => setIsShowSliders(false)}
                  >
                    Filters
                  </div>
                  <div
                    className={
                      isShowSliders
                        ? `${styles.filtersOption} ${styles.filtersOptionActive}`
                        : `${styles.filtersOption}`
                    }
                    onClick={() => setIsShowSliders(true)}
                  >
                    Adjustment
                  </div>
                </div>

                {isShowSliders ? (
                  <div className={styles.slidersContainer}>
                    {options.map((option, index) => {
                      return (
                        <div className={styles.singleSlider}>
                          <span
                            className={styles.resetButton}
                            onClick={() => reset(option.name)}
                          >
                            reset
                          </span>
                          <MySlider
                            min={option.range.min}
                            max={option.range.max}
                            value={option.value}
                            handleChange={handleSliderChange}
                            key={index}
                            name={option.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Filters setOptions={setOptions} />
                )}
              </div>
            ) : null}
            {step === 2 ? (
              <div className={styles.captionContainer}>
                <User user={user.currentUser} />
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className={styles.textarea}
                  placeholder="Write a caption..."
                />
                <Canvas
                  className={styles.canvas}
                  image={imageSrc}
                  brightness={options[0].value}
                  contrast={options[1].value}
                  saturation={options[2].value}
                  grayscale={options[3].value}
                  sepia={options[4].value}
                  hue={options[5].value}
                  step={step}
                  setStep={setStep}
                  caption={caption}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MyModalWindow>
  );
}

export default ImageEditModal;
