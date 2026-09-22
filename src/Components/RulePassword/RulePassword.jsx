import { useTranslation } from "react-i18next";
import { passwordRegex } from "../../Validators/regex";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import style from "./RulePassword.module.css";
import classNames from "classnames";

function RulePassword({ value }) {
  const { t } = useTranslation();

  return (
    <>
      {passwordRegex.map((rule, index) => {
        const isValid = rule.regex.test(value);

        return (
          <li
            key={index}
            className={classNames(
              style["signup-form__pass-rule"],
              isValid
                ? style["rule-valid"]
                : style["rule-notValid"],
            )}
          >
            {isValid ? <IoIosCheckmark /> : <IoIosClose />}

            {t(`${rule.text}`)}
          </li>
        );
      })}
    </>
  );
}

export default RulePassword;
