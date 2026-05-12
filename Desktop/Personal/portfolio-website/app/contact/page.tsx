"use client"

import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { ContactHeader } from "@/components/sections/contact/contact-header"
import { ContactForm } from "@/components/sections/contact/contact-form"
import { ContactSidebar } from "@/components/sections/contact/contact-sidebar"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-[#0d0d18] pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        <FloatingShape
          initial={{ x: -30, rotate: -8 }}
          animate={{ x: 0, rotate: -3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="top-32 -left-12 w-56 h-40 bg-white rounded-2xl shadow-lg transform rotate-10 opacity-40"
          style={{ clipPath: "polygon(6% 0%, 94% 4%, 96% 94%, 4% 100%)" }}
        />

        <FloatingShape
          initial={{ y: -30, rotate: 10 }}
          animate={{ y: 0, rotate: 5 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="top-80 -right-16 w-64 h-64 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-8"
        />

        <FloatingShape
          initial={{ x: 30, rotate: -12 }}
          animate={{ x: 0, rotate: -6 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="bottom-40 left-8 w-48 h-60 bg-deep-violet/20 shadow-lg transform rotate-12"
          style={{ clipPath: "polygon(8% 0%, 92% 6%, 94% 92%, 6% 98%)", borderRadius: "25px" }}
        />
      </BackgroundShapes>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ContactHeader />

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </div>
  )
}
