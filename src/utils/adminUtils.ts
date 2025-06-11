
export interface User {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  joinDate?: string;
  provider?: string;
}

export const getUser = (): User | null => {
  // This would normally come from your auth system
  // For demo purposes, we'll simulate different users
  const users: User[] = [
    {
      id: 1,
      name: "Akshat",
      email: "akshat@admin.com",
      role: "admin",
      avatar: "https://lh3.googleusercontent.com/a/admin-user=s96-c",
      joinDate: "2024-01-15",
      provider: "google"
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@user.com",
      role: "user",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      joinDate: "2024-02-10",
      provider: "google"
    }
  ];

  // Simulate random user selection (in real app, this would be from auth state)
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  }

  // Default to admin for testing
  return users[0];
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const requireAdmin = (user: User | null): boolean => {
  if (!user || !isAdmin(user)) {
    return false;
  }
  return true;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};
