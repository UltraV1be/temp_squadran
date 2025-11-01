import { Card } from "@/components/ui/card"

export default function MembersLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-11 w-32 bg-muted rounded-lg animate-pulse" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted rounded-lg animate-pulse" />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Card className="p-6 border-border/50">
              <div className="h-4 w-20 bg-muted rounded-lg animate-pulse mb-4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <div className="bg-muted h-32 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-32 bg-muted rounded-lg animate-pulse" />
                  <div className="h-3 w-24 bg-muted rounded-lg animate-pulse" />
                  <div className="h-3 w-40 bg-muted rounded-lg animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
