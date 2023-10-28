import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "",
      icon: FiMail,
      contact: "launch@gmail.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "",
      icon: FiPhoneCall,
      contact: "+234 81 031 418 91",
    },

    {
      id: 3,
      title: "Location",
      info: "",
      icon: FiMapPin,
      contact: "Awolowo Avenew Ikeja, Lagos",
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border-border flex-colo p-10 bg-text rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-white text-primary text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-dry leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.info}
                </a>
                <br />
                {item.contact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
