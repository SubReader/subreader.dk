import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import SEO from "../../components/SEO";
import { useForm } from "react-hook-form";
import LoginButton from "../../components/LoginButton";
import FormInput from "../../components/FormInput";
import { trackRegistration } from "../../analytics";
import { useTranslation } from "react-i18next";
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

const EnterNavn = ({ props }) => {
  const { t } = useTranslation("sign-in");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = useCallback(async (values) => {
    const viewer = {
      name: values.name,
    };

    try {
      setLoading(true);
      const registrationResult = await props.registerService({
        ...props.formData,
        viewer,
        accessToken: props.accessToken ? props.accessToken : null,
      });
      await trackRegistration(props.method, registrationResult);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }

    if (props.redirect) {
      navigate(props.redirect, { state: { progressFlow: true } });
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    trigger("name");
  }, []);
  return (
    <>
      <SEO title={t("name.seoTitle")} />
      <Article>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>{t("name.title")}</Label>
          <FormInput
            disabled={loading}
            placeholder="John Doe"
            name="name"
            {...register("name", {
              required: "Required",
            })}
          />
          <LoginButton errors={errors} disabled={loading}>
            {t("name.button")}
          </LoginButton>
        </Form>
      </Article>
    </>
  );
};

export default EnterNavn;
