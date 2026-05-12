"use client"

export const HomeFooter = () => {
  return (
    <footer className="relative z-10 mt-20">
      <div className="relative">
        {/* Multiple Paper Layers */}
        <div
          className="bg-white dark:bg-gray-800 shadow-lg transform rotate-1 h-16 mx-4"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 100%, 1% 99%)" }}
        />
        <div
          className="bg-soft-lavender dark:bg-gray-900 shadow-md transform -rotate-1 h-12 mx-8 -mt-8"
          style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)" }}
        />
        <div
          className="bg-bright-aqua/20 shadow-sm transform rotate-2 h-8 mx-12 -mt-6"
          style={{ clipPath: "polygon(3% 0%, 97% 3%, 96% 100%, 4% 97%)" }}
        />

        {/* Footer Content */}
        <div
          className="bg-gray-800 text-white py-8 px-4 transform -rotate-1 shadow-2xl"
          style={{ clipPath: "polygon(1% 0%, 99% 1%, 98% 100%, 2% 99%)" }}
        >
          <div className="max-w-6xl mx-auto text-center transform rotate-1">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Aryan Badmera. Crafted with passion and paper-inspired creativity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
