import { Search, MapPin, Briefcase, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Forensic Analyst",
      company: "Criminal Justice Bureau",
      location: "New Delhi, India",
      type: "Full-time",
      salary: "₹12,00,000 - ₹15,00,000",
      description:
        "We are looking for an experienced Forensic Analyst to join our team. You will work on high-profile cases and collaborate with law enforcement agencies.",
      postedDate: "2 days ago",
      logo: "/professional-woman-diverse.png",
      tags: ["Forensics", "Investigation", "Analysis"],
      applicants: 24,
    },
    {
      id: 2,
      title: "Cybersecurity Specialist",
      company: "Tech Security Solutions",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹10,00,000 - ₹14,00,000",
      description:
        "Join our cybersecurity team to protect critical infrastructure. Experience with network security, penetration testing, and threat analysis required.",
      postedDate: "1 week ago",
      logo: "/professional-man.jpg",
      tags: ["Cybersecurity", "Network Security", "Threat Analysis"],
      applicants: 42,
    },
    {
      id: 3,
      title: "Legal Consultant",
      company: "Justice & Associates",
      location: "Mumbai, India",
      type: "Contract",
      salary: "₹8,00,000 - ₹11,00,000",
      description:
        "Seeking a legal consultant with expertise in criminal law and forensic evidence. Work on complex cases and provide expert testimony.",
      postedDate: "3 days ago",
      logo: "/professional-woman-diverse.png",
      tags: ["Legal", "Criminal Law", "Consulting"],
      applicants: 18,
    },
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
              <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Activity
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Groups
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Members
              </a>
              <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Blogs
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm">
                Log in
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Job Opportunities</h2>
          <p className="text-muted-foreground">Find your next career opportunity with NFSU members and partners</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                        <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{job.company}</p>
                        <p className="text-xs text-muted-foreground">{job.postedDate}</p>
                      </div>
                    </div>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {job.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="mb-2 text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                    {job.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{job.description}</p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                        <Heart className="h-4 w-4 group-hover:fill-primary" />
                        <span>Save</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      <span className="text-xs text-muted-foreground">{job.applicants} applicants</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Apply Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search & Filter */}
            <Card className="p-6 border-border/50">
              <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Search Jobs</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Job title..."
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  placeholder="Location..."
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">Search</Button>
              </div>
            </Card>

            {/* Job Types */}
            <Card className="p-6 border-border/50">
              <h3 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Job Type</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-foreground">Full-time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Contract</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Part-time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Freelance</span>
                </label>
              </div>
            </Card>

            {/* Post a Job CTA */}
            <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <h3 className="mb-2 text-sm font-bold text-foreground">Post a Job</h3>
              <p className="mb-4 text-xs text-muted-foreground">
                Hiring? Post your job opening and reach qualified NFSU professionals.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Post Job</Button>
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
