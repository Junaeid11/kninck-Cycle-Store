"use client";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import logo from "@/assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";
import Image from "next/image";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const router = useRouter();

  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/"); 
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-gray-100"
      style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1505705694340-019e1e335916?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md m-auto bg-sky-400/70 bg-opacity-95 rounded-lg shadow-xl p-8">
      
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="motion.form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>

                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage>Password does not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button
              disabled={passwordConfirm && password !== passwordConfirm}
              type="submit"
              className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-black text-center my-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
