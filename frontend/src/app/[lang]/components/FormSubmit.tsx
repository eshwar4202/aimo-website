"use client";
import React, { useState, useEffect } from "react";
import { getStrapiURL } from "../utils/api-helpers";

// Payment Categories Interface
interface PaymentCategory {
  category: string;
  admissionFees: number;
  annualMembership: number;
}

const PAYMENT_CATEGORIES: PaymentCategory[] = [
  {
    category: "Establishment with an employed capital of Rs. 10 Crores and above",
    admissionFees: 5000,
    annualMembership: 25000
  },
  {
    category: "Establishment with an employed capital between Rs. 5 Crores and Rs. 10 Crores",
    admissionFees: 5000,
    annualMembership: 10000
  },
  {
    category: "MICRO Establishment with an employed capital between Rs. 1 Crore and Rs. 5 Crores",
    admissionFees: 3000,
    annualMembership: 5000
  },
  {
    category: "MICRO Establishment with an employed capital of less than Rs. 1 Crore",
    admissionFees: 2000,
    annualMembership: 3000
  },
  {
    category: "Association of Industries / Association of trade bodies / Chambers of Commerce / Education Institutions",
    admissionFees: 5000,
    annualMembership: 5000
  },
  {
    category: "Individual Member",
    admissionFees: 2000,
    annualMembership: 3000
  }
];

