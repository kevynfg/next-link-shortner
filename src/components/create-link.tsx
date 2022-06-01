import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { nanoid } from "nanoid";
import axios from 'axios'
import { api } from '../../lib/api'

type Form = {
  url: string;
  shortCode: string;
};

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ url: "", shortCode: "" });
  let url;

  if (window.location.origin) {
      url = window.location.origin
  }

  const handleCreateShortner = async (formData: Form) => {
      try {
        await api.post("/create-shortlink", JSON.stringify(formData))
      } catch (error) {
          console.error(error)
      }
  }

  return (
    <>
      <Head>
        <title>Link Shortner</title>
      </Head>
      <main className="flex justify-center items-center">
        <section>
          <form className="flex flex-col justify-center h-screen sm:w-2/3 md:w-1/2 lg:w-9/12 mt-5" onSubmit={async (e) => {
              e.preventDefault();
              await handleCreateShortner(form)
          }}>
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
