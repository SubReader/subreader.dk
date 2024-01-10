import React, { useState, useCallback, useEffect, ReactElement } from "react";
import {
  requestEmailCode,
  registerWithEmail,
  authenticateWithEmail,
} from "../../authentication";
import styled from "styled-components";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";
import Verification from "./verification";
import LoginButton from "../../components/LoginButton";
import { Mail } from "../../assets/icons";
import FormInput from "../../components/FormInput";
import { useTranslation } from "react-i18next";
import ProgressFlow from "../../components/ProgressFlow";
const Article = styled.article`
  padding: 0 1rem;
  box-sizing: border-box;
  padding: 280px 2rem 250px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 380px 2rem 250px;
  }
`;
const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  text-align: Center;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ChildrenContainer = styled.aside`
  svg {
    margin: 0 auto;
    display: block;
  }
  p {
    color: var(--altP);
    text-align: center;
    font-weight: 700;
  }
  span {
    margin-top: 0.5rem;
    display: block;
    text-align: center;
  }
`;
type Email = string;
type Redirect = string;
export interface FormData {
  email: Email;
}
const windowExist = typeof window !== "undefined";

const EnterEmail: React.FC = (): ReactElement => {
  const { t } = useTranslation("sign-in");
  const [data, setData] = useState<FormData>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = windowExist && window.history?.state?.redirect;
  const progressFlow = windowExist && window.history?.state?.progressFlow;

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    mode: "onChange",
  });
  const onSubmit = useCallback(async (values: FormData): Promise<void> => {
    try {
      setLoading(true);
      await requestEmailCode({ ...values });
      setData(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    trigger("email");
  }, []);

  return (
    <>
      <SEO title={t("email.seoTitle")} />
      <Layout headerProps={{ altHeader: true }}>
        <Content>
          {progressFlow && <ProgressFlow step={1} />}
          {!data ? (
            <Article>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>{t("email.title")} </Label>
                <FormInput
                  disabled={loading}
                  placeholder={t("email.placeholder")}
                  name="email"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                <LoginButton errors={errors} disabled={loading}>
                  {t("email.button")}
                </LoginButton>
              </Form>
            </Article>
          ) : (
            <Verification
              method="email"
              redirect={redirect}
              data={data}
              register={registerWithEmail}
              authenticate={authenticateWithEmail}
            >
              <ChildrenContainer>
                <Mail width="73.6px" height="60.8px" />
                <span>{data.email}</span>
                <p>{t("email.verificationReminder")} </p>
              </ChildrenContainer>
            </Verification>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default EnterEmail;
