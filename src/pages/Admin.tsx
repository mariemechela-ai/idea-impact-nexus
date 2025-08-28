import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase, type ContactSubmission, type CareerSubmission } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Download, Mail, User, Calendar, FileText } from "lucide-react";

const Admin = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [careerSubmissions, setCareerSubmissions] = useState<CareerSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      
      // Fetch contact submissions
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Fetch career submissions
      const { data: careers, error: careersError } = await supabase
        .from('career_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (careersError) throw careersError;

      setContactSubmissions(contacts || []);
      setCareerSubmissions(careers || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCV = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('cvs')
        .download(filePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
        <SiteHeader />
        <main className="container mx-auto py-16">
          <div className="text-center">Loading submissions...</div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <SEO
        title="Admin – Form Submissions"
        description="View and manage contact form submissions and CV uploads."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Forms ({contactSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Career Applications ({careerSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            {contactSubmissions.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No contact form submissions yet.
                </CardContent>
              </Card>
            ) : (
              contactSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {submission.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(submission.created_at!)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Message:</h4>
                      <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                        {submission.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="careers" className="space-y-4">
            {careerSubmissions.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No career applications yet.
                </CardContent>
              </Card>
            ) : (
              careerSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {submission.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.email}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {submission.expertise}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(submission.created_at!)}
                        </div>
                        {submission.cv_file_name && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadCV(submission.cv_file_path!, submission.cv_file_name!)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download CV
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {submission.message && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Message:</h4>
                        <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>
                    )}
                    {submission.cv_file_name && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          <FileText className="h-4 w-4 inline mr-2" />
                          CV uploaded: {submission.cv_file_name}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Admin;