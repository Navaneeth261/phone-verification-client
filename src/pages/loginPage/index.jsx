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
        phoneNumber: "",
        verificationCode: "",
      },
      isValid : {
        phoneNumber: true,
        verificationCode: true,
      },
      focused : {
        phoneNumber: false,
        verificationCode: false,
      },
      isDisabled : {
        phoneNumber: false,
        verificationCode: false,
      },
      isDisplay : {
        phoneNumber: true,
        verificationCode: false,
        resendCode: false,
      },
      sendVerificationCodeBtnName: "Send Verification Code",
      VerifyBtnName: "Verify and Login"
  }

  const apiData = {
    sendVerificationCodeAPI : "/api/auth/get-login-code",
    verifyCodeAPI : "/api/auth/login-with-code"
}

const toggle = {
    text: "Don't have an account? Register here",
    route: "/register"
}

const formName = "Login"

const LoginPage = () => {
  return (
    <div><AuthPage formName={formName} inputs={inputs} intialState={intialState} apiData={apiData} toggle={toggle} /></div>
  )
}

export default LoginPage