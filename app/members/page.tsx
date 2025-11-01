"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Mail, MapPin, Briefcase, Calendar, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Member {
  id: number
  name: string
  avatar: string
  title: string
  department: string
  location: string
  email: string
  joinDate: string
  bio: string
  connections: number
  posts: number
}

const members: Member[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/professional-woman-diverse.png",
    title: "Forensic Medical Expert",
    department: "Forensic Science",
    location: "New York, USA",
    email: "sarah.johnson@nfsu.edu",
    joinDate: "January 2023",
    bio: "Specialized in forensic medicine with 8+ years of experience in criminal justice. Passionate about mentoring young professionals.",
    connections: 342,
    posts: 28,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/professional-man.jpg",
    title: "Cybersecurity Specialist",
    department: "Digital Forensics",
    location: "San Francisco, USA",
    email: "michael.chen@nfsu.edu",
    joinDate: "March 2023",
    bio: "Cybersecurity expert with focus on digital forensics and data protection. Active contributor to security research.",
    connections: 521,
    posts: 45,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    avatar: "/professional-woman-diverse.png",
    title: "Research Director",
    department: "Criminal Justice",
    location: "Boston, USA",
    email: "emily.rodriguez@nfsu.edu",
    joinDate: "June 2022",
    bio: "Leading research initiatives in criminal justice. Published 15+ papers on forensic analysis methodologies.",
    connections: 678,
    posts: 62,
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "/professional-man.jpg",
    title: "Law Enforcement Liaison",
    department: "Police Science",
    location: "Chicago, USA",
    email: "james.wilson@nfsu.edu",
    joinDate: "August 2023",
    bio: "Bridge between law enforcement and academic research. Facilitating practical training programs.",
    connections: 289,
    posts: 19,
  },
  {
    id: 5,
    name: "Dr. Priya Patel",
    avatar: "/professional-woman-diverse.png",
    title: "Toxicology Expert",
    department: "Forensic Science",
    location: "Los Angeles, USA",
    email: "priya.patel@nfsu.edu",
    joinDate: "February 2023",
    bio: "Toxicology specialist with expertise in drug analysis and poisoning cases. Consultant for major investigations.",
    connections: 412,
    posts: 34,
  },
  {
    id: 6,
    name: "David Thompson",
    avatar: "/professional-man.jpg",
    title: "Evidence Management Officer",
    department: "Forensic Operations",
    location: "Miami, USA",
    email: "david.thompson@nfsu.edu",
    joinDate: "May 2023",
    bio: "Managing evidence protocols and chain of custody procedures. Ensuring forensic integrity in all cases.",
    connections: 198,
    posts: 12,
  },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [departmentFilter, setDepartmentFilter] = useState("All")

  const departments = ["All", ...new Set(members.map((m) => m.department))]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "All" || member.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md">
                <span className="text-xs font-bold text-primary-foreground">NS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">NFSU SOCIAL</h1>
                <p className="text-xs text-muted-foreground">Connecting NFSU</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Activity
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Groups
              </a>
              <a
                href="/members"
                className="text-sm font-medium text-primary transition-colors border-b-2 border-primary"
              >
                Members
              </a>
              <a href="/jobs" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Jobs
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Blogs
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Community Members</h2>
          <p className="text-muted-foreground">
            Connect with {members.length} professionals in forensic science and criminal justice
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border/50 sticky top-24">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Search Members</label>
                <Input
                  placeholder="Name, title, dept..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Department Filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-3 block">Department</label>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setDepartmentFilter(dept)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        departmentFilter === dept
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Members Grid */}
          <div className="lg:col-span-3">
            {selectedMember ? (
              <div className="space-y-6">
                <Button variant="outline" onClick={() => setSelectedMember(null)} className="mb-4">
                  ← Back to Members
                </Button>

                <Card className="overflow-hidden border-border/50">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8">
                    <div className="flex items-start gap-6">
                      <Avatar className="h-24 w-24 border-4 border-card">
                        <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                        <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground mb-2">{selectedMember.name}</h1>
                        <p className="text-lg text-primary font-semibold mb-1">{selectedMember.title}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {selectedMember.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {selectedMember.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {selectedMember.joinDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Contact</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${selectedMember.email}`} className="hover:text-primary transition-colors">
                          {selectedMember.email}
                        </a>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-muted/50 border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Connections</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{selectedMember.connections}</p>
                      </Card>
                      <Card className="p-4 bg-muted/50 border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted-foreground">Posts</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{selectedMember.posts}</p>
                      </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">Connect</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Message
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50 cursor-pointer"
                      onClick={() => setSelectedMember(member)}
                    >
                      <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border-2 border-card">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                              {member.name}
                            </h3>
                            <p className="text-sm text-primary font-semibold">{member.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{member.department}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {member.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Joined {member.joinDate}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-2 border-t border-border/50">
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Connections</p>
                            <p className="text-lg font-bold text-foreground">{member.connections}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Posts</p>
                            <p className="text-lg font-bold text-foreground">{member.posts}</p>
                          </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-sm">View Profile</Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">No members found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-xs text-muted-foreground">
            <p>&copy; 2025 NFSU SOCIAL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
