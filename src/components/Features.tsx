import { BookOpen, Award, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with years of real-world experience",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access course materials anytime, anywhere with lifetime access",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Get recognized credentials to showcase your newly acquired skills",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow learners and instructors in our active community",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">LearnHub</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to accelerate your learning journey and achieve your career goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-hero text-primary-foreground group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
