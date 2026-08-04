"use client"

import { PageHeader } from "@/components/paper-ui/page-header"
import { Sticker } from "@/components/paper-ui/sticker"

export const AboutHeader = () => {
  return (
    <PageHeader
      title="About Me"
      decorations={
        <>
          <Sticker
            color="white"
            rotation={-10}
            className="top-0 left-0 hidden md:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            ☕ Coffee Powered
          </Sticker>

          <Sticker
            color="bright-aqua"
            rotation={15}
            className="bottom-0 right-0 hidden md:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            Lifelong Learner
          </Sticker>
        </>
      }
      description={
        <>
          Enthusiastic and determined B.Tech Computer Science student with a strong interest in{" "}
          <span className="text-bright-aqua font-semibold">blockchain technology</span> and{" "}
          <span className="text-deep-violet font-semibold">decentralized systems</span>. Passionate about learning new
          technologies and building practical, real-world solutions.
        </>
      }
    />
  )
}
