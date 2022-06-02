import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { nanoid } from "nanoid";
import axios, { AxiosError } from "axios";
import copy from "copy-to-clipboard";

type Form = {
  url: string;
  shortCode: string;
};

type ServerError = {message: string}

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ url: "", shortCode: "" });
  const [shortCodeCreated, setShortCodeCreated] = useState<Form>();
  const [hasError, setHasError] = useState("");
  let url = "";

  if (window.location && window.location.origin) {
    url = window.location.origin;
  }

  const handleCreateShortner = async (formData: Form) => {
    try {
      const { data: shortLinkResponse } = await axios.post(`${process.env.API_URL}/link/create-shortlink`, formData);
      if (shortLinkResponse?.data?.shortCode && shortLinkResponse?.data?.url) {
        setShortCodeCreated({
          shortCode: shortLinkResponse.data.shortCode,
          url: shortLinkResponse.data.url,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ServerError>;
        if (axiosError && axiosError.response) {
          console.log(axiosError.response);
          setHasError(axiosError.response.data.message);
        }
      }
    }
  };

  if (shortCodeCreated?.shortCode && shortCodeCreated?.url) {
    return (
      <>
        <div className="flex justify-center items-center mb-3">
          <h1 className="text-center text-2xl font-bold">{`${url}/${shortCodeCreated.shortCode}`}</h1>
          <input
            type="button"
            value="Copy link"
            className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer ml-2"
            onClick={() => {
              copy(`${url}/${shortCodeCreated.shortCode}`);
            }}
          />
        <input
          type="button"
          value="Reset"
          className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer m-5"
          onClick={() => {
            setForm({ shortCode: "", url: "" });
            setShortCodeCreated({ shortCode: "", url: "" });
          }}
        />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Link Shortner</title>
      </Head>
      <main className="flex justify-center items-center">
        <section className="max-w-4xl">
          <form
            className="flex flex-col justify-center h-screen sm:w-2/3 md:w-1/2 lg:w-9/12 mt-5"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleCreateShortner(form);
            }}
          >
            {hasError && (
              <div className="text-red-500 text-center">
                <p>Shortlink already in use</p>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-medium mr-2">{url}/</span>
              <input
                type="text"
                minLength={1}
                placeholder="dartrix"
                pattern={"^[-a-zA-Z0-9]+$"}
                title="Only alphanumeric characters and hypens are allowed. No spaces."
                onChange={({ target }) => {
                  setForm((oldState) => ({
                    ...oldState,
                    shortCode: target.value,
                  }));
                }}
                value={form.shortCode}
                required
              />
              <input
                type="button"
                value="Random"
                onClick={() => {
                  const code = nanoid();
                  setForm({
                    ...form,
                    shortCode: code,
                  });
                }}
                className="rounded bg-pink-500 py-1.5 px-1 font-bold cursor-pointer ml-2"
              />
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Link</span>
              <input
                className="w-full"
                type="url"
                placeholder="https://google.com"
                onChange={({ target }) => {
                  setForm((oldState) => ({
                    ...oldState,
                    url: target.value,
                  }));
                }}
                required
              />
            </div>
            <input type="submit" value="Create" className="rounded bg-pink-500 p-1 font-bold cursor-pointer mt-1" />
          </form>
        </section>
      </main>
    </>
  );
};

export default CreateLinkForm;
