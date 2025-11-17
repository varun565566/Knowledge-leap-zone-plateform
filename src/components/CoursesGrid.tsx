import CourseCard from "./CourseCard";
import webDevImage from "@/assets/course-web-dev.jpg";
import aiMlImage from "@/assets/course-ai-ml.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import designImage from "@/assets/course-design.jpg";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Dr. Angela Yu",
    price: "$49",
    rating: 4.8,
    students: "125K",
    duration: "52h",
    level: "Beginner",
    image: webDevImage,
    category: "Development",
  },
  {
    id: "2",
    title: "Machine Learning & AI Masterclass",
    instructor: "Andrew Ng",
    price: "$79",
    rating: 4.9,
    students: "89K",
    duration: "38h",
    level: "Advanced",
    image: aiMlImage,
    category: "Data Science",
  },
  {
    id: "3",
    title: "Digital Marketing Strategy & Analytics",
    instructor: "Neil Patel",
    price: "$39",
    rating: 4.7,
    students: "67K",
    duration: "28h",
    level: "Intermediate",
    image: marketingImage,
    category: "Marketing",
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Cooper",
    price: "$59",
    rating: 4.8,
    students: "52K",
    duration: "32h",
    level: "Beginner",
    image: designImage,
    category: "Design",
  },
  {
    id: "5",
    title: "React & Next.js - Full Stack Development",
    instructor: "Maximilian Schwarzmüller",
    price: "$69",
    rating: 4.9,
    students: "98K",
    duration: "45h",
    level: "Intermediate",
    image: webDevImage,
    category: "Development",
  },
  {
    id: "6",
    title: "Python for Data Science & Machine Learning",
    instructor: "Jose Portilla",
    price: "$54",
    rating: 4.7,
    students: "112K",
    duration: "42h",
    level: "Beginner",
    image: aiMlImage,
    category: "Data Science",
  },
];

const CoursesGrid = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular courses designed by industry experts to help you achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
