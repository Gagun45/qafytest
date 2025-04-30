"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ApplicationForm.module.css";
import { createApplication } from "@/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextAreaAutosize from "react-textarea-autosize";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const MAX_FILE_SIZE_MB = 8; //NEXT CONFIG TS VALUE

export type ImageType = {
  file: File;
  url: string;
};

export default function ApplicationForm() {
  const t = useTranslations("ApplicationForm");

  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<ImageType[]>([]);

  const [isDisabled, setIsDisabled] = useState(false);

  const [overallSize, setOverallSize] = useState(0);

  useEffect(() => {
    const newSize = files.reduce(
      (sum, image) =>
        sum + parseFloat((image.file.size / (1024 * 1024)).toFixed(2)),
      0
    );
    setOverallSize(newSize);
  }, [files]);

  useEffect(() => {
    if (overallSize > MAX_FILE_SIZE_MB) {
      setIsDisabled(true);
      setError(
        t("overallSizeError", {
          overallSize: overallSize.toPrecision(2),
          MAX_FILE_SIZE_MB,
        })
      );
    } else {
      setIsDisabled(false);
      setError("");
    }
  }, [overallSize]);

  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const labelClass = "flex gap-2 relative";
  const labelTitle = "w-fit absolute -top-6";

  const success = t("success");
  const failed = t("failed");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await createApplication(formData, files);
      if (res) {
        setStatus(success);
      } else {
        setStatus(failed);
      }
      formRef.current?.reset();
      setError("");
    } catch {
      setStatus(failed);
    } finally {
      setFiles([]);
      setIsPending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("");
      return;
    }

    if (files.some((item) => item.file.name === file.name)) {
      setError(t("alreadyAdded"));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(t("validFile"));
      e.target.value = "";
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setFiles((prev) => [...prev, { file, url: previewUrl }]);
    e.target.value = "";
  };

  const handleCancelAttach = (filename: string) => {
    const filteredFiles = files.filter((image) => image.file.name !== filename);
    setFiles(filteredFiles);
  };

  return (
    <section>
      <div className="mainHeading gap-2">
        <h1 className="pageTitle">{t("title")}</h1>
        <h2>{t("subtitle")}</h2>
        <h3 className="underline">
          <Link href="/how">{t("howitworks")}</Link>
        </h3>
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
          <span className={labelTitle}>
            {t("yourName")}
            <span style={{ color: "red" }}>*</span>
          </span>
          <input required type="text" name="name" />
        </label>
        <label className={labelClass}>
          <div className={labelTitle}>
            {t("contacts")}{" "}
            <span className="inline text-xs">({t("additionalContacts")})</span>
            <span style={{ color: "red" }}>*</span>
          </div>
          <input required type="text" name="contact" />
        </label>
        <label className={labelClass}>
          <div className={labelTitle}>
            {t("deviceType")}{" "}
            <span className="text-xs">({t("additionalDevice")})</span>
            <span style={{ color: "red" }}>*</span>
          </div>
          <input required type="text" name="device" />
        </label>
        <label className={labelClass}>
          <span className={labelTitle}>
            {t("describe")} <span style={{ color: "red" }}>*</span>
          </span>
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
            {t("addAnImage")}
          </button>
          {files && (
            <div className="flex flex-wrap gap-3">
              {files.map((image) => (
                <div
                  key={image.url}
                  className="flex mt-2 items-center flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span>{image.file.name}</span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => handleCancelAttach(image.file.name)}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="w-40 h-40 flex items-start justify-center">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
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
        <button disabled={isPending || isDisabled} className={styles.button}>
          {isPending ? t("pending") : t("submit")}
        </button>
      </form>
    </section>
  );
}