export default function MembershipForm() {
  // Form stages
  const FORM_STAGES = {
    DETAILS: 'details',
    PAYMENT: 'payment',
    CONFIRMATION: 'confirmation'
  };

  const [currentStage, setCurrentStage] = useState(FORM_STAGES.DETAILS);
  const [formData, setFormData] = useState({
    name: "",
    memberid: "",
    business: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstin: "",
    panNumber: "",
    phone: "",
    email: "",
    category: "",
    paymentType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [googlePayReady, setGooglePayReady] = useState(false);
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // Comprehensive validation for details stage
  const validateDetailsStage = () => {
    const { 
      name, memberid, business, address, city, state, pincode, 
      gstin, panNumber, phone, email, category, paymentType 
    } = formData;

    if (!name) {
      setErrorMessage("Name is required.");
      return false;
    }
    if (!memberid) {
      setErrorMessage("Member ID is required.");
      return false;
    }
    if (!business) {
      setErrorMessage("Business name is required.");
      return false;
    }
    if (!address) {
      setErrorMessage("Address is required.");
      return false;
    }
    if (!city) {
      setErrorMessage("City is required.");
      return false;
    }
    if (!state) {
      setErrorMessage("State is required.");
      return false;
    }
    if (!pincode || !pincodeRegex.test(pincode)) {
      setErrorMessage("Valid 6-digit pincode is required.");
      return false;
    }
    if (!phone || !phoneRegex.test(phone)) {
      setErrorMessage("Valid 10-digit phone number is required.");
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Valid email is required.");
      return false;
    }
    if (!category) {
      setErrorMessage("Membership category is required.");
      return false;
    }
    if (!paymentType) {
      setErrorMessage("Payment type is required.");
      return false;
    }
    // Optional validations
    if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) {
      setErrorMessage("Invalid GSTIN format.");
      return false;
    }
    if (panNumber && !panRegex.test(panNumber)) {
      setErrorMessage("Invalid PAN number format.");
      return false;
    }

    return true;
  };

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Calculate total amount when category or payment type changes
    if (name === 'category' || name === 'paymentType') {
      const selectedCategory = PAYMENT_CATEGORIES.find(cat => cat.category === formData.category);
      if (selectedCategory) {
        const amount = name === 'paymentType' 
          ? (value === 'admissionFees' 
              ? selectedCategory.admissionFees 
              : selectedCategory.annualMembership)
          : (formData.paymentType === 'admissionFees' 
              ? selectedCategory.admissionFees 
              : selectedCategory.annualMembership);
        setTotalAmount(amount);
      }
    }
  };

  // Proceed to payment stage
  const proceedToPayment = () => {
    if (validateDetailsStage()) {
      setCurrentStage(FORM_STAGES.PAYMENT);
      setErrorMessage("");
    }
  };

  // Google Pay Initialization
  useEffect(() => {
    const initializeGooglePay = async () => {
      if (window.google?.payments?.api) {
        try {
          const client = new window.google.payments.api.PaymentsClient({
            environment: 'TEST'
          });

          const isReadyToPayRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX']
              }
            }]
          };

          const response = await client.isReadyToPay(isReadyToPayRequest);
          setGooglePayReady(response.result);
        } catch (error) {
          console.error('Google Pay initialization error:', error);
          setErrorMessage('Google Pay is not available');
        }
      } else {
        // Load Google Pay script if not already loaded
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.async = true;
        script.onload = () => {
          // Retry initialization
          initializeGooglePay();
        };
        document.head.appendChild(script);
      }
    };

    if (currentStage === FORM_STAGES.PAYMENT) {
      initializeGooglePay();
    }
  }, [currentStage]);

  // Handle Google Pay Payment
  const handleGooglePayment = async () => {
    if (!window.google?.payments?.api) {
      setErrorMessage('Google Pay is not available');
      return;
    }

    const client = new window.google.payments.api.PaymentsClient({
      environment: 'TEST'
    });

    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', // Replace with your actual payment gateway
            gatewayMerchantId: 'your-merchant-id' // Replace with your merchant ID
          }
        }
      }],
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: totalAmount.toString(),
        currencyCode: 'INR'
      },
      merchantInfo: {
        merchantName: 'Your Organization Name'
      }
    };

    try {
      const paymentResponse = await client.loadPaymentData(paymentRequest);
      
      // Verify payment with your backend (simulated here)
      const verificationResponse = await verifyPayment(paymentResponse);
      
      if (verificationResponse.status === 'success') {
        setPaymentConfirmed(true);
        setCurrentStage(FORM_STAGES.CONFIRMATION);
        setSuccessMessage("Payment successful! Proceeding to final submission.");
        
        // Immediately submit the form after successful payment
        await handleFinalSubmission();
      } else {
        setErrorMessage("Payment verification failed.");
      }
    } catch (error) {
      console.error('Google Pay error:', error);
      setErrorMessage('Payment failed. Please try again.');
    }
  };

  // Simulated payment verification (replace with actual backend verification)
  const verifyPayment = async (paymentData: any) => {
    try {
      // In a real-world scenario, send to your backend for verification
      return { 
        status: 'success', 
        transactionId: 'simulated-transaction-id' 
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return { status: 'failed' };
    }
  };

  // Final form submission to Strapi
  const handleFinalSubmission = async () => {
    try {
      const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          data: {
            ...formData,
            totalAmount,
            paymentStatus: paymentConfirmed ? 'Yes' : 'No',
            paid: paymentConfirmed ? 'Yes' : 'No'
          } 
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccessMessage("Form submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        memberid: "",
        business: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        gstin: "",
        panNumber: "",
        phone: "",
        email: "",
        category: "",
        paymentType: "",
      });
      setCurrentStage(FORM_STAGES.DETAILS);
      setPaymentConfirmed(false);
      setTotalAmount(0);
    } catch (error) {
      setErrorMessage("Submission failed. Please try again.");
      console.error(error);
    }
  };

  // Render details collection stage
  const renderDetailsStage = () => (
    <div className="space-y-4">
      {/* All input fields added here */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Member ID */}
        <div className="flex flex-col">
          <label htmlFor="memberid" className="text-gray-700 font-semibold mb-1">Member ID</label>
          <input
            type="text"
            id="memberid"
            name="memberid"
            value={formData.memberid}
            onChange={handleChange}
            placeholder="Enter member ID"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Business Name */}
        <div className="flex flex-col">
          <label htmlFor="business" className="text-gray-700 font-semibold mb-1">Business Name</label>
          <input
            type="text"
            id="business"
            name="business"
            value={formData.business}
            onChange={handleChange}
            placeholder="Enter business name"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-semibold mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter business address"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 font-semibold mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label htmlFor="state" className="text-gray-700 font-semibold mb-1">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Pincode */}
        <div className="flex flex-col">
          <label htmlFor="pincode" className="text-gray-700 font-semibold mb-1">Pincode</label>
          <input
            type="text"
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter 6-digit pincode"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* GSTIN */}
        <div className="flex flex-col">
          <label htmlFor="gstin" className="text-gray-700 font-semibold mb-1">GSTIN (Optional)</label>
          <input
            type="text"
            id="gstin"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            placeholder="Enter GSTIN"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* PAN Number */}
        <div className="flex flex-col">
          <label htmlFor="panNumber" className="text-gray-700 font-semibold mb-1">PAN Number (Optional)</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="Enter PAN number"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          />
        </div>

        {/* Membership Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-700 font-semibold mb-1">Membership Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          >
            <option value="">Select Category</option>
            {PAYMENT_CATEGORIES.map((category, index) => (
              <option key={index} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Type */}
        <div className="flex flex-col">
          <label htmlFor="paymentType" className="text-gray-700 font-semibold mb-1">Payment Type</label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            required
          >
            <option value="">Select Payment Type</option>
            <option value="admissionFees">Admission Fees</option>
            <option value="annualMembership">Annual Membership</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Proceed to Payment Button */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={proceedToPayment}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  // Render payment stage
  const renderPaymentStage = () => (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
      
      {/* Payment Amount */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-semibold">Total Amount to Pay</p>
        <p className="text-3xl font-bold text-indigo-600">₹{totalAmount}</p>
        <p className="text-sm text-gray-600 mt-2">
          {formData.category} - {formData.paymentType === 'admissionFees' ? 'Admission Fees' : 'Annual Membership'}
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Google Pay Button */}
      <div className="flex flex-col items-center space-y-4">
        {googlePayReady ? (
          <button
            onClick={handleGooglePayment}
            className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <img 
              src="/google-pay-logo.svg" 
              alt="Google Pay" 
              className="h-6 mr-2" 
            />
            Pay with Google Pay
          </button>
        ) : (
          <p className="text-gray-600">Google Pay is not available</p>
        )}

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setCurrentStage(FORM_STAGES.DETAILS)}
          className="text-indigo-600 hover:underline"
        >
          Back to Details
        </button>
      </div>
    </div>
  );

  // Render confirmation stage
  const renderConfirmationStage = () => (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-green-600">Submission Successful!</h2>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Details</h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Business:</strong> {formData.business}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Payment Type:</strong> {formData.paymentType}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          <p><strong>Payment Status:</strong> {paymentConfirmed ? 'Paid' : 'Pending'}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setCurrentStage(FORM_STAGES.DETAILS);
          setFormData({
            name: "",
            memberid: "",
            business: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            gstin: "",
            panNumber: "",
            phone: "",
            email: "",
            category: "",
            paymentType: "",
          });
          setPaymentConfirmed(false);
          setTotalAmount(0);
        }}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit Another Form
      </button>
    </div>
  );

  // Main render method
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Membership Registration
      </h1>

      {currentStage === FORM_STAGES.DETAILS && renderDetailsStage()}
      {currentStage === FORM_STAGES.PAYMENT && renderPaymentStage()}
      {currentStage === FORM_STAGES.CONFIRMATION && renderConfirmationStage()}
    </div>
  );
}
