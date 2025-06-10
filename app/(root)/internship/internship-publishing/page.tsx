'use client';
import React, { useEffect } from 'react';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Briefcase, Award, FileText, Shield, BadgeDollarSign, Laptop2, Mail, Phone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useInternshipStore } from "@/store/internshipStore";
import { useUserStore } from "@/store/signUpStore";
import { BASE_URL } from '@/utils/constants';


const benefitOptions = [
  {
    id: 'jobOffer',
    label: 'Job Offer',
    icon: <Briefcase className="h-5 w-5 text-green-600" />,
    description: 'Potential full-time position after internship'
  },
  {
    id: 'certificate',
    label: 'Certificate',
    icon: <Award className="h-5 w-5 text-green-600" />,
    description: 'Certificate of completion provided'
  },
  {
    id: 'lor',
    label: 'LOR',
    icon: <FileText className="h-5 w-5 text-green-600" />,
    description: 'LOR for future opportunities'
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: <Shield className="h-5 w-5 text-green-600" />,
    description: 'Health/accident insurance coverage'
  },
  {
    id: 'stipend',
    label: 'Stipend',
    icon: <BadgeDollarSign className="h-5 w-5 text-green-600" />,
    description: 'Monthly financial compensation'
  },
  {
    id: 'equipment',
    label: 'Equipment Provided',
    icon: <Laptop2 className="h-5 w-5 text-green-600" />,
    description: 'Company provides necessary equipment'
  }
];

