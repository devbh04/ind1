"use client";

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
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/signUpStore";

const formSchema = z.object({
  usernameOrEmail: z.string().min(1, {
    message: "Username or email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useUserStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Create user object with consistent _id naming
      const userData = {
        _id: data.user.id, // MongoDB _id
        userType: data.user.userType,
        username: data.user.username,
        email: data.user.email,
        mobile: data.user.mobile,
        gender: data.user.gender,
        token: data.token,
      };

      // Update store and localStorage
      setCurrentUser(userData);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.user.id); // Store ID separately for quick access

      toast.success("Logged in successfully!", {
        description: `Welcome back, ${data.user.username}!`,
      });

      router.push("/");
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "Invalid credentials",
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
            <h2 className="text-2xl font-bold mb-4">Log in to Your Account</h2>
            <p className="text-amber-100">
              Get, set, ready and unlock amazing opportunities.
            </p>
          </div>

          {/* Right div - takes full width on smaller screens, 2/3 on larger */}
          <div className="w-full lg:w-2/3 lg:p-8 p-4 overflow-y-auto">
            <div className="max-w-md mx-auto h-full flex flex-col justify-center">
              <div className="">
                <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-amber-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Username or Email */}
                  <FormField
                    control={form.control}
                    name="usernameOrEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your username or email"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <div className="flex justify-end">
                          <Link
                            href="/forgot-password"
                            className="text-sm text-amber-600 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;