"use client"

import { PageHeader } from "@/components/paper-ui/page-header"

export const ContactHeader = () => {
  return (
    <PageHeader
      title="Get In Touch"
      description={
        <>
          Ready to collaborate on innovative projects? Let&apos;s connect and build something amazing together. I&apos;m
          always excited to discuss new opportunities in{" "}
          <span className="text-bright-aqua font-semibold">blockchain</span>,{" "}
          <span className="text-deep-violet font-semibold">AI/ML</span>, and software development.
        </>
      }
    />
  )
}
