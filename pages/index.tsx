import Heading from "../components/heading";
import Card from "../components/card";
import CardContainer from "../components/card-container";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import getListActivity, { Activity } from "../lib/strapi/activity";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps() {
  const activities: Activity[] = await getListActivity();
  return {
    props: {
      activities,
    },
  };
}

export default function Home({
  activities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="bg-base/35 text-base pt-[80px] flex lg:h-[745px] -z-20">
        <div className="-left-28  absolute z-0">
          <img src="/static/roundgradient.png" alt={""} />
        </div>
        <div className="z-0 py-20 px-4 md:px-20 lg:w-3/6 lg:px-28 lg:py-28 text-center lg:text-left object-left font-poppins">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4 lg:mb-4">
            {t("homepage:title")}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 lg:mb-8">
            {t("homepage:subtitle")}
          </h2>
          <p className="lg:text-lg mb-8 text-grey lg:text-justify">
            {t("homepage:description")}
          </p>
        </div>
        <div className="lg:w-3/6 object-bottom hidden lg:flex pr-20">
          <img className="" src="/static/imghome.svg" alt="" />
        </div>
      </div>

      <div className={"px-4 lg:flex lg:px-28 my-14"}>
        <div className={"lg:w-1/2 flex place-content-center"}>
          <img className={""} src={"/static/profil.png"} alt={"Profile"} />
        </div>

        <div
          className={
            "lg:w-1/2 font-poppins px-8 mt-8 lg:mt-0 flex items-center"
          }
        >
          <div className={"place-content-center"}>
            <Heading
              title={t("homepage:profile")}
              subtitle={""}
              desc={t("homepage:profiledesc")}
            />
          </div>
        </div>
      </div>

      <div
        className={"bg-base lg:w-4/5 rounded-tr-[200px] lg:px-28 mt-14 py-8"}
      >
        <CardContainer title={t("navbar:tri_dharma")} href="/tri-dharma">
          {activities.map((post, key) => (
            <Card
              key={key}
              width={"1/4"}
              href={`/tri-dharma/${post.id}`}
              title={post.title}
              description={post.description}
              image={post.image}
            />
          ))}
        </CardContainer>
      </div>
      <div className={"w-full flex justify-end"}>
        <div
          className={
            "bg-ylw/65 lg:w-4/5 right-0 rounded-tl-[200px] lg:px-28 mt-14 py-8"
          }
        >
          <CardContainer title={"Dokumentasi Kegiatan"} href="#">
            {activities.map((post, key) => (
              <Card
                key={key}
                width={"1/4"}
                href={"#"}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            ))}
          </CardContainer>
        </div>
      </div>

      <div className={"my-14"}>
        <h1
          className={
            "font-poppins font-semibold text-3xl md:text-4xl text-base text-center"
          }
        >
          {t("navbar:services")}
        </h1>

        <div className="xl:flex  font-poppins w-full items-center justify-center ">
          <div className="flex justify-center">
            <a
              className="lg:mr-12 mt-14 w-max md:flex btn btn-ghost md:h-24 md:text-lg"
              href={"/layanan/presensi"}
            >
              <div className="flex h-10 w-10 md:h-20 md:w-20 mr-3 items-center justify-center object-cover">
                <img className="" src="/static/presensi.png" />
              </div>
              <span className={"normal-case"}>
                {t("services:attendance:title")}
              </span>
            </a>
          </div>

          <div className="flex justify-center">
            <a
              className="lg:mr-12 mt-14 md:flex btn btn-ghost md:h-24 md:text-lg"
              href={"/"}
            >
              <div className="flex h-10 w-10 md:h-20 md:w-20 mr-3 items-center justify-center object-cover">
                <img className="" src="/static/pklskripsi.png" />
              </div>
              <span className={"normal-case"}>
                {t("services:registerpklskripsi:item:title")}
              </span>
            </a>
          </div>

          <div className="flex justify-center">
            <a
              className=" mt-14 md:flex btn btn-ghost md:h-24 md:text-lg"
              href={"/"}
            >
              <div className="flex h-10 w-10 md:h-20 md:w-20 mr-3 items-center justify-center object-cover">
                <img className="" src="/static/peminjaman.png" />
              </div>
              <span className={"normal-case"}>
                {t("services:borrow:item:title")}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={"my-28 md:px-7 lg:px-14"}>
        <div className="mb-14 flex items-center justify-center ">
          <h1
            className={
              "font-poppins font-semibold text-3xl md:text-4xl text-base"
            }
          >
            {t("homepage:partners")}
          </h1>
        </div>
        <div className="flex items-center justify-center w-full ">
          <a
            href={"https://www.eba-consortium.asia/"}
            className={"mx-3 lg:mx-5"}
          >
            <img src={"/static/partnership/eba.png"} />
          </a>
          <a href={"https://www.arena-pac.net/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/arenapac.png"} />
          </a>
          <a href={"https://www.telkom.co.id/sites"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/telkom.png"} />
          </a>
          <a
            href={"https://erasmus-plus.ec.europa.eu/"}
            className={"mx-3 lg:mx-5"}
          >
            <img src={"/static/partnership/erasmus-logo.png"} />
          </a>
        </div>
        <div className="flex items-center justify-center w-full">
          <a href={"https://idren.id/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/idren.png"} />
          </a>
          <a href={"https://www.redhat.com/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/redhat.png"} />
          </a>
          <a
            href={"https://www.soi.asia/ai3-project/"}
            className={"mx-3 lg:mx-5"}
          >
            <img src={"/static/partnership/oip.png"} />
          </a>
          <a
            href={"https://indosatooredoo.com/portal/id/indexpersonal"}
            className={"mx-3 lg:mx-5"}
          >
            <img src={"/static/partnership/indosat.png"} />
          </a>
        </div>
        <div className="flex items-center justify-center w-full">
          <a href={"https://www.keio.ac.jp/en/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/keio.png"} />
          </a>
          <a href={"https://www.minova.id/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/mitra-inovasi.png"} />
          </a>
          <a href={"https://kedaireka.id/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/kedaireka.png"} />
          </a>
        </div>
        <div className="flex items-center justify-center w-full">
          <a href={"https://www.soi.asia/"} className={"mx-3 lg:mx-5"}>
            <img src={"/static/partnership/soi.png"} />
          </a>
          <a
            href={"https://aws.amazon.com/id/training/awsacademy/"}
            className={"mx-3 lg:mx-5"}
          >
            <img src={"/static/partnership/aws.png"} />
          </a>
        </div>
      </div>
    </>
  );
}
