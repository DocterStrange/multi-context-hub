import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, UserPlus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and billing
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="billing">Individual Billing</TabsTrigger>
            <TabsTrigger value="helpers">My Helpers</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Bob Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="bob@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input id="password" type="password" placeholder="Enter new password" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Context</CardTitle>
                <CardDescription>
                  Choose which context to default to when you log in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select defaultValue="individual">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Bob (Individual)</SelectItem>
                    <SelectItem value="corp">Corp Inc. (Admin)</SelectItem>
                    <SelectItem value="startup">Startup LLC (Member)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>
                  Simple pay-as-you-go pricing for document processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li><span className="font-medium">Pay as you go</span> - Only pay for what you use, no subscriptions</li>
                  <li><span className="font-medium">$0.15 per credit</span> - Buy any amount, credits never expire</li>
                  <li><span className="font-medium">1 credit = 1 page conversion</span> - Predictable, flat rate pricing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Individual Credit Balance</CardTitle>
                <CardDescription>
                  Manage your personal credits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-3xl font-bold text-success">1,500 Credits</p>
                  </div>
                  <CreditCard className="h-10 w-10 text-success" />
                </div>
                <Button className="w-full" size="lg">
                  Buy More Credits
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>
                  Your past credit purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jan 10, 2024</TableCell>
                      <TableCell>$50.00</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>
                        <Badge>Paid</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dec 15, 2023</TableCell>
                      <TableCell>$100.00</TableCell>
                      <TableCell>1000</TableCell>
                      <TableCell>
                        <Badge>Paid</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="helpers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Helper Management</CardTitle>
                <CardDescription>
                  Grant other users access to your individual context
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter email address" />
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Helper
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Alice Smith</TableCell>
                        <TableCell>alice@example.com</TableCell>
                        <TableCell>Jan 5, 2024</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
