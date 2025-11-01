import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Verify your email to complete signup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              We've sent a verification link to your email address. Please click the link in your email to verify your
              account and complete the signup process. You may need to check your spam folder.
            </p>
            <div className="pt-4">
              <Link href="/auth/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">Back to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
