import "./formInput.css";
import SelectCountryCode from "./countries";

const FormInput = (props) => {
  const {selectValue, setSelectValue, id, label, errorMessage, isDisabled, isDisplay, handleOnChange, handleOnBlur, validationRegex, isValid, ...inputProps} = props;

  if( isDisplay[inputProps.name]) {
    return (
      <div className="formInput">
        <label>{label}</label>
        {inputProps.name ==="phoneNumber" ? <div className="phoneContainter"> 
       <SelectCountryCode selectName="countrySelect" selectValue={selectValue} handleOnChange={handleOnChange} isDisabled = {isDisabled[inputProps.name]} />
        <input style={{flex:"1"}} className={`input-element ${!isValid[inputProps.name] && "invalid-input"}`}
          {...inputProps}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          disabled = {isDisabled[inputProps.name]}
        />
        </div> : <input className={`input-element ${!isValid[inputProps.name] && "invalid-input"}`}
          {...inputProps}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          disabled = {isDisabled[inputProps.name]}
        />}
        {!isValid[inputProps.name] && <span className="form-error">{errorMessage}</span>}
      </div>
    );
  }
  
};

export default FormInput;
