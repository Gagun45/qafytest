"use client";

import React, { useRef, useState } from "react";
import styles from "./ApplicationForm.module.css";
import { createApplication } from "@/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextAreaAutosize from "react-textarea-autosize";

export const MAX_FILE_SIZE_MB = 10;

export default function ApplicationForm() {
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const labelClass = "flex gap-2 relative";
  const labelTitle = "w-fit absolute -top-6";

  const success =
    "Application has been successfully submitted. We will answer soon!";
  const failed =
    "Something went wrong, application has NOT been submitted, try later";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await createApplication(formData);
      if (res) {
        setStatus(success);
      } else {
        setStatus(failed);
      }
      formRef.current?.reset();
      setError("");
      setFilename("");
    } catch {
      setStatus(failed);
    } finally {
      setIsPending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      e.target.value = "";
      setFilename("");
      return;
    }
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError(
        `The image is too big (${fileSizeMB.toPrecision(
          2
        )}mb>2mb), please choose smaller one`
      );
      e.target.value = "";
      setFilename("");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setUrl(previewUrl);
    setFilename(file.name);
    setError("");
  };

  const handleCancelAttach = () => {
    setFilename("");
    inputFileRef.current!.value = "";
  };

  return (
    <div className="w-4/5 max-w-[550px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-bold text-2xl">Application</h1>
        <h2>Create application and we will contact you</h2>
        {status && (
          <span
            className={status === success ? "text-green-700" : "text-red-600"}
          >
            {status}
          </span>
        )}
      </div>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <label className={labelClass}>
          <span className={labelTitle}>Your Name</span>
          <input required type="text" name="name" />
        </label>
        <label className={labelClass}>
          <div className={labelTitle}>
            Contacts{" "}
            <span className="inline text-xs">
              (phone, telegram, whatsapp or any other)
            </span>
          </div>
          <input required type="text" name="contact" />
        </label>
        <label className={labelClass}>
          <div className={labelTitle}>
            Device type{" "}
            <span className="text-xs">(smartphone, laptop, PC, etc.)</span>
          </div>
          <input required type="text" name="device" />
        </label>
        <label className={labelClass}>
          <span className={labelTitle}>Describe the problem</span>
          <TextAreaAutosize
            required
            name="description"
            minRows={3}
            className="overflow-y-hidden"
          />
        </label>
        <div className="flex flex-col items-start">
          <button
            type="button"
            className="flex bg-headfoot py-1 px-2 rounded-sm w-36 justify-center cursor-pointer"
            onClick={() => inputFileRef.current?.click()}
          >
            {filename ? "Image attached" : "Attach an image"}
          </button>
          {filename && (
            <div className="flex gap-2 flex-col">
              <div className="flex items-center gap-2">
                <span>{filename}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={handleCancelAttach}
                  className="cursor-pointer"
                />
              </div>
              <img src={url} alt="Preview" className="max-w-44 max-h-60" />
            </div>
          )}

          <input
            type="file"
            ref={inputFileRef}
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {error && (
            <span className="flex text-left text-red-600">{error}</span>
          )}
        </div>
        <button disabled={isPending} className={styles.button}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
