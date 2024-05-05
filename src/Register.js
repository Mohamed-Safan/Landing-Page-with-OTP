import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { FaGraduationCap } from "react-icons/fa";



const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phError, setPhError] = useState("");

  function validateEmail(email) {
    if (!email) {
      setEmailError("Required field");
      return false;
    }
    setEmailError("");
    return true;
  }

  function validatePassword(password) {
    if (!password) {
      setPasswordError("Required field");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  }

  function validatePhoneNumber(ph) {
    if (!ph) {
      setPhError("Required field");
      return false;
    }
    setPhError("");
    return true;
  }

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate('/home'); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function onRegister() {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhValid = validatePhoneNumber(ph);

    if (isEmailValid && isPasswordValid && isPhValid) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          onSignup();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setLoading(false);
        });
    }
  }

  return (
    <section className="bg-green-800 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Zaasi<br />E-Learner
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
  <FaGraduationCap size={30} />
</div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-black w-fit mx-auto p-4 rounded-full">
  <FaGraduationCap size={30} />
</div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Fill this form to Register
                </label>
                <PhoneInput country={"lk"} value={ph} onChange={setPh} />
                {phError && <span className="text-red-500">{phError}</span>}
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="py-2 px-4 rounded border-none bg-gray-100"
                  />
                  {emailError && <span className="text-red-500">{emailError}</span>}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="py-2 px-4 rounded border-none bg-gray-100"
                  />
                  {passwordError && <span className="text-red-500">{passwordError}</span>}
                </div>
                <button
                  onClick={onRegister}
                  className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
