"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import auth from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

type Data = {
  address: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
  phone: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (e: FieldValues) => {
    try {
      const email = e.email;
      const password = e.password;
      if (!email || !password)
        throw new Error("Email or Password did not provided");

      await createUserWithEmailAndPassword(auth, email, password);
      createUser(e as Data);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something bad happened!";
      if (msg.includes("email-already-in-use"))
        return toast.message("Email already used");

      toast.error(msg);
    }
  };

  async function createUser(data: Data) {
    try {
      const res = await toast
        .promise(
          async () => {
            return (
              await fetch("https://authentication-form-nine.vercel.app/api/signin", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
            ).json();
          },
          {
            loading: "Loading...",
            success: (res) => {
              console.log(res);
              return `${res}`;
            },
            error: "Error",
          }
        )
        .unwrap();

      console.log(res);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something bad happened!";
      toast.error(msg);
    }
  }

  return (
    <main className="flex h-screen bg-accent items-center justify-center mx-auto ">
      <section className="max-w-[920px] bg-white  w-full grid grid-cols-2">
        <aside className="border-2 border-blue-400 relative">
          <Image
            src={"/auth-img.jpg"}
            fill
            className="object-cover"
            alt="Authentication Image"
          />
        </aside>
        <form
          onSubmit={handleSubmit(submit)}
          className="p-10"
        >
          <div className="w-full space-y-3">
            <div className="flex gap-2 ">
              <div className="w-full">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  className={`${
                    errors.first_name &&
                    "border-2  focus-visible:border-destructive/40"
                  } mt-2 transition-colors duration-300`}
                  {...register("first_name", { required: true })}
                  type="text"
                  id="first_name"
                  placeholder="John"
                />
              </div>
              <div className="w-full relative">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  className={`${
                    errors.last_name &&
                    "border-2  focus-visible:border-destructive/40"
                  } mt-2 transition-colors duration-300`}
                  {...register("last_name", { required: true })}
                  type="text"
                  id="last_name"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                className={`${
                  errors.phone &&
                  "border-2  focus-visible:border-destructive/40"
                } mt-2 transition-colors duration-300`}
                {...register("phone", { required: true })}
                type="tel"
                id="phone"
                placeholder="+12 34-567-890"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="address">Address</Label>
              <Input
                className={`${
                  errors.address &&
                  "border-2  focus-visible:border-destructive/40"
                } mt-2 transition-colors duration-300`}
                {...register("address", { required: true })}
                type="text"
                id="address"
                placeholder="New street, Old York"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email address</Label>
              <Input
                className={`${
                  errors.email &&
                  "border-2  focus-visible:border-destructive/40"
                } mt-2 transition-colors duration-300`}
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="name@email.com"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                className={`${
                  errors.password &&
                  "border-2  focus-visible:border-destructive/40"
                } mt-2 transition-colors duration-300`}
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className=" pl-3">
              <div className="flex gap-3 items-center">
                <h3>Gender: </h3>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="male">Male</Label>
                  <Input
                    {...register("gender", { required: true })}
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="female">Female</Label>
                  <Input
                    {...register("gender", { required: true })}
                    value={"female"}
                    type="radio"
                    name="gender"
                    id="female"
                  />
                </div>
              </div>
              {errors.gender && (
                <span className="text-sm text-red-400">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <Button className="w-full mt-5">Signup</Button>
          <Link href={"/users"}>
            <Button className="w-full mt-5">All Users</Button>
          </Link>
        </form>
      </section>
    </main>
  );
}
