import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 text-gray-200 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6">
          Privacy Policy & Terms of Use
        </h1>

        <p className="mb-4">
          Buy India Homes Digital Pvt Ltd ("Buy India Homes Digital" or "We") is
          a registered agent under the Real Estate Regulatory Authority
          (MAHARERA) with RERA No: A52100019166. Your privacy is our priority.
          This Privacy Policy provides an overview of the personal information
          we collect through our website, including sub-domains and microsites,
          the purposes for which we collect it, how we may share it, and the
          security measures we implement. It also outlines your rights, choices,
          and how to contact us with any privacy concerns. We encourage you to
          read this Privacy Policy before using our services or providing any
          personal information.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Interpretations and Definitions
        </h2>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>Data:</strong> Refers to personal information, including
            sensitive personal data and special category data, as defined by
            applicable Data Protection Laws, that we collect or process in
            relation to your use of our website and/or Platform.
          </li>
          <li>
            <strong>Data Protection Laws:</strong> Any laws currently in force
            relating to the processing of Data.
          </li>
          <li>
            <strong>Service Providers:</strong> Entities that provide services
            to us, with whom we may share your Data under a written agreement
            for specific purposes.
          </li>
          <li>
            <strong>Buy India Homes Digital/We:</strong> Refers to Buy India
            Homes Digital Pvt Ltd and its subsidiaries, affiliates, and
            associate companies.
          </li>
          <li>
            <strong>User or You:</strong> Refers to the natural person who
            accesses our website/pages or Platform.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Website Content Overview
        </h2>
        <p className="mb-6">
          The contents of this landing page, containing details of properties,
          property photos, costs, and availability, are provided for
          informational and illustrative purposes only. This information is
          subject to change at any time. Users are hereby advised that the
          actual properties may differ from what is shown in photos and costs on
          the website and pages, and as such, no claims shall be entertained
          based on such representations.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Types of Data Collected
        </h2>
        <h3 className="text-xl font-semibold text-white mb-2">Personal Data</h3>
        <p className="mb-6">
          While visiting this website, we may ask you to provide certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Uses of Personal Data
        </h2>
        <ul className="list-disc pl-6 mb-6">
          <li>
            To provide and maintain our Service, including monitoring usage.
          </li>
          <li>
            To contact you via email, phone, SMS, or other forms of electronic
            communication.
          </li>
          <li>
            To provide information related to property sales, special offers,
            and general information about our real estate services.
          </li>
          <li>To manage your requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Retention of Your Personal Data
        </h2>
        <p className="mb-6">
          We shall retain your Personal Data only as long as necessary for the
          purposes set out in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Disclosure of Your Personal Data
        </h2>
        <p className="mb-6">
          By using this website, you consent to the collection and use of your
          information in accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Security of Your Personal Data
        </h2>
        <p className="mb-6">
          The security of your Personal Data is important to us, but no method
          of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Children's Privacy
        </h2>
        <p className="mb-6">
          Our service does not address anyone under the age of 18. We do not
          knowingly collect personally identifiable information from anyone
          under 18.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may update our Privacy Policy from time to time and will notify you
          by posting the new policy here.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
          Contact Us
        </h2>
        <p className="mb-6">
          To review, update, or delete your personal information, please contact
          us at{" "}
          <a
            href="mailto:info@buyindiahomes.com"
            className="text-gray-300 hover:text-white"
          >
            info@buyindiahomes.com
          </a>
          .
        </p>

        <div className="text-center text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Buy India Homes Digital Pvt Ltd
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
