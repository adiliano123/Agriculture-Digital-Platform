import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
};

export default function ManageUsers() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Mock data - in a real app, this would come from an API
  const mockUsers: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2023-11-15T10:30:00' },
    { id: '2', name: 'Farmer Joe', email: 'farmer@example.com', role: 'user', status: 'active', lastLogin: '2023-11-14T15:45:00' },
    { id: '3', name: 'Content Moderator', email: 'mod@example.com', role: 'moderator', status: 'active', lastLogin: '2023-11-14T09:15:00' },
    { id: '4', name: 'Inactive User', email: 'inactive@example.com', role: 'user', status: 'inactive', lastLogin: '2023-10-30T08:20:00' },
    { id: '5', name: 'Suspended User', email: 'suspended@example.com', role: 'user', status: 'suspended', lastLogin: '2023-10-15T14:30:00' },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleEdit = (userId: string) => {
    // Handle edit user
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    // Handle delete user
    console.log('Delete user:', userId);
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    // Handle status change
    console.log(`Change status of user ${userId} to ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">{t.manageUsers}</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {t.addNewUser}
        </Button>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.searchUsers}
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
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.email}</TableHead>
              <TableHead>{t.role}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead>{t.lastLogin}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : user.role === 'moderator' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <select
                      className={`text-sm rounded-md px-2 py-1 ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : user.status === 'suspended' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                    >
                      <option value="active">{t.active}</option>
                      <option value="inactive">{t.inactive}</option>
                      <option value="suspended">{t.suspended}</option>
                    </select>
                  </TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(user.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {t.noUsersFound}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
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
            {t.page} {currentPage} {t.of} {totalPages}
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
