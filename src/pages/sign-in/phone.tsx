import React, { useState, useCallback, ReactElement } from "react";
import {
  requestPhoneCode,
  authenticateWithPhoneCode,
  registerWithPhoneCode,
} from "../../authentication";
import styled from "styled-components";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Content from "../../components/Content";
import Verification from "./verification";
import LoginButton from "../../components/LoginButton";
import { MessagesIcon } from "../../assets/icons";
import MaskedInput from "react-text-mask";
import { useTranslation } from "react-i18next";
import ProgressFlow from "../../components/ProgressFlow";
const Article = styled.article`
  padding: 0 1rem;
  box-sizing: border-box;
  padding: 270px 2rem 250px;
  margin: 0 auto;
  @media (min-width: 960px) {
    padding: 370px 2rem 250px;
  }
`;
const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectCountry = styled.select`
  appearance: none;
  background: transparent;
  text-align: center;
  position: relative;
  color: #fff;
  cursor: pointer;
  border-radius: 25px;
  min-width: min-content;
  background: rgba(255, 255, 255, 0.15);
  font-size: 1.3rem;
  caret-color: var(--blue);
  border: none;
  padding: 0.25rem 2rem 0.25rem 1rem;
  width: min-content;
  &:focus {
    outline: none;
  }
  &::after {
    display: block;
    content: "32";
    background: #fff;
  }
  option {
    cursor: pointer;
    color: #000;
  }

  @media (min-width: 370px) {
    font-size: 1.6rem;
  }
`;

const SelectCountryWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  &::after {
    content: "";
    right: 1rem;
    pointer-events: none;
    top: 50%;
    transform: translateY(-25%);
    position: absolute;
    border: solid 6px transparent;
    border-top: solid 6px #fff;
  }
`;

const InputMask = styled(MaskedInput)`
  appearance: none;
  background: transparent;
  width: 100%;
  color: #fff;
  font-size: 1.8rem;
  caret-color: var(--blue);
  border: none;
  &::placeholder {
    opacity: 0.25;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 50000s ease-in-out 0s,
      color 5000s ease-in-out 0s;
  }
  &:focus {
    outline: none;
  }
  text-align: left;
  margin-left: 1rem;
  @media (max-width: 370px) {
    font-size: 1.6rem;
  }
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

const Label = styled.label`
  display: flex;
  justify-content: center;
`;

const Heading = styled.p`
  color: var(--altP);
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const countries: Array<Country> = [
  {
    lang: "da",
    prefix: "+45",
    placeholder: "60 87 32 12",
    mask: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/],
    size: 8,
    maskLength: 8,
  },
  {
    lang: "se",
    prefix: "+46",
    placeholder: "54-527 67 66",
    mask: [/\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/],
    size: 10,
    maskLength: 9,
  },
  {
    lang: "no",
    prefix: "+47",
    placeholder: "542 22 766",
    mask: [/\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/],
    maskLength: 8,
    size: 8,
  },
  {
    lang: "nl",
    prefix: "+31",
    placeholder: "542 2232766",
    mask: [/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    maskLength: 10,
    size: 10,
  },
];

const regexMaskRemoval = /[\s -]/g;

type Errors = {
  error: boolean;
};
type ProgressFlow = boolean;
type Prefix = string;
type Lang = string;
type PhoneNumber = string;
type Redirect = string;
type PhoneNumberLength = number;
type Label = string;
type Placeholder = string;
type Size = number;
interface Country {
  lang: Lang;
  prefix: Prefix;
  placeholder: Placeholder;
  mask: any;
  size: Size;
  maskLength: PhoneNumberLength;
}

export interface Phone {
  phoneNumber: PhoneNumber;
}

const windowExist: boolean = typeof window !== "undefined";

const EnterPhone: React.FC = (): ReactElement => {
  const { t, i18n } = useTranslation("sign-in");
  const [data, setData] = useState<Phone>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect: Redirect = windowExist && window.history?.state?.redirect;
  const progressFlow: ProgressFlow =
    windowExist && window.history?.state?.progressFlow;
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>("");
  const [country, setCountry] = useState<Country>(
    countries.find(e => e.lang === i18n.language)
  );
  const errors: Errors = phoneNumber.replace(regexMaskRemoval, "").length <
    country.maskLength && { error: true };

  const onSubmit = useCallback(
    async (e): Promise<void> => {
      e.preventDefault();
      try {
        setLoading(true);
        const formatNumber: Phone = {
          phoneNumber: (country.prefix + phoneNumber).replace(/[\s -]/g, ""),
        };
        setData(formatNumber);
        const res = await requestPhoneCode(formatNumber);
        if (!res.requestPhoneCode) throw "Code not send";
        else setData(formatNumber);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [country, phoneNumber]
  );

  return (
    <>
      <SEO title={t("phone.seoTitle")} />
      <Layout headerProps={{ altHeader: true }}>
        <Content>
          {progressFlow && <ProgressFlow step={1} />}
          {!data ? (
            <Article>
              <Heading>{t("phone.title")}</Heading>
              <Form onSubmit={onSubmit}>
                <Label>
                  <SelectCountryWrapper>
                    <SelectCountry
                      disabled={loading}
                      onChange={e => {
                        const countryObj = countries.find(
                          x => x.lang === e.target.value
                        );
                        setCountry(countryObj);
                      }}
                      value={country.lang}
                    >
                      {countries.map(country => (
                        <option value={country.lang} key={country.lang}>
                          {country.prefix}
                        </option>
                      ))}
                    </SelectCountry>
                  </SelectCountryWrapper>
                  <InputMask
                    size={country.size}
                    guide={false}
                    placeholder={country.placeholder}
                    mask={country.mask}
                    disabled={loading}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </Label>
                <LoginButton disabled={loading} errors={errors}>
                  {t("phone.button")}
                </LoginButton>
              </Form>
            </Article>
          ) : (
            <Verification
              method="phone"
              redirect={redirect}
              data={data}
              register={registerWithPhoneCode}
              authenticate={authenticateWithPhoneCode}
            >
              <ChildrenContainer>
                <MessagesIcon width="73.6px" height="60.8px" />
                <span>{"(" + country.prefix + ") " + phoneNumber}</span>
                <p>{t("phone.verificationReminder")}</p>
              </ChildrenContainer>
            </Verification>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default EnterPhone;
