import "./authPage.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../helpers/api_helper";
import FormInput from "./FormInput";
import { AppContext } from "../App";
import ToastMessage from "./toast";
 
const AuthPage = (props) => {

const {inputs, intialState, apiData, toggle, formName } = props;

  const { setUserDetails } = useContext(AppContext);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(intialState.values);
  const [isValid, setIsValid] = useState(intialState.isValid);
  const [focused, setFocused] = useState(intialState.focused);
  const [isDisabled, setIsDisabled] = useState(intialState.isDisabled);
  const [isDisplay, setIsDisplay] = useState(intialState.isDisplay);
  const [selectValue, setSelectValue] = useState("+91")
  const [submitBtnName, setSubmitBtnName] = useState(intialState.sendVerificationCodeBtnName);

  const ShowToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const changePhoneNumber = () => {
    setIsDisabled(intialState.isDisabled);
    setIsDisplay(intialState.isDisplay);
    setSubmitBtnName(intialState.sendVerificationCodeBtnName);
  };
  
  const sendVerificationCode = async () => {
    setIsLoading(true);
    const response = await post(apiData.sendVerificationCodeAPI, {
      countryCode: selectValue,
      phoneNumber: values.phoneNumber,
    });
    setIsLoading(false);
    ShowToastMessage(response?.message)
    if (response.status) {

      setIsDisabled((prevState) => ({
        ...prevState,
        phoneNumber: true,
      }));
      setIsDisplay((prevState) => ({
        ...prevState,
        name: true,
        verificationCode: true,
        resendCode: true,
      }));
      setSubmitBtnName(intialState.VerifyBtnName);
    } else {
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    const response = await post(apiData.verifyCodeAPI, {
      countryCode: selectValue,
      ...values,
    });
    setIsLoading(false);
    ShowToastMessage(response?.message)
    if (response.status) {
      const token = response.token;
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // set expiration to 7 days
      const cookieOptions = {
        expires: expires,
        //secure: true, // set cookie as secure
        //httpOnly: true, // set cookie as httpOnly
        //sameSite: 'lax' // set cookie to be sent with cross-site requests with safe HTTP methods
      };
      document.cookie = `token=${token}; ${Object.entries(cookieOptions)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")}; path=/`;
      setUserDetails({
        ...response.data,
        isLoading: false,
        isLoggedIn: true,
      });
      navigate("/");
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for (const name in data) {
      const input = inputs.find((item) => item.name === name);
      ValidateData(input?.validationRegex, name, data[name], isValid, false);
    }

    const areAllValid = Object.values(isValid).every((value) => Boolean(value));
    if (areAllValid) {
      if (submitBtnName === intialState.sendVerificationCodeBtnName) {
        sendVerificationCode();
      } else if (submitBtnName === intialState.VerifyBtnName) {
        verifyCode();
      }
    }
  };

  const handleOnChange = (e) => {
    if(e.target.name ==="countrySelect") {
      setSelectValue(e.target.value)
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      const input = inputs.find((item) => item.name === e.target.name);
      ValidateData(
        input.validationRegex,
        e.target.name,
        e.target.value,
        isValid,
        true
      );
    }
   
  };

  const handleOnBlur = (e) => {
    const input = inputs.find((item) => item.name === e.target.name);
    setFocused({ ...focused, [e.target.name]: true });
    ValidateData(
      input.validationRegex,
      e.target.name,
      e.target.value,
      isValid,
      false
    );
  };

  const ValidateData = (validationRegex, name, value, isValid, checkFocus) => {
    if (!checkFocus || focused[name]) {
      const regex = RegExp(validationRegex);
      const isValidInput = regex.test(value);
      setIsValid({ ...isValid, [name]: isValidInput });
      return { ...isValid, [name]: isValidInput };
    }
  };

  return (
    <div className="container">
      {showToast && toastMessage?.length > 0 && <ToastMessage message={toastMessage} />}
      <form onSubmit={handleSubmit}>
        <h1>{formName}</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            handleOnChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            isDisabled={isDisabled}
            isDisplay={isDisplay}
            isValid={isValid}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
          />
        ))}
        {isDisplay.resendCode && (
          <div className="button-container">
            <button
              className="retry-button"
              type="button"
              onClick={()=>{changePhoneNumber()
                setFocused((prev) => ({...prev, phoneNumber: false }));
                setValues((prev) => ({...prev, phoneNumber: "" }));}}
            >
              Change Phone
            </button>
            <button
              className="retry-button"
              type="button"
              onClick={()=>{sendVerificationCode();
                setFocused((prev) => ({...prev, verificationCode: false }));
                setValues((prev) => ({...prev, verificationCode: "" }));}}
            >
              Resend Code
            </button>
          </div>
        )}
        <button className="submit-button" type="submit">
          {isLoading ? <div className="spinner-button"></div> : submitBtnName}{" "}
        </button>
        <button className="toggle-button" onClick={()=>navigate(toggle.route)}>{toggle.text}</button>
      </form>
    </div>
  );
};

export default AuthPage;
