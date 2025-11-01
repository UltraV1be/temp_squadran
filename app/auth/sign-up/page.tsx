"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formatPhoneToE164 = (phoneInput: string): string => {
    let cleaned = phoneInput.replace(/\D/g, "")

    if (!phoneInput.startsWith("+")) {
      if (cleaned.length === 10) {
        cleaned = "1" + cleaned
      } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
        // Already has country code
      }
    }

    return "+" + cleaned
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    if (!supabase) {
      setError("Authentication service is not configured. Please contact support.")
      return
    }

    setIsLoading(true)
    setError(null)

    if (authMethod === "email") {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setIsLoading(false)
        return
      }

      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error

        router.push("/auth/sign-up-success")
      } catch (error: unknown) {
        console.error("[v0] Email signup error:", error)
        setError(error instanceof Error ? error.message : "An error occurred during signup")
      }
    } else {
      try {
        if (!phone.trim()) {
          setError("Phone number is required")
          setIsLoading(false)
          return
        }

        const formattedPhone = formatPhoneToE164(phone)

        if (!/^\+\d{10,15}$/.test(formattedPhone)) {
          setError("Please enter a valid phone number (e.g., +1 (555) 000-0000)")
          setIsLoading(false)
          return
        }

        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
          options: {
            shouldCreateUser: true,
            data: {
              full_name: fullName,
            },
          },
        })
        if (error) throw error

        // Store phone and full name for OTP verification
        sessionStorage.setItem("signupPhone", formattedPhone)
        sessionStorage.setItem("signupFullName", fullName)
        router.push("/auth/verify-phone-otp")
      } catch (error: unknown) {
        console.error("[v0] Phone signup error:", error)
        setError(error instanceof Error ? error.message : "An error occurred during signup")
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md mx-auto mb-4">
            <span className="text-sm font-bold text-primary-foreground">NS</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">NFSU SOCIAL</h1>
          <p className="text-sm text-muted-foreground mt-1">Connecting NFSU</p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join NFSU Social and connect with members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Button
                type="button"
                variant={authMethod === "email" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setAuthMethod("email")}
              >
                Email
              </Button>
              <Button
                type="button"
                variant={authMethod === "phone" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setAuthMethod("phone")}
              >
                Phone
              </Button>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-muted/50 border-border/50"
                />
              </div>

              {authMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/50 border-border/50"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-muted/50 border-border/50"
                  />
                  <p className="text-xs text-muted-foreground">Format: +1 (555) 000-0000 or any international format</p>
                </div>
              )}

              {authMethod === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-muted/50 border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-muted/50 border-border/50"
                    />
                  </div>
                </>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
