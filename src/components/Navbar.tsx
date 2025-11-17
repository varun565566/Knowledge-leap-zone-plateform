import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  const getDashboardLink = () => {
    if (role === "instructor") return "/dashboard/instructor";
    return "/dashboard/student";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            LearnHub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            to="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          {role === "instructor" && (
            <Link
              to="/teaching"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Manage Courses
            </Link>
          )}
          <Link
            to="/#instructors"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Teach
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={getDashboardLink()}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" className="bg-gradient-hero hover:opacity-90 transition-opacity" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
