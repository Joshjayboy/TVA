import React from "react";
import Head2 from "../Components/Head2";
import Layout from "./../Layout/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head2 title="" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to our World
              </h3>
              <div className="mt-3 text-sm leading-8 text-dry">
                <p>
                  We connect students seeking internships with companies looking
                  for interns. Our experienced team helps students find the
                  right fit and supports them throughout the process. Companies
                  benefit from our diverse pool of talented and motivated
                  students. Join us to invest in your future.
                </p>

                <p></p>
                <p></p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-text rounded-lg">
                  <span className="text-3xl block font-extrabold text-primary">
                    10K
                  </span>
                  <h4 className="text-lg font-semibold my-2">Listed Talents</h4>
                  <p className="mb-0 text-dry leading-7 text-sm">
                    gets accepted via this site
                  </p>
                </div>
                <div className="p-8 bg-text rounded-lg">
                  <span className="text-3xl block font-extrabold text-primary">
                    8K
                  </span>
                  <h4 className="text-lg font-semibold my-2">
                    Lovely Companies
                  </h4>
                  <p className="mb-0 text-dry leading-7 text-sm">
                    Use the site to hire talents
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://img.freepik.com/free-vector/mobile-apps-concept-illustration_114360-680.jpg?w=2000"
                alt="aboutus"
                className="w-full xl:block hidden h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
