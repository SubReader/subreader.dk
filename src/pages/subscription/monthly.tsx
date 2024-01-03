import React, { useEffect, useState, useRef, ReactElement } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { getAccessToken } from "../../authentication";
import { navigate } from "gatsby";
import { DYNAMIC_QUERY } from "../../sections/home/Subscriptions";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Content from "../../components/Content";
import Subscription, {
  CREATE_REEPAY_RECURRING_SESSION,
  CREATE_REEPAY_SUBSCRIPTION,
} from "../../components/Subscription";
import { analytics } from "../../analytics";
import { useTranslation } from "react-i18next";
import { Plan, AvailablePlans } from "../../typings/plan";

let rp;

declare const Reepay: any;
type Data = {
  availablePlans: AvailablePlans;
};
const inBrowser = typeof window !== "undefined";

const MonthlySubscription: React.FC = (): ReactElement => {
  const client = useApolloClient();
  const { t } = useTranslation("subscription");
  const { data } = useQuery<Data>(DYNAMIC_QUERY);
  const reepayRef = useRef<HTMLDivElement>(null);
  const [plan, setPlan] = useState<Plan>();
  const state = inBrowser && window.history.state;
  const blockBusterFlow: Boolean = state && state.blockBusterFlow;

  if (!getAccessToken() && typeof window !== "undefined") {
    navigate("/sign-in", {
      state: {
        redirect: "/subscription/monthly",
        progressFlow: !blockBusterFlow,
        ...state,
      },
      replace: true,
    });
    return null;
  }

  useEffect(() => {
    if (data) {
      setPlan(
        data.availablePlans.find(plan => plan.billingInterval === "monthly")
      );
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        if (
          reepayRef.current &&
          reepayRef.current.innerHTML === "" &&
          typeof Reepay !== "undefined"
        ) {
          rp = await new Reepay.EmbeddedCheckout(null, {
            html_element: reepayRef.current.id,
            showReceipt: false,
          });
        }

        if (getAccessToken() && plan) {
          const { data } = await client.mutate({
            mutation: CREATE_REEPAY_RECURRING_SESSION,
            variables: {
              orderText: "SubReader plus " + plan.billingInterval,
              buttonText: t("monthly.button"),
            },
          });

          if (rp && data) {
            rp.show(data.reepayRecurringSession.id);

            //Events
            rp.addEventHandler(Reepay.Event.Accept, async function (res) {
              const { data } = await client.mutate({
                mutation: CREATE_REEPAY_SUBSCRIPTION,
                variables: {
                  reepayPlanID: plan.reepayPlanId,
                  paymentMethod: res.payment_method,
                },
              });

              analytics.track("Subscribe", {
                reason: `Subscribed to ${data.subscription.plan.billingInterval} plan`,
                subcriptionID: data.subscription?.id ?? null,
                planID: data.subscription.plan?.id ?? null,
              });

              if (blockBusterFlow) {
                navigate("/blockbuster");
              } else {
                navigate("/subscription/success", {
                  state: { ...data, ...state },
                });
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      if (reepayRef.current) reepayRef.current.innerHTML = "";
      if (rp) rp = null;
    };
  }, [plan, reepayRef]);
  return (
    <Layout headerProps={{ altHeader: true }}>
      <SEO
        title={t("monthly.seoTitle")}
        description={t("monthly.description")}
      />
      <Content>
        <Subscription
          availablePlans={data && data.availablePlans}
          reepayRef={reepayRef}
          plan={plan}
        />
      </Content>
    </Layout>
  );
};

export default React.memo(MonthlySubscription);
