import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addPost } from "../../actions/post";
import styles from "./Canvas.module.scss";

const Canvas = ({
  image,
  brightness,
  contrast,
  saturation,
  grayscale,
  sepia,
  hue,
  step,
  caption,
  setIsModalOpen,
  setStep,
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const user = useSelector((state) => state.user);
  const userId = user.currentUser._id;
  const [pic, setPic] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = function () {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d");
      contextRef.current = context;

      context.filter = `grayscale(${grayscale}%) brightness(${brightness}%) contrast(${contrast}%)
        sepia(${sepia}%) saturate(${saturation}%) hue-rotate(${hue}deg)`;

      context.drawImage(this, 0, 0);

      let dataURL = canvas.toDataURL("image/jpeg");

      function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
          type: mime,
        });
      }
      let file = dataURLtoFile(dataURL, "new.jpeg");
      setPic(file);
    };
  }, [image, brightness, grayscale, contrast, saturation, sepia, hue]);

  return (
    <>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      {step >= 2 ? (
        <div>
          <button
            className={styles.canvasButton}
            onClick={() => {
              addPost(user.currentUser.name, caption, userId, pic);
              setIsModalOpen(() => false);
              setStep(0);
            }}
          >
            Make Post
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Canvas;
