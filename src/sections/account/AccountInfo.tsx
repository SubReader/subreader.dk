import React, { ReactElement, useEffect } from "react";
import { CANCEL_SUBSCRIPTION } from "../../queries";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import styled, { css } from "styled-components";
import ButtonLink from "../../components/Button/index";
import { useTranslation } from "react-i18next";
const InfoList = styled.ul`
  color: var(--p);
  padding: 0;
  text-transform: capitalize;
  list-style: none;
  font-size: 1.25rem;
  margin-top: 0;
  .active {
    color: Green;
    text-transform: initial;
  }
  .notActive {
    color: red;
    text-transform: initial;
  }
`;
const Button = styled(ButtonLink).attrs({
  as: "button",
})`
  margin-top: 1rem;
  max-width: fit-content;
  padding: 1rem;
  font-size: 0.875rem;
`;

const buttonDisabled = css`
  pointer-events: none;
  opacity: 0.5;
`;

const Heading = styled.h4`
  color: var(--primaryHeading);
  margin: 1rem 0 0.5rem;
  font-size: 1.25rem;
`;

const ACCOUNT_DETAILS = gql`
  query {
    user: viewer {
      name
      country
      subscriptions {
        id
        cancelled
        active
        trial
        plan {
          id
          billingInterval
        }
      }
    }
  }
`;
const AccountInfo = (): ReactElement => {
  const { data, refetch } = useQuery(ACCOUNT_DETAILS);
  const { t } = useTranslation("account");
  const client = useApolloClient();

  useEffect(() => {
    refetch();
  }, []);

  if (data) {
    const subExist = data.user.subscriptions.find(e => e.cancelled === false);
    const activeSub = JSON.parse(JSON.stringify(data.user.subscriptions))
      .reverse()
      .find(e => e.active === true);

    return (
      <>
        <article>
          <Heading>{t("info.personal.heading")}</Heading>
          <InfoList>
            <li>
              {t("info.personal.name")}: {data.user.name}
            </li>
            <li>
              {t("info.personal.country")}: {data.user.country}
            </li>
          </InfoList>
        </article>

        <article>
          <Heading>{t("info.subscription.heading")}</Heading>
          <InfoList>
            <li>
              {t("info.subscription.subscription")}:{" "}
              {activeSub
                ? `SubReader Plus ${activeSub.plan.billingInterval} ${
                    activeSub.trial ? "Trial" : ""
                  }`
                : t("info.subscription.free")}
            </li>
            {activeSub && (
              <li>
                {t("info.subscription.status.content")}:
                <span
                  className={
                    activeSub.active
                      ? activeSub.cancelled
                        ? "notActive"
                        : "active"
                      : "notActive"
                  }
                >
                  {" "}
                  {activeSub.active
                    ? activeSub.cancelled
                      ? t("info.subscription.status.activeButCancelled")
                      : t("info.subscription.status.active")
                    : t("info.subscription.status.cancelled")}
                </span>
              </li>
            )}
          </InfoList>
          <>
            {/* @ts-ignore */}
            <Button
              css={!subExist && buttonDisabled}
              onClick={async () => {
                try {
                  for (const sub of data.user.subscriptions) {
                    if (sub.cancelled === true) continue;
                    const res = await client.mutate({
                      mutation: CANCEL_SUBSCRIPTION,
                      variables: sub,
                    });
                    console.log(res);
                  }
                  refetch();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {subExist
                ? t("info.subscription.button.active")
                : t("info.subscription.button.disabled")}
            </Button>
          </>
        </article>
      </>
    );
  }

  return null;
};

export default AccountInfo;
