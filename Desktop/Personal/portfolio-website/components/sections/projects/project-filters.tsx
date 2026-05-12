"use client"

import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectFiltersProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const ProjectFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05, rotate: selectedCategory === category ? 0 : 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => onSelectCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform shadow-lg relative ${
              selectedCategory === category
                ? "bg-bright-aqua text-black hover:bg-bright-aqua/90 -rotate-1"
                : "border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-black bg-white dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700 rotate-1"
            }`}
            style={{
              clipPath:
                selectedCategory === category
                  ? "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)"
                  : "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)",
            }}
          >
            <Filter className="mr-2" size={16} />
            {category}
            {/* Button Shadow */}
            <div
              className={`absolute -bottom-1 -right-1 w-full h-full -z-10 rounded-xl transform ${
                selectedCategory === category ? "bg-bright-aqua/40 rotate-1" : "bg-deep-violet/20 dark:bg-gray-600/30 -rotate-1"
              }`}
              style={{
                clipPath:
                  selectedCategory === category
                    ? "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)"
                    : "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)",
              }}
            />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
