"use client";

import { useState } from "react";
import Image from "next/image";
import NMContainer from "@/components/ui/core/NMContainer";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Krinck?",
      answer:
        "Krinck is a premium online cycle store where you can explore, compare, and buy bicycles from top brands—all from the comfort of your home.",
    },
    {
      question: "How do I place an order for a bicycle?",
      answer:
        "Simply browse our catalog, select your desired bicycle, choose specifications (if any), and proceed to checkout. We’ll handle the rest, from processing to delivery.",
    },
    {
      question: "Do you deliver bikes across the country?",
      answer:
        "Yes! Krinck offers nationwide delivery across most regions. Shipping times may vary depending on your location, but we aim to deliver quickly and safely.",
    },
    {
      question: "Can I track my bicycle order?",
      answer:
        "Absolutely. After your order is shipped, you’ll receive a tracking number via email or SMS to monitor your delivery in real time.",
    },
    {
      question: "Do you offer discounts or promotional deals?",
      answer:
        "Yes, we regularly run special offers, seasonal discounts, and first-time buyer promotions. Be sure to subscribe to our newsletter to stay updated!",
    },
    {
      question: "What if I need to return or exchange my cycle?",
      answer:
        "We have a hassle-free return and exchange policy. If your cycle arrives damaged or isn’t the right fit, contact our support within 7 days of delivery.",
    },
  ];

  return (
    <NMContainer>
      <div className="py-20 bg-white text-center relative overflow-hidden">
        <h2 className="text-[7rem] font-extrabold text-gray-100 absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-0">
          FAQ
        </h2>

        {/* Main Title */}
        <div className="relative z-10 lg:pb-14">
          <h3 className="text-4xl font-bold text-gray-900">Frequently Ask Questions</h3>
          <div className="w-10 h-1 bg-red-500 mx-auto mt-2 mb-12" />
        </div>

        <div className="flex mx-5 flex-col-reverse lg:flex-row items-center lg:space-x-8 relative z-10">
          {/* Left side: FAQs */}
          <div className="flex-1 w-full">
            <ul>
              {faqData.map((item, index) => (
                <li key={index} className="mb-6">
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="cursor-pointer flex items-center justify-between p-5 bg-blue-100 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                    <svg
                      className={`transition-transform duration-300 transform ${activeIndex === index ? "rotate-180" : ""
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {activeIndex === index && (
                    <div className="mt-4 p-5 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out">
                      <p className="text-sm text-red-700">{item.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side: Image */}
          <div className="w-full max-w-sm lg:max-w-md mb-8 lg:mb-0">
            <Image
              src="https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-interrogation-point-and-answers-helpful-information-q-a-whoooa-solid-1-pack-people-illustrations-3779152.png?f=webp"
              alt="FAQ Illustration"
              width={600}
              height={700}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </NMContainer>
  );
};

export default FAQSection;
