import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/user-sessions", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            })
          })
          if(!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
          const userData = await response.json()
          setShouldRedirect(true)
        }
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/games";
  }

  return (
    <div className="sign-in-form-color">
      <div className="sign-in-form " onSubmit={onSubmit}>
        <h3 className="sign-in-header text-center">Sign In</h3>
        <form>
          <div>
            <label>
              Email
              <input 
                className="form-field-input form-input" 
                type="text" name="email" 
                value={userPayload.email} 
                onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                className="form-field-input form-input"
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <input type="submit" className="form-button" value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;