import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader,
  Send,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import config from "../../config";

export const ContactDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }

    // if (!formData.email_id.trim()) {
    //   errors.email_id = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
    //   errors.email_id = "Email is invalid";
    // }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }

    // if (!formData.message.trim()) {
    //   errors.message = "Message is required";
    // }

    return errors;
  };

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

      // Success
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });

      // Close dialog after success (optional)
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {submitStatus === "success" && (
            <div className="mb-6 bg-green-600/20 border border-green-500 text-green-400 p-4 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Thank you for your message! We'll get back to you shortly.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 bg-red-600/20 border border-red-500 text-red-400 p-4 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-300 mb-2 text-sm"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-gray-500" />
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
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-purple-500`}
                    placeholder="First Name"
                  />
                </div>
                {formErrors.first_name && (
                  <p className="mt-1 text-red-400 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-gray-300 mb-2 text-sm"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-gray-500" />
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
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-purple-500`}
                    placeholder="Last Name"
                  />
                </div>
                {formErrors.last_name && (
                  <p className="mt-1 text-red-400 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_id"
                className="block text-gray-300 mb-2 text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={16} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800 text-gray-200 border ${
                    formErrors.email_id ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-purple-500`}
                  placeholder="email@example.com"
                />
              </div>
              {/* {formErrors.email_id && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.email_id}
                </p>
              )} */}
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-gray-300 mb-2 text-sm"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone size={16} className="text-gray-500" />
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
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-purple-500`}
                  placeholder="Your phone number"
                />
              </div>
              {formErrors.phone_number && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.phone_number}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block text-gray-300 mb-2 text-sm"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={16} className="text-gray-500" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full bg-gray-800 text-gray-200 border ${
                    formErrors.message ? "border-red-500" : "border-gray-700"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:border-purple-500`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              {/* {formErrors.message && (
                <p className="mt-1 text-red-400 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.message}
                </p>
              )} */}
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 transition-all duration-300 flex items-center"
              >
                {submitting ? (
                  <Loader size={16} className="animate-spin mr-2" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Example of usage component
const ContactDialogButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openDialog}
        className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
      >
        Contact Us
      </button>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

// export  {ContactDialogButton as default };
