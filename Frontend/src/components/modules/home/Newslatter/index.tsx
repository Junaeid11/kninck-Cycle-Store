'use client';

import { Button } from '@/components/ui/button';
import NMContainer from '@/components/ui/core/NMContainer';
import { addSubscription } from '@/services/Subscribe';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NewsLatterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const subscribeData = { email };

      const res = await addSubscription(subscribeData);
      if (res.success) {
        toast.success(res.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(res.message || "Failed to subscribe.");
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <NMContainer>
      <section
        className="relative rounded-xl w-full min-h-[90vh] bg-cover bg-center flex items-center justify-end px-6"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1402134774/photo/professional-road-cyclist-on-a-training-ride.jpg?s=612x612&w=0&k=20&c=CB2o_DXMgH15MLa1CEqWwZVtVb3rpRgejV3UFnUwF_U=')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <NMContainer>
          <div className="relative z-10 w-full flex justify-end animate-fade-in-up">
            <div className="text-white max-w-lg space-y-6 text-right">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                Get Unlimited Driving <br /> Experience with Innovation
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Unlock next-level rides with cutting-edge design and precision-built performance in every detail.
              </p>

              {/* Subscription Input */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email"
                  className="px-5 py-3 w-full sm:w-auto flex-1 rounded-full text-sm bg-white/90 text-black outline-none shadow-md focus:ring-2 focus:ring-sky-400 transition"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-sky-500 text-whitte rounded-full font-semibold hover:bg-sky-800 transition-all duration-200 shadow-lg"
                >
                  {loading ? "Submitting..." : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </NMContainer>
      </section>
    </NMContainer>
  );
};

export default NewsLatterSection;
