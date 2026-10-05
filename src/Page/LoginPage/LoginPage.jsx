import { Link, Navigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import style from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HelpWidget from "../../Components/Help/Help";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Store/authSlice";
import AlertError from "../../Components/AlertError/AlertError";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { testEmail } from "../../Validators/regex";
import { IoAlertSharp } from "react-icons/io5";
import Loader from "../../Components/Loader/Loader";

function LoginPage() {
  const dispatch = useDispatch();
  const { loading, session } = useSelector((state) => state.auth);

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState({
    alert: false,
    email: false,
    password: false,
    validEmail: false,
    invalidCredentials: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim().length && password.trim().length) {
      if (testEmail(email)) {
        try {
          await dispatch(
            loginUser({
              email,
              password,
            }),
          ).unwrap();
        } catch {
          setHasError((prev) => ({ ...prev, invalidCredentials: true }));
        }
        setHasError((prev) => ({ ...prev, validEmail: false }));
      } else {
        setHasError((prev) => ({ ...prev, validEmail: true }));
      }
    } else {
      setHasError((prev) => ({
        ...prev,
        alert: true,
        email: true,
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
        invalidCredentials: false,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasError]);

  if (session) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <div className={style["loader"]}>
            <Loader />
          </div>
        )}
      </AnimatePresence>
      <div className={style["login-wrapper"]}>
        <div className={style["login-page"]}>
          <div className={style["login-box__wrapper"]}>
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
            <div className={style["login-box__top"]}>
              <h2>{t("login.title")}</h2>
              <p>{t("login.text")}</p>
            </div>
            <div className={style["login-form__wrapper"]}>
              <form action="" onSubmit={handleLogin}>
                <div className={style["login-form__email-wrapper"]}>
                  <Input
                    type={"text"}
                    id={"inputEmail"}
                    label={t("login.lableEmail")}
                    placeholder={"esteban_schiller@gmail.com"}
                    className={classNames(
                      style["login-form__email-input"],
                      hasError.email && !email ? style["error"] : "",
                    )}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {hasError.validEmail && (
                    <p>
                      <IoAlertSharp />
                      {t("login.error")}
                    </p>
                  )}
                </div>
                <div className={style["login-form__pass-wrapper"]}>
                  <div className={style["login-form__pass-labels"]}>
                    <span>{t("login.lablePass")}</span>
                    <span className={style["login-form__pass-forget"]}>
                      {t("login.textForgetPass")}
                    </span>
                  </div>
                  <Input
                    type={"password"}
                    id={"inputPassword"}
                    className={classNames(
                      style["login-form__pass-input"],
                      hasError.password && !password ? style["error"] : "",
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={style["login-form__pass-remember"]}>
                    <Input type={"checkbox"} />
                    <span>{t("login.textRememberPass")}</span>
                  </div>
                </div>
                <button type="submit" className={style["login-form__btn"]}>
                  {t("login.textsignIn")}
                </button>
                <p className={style["login-form__signup-text"]}>
                  {t("login.textNotHaveAcc")}
                  <Link to="/sign-up">{t("login.textCreateAcc")}</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
