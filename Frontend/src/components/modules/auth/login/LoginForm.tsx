"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

import logo from "@/assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";
import Image from "next/image";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setIsLoading } = useUser();
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const {
    formState: { isSubmitting },
    setValue,
  } = form;
  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  const autofillCredentials = async (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    setReCaptchaStatus(true);
    await form.handleSubmit(onSubmit);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      if (!reCaptchaStatus) {
        toast.error("Please complete the reCAPTCHA.");
        return;
      }
     
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex h-screen bg-black"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1505705694340-019e1e335916?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md m-auto bg-[#6cbbedda] bg-opacity-95 rounded-lg shadow-xl p-8">

        <div className="flex justify-center mb-4">
        <Link href="/" className="flex items-center  group">
          <div
          >
            <Image src={logo} height={150} width={70} alt="logo" />
          </div>

          <h1 className="text-2xl font-extrabold text-black ">
            Krinck Store
          </h1>
        </Link>
        </div>
        <div className="flex justify-between mb-4">
          <Button
            onClick={() => autofillCredentials("customer@gmail.com", "tanim121")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            User Credentials
          </Button>
          <Button
            onClick={() => autofillCredentials("admin@gmail.com", "tanim121")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Provider Credentials
          </Button>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Email Field */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="w-full border-gray-300 rounded-md p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="w-full border-gray-300 rounded-md p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        

            {/* Login Button */}
            <Button
              disabled={!reCaptchaStatus}
              onClick={form.handleSubmit(onSubmit)}
              className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3"
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </Button>

            {/* Signup Link */}
            <p className="text-sm text-gray-600 text-center my-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </p>
          </motion.form>
        </Form>
      </div>
    </div>
  );
}
