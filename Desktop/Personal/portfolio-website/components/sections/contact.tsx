"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Github, Mail, Linkedin, Send, Check } from "lucide-react"
import { SectionTitle } from "@/components/ui-kit/section-title"
import { useSceneMode, useAssemblyProgress } from "@/components/three/use-scene-mode"
import { nudgeScheduler, setSchedulerReady } from "@/lib/scene-state"

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mkgvwabo"

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/eggsysy" },
  { Icon: Mail, label: "Email", href: "mailto:aryanbadmera@gmail.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-badmera-377978288/" },
]

/**
 * Fields are outlined boxes with the label sitting inside, top-left, as on the
 * reference — no floating labels, no fills.
 */
function Field({
  id,
  label,
  type = "text",
  rows,
}: {
  id: string
  label: string
  type?: string
  rows?: number
}) {
  const shared =
    "w-full bg-transparent px-4 pb-3 text-chalk outline-none placeholder:text-chalk-faint"

  return (
    <div className="border border-chalk-faint/45 transition-colors duration-500 focus-within:border-chalk-dim">
      <label
        htmlFor={id}
        className="block px-4 pt-3 font-display text-[0.72rem] tracking-widest2 text-chalk-dim"
      >
        {label}
      </label>
      {rows ? (
        <textarea id={id} name={id} rows={rows} required className={`${shared} resize-y`} />
      ) : (
        <input id={id} name={id} type={type} required className={shared} />
      )}
    </div>
  )
}

export function Contact() {
  const ref = useSceneMode("signal", 1)
  // Same element drives the scene mode and how far the stack has assembled.
  useAssemblyProgress(ref)
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)

  /**
   * Every keystroke is an interrupt for the scheduler behind the form, and a
   * form that validates aligns it and releases the payload.
   *
   * Bound on the form rather than per field: input events bubble, so one
   * handler covers all three without threading callbacks through Field.
   */
  const onInput = (e: React.FormEvent<HTMLFormElement>) => {
    nudgeScheduler()
    setSchedulerReady(e.currentTarget.checkValidity())
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setState("sending")
    const form = e.currentTarget

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setState("sent")
        form.reset()
        setSchedulerReady(false)
      } else {
        const json = await res.json().catch(() => null)
        setError(json?.errors?.[0]?.message || "That didn't send. Email aryanbadmera@gmail.com instead.")
        setState("idle")
      }
    } catch {
      setError("No connection. Try again, or email aryanbadmera@gmail.com.")
      setState("idle")
    }
  }

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-[100svh] items-center px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-[38rem]">
          <SectionTitle>Contact</SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {state === "sent" ? (
              <div className="border border-sage-dim p-10">
                <Check size={26} className="mb-5 text-sage" />
                <p className="font-display text-2xl tracking-wider2 text-chalk">Message sent</p>
                <p className="prose-quiet mt-3 text-chalk-dim">
                  It&apos;s in my inbox. I&apos;ll reply within a couple of days.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="label mt-7 text-sage transition-colors hover:text-chalk"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} onInput={onInput} className="space-y-5">
                <Field id="name" label="Name:" />
                <Field id="email" label="Email:" type="email" />
                <Field id="message" label="Message:" rows={7} />

                {error && (
                  <p role="alert" className="border-l border-sage px-4 py-2 text-sm text-chalk">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-8 pt-3">
                  <div className="flex gap-7">
                    {socials.map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-chalk-faint transition-colors duration-300 hover:text-sage"
                      >
                        <Icon size={21} />
                      </a>
                    ))}
                  </div>

                  <button type="submit" disabled={state === "sending"} className="pill text-[0.78rem] disabled:opacity-50">
                    {state === "sending" ? "Sending" : "Send"}
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* The scheduler occupies this column, rendered in the canvas behind. */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}
