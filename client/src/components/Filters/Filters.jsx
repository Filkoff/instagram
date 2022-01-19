import styles from "./Filters.module.scss";

function Filters({ setOptions }) {
  return (
    <div className={styles.filtersPreview}>
      <div className={styles.filterContainer}>
        <img
          src="/images/filters/original.jpg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                return { ...option, value: option.resetValue };
              });
            });
          }}
        />
        <p>Original</p>
      </div>
      <div className={styles.filterContainer}>
        <img
          src="/images/filters/reues.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name !== "Sepia")
                  return {
                    ...option,
                    value: option.resetValue,
                  };
                return { ...option, value: 50 };
              });
            });
          }}
        />
        <p>Reues</p>
      </div>
      <div className={styles.filterContainer}>
        <img
          src="/images/filters/moon.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name === "Grayscale")
                  return { ...option, value: 100 };
                else if (option.name === "Brightness")
                  return { ...option, value: 110 };
                return { ...option, value: option.resetValue };
              });
            });
          }}
        />
        <p>Moon</p>
      </div>
      <div className={styles.filterContainer}>
        <img
          src="/images/filters/clarendon.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name !== "Brightness")
                  return {
                    ...option,
                    value: option.resetValue,
                  };
                return { ...option, value: 120 };
              });
            });
          }}
        />
        <p>Clarendon</p>
      </div>

      <div className={styles.filterContainer}>
        <img
          src="/images/filters/gingham.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name === "Brightness")
                  return { ...option, value: 110 };
                else if (option.name === "Grayscale")
                  return { ...option, value: 40 };
                else if (option.name === "Sepia")
                  return { ...option, value: 10 };
                return { ...option, value: option.resetValue };
              });
            });
          }}
        />
        <p>Gingham</p>
      </div>

      <div className={styles.filterContainer}>
        <img
          src="/images/filters/juno.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name === "Brightness")
                  return { ...option, value: 130 };
                else if (option.name === "Contrast")
                  return { ...option, value: 120 };
                else if (option.name === "Sepia")
                  return { ...option, value: 20 };
                return { ...option, value: option.resetValue };
              });
            });
          }}
        />
        <p>Juno</p>
      </div>

      <div className={styles.filterContainer}>
        <img
          src="/images/filters/aden.jpeg"
          alt="filter"
          className={styles.filterIcon}
          onClick={() => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.name === "Saturation")
                  return { ...option, value: 120 };
                else if (option.name === "Contrast")
                  return { ...option, value: 110 };
                else if (option.name === "Sepia")
                  return { ...option, value: 20 };
                else if (option.name === "Grayscale")
                  return { ...option, value: 20 };
                else if (option.name === "Hue Rotate")
                  return { ...option, value: 340 };
                return { ...option, value: option.resetValue };
              });
            });
          }}
        />
        <p>Aden</p>
      </div>
    </div>
  );
}

export default Filters;
