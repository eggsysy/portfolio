"use client"

import { PageHeader } from "@/components/paper-ui/page-header"

export const CertificationsHeader = () => {
  return (
    <PageHeader
      title="Certifications"
      description={
        <>
          Professional certifications that validate my expertise in cutting-edge technologies, particularly in{" "}
          <span className="text-bright-aqua font-semibold">AI</span> and{" "}
          <span className="text-deep-violet font-semibold">cloud platforms</span>.
        </>
      }
    />
  )
}
