// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Mail, Phone, Pencil, Plus } from 'lucide-react';

// MODIFIED: Import SalaryInfo (Matches your screenshot location in components/ui)
// Ensure your file is named 'salaryInfo.tsx' or rename it to 'SalaryInfo.tsx'
import SalaryInfo from '@/components/ui/salaryInfo'; 

export default function Profile() {
  const { user } = useAuth();
  
  // Mock data for fields not yet in your Context (you can add these to your DB later)
  const extendedData = {
    company: "Odoo India", // From wireframe
    manager: "Manager Name",
    location: "Mumbai, India",
    about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    jobLove: "Lorem Ipsum is simply dummy text of the printing industry.",
    hobbies: "Reading, traveling, coding.",
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 text-foreground">
        
        {/* 1. TOP PROFILE HEADER (Matches wireframe) */}
        <div className="border rounded-lg bg-card p-6 shadow-sm">
             <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Avatar Section */}
                <div className="relative group flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-sm overflow-hidden">
                    {/* Placeholder if no image */}
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-md h-8 w-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>

                {/* Info Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
                   {/* Left Column */}
                   <div className="space-y-4">
                      <div>
                        <h2 className="text-3xl font-bold">{user?.name || "Guest User"}</h2>
                        <Badge variant="outline" className="mt-2 capitalize">{user?.role || "Employee"}</Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Login ID</Label>
                        <div className="font-mono text-sm border-b pb-1">{user?.employeeId || "Not Assigned"}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Email</Label>
                        <div className="text-sm border-b pb-1 flex items-center gap-2">
                           {user?.email}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Mobile</Label>
                        <div className="text-sm border-b pb-1 flex items-center gap-2">
                           {user?.phone || "Not Provided"}
                        </div>
                      </div>
                   </div>

                   {/* Right Column */}
                   <div className="space-y-4 md:mt-10">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Company</Label>
                        <div className="text-sm border-b pb-1">{extendedData.company}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Department</Label>
                        <div className="text-sm border-b pb-1">{user?.department || "Unassigned"}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Manager</Label>
                        <div className="text-sm border-b pb-1">{extendedData.manager}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">Location</Label>
                        <div className="text-sm border-b pb-1 flex items-center gap-2">
                           <MapPin className="w-3 h-3" /> {extendedData.location}
                        </div>
                      </div>
                   </div>
                </div>
             </div>
        </div>

        {/* 2. TABBED CONTENT AREA */}
        <Tabs defaultValue="private" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-4">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="private">Private Info</TabsTrigger>
            
            {/* CONDITIONAL RENDERING: Only Admin sees Salary Info */}
            {user?.role === 'admin' && (
              <TabsTrigger value="salary">Salary Info</TabsTrigger>
            )}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN (2/3 width) - About/Info */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Private Info Tab Content */}
              <TabsContent value="private" className="space-y-6 mt-0">
                <Card>
                  <CardHeader><CardTitle className="text-lg">About</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{extendedData.about}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">What I love about my job</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{extendedData.jobLove}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">My interests and hobbies</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{extendedData.hobbies}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Salary Info Tab Content (Admin Only) */}
              <TabsContent value="salary" className="mt-0">
                  {/* MODIFIED: Replaced the old card code with the new component */}
                  {/* This line replaces the ~20 lines of code you had here previously */}
                  <SalaryInfo />
              </TabsContent>
            </div>

            {/* RIGHT COLUMN (1/3 width) - Skills & Certs */}
            <div className="md:col-span-1 space-y-6">
              
              {/* Skills Panel */}
              <Card className="h-[280px] flex flex-col">
                <CardHeader className="pb-2 border-b">
                   <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pt-4">
                  <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Tailwind</Badge>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto border-t bg-muted/20">
                   <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground mt-2">
                      <Plus className="w-4 h-4 mr-2" /> Add Skills
                   </Button>
                </div>
              </Card>

              {/* Certification Panel */}
              <Card className="h-[280px] flex flex-col">
                <CardHeader className="pb-2 border-b">
                   <CardTitle className="text-lg">Certification</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pt-4">
                   <div className="text-sm text-muted-foreground">No certifications added yet.</div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto border-t bg-muted/20">
                   <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground mt-2">
                      <Plus className="w-4 h-4 mr-2" /> Add Certification
                   </Button>
                </div>
              </Card>

            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}