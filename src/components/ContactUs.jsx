import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  Loader,
  Send,
  AlertCircle,
} from "lucide-react";
import config from "../../config";

const ContactUs = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, "success", "error"
  const [errorMessage, setErrorMessage] = useState("");

  // Form state with keys matching the input names
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch contact details (address, phone, email, map, etc.)
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/contact-us?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        setContactData(data.contact_us);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Handle input changes and clear errors for the specific field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!formData.email_id.trim()) {
      errors.email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      errors.email_id = "Email is invalid";
    }
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  // Handle form submission (POSTing data to the API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${config.API_URL}/contact?website=${config.SLUG_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      // Success: clear the form and show a success message
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });

      // Clear the success message after 3 seconds (optional)
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-yellow-900/20 p-4 rounded-lg text-yellow-400">
          <p>Failed to load contact information: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8" id="contact">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          {contactData?.name || "Contact Us"}
        </h2>
        <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Contact Form */}
        <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">
            Send us a message
          </h3>

          {submitStatus === "success" && (
            <div className="mb-6 bg-purple-600/20 border border-purple-500 text-purple-400 p-4 rounded-lg">
              Thank you for your message! We'll get back to you shortly.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 bg-red-600/20 border border-red-500 text-red-400 p-4 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-300 mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 text-gray-200 border ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-lg pl-10 p-3 focus:outline-none focus:border-purple-500`}
                    placeholder="First name"
                  />
                </div>
                {formErrors.first_name && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 text-gray-200 border ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-lg pl-10 p-3 focus:outline-none focus:border-purple-500`}
                    placeholder="Last name"
                  />
                </div>
                {formErrors.last_name && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email_id" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 text-gray-200 border ${
                      formErrors.email_id ? "border-red-500" : "border-gray-700"
                    } rounded-lg pl-10 p-3 focus:outline-none focus:border-purple-500`}
                    placeholder="email@example.com"
                  />
                </div>
                {formErrors.email_id && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.email_id}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 text-gray-200 border ${
                      formErrors.phone_number
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-lg pl-10 p-3 focus:outline-none focus:border-purple-500`}
                    placeholder="Your phone number"
                  />
                </div>
                {formErrors.phone_number && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.phone_number}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={18} className="text-gray-500" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full bg-gray-800 text-gray-200 border ${
                    formErrors.message ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-10 p-3 focus:outline-none focus:border-purple-500`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              {formErrors.message && (
                <p className="mt-1 text-red-400 text-sm flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 flex items-center justify-center"
            >
              {submitting ? (
                <Loader size={20} className="animate-spin mr-2" />
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information & Map */}
        <div className="flex flex-col">
          <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-800 shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-5">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center mr-4 mt-1">
                  <MapPin size={18} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-gray-200 font-medium mb-1">Address</h4>
                  <p className="text-gray-400">Balewadi, Pune, Maharashtra</p>
                </div>
              </div>

              {contactData?.contact_phone && (
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center mr-4 mt-1">
                    <Phone size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 font-medium mb-1">Phone</h4>
                    <a
                      href={`tel:${contactData.contact_phone}`}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {contactData.contact_phone}
                    </a>
                  </div>
                </div>
              )}

              {contactData?.contact_email && (
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center mr-4 mt-1">
                    <Mail size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 font-medium mb-1">Email</h4>
                    <a
                      href={`mailto:${contactData.contact_email}`}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {contactData.contact_email ||
                        "info@ceratectower1o8balewadi.com"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-800 shadow-lg flex-1">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Location Map
            </h3>

            <div className="rounded-lg overflow-hidden border border-gray-700 h-64 w-full">
              {contactData?.contact_map ? (
                <div
                  dangerouslySetInnerHTML={{ __html: contactData.contact_map }}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                  No map available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
