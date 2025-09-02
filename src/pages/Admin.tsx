import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Calendar, Mail, User, FileText, Briefcase, LogOut, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { ContactSubmission, CareerSubmission } from "@/lib/supabase";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const Admin = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [careerSubmissions, setCareerSubmissions] = useState<CareerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      setError("");
      const [contactResponse, careerResponse] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("career_submissions").select("*").order("created_at", { ascending: false })
      ]);

      if (contactResponse.error) {
        setError("Failed to load contact submissions: " + contactResponse.error.message);
        return;
      }

      if (careerResponse.error) {
        setError("Failed to load career submissions: " + careerResponse.error.message);
        return;
      }

      setContactSubmissions(contactResponse.data || []);
      setCareerSubmissions(careerResponse.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("An unexpected error occurred while loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      setAuthLoading(false);
      fetchSubmissions();
    };

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/auth');
        } else {
          setUser(session.user);
          setAuthLoading(false);
        }
      }
    );

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="Admin Dashboard"
          description="Admin dashboard for managing contact forms and career applications"
        />
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="Admin Dashboard"
          description="Admin dashboard for managing contact forms and career applications"
        />
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading submissions...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Admin Dashboard"
        description="Admin dashboard for managing contact forms and career applications"
      />
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage contact form submissions and career applications
              </p>
              {user && (
                <p className="text-sm text-muted-foreground">
                  Signed in as: {user.email}
                </p>
              )}
            </div>
            <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="contact" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Forms ({contactSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="careers" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
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
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
};

export default Admin;