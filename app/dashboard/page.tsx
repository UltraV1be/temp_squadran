import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Settings
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name} />
                <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {profile?.full_name || "User"}!</CardTitle>
                <CardDescription>Manage your profile and account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name} />
                    <AvatarFallback className="text-lg">{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{profile?.full_name || "User"}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Member since {new Date(profile?.created_at || user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="border-t border-border/50 pt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">
                    {profile?.bio || "No bio added yet. Add one to let others know about you!"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-border/50 pt-6 flex gap-3">
                  <Link href="/dashboard/settings">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <form action="/api/auth/logout" method="POST">
                    <Button variant="outline" type="submit">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Posts</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Followers</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Following</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-sm">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Email Verified</span>
                  <span className="text-xs font-semibold text-primary">
                    {user.email_confirmed_at ? "Yes" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Account Type</span>
                  <span className="text-xs font-semibold text-primary">Member</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center text-xs text-muted-foreground">
            <p>&copy; 2025 NFSU SOCIAL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
