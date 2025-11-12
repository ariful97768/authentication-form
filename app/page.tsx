"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const submit = (e: FieldValues) => {
    console.log(e);
    createUser(e as Data);
  };

  async function createUser(data: Data) {
    try {
      const res = await toast
        .promise(
          async () => {
            return (
              await fetch("http://localhost:3000/api/signin", {
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
    <main className="flex border-2 h-screen bg-accent items-center justify-center border-red-400  mx-auto ">
      <section className="max-w-[920px] max-h-[560px] w-full grid grid-cols-2 border-2 border-green-400">
        <aside className="border-2 border-blue-400 "></aside>
        <form
          onSubmit={handleSubmit(submit)}
          className="px-10 border-2 border-yellow-400 "
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
        </form>
      </section>
    </main>
  );
}
