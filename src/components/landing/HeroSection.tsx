import React from "react";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface HeroSectionProps {
  onGetStarted?: () => void;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onGetStarted = () => {},
  title = "Grammarly for Code",
  subtitle = "AI-powered code analysis that helps you write better, cleaner, and more maintainable code.",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Text content */}
        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <span className="text-4xl font-bold text-white mr-2">{`{}`}</span>
              <h1 className="text-4xl font-bold text-white">Syntaxtual</h1>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-purple-100 max-w-2xl mb-8 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CTAButton onClick={onGetStarted} text="Get Started" />
          </motion.div>
        </div>

        {/* Right side - Code preview */}
        <div className="flex-1 max-w-lg lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-purple-500/20"
          >
            {/* Terminal header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-400 text-sm font-mono">main.js</span>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2">
                <div className="text-purple-400">
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-yellow-300">fetchUserData</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">userId</span>
                  <span className="text-white">) {</span>
                </div>
                <div className="text-gray-300 ml-4">
                  <span className="text-blue-400">return</span>{" "}
                  <span className="text-yellow-300">fetch</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">`/api/users/${userId}`</span>
                  <span className="text-white">)</span>
                </div>
                <div className="text-gray-300 ml-8">
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">then</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">res</span>
                  <span className="text-white"> => </span>
                  <span className="text-orange-300">res</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">json</span>
                  <span className="text-white">())</span>
                </div>
                <div className="text-gray-300 ml-8">
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">catch</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">error</span>
                  <span className="text-white"> => {</span>
                </div>
                <div className="text-gray-300 ml-12">
                  <span className="text-yellow-300">console</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">log</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">error</span>
                  <span className="text-white">);</span>
                </div>
                <div className="text-gray-300 ml-8">
                  <span className="text-white">});</span>
                </div>
                <div className="text-white">}</div>
              </div>

              {/* AI suggestion overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-4 bg-purple-900/50 border border-purple-500/30 rounded-md p-3"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-purple-200 text-xs font-semibold mb-1">AI Suggestion</p>
                    <p className="text-purple-100 text-xs">
                      Consider adding error handling and type annotations for better code quality.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;