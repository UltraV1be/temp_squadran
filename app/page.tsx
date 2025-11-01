import Link from "next/link"
import {
  Search,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  ChevronDown,
  Users,
  Briefcase,
  Mail,
  TrendingUp,
  BookOpen,
  Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default async function Home() {
  let user = null
  try {
    const { createClient } = await import("@/lib/supabase/server")
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser
  } catch (error) {
    console.log("[v0] Supabase not configured, continuing without auth")
  }

  const blogPosts = [
    {
      id: 1,
      title: "Forensic Medical Careers",
      category: "Career Insights",
      author: "Sarah Johnson",
      avatar: "/professional-woman-diverse.png",
      date: "January 24, 2024",
      excerpt:
        "When medical professionals use their expertise to serve the criminal justice system, they practice forensic medicine. Law enforcement and legal teams rely on forensic medicine practitioners to determine time and cause of death, identify victims and provide expert testimony for criminal prosecution cases.",
      likes: 234,
      comments: 12,
      shares: 8,
    },
    {
      id: 2,
      title: "Is Cybersecurity a Good Career?",
      category: "Career Insights",
      author: "Michael Chen",
      avatar: "/professional-man.jpg",
      date: "January 24, 2024",
      excerpt:
        "Cyber Security is one of the fastest-growing industries in the world, with no signs of slowing down, but is Cyber Security a Good Career? As businesses become increasingly reliant on technology, the need for Cyber Security professionals to protect their data and systems is more critical than ever.",
      likes: 456,
      comments: 28,
      shares: 15,
    },
  ]

  const members = [
    { id: 1, name: "Sarah Johnson", role: "Forensic Expert", avatar: "/professional-woman-diverse.png" },
    { id: 2, name: "Michael Chen", role: "Cybersecurity Specialist", avatar: "/professional-man.jpg" },
    { id: 3, name: "Emily Rodriguez", role: "Career Counselor", avatar: "/professional-woman-diverse.png" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md">
                <span className="text-xs font-bold text-primary-foreground">NS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">NFSU SOCIAL</h1>
                <p className="text-xs text-muted-foreground">Connecting NFSU</p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Activity
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Groups
              </a>
              <a href="/members" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Members
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Blogs
              </a>

              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Portal
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a
                    href="/jobs"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors first:rounded-t-lg"
                  >
                    NFSU JOB Portal
                  </a>
                  <a
                    href="https://newsletter.nfsu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-t border-border"
                  >
                    NFSU NEWSLETTER
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-t border-border last:rounded-b-lg"
                  >
                    NFSU SOCIAL
                  </a>
                </div>
              </div>
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
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-3">Welcome to NFSU SOCIAL</h2>
            <p className="text-lg text-muted-foreground">
              Your hub for connecting with the NFSU community, exploring opportunities, and sharing knowledge
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-12">
            <Link href="/jobs">
              <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">NFSU JOB Portal</h3>
                    <p className="text-sm text-muted-foreground">Explore career opportunities and job listings</p>
                  </div>
                </div>
              </Card>
            </Link>

            <a href="https://newsletter.nfsu.edu" target="_blank" rel="noopener noreferrer">
              <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">NFSU NEWSLETTER</h3>
                    <p className="text-sm text-muted-foreground">Stay updated with latest news and updates</p>
                  </div>
                </div>
              </Card>
            </a>

            <Link href="/">
              <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Users2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">NFSU SOCIAL</h3>
                    <p className="text-sm text-muted-foreground">Connect with community members and share</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Link href="#blogs">
            <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Blogs</h3>
              </div>
              <p className="text-sm text-muted-foreground">Read and share career insights and stories</p>
              <p className="text-xs text-primary mt-3 font-medium">Explore →</p>
            </Card>
          </Link>

          <Link href="/members">
            <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-foreground">Members</h3>
              </div>
              <p className="text-sm text-muted-foreground">Connect with NFSU community members</p>
              <p className="text-xs text-accent mt-3 font-medium">View All →</p>
            </Card>
          </Link>

          <Link href="#groups">
            <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Users2 className="h-5 w-5 text-secondary" />
                <h3 className="font-bold text-foreground">Groups</h3>
              </div>
              <p className="text-sm text-muted-foreground">Join interest-based groups and discussions</p>
              <p className="text-xs text-secondary mt-3 font-medium">Discover →</p>
            </Card>
          </Link>

          <Link href="#activity">
            <Card className="p-6 border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-destructive" />
                <h3 className="font-bold text-foreground">Activity</h3>
              </div>
              <p className="text-sm text-muted-foreground">See what's happening in the community</p>
              <p className="text-xs text-destructive mt-3 font-medium">View Feed →</p>
            </Card>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Blog Posts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Latest Blog Posts</h3>
              <p className="text-muted-foreground">Discover insights from the NFSU community</p>
            </div>

            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{post.author}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                      </div>
                    </div>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="mb-3 text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                        <Heart className="h-4 w-4 group-hover:fill-primary" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="p-6 border-border/50">
              <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Search</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Search posts..."
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Featured Members */}
            <Card className="p-6 border-border/50">
              <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Featured Members</h3>
              <div className="space-y-4">
                {members.map((member) => (
                  <Link key={member.id} href="/members" className="flex items-center gap-3 group">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/members">
                <Button
                  variant="outline"
                  className="w-full mt-4 text-primary border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  View All Members
                </Button>
              </Link>
            </Card>

            {/* Recent Comments */}
            <Card className="p-6 border-border/50">
              <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Recent Comments</h3>
              <p className="text-sm text-muted-foreground">No comments to show.</p>
            </Card>

            {/* Join CTA */}
            <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <h3 className="mb-2 text-sm font-bold text-foreground">Join Our Community</h3>
              <p className="mb-4 text-xs text-muted-foreground">
                Connect with NFSU members, share insights, and grow your network.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </Card>
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
