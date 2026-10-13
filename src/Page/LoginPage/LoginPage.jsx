import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import classNames from "classnames";
import { IoAlertSharp } from "react-icons/io5";
import style from "./LoginPage.module.css";
import Input from "../../Components/Input/Input";
import HelpWidget from "../../Components/Help/Help";
import AlertError from "../../Components/AlertError/AlertError";
import Loader from "../../Components/Loader/Loader";
import { loginUser } from "../../Redux/Store/authSlice";
import { testEmail } from "../../Validators/regex";

const adminAccount = {
  email: "lekebaw235@deertees.com",
  password: "09876mM%",
};

const helpFaq = [
  {
    q: "خیلی مهم!",
    a: "برای ورود به داشبورد باید با اکانت ادمین لاگین کنید و لازم نیست چیزی رو بنویسید.",
  },
];

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

  const loginWithAdminAccount = () => {
    dispatch(loginUser(adminAccount));
  };

  if (session) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <HelpWidget FAQ={helpFaq} />
      <AnimatePresence>
        {loading && (
          <div className="loader-wrapper">
            <Loader />
          </div>
        )}
      </AnimatePresence>
      <div className={style["login-wrapper"]}>
        <AnimatePresence>
          {hasError.alert && (
            <AlertError
              duration={4000}
              className="alertLogin"
              type="login"
              setHasError={setHasError}
              keyError="alert"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {hasError.invalidCredentials && (
            <AlertError
              duration={4000}
              className="alertLogin"
              type="invalidCredentials"
              setHasError={setHasError}
              keyError="invalidCredentials"
            />
          )}
        </AnimatePresence>
        <div className={style["login-page"]}>
          <div className={style["login-box__wrapper"]}>
            <div className={style["login-box__top"]}>
              <h2>{t("login.title")}</h2>
              <p>{t("login.text")}</p>
            </div>
            <div className={style["login-form__wrapper"]}>
              <form onSubmit={handleLogin}>
                <div className={style["login-form__email-wrapper"]}>
                  <Input
                    type="text"
                    id="inputEmail"
                    label={t("login.lableEmail")}
                    placeholder="esteban_schiller@gmail.com"
                    inputMode="email"
                    autoComplete="email"
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
                    type="password"
                    id="inputPassword"
                    autoComplete="current-password"
                    className={classNames(
                      style["login-form__pass-input"],
                      hasError.password && !password ? style["error"] : "",
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={style["login-form__pass-remember"]}>
                    <Input type="checkbox" />
                    <span>{t("login.textRememberPass")}</span>
                  </div>
                </div>
                <div className={style["login-form__btn-wrapper"]}>
                  <button type="submit" className={style["login-form__btn"]}>
                    {t("login.textsignIn")}
                  </button>
                  <button
                    type="button"
                    className={style["login-form__admin-btn"]}
                    onClick={loginWithAdminAccount}
                  >
                    {t("login.btnLoginAdmin")}
                  </button>
                </div>
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
