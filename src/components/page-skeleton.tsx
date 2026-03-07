import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

type SkeletonVariant = "dashboard" | "list" | "detail" | "form" | "cards";

interface PageSkeletonProps {
  variant?: SkeletonVariant;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-64 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-6 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24 mb-3" />
              <Skeleton className="h-1.5 w-full rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <Skeleton className="h-14 w-14 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-3 w-32 mb-2" />
                    <Skeleton className="h-1.5 w-full rounded" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <Skeleton className="h-1.5 w-1.5 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-44 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border">
              <CardHeader className="pb-4 px-5 pt-5">
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-3 w-24 mx-auto mb-3" />
                <Skeleton className="h-2 w-full rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-40 mb-6" />
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="max-w-lg mx-auto space-y-5 animate-fade-in">
      <Skeleton className="h-7 w-48 mb-4" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <Skeleton className="h-7 w-48 mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-border overflow-hidden">
            <Skeleton className="w-full aspect-video" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-full rounded-lg mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton({ variant = "dashboard" }: PageSkeletonProps) {
  switch (variant) {
    case "dashboard":
      return <DashboardSkeleton />;
    case "list":
      return <ListSkeleton />;
    case "detail":
      return <DetailSkeleton />;
    case "form":
      return <FormSkeleton />;
    case "cards":
      return <CardsSkeleton />;
    default:
      return <DashboardSkeleton />;
  }
}
