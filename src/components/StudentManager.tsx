import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface StudentManagerProps {
  courseId: string;
}

const StudentManager = ({ courseId }: StudentManagerProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq("course_id", courseId)
        .order("enrolled_at", { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading students...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrolled Students ({students.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map((enrollment: any) => {
            const profile = enrollment.profiles;
            const initials = profile?.full_name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase() || "?";

            return (
              <Card key={enrollment.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{profile?.full_name || "Unknown Student"}</h4>
                      <p className="text-sm text-muted-foreground">
                        Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">
                            {enrollment.progress_percentage || 0}%
                          </span>
                        </div>
                        <Progress value={enrollment.progress_percentage || 0} />
                      </div>
                    </div>
                    <div>
                      {enrollment.completed_at ? (
                        <Badge className="bg-green-500">Completed</Badge>
                      ) : (
                        <Badge variant="secondary">In Progress</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {students.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No students enrolled yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentManager;
