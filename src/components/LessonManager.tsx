import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const lessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  video_url: z.string().url("Must be a valid URL"),
  duration_minutes: z.number().min(1, "Duration must be at least 1 minute"),
  order_index: z.number().min(0),
  is_preview: z.boolean().default(false),
});

type LessonFormData = z.infer<typeof lessonSchema>;

interface LessonManagerProps {
  courseId: string;
  courseName: string;
}

const LessonManager = ({ courseId, courseName }: LessonManagerProps) => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      duration_minutes: 0,
      order_index: 0,
      is_preview: false,
    },
  });

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Failed to load lessons");
    }
  };

  const handleEdit = (lesson: any) => {
    setEditingLesson(lesson);
    form.reset({
      title: lesson.title,
      description: lesson.description || "",
      video_url: lesson.video_url,
      duration_minutes: lesson.duration_minutes,
      order_index: lesson.order_index,
      is_preview: lesson.is_preview,
    });
    setOpen(true);
  };

  const handleDelete = async (lessonId: string) => {
    try {
      const { error } = await supabase
        .from("lessons")
        .delete()
        .eq("id", lessonId);

      if (error) throw error;
      toast.success("Lesson deleted successfully");
      fetchLessons();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete lesson");
    }
  };

  const onSubmit = async (data: LessonFormData) => {
    setLoading(true);
    try {
      if (editingLesson) {
        const { error } = await supabase
          .from("lessons")
          .update(data)
          .eq("id", editingLesson.id);

        if (error) throw error;
        toast.success("Lesson updated successfully");
      } else {
        const { error } = await supabase
          .from("lessons")
          .insert([{ 
            ...data, 
            course_id: courseId,
            title: data.title as string,
            video_url: data.video_url as string,
            duration_minutes: data.duration_minutes as number,
            order_index: data.order_index as number,
          }]);

        if (error) throw error;
        toast.success("Lesson created successfully");
      }

      setOpen(false);
      setEditingLesson(null);
      form.reset();
      fetchLessons();
    } catch (error: any) {
      toast.error(error.message || "Failed to save lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lessons for {courseName}</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingLesson(null);
              form.reset({
                title: "",
                description: "",
                video_url: "",
                duration_minutes: 0,
                order_index: lessons.length,
                is_preview: false,
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingLesson ? "Edit Lesson" : "Create New Lesson"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Introduction to React" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Lesson description..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration_minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="order_index"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingLesson ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {lesson.duration_minutes} minutes
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(lesson)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this lesson? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(lesson.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {lessons.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No lessons yet. Create your first lesson!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonManager;
