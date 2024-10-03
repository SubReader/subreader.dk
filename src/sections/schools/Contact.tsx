import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
const Section = styled.section`
  padding: 0px 1rem 200px;
  box-sizing: Border-box;
  max-width: 1750px;
  margin: 0 auto;
  color: black;
`;

const Heading = styled.h2`
  text-align: Center;
  font-size: 8vw;
  margin-bottom: 2rem;
  @media (min-width: 400px) {
    font-size: 1.75rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
  & > div {
    @media (min-width: 450px) {
      display: flex;
      justify-content: space-between;
      label {
        width: 50%;
      }
      & > label:first-child input {
        border-right: none;
      }
    }
  }
`;
const Input = styled.input`
  padding: 7px 15px;
  color: #b8bcbe;
  border: 1px solid #e0e1e1;
  box-sizing: Border-box;
  width: 100%;
  font-size: 1.25rem;
  transition: color 0.1s;
  &:focus {
    color: #7b7b7b;
  }
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
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  min-height: 300px;
  font-family: Lato, -apple-system, Arial, Helvetica, sans-serif;
`;

const disabledButton = css`
  pointer-events: none;
  opacity: 0.5;
`;
const disabledInput = css`
  opacity: 0.5;
`;

const ErrorMsg = styled.span`
  color: red;
  display: block;
  margin-bottom: 1rem;
`;

const SuccessMsg = styled.span`
  color: green;
  display: block;
  margin-bottom: 1rem;
`;

const RadioGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;


const Group = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  grid-gap: 1rem;
`

const Contact: React.FC = () => {
  const { t } = useTranslation("schools");
  const { handleSubmit, register, formState: { errors } } = useForm<{
    name: string;
    school: string;
    email: string;
    phone: string;
    jobTitle: string;
    students: string;
    who: string;
    message: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [preventSpam, setPreventSpam] = useState<boolean>(false);
  const onSubmit = async values => {
    setLoading(true);
    try {
      await emailjs.send(
        process.env.GATSBY_EMAIL_SERVICEID,
        process.env.GATSBY_EMAIL_TEMPLATE_ID,
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

    setLoading(false);
  };

  return (
    <Section>
      <Heading>{t("contactSection.heading")}</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label aria-label={t("contactSection.input.name.aria-label")}>
            <Input
              css={loading && disabledInput}
              disabled={loading}
              placeholder={t("contactSection.input.name.placeholder")}
              name="name"
              {...register("name", {
                required: t<string>("contactSection.required"),
              })}
            />
            <ErrorMsg>{errors.name && errors.name.message}</ErrorMsg>
          </Label>
          <Label aria-label={t("contactSection.input.school.aria-label")}>
            <Input
              css={loading && disabledInput}
              disabled={loading}
              placeholder={t("contactSection.input.school.placeholder")}
              name="school"
              {...register("school", {
                required: t<string>("contactSection.required"),
              })}
            />
            <ErrorMsg>{errors.school && errors.school.message}</ErrorMsg>
          </Label>
        </div>
        <Label>
          <Input
            css={loading && disabledInput}
            disabled={loading}
            placeholder={"Jobtitel*"}
            name="jobTitle"
            {...register("jobTitle", {
              required: t<string>("contactSection.required"),
            })}
          />
          <ErrorMsg>{errors.jobTitle && errors.jobTitle.message}</ErrorMsg>
        </Label>

        <Label aria-label={t("contactSection.input.email.aria-label")}>
          <Input
            css={loading && disabledInput}
            disabled={loading}
            placeholder={t("contactSection.input.email.placeholder")}
            name="email"
            {...register("email", {
              required: t<string>("contactSection.required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t<string>("contactSection.input.email.invalid"),
              },
            })}
          />
          <ErrorMsg>{errors.email && errors.email.message}</ErrorMsg>
        </Label>
        <Label aria-label={t("contactSection.input.phone.aria-label")}>
          <Input
            css={loading && disabledInput}
            disabled={loading}
            placeholder={t("contactSection.input.phone.placeholder")}
            name="phone"
            type="tel"
            {...register("phone", {
              required: t<string>("contactSection.required"),
            })}
          />
          <ErrorMsg>{errors.phone && errors.phone.message}</ErrorMsg>
        </Label>
        <Label>
          <Input
            css={loading && disabledInput}
            disabled={loading}
            type="number"
            placeholder={"Antal elever"}
            name="students"
            {...register("students")}
          />
          <ErrorMsg>{errors.students && errors.students.message}</ErrorMsg>
        </Label>
        <Group>
          <p>Ønsker tilbud til:</p>
          <RadioGroup>
            <label>
              <input
                css={loading && disabledInput}
                disabled={loading}
                type="radio"
                checked
                value="Alle elever"
                name="who"
                {...register("who")}
              />
              <span>Alle elever</span>
            </label>
            <label>
              <input
                css={loading && disabledInput}
                disabled={loading}
                type="radio"
                name="who"
                value="Udvalgte elever"
                {...register("who")}
              />
              <span>Udvalgte elever</span>
            </label>
            <ErrorMsg>{errors.who && errors.who.message}</ErrorMsg>
          </RadioGroup>
        </Group>

        <Label aria-label={t("contactSection.input.message.aria-label")}>
          <Textarea
            css={loading && disabledInput}
            disabled={loading}
            placeholder={t("contactSection.input.message.placeholder")}
            name="message"
            {...register("message")}
          />
          <ErrorMsg>{errors.message && errors.message.message}</ErrorMsg>
        </Label>
        {!preventSpam && emailSend && (
          <SuccessMsg>{t("contactSection.success")}.</SuccessMsg>
        )}
        {preventSpam && <ErrorMsg>{t("contactSection.spam")}</ErrorMsg>}
        <SubmitButton css={loading && disabledButton}>
          {t("contactSection.send")}
        </SubmitButton>
      </Form>
    </Section>
  );
};

export default Contact;
