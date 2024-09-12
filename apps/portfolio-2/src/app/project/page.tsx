'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, Globe } from 'lucide-react'
import { useState } from 'react'

import data from "@/app/personalData.json"
import Button from '@/components/Button'
import { Navigation } from '@/components/nav'

import projects from "./projects.json";


function Header() {
  return (
    <header className="rounded-lg p-4 mb-8">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl font-bold mb-2">
          Some{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            of my works
          </span>
        </h2>
        <p className="text-zinc-400">
          {data.description}
        </p>
        <div className="w-full flex justify-center md:justify-start mt-6">
          <Link href="/about">
            <Button>
              Github Repo&apos;s
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProjectCard({ project, expandedProject, setExpandedProject }: { project: typeof projects[0], expandedProject: number | null, setExpandedProject: (id: number | null) => void }) {
  return (
    <li
      key={project.id}
      className="relative rounded-lg overflow-hidden shadow-xl border border-gray-800 transition-all duration-300 ease-in-out hover:shadow-2xl"
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-100 mb-2">{project.name}</h2>
        <p className={`text-gray-300 mb-4 overflow-hidden transition-all duration-300 ease-in-out ${expandedProject === project.id ? 'max-h-96' : 'max-h-20'
          }`}>
          {project.description}
        </p>
        <button
          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
          className="text-blue-400 hover:text-blue-300 mb-4 focus:outline-none"
          aria-expanded={expandedProject === project.id}
        >
          {expandedProject === project.id ? 'Read less' : 'Read more'}
        </button>
        <div className="flex space-x-4">
          <Link
            href={project.github}
            className="flex items-center bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-500 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            Source
          </Link>
          <Link href={project.deploy}>
            <Button>
              <Globe className="w-4 h-4 mr-2" />
              Demo
            </Button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default function ProjectPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  return (
    <div className="min-h-screen text-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-[5.5em]">
        <Header />
        <main className="p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expandedProject={expandedProject}
                setExpandedProject={setExpandedProject}
              />
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}
