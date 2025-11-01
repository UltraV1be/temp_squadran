"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginSuccessPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient()

        // Get current user
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !currentUser) {
          router.push("/auth/login")
          return
        }

        setUser(currentUser)

        // Get user profile from database
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single()

        if (!profileError && profileData) {
          setProfile(profileData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md">
              <span className="text-xs font-bold text-primary-foreground">NS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">NFSU SOCIAL</h1>
              <p className="text-xs text-muted-foreground">Connecting NFSU</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <CheckCircle className="h-20 w-20 text-primary relative" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Successfully Logged In!</h1>
          <p className="text-lg text-muted-foreground">Welcome to NFSU Portal</p>
        </div>

        {/* User Details Card */}
        <Card className="border-border/50 mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-2xl">Welcome, {profile?.full_name || user?.email}!</CardTitle>
            <CardDescription>Your account details from our database</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-8">
              {/* Profile Section */}
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name} />
                  <AvatarFallback className="text-2xl">{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name</p>
                      <p className="text-lg font-semibold text-foreground">{profile?.full_name || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Email Address
                      </p>
                      <p className="text-lg font-semibold text-foreground">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Member Since
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(profile?.created_at || user?.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {profile?.bio && (
                <div className="border-t border-border/50 pt-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-foreground">{profile.bio}</p>
                </div>
              )}

              {/* Account Status */}
              <div className="border-t border-border/50 pt-6 grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Email Status
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {user?.email_confirmed_at ? "✓ Verified" : "⏳ Pending Verification"}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Account Type
                  </p>
                  <p className="text-sm font-semibold text-primary">Member</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Info Message */}
        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
          <p className="text-sm text-foreground">
            You can now access all features of NFSU Portal including Blogs, Members, Groups, Jobs, and more!
          </p>
        </div>
      </main>
    </div>
  )
}
