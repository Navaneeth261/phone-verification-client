import AuthPage from "../../components/AuthPage";

const inputs = [
    {
      id: 1,
      name: "phoneNumber",
      placeholder: "Phone Number",
      label: "",
      type: "text",
      errorMessage: "Phone Number should contain only numbers with 8 to 15 digits based on the country.",
      required: true,
      validationRegex: "^\\d{8,15}$",
    },
    {
      id: 2,
      name: "name",
      placeholder: "Name",
      label: "",
      type: "text",
      errorMessage:
        "Name should be 3-20Characters and should not include any special characters",
      required: true,
      validationRegex: "^[A-Za-z ]{3,20}$",
    },
    {
      id: 3,
      name: "verificationCode",
      placeholder: "Verification Code",
      label: "",
      type: "password",
      errorMessage: "Verification Code should be of 6 digits",
      required: true,
      validationRegex: "^\\d{6}$",
    },
  ];


  const intialState = {
    values : {
        name: "",
        phoneNumber: "",
        verificationCode: "",
      },
      isValid : {
        name: true,
        phoneNumber: true,
        verificationCode: true,
      },
      focused : {
        name: false,
        phoneNumber: false,
        verificationCode: false,
      },
      isDisabled : {
        name: false,
        phoneNumber: false,
        verificationCode: false,
      },
      isDisplay : {
        name: false,
        phoneNumber: true,
        verificationCode: false,
        resendCode: false,
      },
      sendVerificationCodeBtnName: "Send Verification Code",
      VerifyBtnName: "Verify and Register"
  }

  const apiData = {
    sendVerificationCodeAPI : "/api/auth/get-register-code",
    verifyCodeAPI : "/api/auth/register-with-code"
}

const toggle = {
    text: "Registered already? Click here to Login",
    route: "/login"
}

const formName = "Register"

const Register = () => {
  return (
    <div><AuthPage formName={formName} inputs={inputs} intialState={intialState} apiData={apiData} toggle={toggle} /></div>
  )
}

export default Register