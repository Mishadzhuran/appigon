"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SectionLabel, Shell } from "@/components/ui/Primitives";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <Shell>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel align="center">Contact</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="soft-title text-[clamp(2.8rem,8vw,6rem)]"
          >
            Tell us what
            <br />
            you&apos;re <span className="text-red">building</span>
          </motion.h1>
          <p className="readable mx-auto mt-6 max-w-xl">
            Share the idea, timeline, and platforms. We reply within {site.responseTime} with a
            clear path for app development, landings, and store release. No charge until a
            signed agreement.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel space-y-7 p-8 md:p-10">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-soft">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-xl hover:text-red md:text-2xl"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-soft">
                Phone
              </p>
              {site.phone ? (
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-2 block text-xl transition-colors hover:text-red md:text-2xl"
                >
                  {site.phone}
                </a>
              ) : (
                <p className="mt-2 text-xl text-muted md:text-2xl">Adding soon</p>
              )}
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-soft">
                Bases
              </p>
              <p className="mt-2 text-xl md:text-2xl">{site.locations.join(" · ")}</p>
            </div>
          </div>

          <div className="panel p-8 md:p-10">
            {sent ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <p className="soft-title text-5xl text-red">Locked in.</p>
                <p className="readable mt-4 max-w-sm">
                  Message received. We&apos;ll come back fast with next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field label="Name" name="name" required placeholder="Alex Founder" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                />
                <Field
                  label="Project type"
                  name="type"
                  required
                  placeholder="iOS app / web product / 3D launch"
                />
                <label className="block">
                  <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-soft">
                    Brief
                  </span>
                  <textarea
                    name="brief"
                    required
                    rows={5}
                    placeholder="What are you building, for whom, and by when?"
                    className="w-full resize-none rounded-2xl border border-line bg-bg px-4 py-3.5 text-[15px] text-text outline-none transition placeholder:text-muted-soft/70 focus:border-red"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-red px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-red-bright"
                >
                  Send brief →
                </button>
              </form>
            )}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-soft">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-[15px] text-text outline-none transition placeholder:text-muted-soft/70 focus:border-red"
      />
    </label>
  );
}
