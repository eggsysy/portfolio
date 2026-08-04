"use client"

import { PageHeader } from "@/components/paper-ui/page-header"
import { Sticker } from "@/components/paper-ui/sticker"

export const ProjectsHeader = () => {
  return (
    <PageHeader
      title="My Projects"
      decorations={
        <Sticker color="deep-violet" rotation={-5} className="top-0 right-[10%] hidden md:flex">
          Built with ❤️
        </Sticker>
      }
      description={
        <>
          A showcase of my work spanning <span className="text-bright-aqua font-semibold">blockchain technologies</span>,{" "}
          <span className="text-deep-violet font-semibold">AI/ML solutions</span>, and innovative applications. Each
          project represents my passion for learning and building practical, real-world solutions.
        </>
      }
    />
  )
}
