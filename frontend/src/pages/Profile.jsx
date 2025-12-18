import React, { useState } from "react";
import { useAuthStore } from "../store/Auth.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  User,
  Mail,
  Lock,
  FileText,
  Calendar,
  TrendingUp,
  Save,
  LogOut,
  Camera,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const Profile = () => {
  const { authUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Dummy Data for History (Replace with real data fetching logic later)
  const resumeHistory = [
    {
      id: 1,
      title: "Software_Engineer_Resume.pdf",
      date: "Oct 25, 2023",
      score: 85,
      status: "Good",
      description: "Analyzed for Full Stack Developer role.",
    },
    {
      id: 2,
      title: "Frontend_Dev_CV.pdf",
      date: "Oct 20, 2023",
      score: 62,
      status: "Needs Improvement",
      description: "Missing key keywords for React positions.",
    },
    {
      id: 3,
      title: "My_Resume_Final.pdf",
      date: "Sep 15, 2023",
      score: 92,
      status: "Excellent",
      description: "Ready for submission.",
    },
    {
      id: 4,
      title: "Internship_Application.pdf",
      date: "Aug 01, 2023",
      score: 78,
      status: "Good",
      description: "Good structure but needs more metrics.",
    },
  ];

  // Form State
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log("Updating profile with:", { fullName: formData.fullName });
    setIsEditing(false);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    console.log("Updating password with:", {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Avatar file selected:", file);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Left Column: User Details & Settings */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* User Info Card */}
          <Card className="border-border bg-card/50 backdrop-blur-md">
            <CardHeader className="relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative h-24 w-24">
                  <div className="h-24 w-24 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden">
                    {authUser?.avatar ? (
                      <img
                        src={authUser.avatar}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <button
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                    title="Change Avatar"
                  >
                    <Camera size={14} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              <div className="mt-10 text-center">
                <CardTitle className="text-2xl">{authUser?.fullName}</CardTitle>
                <CardDescription>{authUser?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Resumes Scanned</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
                <span className="text-xl font-bold">
                  {resumeHistory.length}
                </span>
              </div>
              <Button variant="destructive" className="w-full" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Edit Profile Card */}
          <Card className="border-border bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-9 bg-background border-input"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-9 bg-background border-input"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-2">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-border hover:bg-muted"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Details
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-border bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Security
              </CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="pl-9 bg-background border-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="pl-9 bg-background border-input"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" variant="secondary">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Resume History */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Scan History</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <BentoGrid className="max-w-4xl mx-auto">
            {resumeHistory.map((item, i) => (
              <BentoGridItem
                key={item.id}
                title={
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="truncate max-w-[150px] md:max-w-[200px]"
                      title={item.title}
                    >
                      {item.title}
                    </span>
                    <Badge
                      variant={
                        item.score >= 80
                          ? "default" // Green-ish usually
                          : item.score >= 60
                          ? "secondary" // Yellow-ish
                          : "destructive" // Red
                      }
                      className={
                        item.score >= 80
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                          : item.score >= 60
                          ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
                          : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
                      }
                    >
                      Score: {item.score}
                    </Badge>
                  </div>
                }
                description={
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        {item.status}
                      </div>
                    </div>
                  </div>
                }
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted to-background border border-border items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <FileText className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                }
                className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                icon={<FileText className="h-4 w-4 text-muted-foreground" />}
              />
            ))}
          </BentoGrid>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