export default function InternshipPublishing() {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const { currentDraft, updateDraft, addInternship, clearDraft } = useInternshipStore();
  
  const form = useForm({
    defaultValues: {
      companyName: currentDraft.companyName || '',
      title: currentDraft.title || '',
      duration: currentDraft.duration || '',
      workplaceType: currentDraft.workplaceType || 'remote',
      workLocation: currentDraft.workLocation || '',
      category: currentDraft.category || 'Software Development',
      skillsRequired: currentDraft.skillsRequired?.join(', ') || '',
      eligibility: currentDraft.eligibility || 'student',
      minStipend: currentDraft.minStipend || 0,
      maxStipend: currentDraft.maxStipend || 0,
      startDate: currentDraft.startDate,
      contactEmail: currentDraft.contactEmail || '',
      contactPhone: currentDraft.contactPhone || '',
      sexDiversity: currentDraft.sexDiversity || false,
      benefits: currentDraft.benefits || {
        jobOffer: false,
        certificate: false,
        lor: false,
        insurance: false,
        stipend: false,
        equipment: false
      },
      description: currentDraft.description || ''
    }
  });

  const [workplaceType, setWorkplaceType] = useState(currentDraft.workplaceType || 'remote');
  const [category, setCategory] = useState(currentDraft.category || 'Software Development');
  const [eligibility, setEligibility] = useState(currentDraft.eligibility || 'student');
  const [sexDiversity, setSexDiversity] = useState(currentDraft.sexDiversity || false);
  const [date, setDate] = useState<Date | undefined>(currentDraft.startDate);
  const [benefits, setBenefits] = useState(currentDraft.benefits || {
    jobOffer: false,
    certificate: false,
    lor: false,
    insurance: false,
    stipend: false,
    equipment: false
  });

  const handleBenefitChange = (benefit) => {
    const newBenefits = {
      ...benefits,
      [benefit]: !benefits[benefit]
    };
    setBenefits(newBenefits);
    form.setValue('benefits', newBenefits);
  };

  const onSubmit = async (data) => {
    try {
      const internshipData = {
        ...data,
        skillsRequired: data.skillsRequired.split(',').map(skill => skill.trim()),
        startDate: date,
        benefits: benefits,
        createdAt: new Date()
      };

      // Save to Zustand store
      addInternship(internshipData);

      // Save to MongoDB if user is logged in
      if (currentUser?._id) {
        const response = await fetch(`${BASE_URL}/api/v1/users/${currentUser._id}/internships`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(internshipData)
        });

        if (!response.ok) {
          throw new Error('Failed to save internship');
        }
      }

      toast.success('Internship published successfully!');
      clearDraft();
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to publish internship');
      console.error(error);
    }
  };

  // Update draft on form change
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateDraft({
        ...values,
        skillsRequired: values.skillsRequired?.split(',').map(skill => skill.trim()),
        startDate: date,
        benefits: benefits,
        workplaceType,
        category,
        eligibility,
        sexDiversity
      });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateDraft, date, benefits, workplaceType, category, eligibility, sexDiversity]);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Publish Internship</h1>
            <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new internship opportunity</p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6">
            {/* Company Name and Internship Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Company Name*</Label>
                <Input 
                  placeholder="Enter company name" 
                  className="h-10 sm:h-11" 
                  {...form.register('companyName', { required: true })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Internship Title*</Label>
                <Input 
                  placeholder="e.g. Software Development Intern" 
                  className="h-10 sm:h-11" 
                  {...form.register('title', { required: true })}
                />
              </div>
            </div>

            {/* Duration and Workplace Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Duration*</Label>
                <Select 
                  onValueChange={(value) => form.setValue('duration', value)}
                  defaultValue={form.getValues('duration')}
                >
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="2months">2 Months</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Workplace Type*</Label>
                <div className="flex flex-wrap gap-2">
                  {["Remote", "Hybrid", "On-site"].map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={workplaceType === type.toLowerCase() ? "default" : "outline"}
                      className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                        workplaceType === type.toLowerCase() ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const newType = type.toLowerCase();
                        setWorkplaceType(newType);
                        form.setValue('workplaceType', newType);
                      }}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Work Location (conditionally shown if not remote) */}
            {workplaceType !== "remote" && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Work Location*</Label>
                <Input 
                  placeholder="Enter work location (city, country)" 
                  className="h-10 sm:h-11" 
                  {...form.register('workLocation', { required: workplaceType !== 'remote' })}
                />
              </div>
            )}

            {/* Internship Category */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Internship Category*</Label>
              <Select 
                onValueChange={(value) => {
                  setCategory(value);
                  form.setValue('category', value);
                }}
                value={category}
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills Required */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Skills Required*</Label>
              <Input 
                placeholder="Enter required skills (comma separated)" 
                className="h-10 sm:h-11" 
                {...form.register('skillsRequired', { required: true })}
              />
              <p className="text-xs text-gray-500 mt-1">e.g. JavaScript, React, Communication</p>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Eligibility Criteria*</Label>
              <div className="flex flex-wrap gap-2">
                {["Student", "Non-student", "Both"].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={eligibility === type.toLowerCase() ? "default" : "outline"}
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      eligibility === type.toLowerCase() ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const newEligibility = type.toLowerCase();
                      setEligibility(newEligibility);
                      form.setValue('eligibility', newEligibility);
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stipend Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Stipend Range (Min)*</Label>
                <Input 
                  type="number" 
                  placeholder="Enter minimum stipend" 
                  className="h-10 sm:h-11" 
                  {...form.register('minStipend', { required: true, valueAsNumber: true })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Stipend Range (Max)*</Label>
                <Input 
                  type="number" 
                  placeholder="Enter maximum stipend" 
                  className="h-10 sm:h-11" 
                  {...form.register('maxStipend', { required: true, valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Starting Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Starting Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        form.setValue('startDate', selectedDate);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Information*</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="email" 
                      placeholder="contact@company.com" 
                      className="h-10 sm:h-11 pl-10" 
                      {...form.register('contactEmail', { required: true })}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Contact Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      className="h-10 sm:h-11 pl-10" 
                      {...form.register('contactPhone', { required: true })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sex Diversity */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Encourage Gender Diversity*</Label>
              <div className="flex gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant={!sexDiversity ? "default" : "outline"}
                  className={`rounded-full px-4 sm:px-6 h-8 sm:h-9 text-xs sm:text-sm ${
                    !sexDiversity ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSexDiversity(false);
                    form.setValue('sexDiversity', false);
                  }}
                >
                  No
                </Button>
                <Button
                  type="button"
                  variant={sexDiversity ? "default" : "outline"}
                  className={`rounded-full px-4 sm:px-6 h-8 sm:h-9 text-xs sm:text-sm ${
                    sexDiversity ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSexDiversity(true);
                    form.setValue('sexDiversity', true);
                  }}
                >
                  Yes
                </Button>
              </div>
              {sexDiversity && (
                <p className="text-xs text-gray-500 mt-2">
                  This internship will be marked as encouraging diversity and shown to underrepresented groups
                </p>
              )}
            </div>

            {/* Other Benefits */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Other Benefits</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {benefitOptions.map((benefit) => (
                  <div className="flex flex-col w-full items-center" key={benefit.id}>
                    <div className={`flex items-center gap-2 border p-2 rounded-md hover:bg-gray-50 ${
                      benefits[benefit.id] ? "bg-green-50" : ""
                    }`}>
                      <Label htmlFor={benefit.id} className="text-sm text-center">
                        {benefit.label}
                        {benefit.icon}
                      </Label>
                    </div>
                    <Checkbox 
                      className='hidden'
                      id={benefit.id}
                      checked={benefits[benefit.id]}
                      onCheckedChange={() => handleBenefitChange(benefit.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Internship Description */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Internship Description*</Label>
              <Textarea 
                placeholder="Describe the internship responsibilities, expectations, and learning opportunities" 
                className="min-h-[120px]" 
                {...form.register('description', { required: true })}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 sm:pt-4">
              <Checkbox id="terms" className="mt-1" required />
              <Label htmlFor="terms" className="text-xs sm:text-sm leading-snug text-gray-600">
                I confirm that this internship opportunity complies with all local labor laws and regulations.
                <span className="text-green-600 hover:underline cursor-pointer"> Terms of Service</span>
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t">
            <Button 
              type="submit" 
              className="h-10 sm:h-11 px-4 sm:px-8 rounded-full bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              Publish Internship
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}