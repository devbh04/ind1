// pages/reset-password/[token].js
'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const { id } = useParams();
  const token = id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.success("Password reset successfully!", {
        description: "You can now sign in with your new password",
      });
      router.push("/signin");
    } catch (error: any) {
      toast.error("Password reset failed", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 h-screen w-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="h-screen p-4 lg:flex-row flex flex-col items-center justify-center">
        {/* Mobile LOGO */}
        <div className="lg:hidden flex p-6">
          <img src="/unstop-logo.svg" alt="Logo" className="w-32" />
        </div>

        <div className="flex h-3/4 lg:w-2/3 w-full bg-white border rounded-lg overflow-hidden">
          {/* Left div - visible only on lg screens and up (1024px+) */}
          <div className="hidden text-center lg:block w-1/3 bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16 px-4 sm:px-6 lg:px-8 flex-col justify-center">
            <div className="flex justify-center p-2 rounded-xl drop-shadow-2xl ring-2 ring-amber-700 bg-gradient-to-r from-amber-50 to-amber-200">
              <img src="/unstop-logo.svg" alt="Logo" className="w-32" />
            </div>
            <img src="/learn.webp" alt="Logo" className="p-4" />
            <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
            <p className="text-amber-100">
              Create a new secure password for your account.
            </p>
          </div>

          {/* Right div - takes full width on smaller screens, 2/3 on larger */}
          <div className="w-full lg:w-2/3 lg:p-8 p-4 overflow-y-auto">
            <div className="max-w-md mx-auto h-full flex flex-col justify-center">
              <div className="">
                <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Remember your password?{" "}
                  <Link
                    href="/signin"
                    className="text-amber-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 mt-4"
                >
                  {/* New Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your new password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your new password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}