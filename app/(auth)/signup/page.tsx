"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/signUpStore";
import { BASE_URL } from "@/utils/constants";

const formSchema = z
  .object({
    userType: z.enum(["candidate", "recruiter", "mentor", "admin"]),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobile: z.string().min(10, {
      message: "Please enter a valid mobile number.",
    }),
    gender: z.string(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addUser, setCurrentUser } = useUserStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "candidate",
      username: "",
      email: "",
      mobile: "",
      gender: "male",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Create user object for store
      const userData = {
        _id: data.user.id, // MongoDB _id
        ...data.user,
        token: data.token,
      };

      // Update store
      addUser(userData);
      setCurrentUser(userData);

      // Store token and user ID in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user.id); // Store the ID separately if needed

      toast.success("Account created successfully!", {
        description: `Welcome ${values.username} (${values.userType})`,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error("Signup failed", {
        description: error.message,
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
          <img src="/hacklogo.png" alt="Logo" className="w-32" />
        </div>

        <div className="flex h-3/4 lg:w-2/3 w-full bg-white border rounded-lg overflow-hidden">
          {/* Left div - visible only on lg screens and up (1024px+) */}
          <div className="hidden text-center lg:block w-1/3 bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8 flex-col justify-center">
            <div className="flex justify-center p-2 rounded-xl drop-shadow-2xl ring-2 ring-green-700 bg-gradient-to-r from-green-50 to-green-200">
              <img src="/hacklogo.png" alt="Logo" className="w-32" />
            </div>
            <img src="/learn.webp" alt="Logo" className="p-4" />
            <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
            <p className="text-green-100">
              Join our community and unlock amazing opportunities.
            </p>
          </div>

          {/* Right div - takes full width on smaller screens, 2/3 on larger */}
          <div className="w-full lg:w-2/3 lg:p-8 p-4 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <div className="">
                <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Already have an account?{" "}
                  <a href="/signin" className="text-green-600 hover:underline">
                    Log in
                  </a>
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* User Type Selector */}
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a</FormLabel>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={
                              field.value === "candidate"
                                ? "default"
                                : "outline"
                            }
                            className={`flex-1 ${
                              field.value === "candidate"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => field.onChange("candidate")}
                          >
                            Candidate
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "recruiter"
                                ? "default"
                                : "outline"
                            }
                            className={`flex-1 ${
                              field.value === "recruiter"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => field.onChange("recruiter")}
                          >
                            Recruiter
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "mentor"
                                ? "default"
                                : "outline"
                            }
                            className={`flex-1 ${
                              field.value === "mentor"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => field.onChange("mentor")}
                          >
                            Mentor
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mobile */}
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your mobile number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {["male", "female", "other"].map((gender) => (
                            <Button
                              key={gender}
                              type="button"
                              variant={
                                field.value === gender ? "default" : "outline"
                              }
                              className={`rounded-full px-4 h-9 ${
                                field.value === gender
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                              onClick={() => field.onChange(gender)}
                            >
                              {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </Button>
                          ))}
                        </div>
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
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

export default SignUp;
