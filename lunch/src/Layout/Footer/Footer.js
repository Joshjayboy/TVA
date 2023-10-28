import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const Links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Companies",
          link: "/movies",
        },
      ],
    },

    {
      title: "Top Categories",
      links: [
        {
          name: "Internship",
          link: "#",
        },
        {
          name: "Skills",
          link: "#",
        },
        {
          name: "Networking",
          link: "#",
        },
        {
          name: "others",
          link: "#",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "My Favorites",
          link: "/favourite",
        },
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Change Password",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-black py-4 border-t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-white text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>

              <ul className="text-sm flex flex-col space-y-3 text-white">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-2/4 object-contain h-12"
              />
            </Link>

            <p className="leading-7 text-sm text-border mt-3">
              <span>
                The Launch Company <br /> Ikeja, Lagos State.
              </span>
              <br />
              <span>Tell: +234 810 314 1891</span>
              <br />
              <span> Email: info@gmail.com </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
