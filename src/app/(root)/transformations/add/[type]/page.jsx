import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "../../../../../../constants/constant";
import TransformationsForm from "@/components/shared/TransformationsForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.sction";

const page = async ({ params }) => {
  const { userId } = await auth();
  const tranformations = transformationTypes[params.type];
  const user = await getUserById(userId);

  return (
    <div>
      <Header title={tranformations.title} subtitle={tranformations.subTitle} />
      <section className="mt-8">
        {" "}
        <TransformationsForm
          action={"Add"}
          type={tranformations.type}
          creditBalance={user.creditBalance}
          userId={user._id}
        />
      </section>
    </div>
  );
};

export default page;
