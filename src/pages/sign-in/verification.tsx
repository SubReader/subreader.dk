import React, {
  useState,
  useRef,
  useCallback,
  ReactElement,
  FormEvent,
} from "react";
import styled from "styled-components";
import ReactCodeInput from "react-verification-code-input";
import LoginButton from "../../components/LoginButton";
import { navigate } from "gatsby";
import EnterName from "../../sections/sign-in/EnterName";
import { trackAuthentication } from "../../analytics";
import { useTranslation } from "react-i18next";
import { FormData as EmailFormData } from "./email";
import { Phone } from "./phone";
import { AuthenticationResult } from "../../analytics";
type Email = EmailFormData;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 200px 2rem 250px;

  .verification-input {
    margin: 0 auto;
    width: max-content !important;
    input[value=""] {
      background: rgba(255, 255, 255, 0.1);
    }
    input {
      color: var(--altP);
      width: 50px !important;
      height: 50px !important;
      caret-color: #fff;
      border-radius: 6px;
      transition: background 0.2s;
      background: rgba(255, 255, 255, 0.3);
      border: none !important;
      margin: 0 5px;
    }
  }
  @media (min-width: 960px) {
    padding: 300px 2rem 250px;
  }
`;

type Redirect = string;
type Method = string;
type VerificationCode = string;
type RegisterService = Function;
type AuthenticateService = Function;
interface VerficationProps {
  data: Phone | Email;
  redirect: Redirect;
  authenticate: AuthenticateService;
  register: RegisterService;
  method: Method;
  children: ReactElement;
}

type FormData =
  | (Phone & {
      code: VerificationCode;
    })
  | (Email & {
      code: VerificationCode;
    });

interface EnterNameProps {
  registerService: RegisterService;
  method: Method;
  formData: FormData;
}

const Verification: React.FC<VerficationProps> = ({
  data,
  redirect,
  authenticate,
  register,
  method,
  children,
}): ReactElement => {
  const { t } = useTranslation("sign-in");
  const verificationInput = useRef(null);
  const [code, setCode] = useState<VerificationCode>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isValid: Boolean = code && code.length > 4;
  const [enterNameProps, setEnterNameProps] = useState<EnterNameProps>(null);
  const handleLogin = useCallback(
    async (e: FormEvent): Promise<void> => {
      try {
        setLoading(true);
        e.preventDefault();
        if (!isValid) return;
        const authenticationResult: AuthenticationResult = await authenticate({
          ...data,
          code,
        });
        await trackAuthentication(method, authenticationResult);
        if (redirect) {
          navigate(redirect, { state: { progressFlow: true } });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);

        if (
          (!enterNameProps && error.message.toLowerCase() === "wrong email") ||
          error.message.toLowerCase() === "kunne ikke logge ind."
        )
          setEnterNameProps({
            registerService: register,
            method,
            formData: { ...data, code },
          });
      } finally {
        setLoading(false);
      }
    },
    [code]
  );

  if (enterNameProps)
    return <EnterName props={{ ...enterNameProps, redirect }} />;

  return (
    <Form onSubmit={handleLogin}>
      {children}
      <label aria-label="Aktiveringskode Inputfelt">
        <ReactCodeInput
          disabled={loading}
          ref={verificationInput}
          onChange={setCode}
          className="verification-input"
          fields={5}
        />
      </label>
      <LoginButton errors={!isValid && { code }} disabled={loading}>
        {t("verification.button")}
      </LoginButton>
    </Form>
  );
};

export default Verification;
