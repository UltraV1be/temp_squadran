"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

export default function VerifyPhoneOTPPage() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [phone, setPhone] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("signupPhone")
    if (!storedPhone) {
      router.push("/auth/sign-up")
    } else {
      setPhone(storedPhone)
    }
  }, [router])

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    if (!supabase) {
      setError("Authentication service is not configured.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
      })
      if (error) throw error

      if (data.user) {
        const fullName = sessionStorage.getItem("signupFullName") || ""
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          phone: phone,
          full_name: fullName,
          email: data.user.email || null,
        })

        if (profileError) {
          console.error("[v0] Profile creation error:", profileError)
          throw new Error("Failed to create user profile")
        }
      }

      sessionStorage.removeItem("signupPhone")
      sessionStorage.removeItem("signupFullName")
      router.push("/auth/login-success")
    } catch (error: unknown) {
      console.error("[v0] OTP verification error:", error)
      setError(error instanceof Error ? error.message : "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    const supabase = createClient()
    if (!supabase) {
      setError("Authentication service is not configured.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      })
      if (error) throw error
      setResendCountdown(60)
    } catch (error: unknown) {
      console.error("[v0] Resend OTP error:", error)
      setError(error instanceof Error ? error.message : "Failed to resend OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link href="/auth/sign-up" className="absolute top-4 left-4">
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
          <p className="text-sm text-muted-foreground mt-1">Verify Your Phone</p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>Enter the 6-digit code sent to {phone}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="bg-muted/50 border-border/50 text-center text-2xl tracking-widest"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOTP}
                disabled={resendCountdown > 0 || isLoading}
                className="text-sm"
              >
                {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend OTP"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
