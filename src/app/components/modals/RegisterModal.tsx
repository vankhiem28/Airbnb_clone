"use client";

import React, { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "~/app/hooks/useRegsiterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      toast.error("Error");
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!"></Heading>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      ></Input>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      ></Input>
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      ></Input>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}}></Button>
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => {}}></Button>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className=""> Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={registerModal.onClose}
          >
            {" "}
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
