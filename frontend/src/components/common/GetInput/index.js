import styles from "./getInput.module.css";

export default function GetInput({
  label,
  htmlFor,
  type,
  name,
  id,
  placeholder,
  option = [],
  accept,
  selected,
  selectPoint,
  optgroup,
  optgroupLable,
}) {
  return (
    <>
      <div className={`${styles.form_group}`}>
        <label htmlFor={htmlFor}>{label}</label>
        {type ? (
          <>
            <input
              type={type}
              accept={(type = "file" ? accept : "")}
              className={`${styles.form_control}`}
              name={name}
              id={id}
              placeholder={placeholder}
            />
          </>
        ) : (
          <>
            <select className={`${styles.form_group}`} name={name} id={id}>
              {optgroup ? (
                <optgroup label={optgroupLable}>
                  {selectPoint ? (
                    <>
                      <option selected>{selected}</option>
                    </>
                  ) : (
                    <>
                      <option disabled>{selected}</option>
                    </>
                  )}
                  {option?.map((e) => {
                    return (
                      <>
                        <option>{e}</option>
                      </>
                    );
                  })}
                </optgroup>
              ) : selectPoint ? (
                <>
                  <option selected>{selected}</option>
                </>
              ) : (
                <>
                  <option disabled>{selected}</option>
                </>
              )}
              {option?.map((e) => {
                return (
                  <>
                    <option>{e}</option>
                  </>
                );
              })}
            </select>
          </>
        )}
      </div>
    </>
  );
}
