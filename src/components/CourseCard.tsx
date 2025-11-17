import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  price: string;
  rating: number;
  students: string;
  duration: string;
  level: string;
  image: string;
  category: string;
}

const CourseCard = ({
  id,
  title,
  instructor,
  price,
  rating,
  students,
  duration,
  level,
  image,
  category,
}: CourseCardProps) => {
  return (
    <Link to={`/courses/${id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-hover hover:-translate-y-1 duration-300">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="font-normal">
              {level}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{duration}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground">{instructor}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{students}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <span className="text-sm text-muted-foreground line-through">$199</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
