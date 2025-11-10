import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Upload, Search, Filter } from "lucide-react";
import { Document } from "@/types/context";
import { UploadModal } from "@/components/documents/UploadModal";

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    fileName: 'Q4_Financial_Report.pdf',
    status: 'completed',
    uploadedDate: new Date('2024-01-15'),
    creditsUsed: 50,
    contextId: '2',
    contextName: 'Corp Inc.',
  },
  {
    id: '2',
    fileName: 'Contract_Review_2024.pdf',
    status: 'processing',
    uploadedDate: new Date('2024-01-16'),
    creditsUsed: 35,
    contextId: '1',
    contextName: 'Bob (Individual)',
  },
  {
    id: '3',
    fileName: 'Market_Analysis.pdf',
    status: 'completed',
    uploadedDate: new Date('2024-01-14'),
    creditsUsed: 75,
    contextId: '3',
    contextName: 'Startup LLC',
  },
  {
    id: '4',
    fileName: 'Legal_Documents.pdf',
    status: 'failed',
    uploadedDate: new Date('2024-01-13'),
    creditsUsed: 0,
    contextId: '4',
    contextName: 'Helper for Alice',
  },
];

export default function Documents() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contextFilter, setContextFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      processing: 'secondary',
      failed: 'destructive',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesContext = contextFilter === 'all' || doc.contextId === contextFilter;
    return matchesSearch && matchesStatus && matchesContext;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your processed documents
            </p>
          </div>
          <Button onClick={() => setIsUploadModalOpen(true)} size="lg" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload New
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg border border-border">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={contextFilter} onValueChange={setContextFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Context" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contexts</SelectItem>
              <SelectItem value="1">Individual</SelectItem>
              <SelectItem value="2">Corp Inc.</SelectItem>
              <SelectItem value="3">Startup LLC</SelectItem>
              <SelectItem value="4">Helper for Alice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-table-header">
              <TableRow>
                <TableHead className="font-semibold">File Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Uploaded</TableHead>
                <TableHead className="font-semibold">Credits Used</TableHead>
                <TableHead className="font-semibold">Context</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-table-hover cursor-pointer">
                  <TableCell className="font-medium">{doc.fileName}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.uploadedDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="text-success font-semibold">{doc.creditsUsed}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.contextName}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        activeContextName="Corp Inc. (Admin)"
      />
    </MainLayout>
  );
}
