"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

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
      // In production, you'd verify against a backend OTP service
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        setError("Please enter a valid 6-digit OTP")
        setIsLoading(false)
        return
      }

      // Simulate OTP verification (in production, verify against your OTP service)
      setIsVerified(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error: unknown) {
      console.error("[v0] OTP verification error:", error)
      setError(error instanceof Error ? error.message : "Failed to verify OTP")
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

    try {
      // In production, call your OTP service to resend OTP
      setResendCountdown(60)
      setError(null)
    } catch (error: unknown) {
      console.error("[v0] Resend OTP error:", error)
      setError(error instanceof Error ? error.message : "Failed to resend OTP")
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/70 shadow-md mx-auto mb-4">
              <span className="text-sm font-bold text-primary-foreground">NS</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">NFSU SOCIAL</h1>
            <p className="text-sm text-muted-foreground mt-1">Connecting NFSU</p>
          </div>

          <Card className="border-border/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Email Verified!</CardTitle>
              <CardDescription>Your account has been successfully verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">Redirecting to login page...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
          <p className="text-sm text-muted-foreground mt-1">Connecting NFSU</p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>Enter the OTP sent to {email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="bg-muted/50 border-border/50 text-center text-2xl tracking-widest font-mono"
                />
                <p className="text-xs text-muted-foreground">Check your email for the 6-digit code</p>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    onClick={handleResendOTP}
                    disabled={resendCountdown > 0}
                    className="text-primary hover:underline font-medium disabled:text-muted-foreground disabled:cursor-not-allowed"
                  >
                    {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend OTP"}
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
