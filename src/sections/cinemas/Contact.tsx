import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  padding: 5rem 1rem 200px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  text-align: Center;
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
`;
const Input = styled.input`
  padding: 7px 15px;
  color: #b8bcbe;
  border: 1px solid #e0e1e1;
  box-sizing: Border-box;
  margin-top: 4px;
  width: 100%;
  font-size: 1.25rem;
  transition: color 0.1s;
  &:focus {
    color: #7b7b7b;
  }
`;

const disabledButton = css`
  pointer-events: none;
  opacity: 0.5;
`;
const disabledInput = css`
  opacity: 0.5;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #1ebbf0 30%, #39dfaa 100%);
  color: #fff;
  border: none;
  font-size: 1.25rem;
  margin-left: auto;
  cursor: pointer;
  box-sizing: Border-box;
  width: 100%;
  padding: 1rem;
  transition: opacity 0.1s;
  &:active {
    opacity: 0.5;
  }
  @media (min-width: 500px) {
    width: 100px;
    padding: 0.25rem;
  }
`;

const Label = styled.label`
  width: 100%;
  color: rgb(120, 125, 133);
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  min-height: 300px;
  font-family: Lato, -apple-system, Arial, Helvetica, sans-serif;
`;

const ErrorMsg = styled.span`
  color: red;
  margin: 5px 0 1rem;
  display: block;
`;
const SuccessMsg = styled.span`
  color: green;
  display: block;
  margin-bottom: 1rem;
`;
const Contact: React.FC = () => {
  const { t } = useTranslation("cinema");
  const { handleSubmit, register, formState: { errors } } = useForm<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [preventSpam, setPreventSpam] = useState<boolean>(false);
  const onSubmit = async values => {
    setLoading(true);
    const expireStr = localStorage.getItem("preventSpam");
    if (!expireStr || (expireStr && parseInt(expireStr) < Date.now())) {
      try {
        await emailjs.send(
          process.env.GATSBY_EMAIL_SERVICEID,
          "template_dt5kaxe",
          values,
          process.env.GATSBY_EMAIL_USER
        );
        localStorage.setItem(
          "preventSpam",
          JSON.stringify(Date.now() + 600000)
        );
        setEmailSend(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setPreventSpam(true);
    }

    setLoading(false);
  };
  return (
    <Section>
      <Heading>{t("contact.heading")}</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          {t("contact.name")}
          <Input
            css={loading && disabledInput}
            disabled={loading}
            name="name"
            {...register("name", {
              required: t<string>("contact.fieldRequired"),
            })}
          />
          <ErrorMsg>{errors.name && errors.name.message}</ErrorMsg>
        </Label>
        <Label>
          {t("contact.email")}
          <Input
            css={loading && disabledInput}
            disabled={loading}
            name="email"
            {...register("email", {
              required: t<string>("contact.fieldRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t<string>("contact.emailValidation"),
              },
            })}
          />
          <ErrorMsg>{errors.email && errors.email.message}</ErrorMsg>
        </Label>
        <Label>
          {t("contact.phone")}
          <Input
            css={loading && disabledInput}
            disabled={loading}
            {...register("phone", {
              required: t<string>("contact.fieldRequired"),
              minLength: {
                value: 8,
                message: t<string>("contact.phoneValidation"),
              },
            })}
          />
          <ErrorMsg>{errors.phone && errors.phone.message}</ErrorMsg>
        </Label>
        <Label>
          {t("contact.subject")}
          <Input
            css={loading && disabledInput}
            disabled={loading}
            name="subject"
            {...register("subject", {
              required: t<string>("contact.fieldRequired"),
            })}
          />
          <ErrorMsg>{errors.subject && errors.subject.message}</ErrorMsg>
        </Label>
        <Label>
          {t("contact.message")}
          <Textarea
            css={loading && disabledInput}
            disabled={loading}
            name="message"
            {...register("message", {
              required: t<string>("contact.fieldRequired"),
            })}
          />
          <ErrorMsg>{errors.message && errors.message.message}</ErrorMsg>
        </Label>
        {!preventSpam && emailSend && (
          <SuccessMsg>{t("contact.success")}</SuccessMsg>
        )}
        {preventSpam && <ErrorMsg>{t("contact.spam")}</ErrorMsg>}
        <SubmitButton css={loading && disabledButton}>
          {t("contact.buttonText")}
        </SubmitButton>
      </Form>
    </Section>
  );
};

export default Contact;
