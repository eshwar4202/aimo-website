'use client';
import React, { useState, useEffect, useRef } from "react";

export default function AboutMembers() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the section is in view
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`rich-text py-6 dark:bg-black dark:text-gray-50 relative overflow-hidden ${isVisible ? 'animate-slide-up' : ''}`}
    >
      {/* Decorative SVG Background Elements */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#424A54" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,154.7C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0L192,0L96,0L0,0Z"></path>
      </svg>

      {/* Membership Details Container */}
      <div className="container mx-auto px-4 mb-8 relative z-10">
        <div className="bg-gradient-to-r from-gray-900 to-yellow-700 text-white p-8 rounded-xl shadow-2xl">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-300">
              MEMBERSHIP WITH SPECIAL DISCOUNT
            </h2>

            <div className="text-center text-xl mb-6">
              <p className="font-semibold">
                AIMO PROVIDES ONE-TIME OFFER OF MEMBERSHIP FEES
              </p>
              <p className="text-yellow-200 font-bold mt-4">
                Pay only Rs.2500/- (Rupees two thousand five hundred) now as a membership fee 
                (irrespective of the category of establishment) and get a waiver on your admission fees.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Please Note:</h3>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li>A member of the AIMO shall be entitled to elect and or stand for election for the honorary offices of the organization in accordance with election procedure.</li>
                <li>To feel proud of being a member of the national industrial body which was founded by Bharat Ratna Sir. M. Visvesvaraya.</li>
                <li>To echo your voice for formulating progressive industrial and labour policies.</li>
                <li>Members of AIMO are the brand ambassadors of the Organization.</li>
                <li>Get well recognized by other industrial bodies/chambers/ associations.</li>
                <li>Publish articles in AIMO Newsletters.</li>
                <li>To participate in unpaid programs and get fee concessions for paid programs.</li>
                <li>Members can avail of AIMO-TNSB Conference Hall with 50 seat capacity and Board Room with 15 seat capacity at a discounted rate. That too in the heart of Chennai in Nungambakkam (Please see the pictures).</li>
                <li>The membership Form can be downloaded from <a href="https://www.aimotnsb.com/assets/downloads/AIMO%20Membership%20form%202022-2023%20(2.pdf" className="text-blue-300 hover:underline">AIMO Membership Form</a></li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <h4 className="text-2xl font-bold mb-4">CONTACT DETAILS</h4>
              <div className="bg-white/10 p-4 rounded-lg">
                <p><strong>Organization:</strong> ALL INDIA MANUFACTURERS' ORGANIZATION</p>
                <p><strong>Bank Account No:</strong> 913020022655300</p>
                <p><strong>IFSC Code:</strong> UTIB0002018</p>
                <p><strong>Bank:</strong> Axis Bank, Branch: Sterling Road Chennai-600 034</p>
                <p className="mt-4">
                  <strong>After remittance, please share details to:</strong>
                  <br />
                  <a href="mailto:aimo@aimotnsb.com,kannuskill@gmail.com" className="text-blue-300 hover:underline">
                    aimo@aimotnsb.com and kannuskill@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the existing component code remains the same */}
      <div className="container mx-auto text-start relative z-10">
        {/* Existing Table Code */}
        <div className="overflow-x-auto mt-6">
          <div className="container" style={{ maxWidth: '2000px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '10px', paddingRight: '10px' }}>
            <h2 style={{ fontSize: '26px', margin: '20px 0', textAlign: 'center' }}>
              Admission Fees and Annual Membership
            </h2>
            <ul className="responsive-table" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {/* Table rows */}
              <li className="table-header" style={{ backgroundColor: '#2C3E50', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.03em', borderRadius: '3px', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div className="col col-1" style={{ flexBasis: '20%' }}>Category</div>
                <div className="col col-2" style={{ flexBasis: '30%' }}>Admission Fees (Rs.)</div>
                <div className="col col-3" style={{ flexBasis: '25%' }}>Annual Membership (Rs.)</div>
              </li>
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>Establishment with an employed capital of Rs. 10 Crores and above</div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>5000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>25,000</div>
              </li>
              {/* Rest of the table rows remain the same */}
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>Establishment with an employed capital between Rs. 5 Crores and Rs. 10 Crores</div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>5000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>10,000</div>
              </li>
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>MICRO Establishment with an employed capital between Rs. 1 Crore and Rs. 5 Crores</div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>3000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>5000</div>
              </li>
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>MICRO Establishment with an employed capital of less than Rs. 1 Crore</div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>2000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>3000</div>
              </li>
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>
                  Association of Industries / Association of trade bodies / Chambers of Commerce / Education Institutions
                </div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>5000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>5000</div>
              </li>
              <li className="table-row" style={{ backgroundColor: '#34495E', boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <div className="col col-1" data-label="Category" style={{ flexBasis: '20%', wordBreak: 'break-word' }}>F. Individual Member</div>
                <div className="col col-2" data-label="Admission Fees (Rs.)" style={{ flexBasis: '30%' }}>2000</div>
                <div className="col col-3" data-label="Annual Membership (Rs.)" style={{ flexBasis: '25%' }}>3000</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style jsx>{`
        @media all and (max-width: 767px) {
          .table-header { display: none; }
          .table-row { display: block; }
          .col {
            flex-basis: 100%;
            display: flex;
            padding: 10px 0;
          }
          .col:before {
            color: #6C7A89;
            padding-right: 10px;
            content: attr(data-label);
            flex-basis: 50%;
            text-align: right;
          }
        }

        /* Add your slide animation */
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }
      `}</style>
    </section>
  );
}

