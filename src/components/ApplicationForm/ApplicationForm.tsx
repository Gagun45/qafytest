"use client";

import React, { useState } from "react";
import styles from "./ApplicationForm.module.css";
import { createApplication } from "@/lib/actions";

export default function ApplicationForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [device, setDevice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(false);

  const labelClass = "flex gap-2 relative";
  const labelTitle = "w-fit absolute -top-6";

  const success =
    "Application has been successfully submitted. We will answer soon!";
  const failed =
    "Something went wrong, application has NOT been submitted, try later";

  const resetForm = () => {
    setName("");
    setContact("");
    setDevice("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    setStatus("");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createApplication(formData);
    if (res) {
      setStatus(success);
    } else {
      setStatus(failed);
    }
    resetForm();
    setIsPending(false);
  };
  return (
    <div className="w-4/5 max-w-[550px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-bold text-2xl">Application</h1>
        <h2>Create application and we will contact you</h2>
        {status && <span className={status===success ? 'text-green-700' : 'text-red-600'}>{status}</span>}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={labelClass}>
          <span className={labelTitle}>Your Name</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </label>
        <label className={labelClass}>
          <text className={labelTitle}>
            Contacts{" "}
            <span className="inline text-xs">
              (phone, telegram, whatsapp or any other)
            </span>
          </text>
          <input
            required
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            name="contact"
          />
        </label>
        <label className={labelClass}>
          <text className={labelTitle}>
            Device type{" "}
            <span className="text-xs">(smartphone, laptop, PC, etc.)</span>
          </text>
          <input
            required
            type="text"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            name="device"
          />
        </label>
        <label className={labelClass}>
          <span className={labelTitle}>Describe the problem</span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={5}
          />
        </label>
        <button disabled={isPending} className={styles.button}>
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}
