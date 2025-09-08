import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminSecurityDialogProps {
  onAdminCreated?: () => void;
}

const AdminSecurityDialog = ({ onAdminCreated }: AdminSecurityDialogProps) => {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  const handleCreateInitialAdmin = async () => {
    if (!secret.trim()) {
      setError('Please enter the admin secret');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('You must be logged in to create an admin account');
        return;
      }

      const { error } = await supabase.rpc('create_initial_admin', {
        target_user_id: user.id,
        admin_secret: secret
      });

      if (error) {
        throw error;
      }

      setSuccess('Admin account created successfully! Please refresh the page.');
      setSecret('');
      onAdminCreated?.();
      
      // Close dialog after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setSuccess('');
      }, 2000);
      
    } catch (error: any) {
      setError(error.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Create Initial Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Create Initial Admin Account
          </DialogTitle>
          <DialogDescription>
            This function allows you to create the very first admin account. It can only be used once when no admin accounts exist.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Notice:</strong> You need the special admin secret to proceed. This is a one-time setup process.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="admin-secret">Admin Secret</Label>
            <Input
              id="admin-secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter admin secret"
              disabled={loading}
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleCreateInitialAdmin} disabled={loading}>
              {loading ? 'Creating...' : 'Create Admin'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSecurityDialog;