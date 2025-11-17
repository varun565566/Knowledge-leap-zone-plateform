import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateManagerProps {
  courseId: string;
}

const CertificateManager = ({ courseId }: CertificateManagerProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      // Fetch enrolled students
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq("course_id", courseId);

      if (enrollmentsError) throw enrollmentsError;
      setStudents(enrollmentsData || []);

      // Fetch certificates
      const { data: certsData, error: certsError } = await supabase
        .from("certificates")
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq("course_id", courseId)
        .order("issued_at", { ascending: false });

      if (certsError) throw certsError;
      setCertificates(certsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    }
  };

  const handleIssueCertificate = async () => {
    if (!selectedStudent || !certificateUrl) {
      toast.error("Please select a student and provide certificate URL");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("certificates")
        .insert([{
          user_id: selectedStudent,
          course_id: courseId,
          certificate_url: certificateUrl,
        }]);

      if (error) throw error;

      toast.success("Certificate issued successfully");
      setOpen(false);
      setSelectedStudent("");
      setCertificateUrl("");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Course Certificates</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Issue Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Issue Certificate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((enrollment: any) => (
                      <SelectItem key={enrollment.user_id} value={enrollment.user_id}>
                        {enrollment.profiles?.full_name || "Unknown Student"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Certificate URL</Label>
                <Input
                  placeholder="https://..."
                  value={certificateUrl}
                  onChange={(e) => setCertificateUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload the certificate to your file hosting and paste the URL here
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleIssueCertificate} disabled={loading}>
                  {loading ? "Issuing..." : "Issue Certificate"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certificates.map((cert: any) => {
            const profile = cert.profiles;
            const initials = profile?.full_name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase() || "?";

            return (
              <Card key={cert.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Award className="h-8 w-8 text-primary" />
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{profile?.full_name || "Unknown"}</h4>
                      <p className="text-sm text-muted-foreground">
                        Issued on {new Date(cert.issued_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(cert.certificate_url, "_blank")}
                    >
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {certificates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No certificates issued yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateManager;
