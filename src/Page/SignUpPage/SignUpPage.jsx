import { Link, useNavigate } from "react-router-dom";
import style from "./SignUpPage.module.css";
import Input from "../../Components/Input/Input";
// import HelpWidget from "../../Components/Help/Help";
import { useTranslation } from "react-i18next";
import { SupabaseClient } from "@supabase/supabase-js/dist/index.cjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../Redux/Store/authSlice";
import AlertError from "../../Components/AlertError/AlertError";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { testEmail, testPassword } from "../../Validators/regex";
import Loader from "../../Components/Loader/Loader";
import { IoAlertSharp } from "react-icons/io5";
import RulePassword from "../../Components/RulePassword/RulePassword";

function SignUpPage() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState({
    alert: false,
    email: false,
    username: false,
    password: false,
    validEmail: false,
    validPassword: false,
    limitEmail: false,
    limitUsernmae: false,
    successSignUp: false,
  });

  const createUserHandler = async (e) => {
    e.preventDefault();

    if (
      email.trim().length &&
      username.trim().length &&
      password.trim().length
    ) {
      if (testEmail(email)) {
        if (testPassword(password)) {
          try {
            await dispatch(
              signUpUser({
                email,
                password,
                username,
              }),
            ).unwrap();
            setHasError((prev) => ({ ...prev, successSignUp: true }));
          } catch (error) {
            // if (error === 'email rate limit exceeded') {
            //   setHasError(prev => ({...prev, limitEmail: true}))
            // }
            console.log(error);
          }
          setHasError((prev) => ({ ...prev, validEmail: false }));
          setHasError((prev) => ({ ...prev, validEmail: false }));
        } else {
          setHasError((prev) => ({ ...prev, validPassword: true }));
        }
      } else {
        setHasError((prev) => ({ ...prev, validEmail: true }));
      }
    } else {
      setHasError((prev) => ({
        ...prev,
        alert: true,
        email: true,
        username: true,
        password: true,
      }));
    }
  };

  useEffect(() => {
    const hasActiveError = Object.values(hasError).some(Boolean);

    if (!hasActiveError) {
      return;
    }

    const timer = setTimeout(() => {
      setHasError({
        alert: false,
        email: false,
        password: false,
        validEmail: false,
        validPassword: false,
        invalidCredentials: false,
        successSignUp: false,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasError]);

  return (
    <>
      {/* <HelpWidget
        FAQ={[
          {
            q: "چرا نمیشه اکانت ساخت؟",
            a: "دوست عزیز در این پروژه فعلا بک اند در دسترس نیست",
          },
        ]}
      /> */}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <div className={style["signup-wrapper"]}>
        <div className={style["signup-page"]}>
          <div className={style["signup-box__wrapper"]}>
            <AnimatePresence>
              {hasError.alert && (
                <AlertError
                  type={`login`}
                  setHasError={setHasError}
                  keyError="alert"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {hasError.invalidCredentials && (
                <AlertError
                  type={`invalidCredentials`}
                  setHasError={setHasError}
                  keyError="invalidCredentials"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {hasError.successSignUp && (
                <AlertError
                  type={`successSignUp`}
                  setHasError={setHasError}
                  keyError="successSignUp"
                />
              )}
            </AnimatePresence>
            <div className={style["signup-box__top"]}>
              <h2>{t("signup.title")}</h2>
              <p>{t("signup.text")}</p>
            </div>
            <div className={style["signup-form__wrapper"]}>
              <form action="" onSubmit={(e) => createUserHandler(e)}>
                <div className={style["signup-form__email-wrapper"]}>
                  <Input
                    type={"text"}
                    id={"inputEmail"}
                    label={t("signup.lableEmail")}
                    placeholder={"esteban_schiller@gmail.com"}
                    className={classNames(
                      style["signup-form__email-input"],
                      hasError.email && !email ? style["error"] : "",
                    )}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {hasError.validEmail && (
                    <p>
                      <IoAlertSharp />
                      {t("signup.errorEmail")}
                    </p>
                  )}
                </div>
                <div className={style["signup-form__username-wrapper"]}>
                  <Input
                    type={"text"}
                    id={"Username"}
                    label={t("signup.lableUsername")}
                    placeholder={t("signup.placeHolderInputUsername")}
                    className={classNames(
                      style["signup-form__username-input"],
                      hasError.username && !username ? style["error"] : "",
                    )}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={style["signup-form__pass-wrapper"]}>
                  <Input
                    type="password"
                    id="inputPassword"
                    label={t("signup.lablePass")}
                    className={classNames(
                      style["signup-form__pass-input"],
                      hasError.password && !password ? style["error"] : "",
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <ul className={style["signup-form__pass-rules"]}>
                    <RulePassword value={password} />
                  </ul>
                  {hasError.validPassword && (
                    <p>
                      <IoAlertSharp />
                      {t("signup.errorPassword")}
                    </p>
                  )}
                </div>
                <div className={style["signup-form__pass-remember"]}>
                  <Input type={"checkbox"} />
                  <span>{t("signup.textTermsConditions")}</span>
                </div>
                <button type="submit" className={style["signup-form__btn"]}>
                  {t("signup.textsignUp")}
                </button>
                <p className={style["signup-form__signup-text"]}>
                  {t("signup.textHaveAcc")}
                  <Link to="/login">{t("signup.textLoginAcc")}</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
