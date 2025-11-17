import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-learning.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
      <div className="container py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                🎓 #1 Learning Platform
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Learn New Skills
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2">
                Anytime, Anywhere
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Transform your career with expert-led courses. Access thousands of courses, 
              track your progress, and earn certificates recognized worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-soft hover:shadow-hover group"
                asChild
              >
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">1,200+</div>
                <div className="text-sm text-muted-foreground">Expert Courses</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Online learning platform illustration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-soft animate-pulse">
              <div className="text-sm font-medium text-foreground">🔥 Trending</div>
              <div className="text-xs text-muted-foreground">AI & ML Course</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-soft">
              <div className="text-sm font-medium text-foreground">✅ Certified</div>
              <div className="text-xs text-muted-foreground">Industry Standard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero;
