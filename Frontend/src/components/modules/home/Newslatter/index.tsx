"use client";

import { Button } from '@/components/ui/button';
import NMContainer from '@/components/ui/core/NMContainer';
import { addSubscription } from '@/services/Subscribe';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NewsLatterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const subscribeData = { email };

      const res = await addSubscription(subscribeData);
      if (res.success) {
        toast.success(res.message);
        setEmail("");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NMContainer>
      <section
      className="relative rounded-2xl w-full min-h-[90vh] bg-cover bg-center flex items-center justify-end px-6"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1402134774/photo/professional-road-cyclist-on-a-training-ride.jpg?s=612x612&w=0&k=20&c=CB2o_DXMgH15MLa1CEqWwZVtVb3rpRgejV3UFnUwF_U=')",
          borderRadius:"2px"
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Right-aligned content */}
      <NMContainer>
        <div className="relative z-10 w-full flex justify-end">
          <div className="text-white max-w-lg space-y-6 text-right">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Get unlimited driving <br /> experience with the latest innovations
            </h2>
            <p className="text-gray-300">
              Experience true freedom with the latest design and technology in every detail of our Morgans road bikes
            </p>

            {/* Input */}
          <div className='flex '>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="px-4 py-3 w-full text-black rounded-full bg-white/90 outline-none"
            />

            {/* Button below input */}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-3 bg-white text-black font-semibold  hover:bg-gray-200 transition-all"
              >
                {loading ? "Submitting..." : "Submit"}
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
