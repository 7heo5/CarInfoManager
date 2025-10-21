import { Car } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-2">
        <Car className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">CarInfo Manager</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Track your vehicles with ease
        </div>
      </div>
    </header>
  );
}
