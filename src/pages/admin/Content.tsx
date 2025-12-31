import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FilePlus, Pencil, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

type Content = {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'resource';
  status: 'published' | 'draft' | 'archived';
  author: string;
  lastUpdated: string;
  views: number;
};

export default function ManageContent() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mock data - in a real app, this would come from an API
  const mockContent: Content[] = [
    { id: '1', title: 'Introduction to Organic Farming', type: 'article', status: 'published', author: 'Admin User', lastUpdated: '2023-11-15T10:30:00', views: 1245 },
    { id: '2', title: 'Crop Rotation Techniques', type: 'guide', status: 'published', author: 'Farm Expert', lastUpdated: '2023-11-14T15:45:00', views: 876 },
    { id: '3', title: 'Pest Control Methods', type: 'video', status: 'published', author: 'Agri Specialist', lastUpdated: '2023-11-13T09:15:00', views: 1532 },
    { id: '4', title: 'Soil Health Management', type: 'article', status: 'draft', author: 'Admin User', lastUpdated: '2023-11-12T08:20:00', views: 0 },
    { id: '5', title: 'Irrigation Systems', type: 'guide', status: 'published', author: 'Water Expert', lastUpdated: '2023-11-10T14:30:00', views: 987 },
    { id: '6', title: 'Sustainable Farming Practices', type: 'video', status: 'published', author: 'Eco Farmer', lastUpdated: '2023-11-08T11:20:00', views: 2103 },
    { id: '7', title: 'Market Trends 2023', type: 'article', status: 'archived', author: 'Market Analyst', lastUpdated: '2023-10-30T16:45:00', views: 543 },
    { id: '8', title: 'New Farming Equipment Guide', type: 'guide', status: 'draft', author: 'Tech Expert', lastUpdated: '2023-10-28T13:10:00', views: 0 },
  ];

  const filteredContent = mockContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const getStatusBadge = (status: Content['status']) => {
    switch (status) {
      case 'published':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: Content['type']) => {
    const typeMap = {
      article: { label: 'Article', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      video: { label: 'Video', className: 'bg-red-100 text-red-800 border-red-200' },
      guide: { label: 'Guide', className: 'bg-purple-100 text-purple-800 border-purple-200' },
      resource: { label: 'Resource', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    };
    
    const typeInfo = typeMap[type] || { label: type, className: '' };
    return <Badge variant="outline" className={typeInfo.className}>{typeInfo.label}</Badge>;
  };

  const handleEdit = (id: string) => {
    console.log('Edit content:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete content:', id);
  };

  const handleView = (id: string) => {
    console.log('View content:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Content</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          Create New Content
        </Button>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search content..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(item.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No content found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredContent.length > itemsPerPage && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
