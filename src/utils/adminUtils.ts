
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

  // Default to regular user for testing (change to users[0] for admin access)
  return users[1]; // Regular user by default
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

// Admin access control middleware
export const switchToAdmin = (): void => {
  const adminUser = {
    id: 1,
    name: "Akshat",
    email: "akshat@admin.com",
    role: "admin" as const,
    avatar: "https://lh3.googleusercontent.com/a/admin-user=s96-c",
    joinDate: "2024-01-15",
    provider: "google"
  };
  setCurrentUser(adminUser);
  window.location.reload();
};

export const switchToUser = (): void => {
  const regularUser = {
    id: 2,
    name: "John Doe",
    email: "john@user.com",
    role: "user" as const,
    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    joinDate: "2024-02-10",
    provider: "google"
  };
  setCurrentUser(regularUser);
  window.location.reload();
};
