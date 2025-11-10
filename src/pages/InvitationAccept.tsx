import { FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function InvitationAccept() {
  const navigate = useNavigate();

  // Mock invitation data - in production this would come from URL params
  const invitation = {
    organizationName: "Corp Inc.",
    role: "Member",
    invitedBy: "Bob Johnson",
  };

  const handleAccept = () => {
    // In production, this would accept the invitation via API
    navigate('/documents');
  };

  const handleDecline = () => {
    // In production, this would decline the invitation via API
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <FileText className="h-10 w-10 text-primary" />
          <span className="text-3xl font-bold">DocProcess</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">You've been invited!</CardTitle>
            <CardDescription>
              {invitation.invitedBy} has invited you to join their organization
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Organization</span>
                <span className="font-semibold">{invitation.organizationName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Role</span>
                <span className="font-semibold">{invitation.role}</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              By accepting, you'll be able to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access shared organization documents</li>
                <li>Use the organization's credit pool</li>
                <li>Collaborate with team members</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDecline}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Decline
            </Button>
            <Button
              className="flex-1"
              onClick={handleAccept}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
