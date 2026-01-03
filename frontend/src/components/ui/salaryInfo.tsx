import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function SalaryInfo() {
  return (
    <Card>
      <CardHeader className="pb-4 border-b mb-6">
        <CardTitle>Salary Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* --- Top Section: Wages & Time --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Wages */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="col-span-1 text-muted-foreground">Month Wage</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Input defaultValue="50000" className="bg-muted/50 font-mono" readOnly />
                <span className="text-sm text-muted-foreground whitespace-nowrap">/ Month</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="col-span-1 text-muted-foreground">Yearly Wage</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Input defaultValue="600000" className="bg-muted/50 font-mono" readOnly />
                <span className="text-sm text-muted-foreground whitespace-nowrap">/ Yearly</span>
              </div>
            </div>
          </div>

          {/* Right: Working Hours */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="col-span-2 text-muted-foreground">No of working days in a week:</Label>
              <Input defaultValue="5" className="col-span-1 bg-muted/50 text-center" readOnly />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="col-span-1 text-muted-foreground">Break Time:</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Input defaultValue="1" className="bg-muted/50 text-center" readOnly />
                <span className="text-sm text-muted-foreground whitespace-nowrap">/ hrs</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* --- Bottom Section: Detailed Breakdown --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: Salary Components */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg border-b pb-2">Salary Components</h3>
            
            <div className="space-y-6">
              {[
                { label: 'Basic Salary', amount: '25000.00', percent: '50.00', desc: 'Define Basic salary from company cost compute it based on monthly Wages' },
                { label: 'House Rent Allowance', amount: '12500.00', percent: '50.00', desc: 'HRA provided to employees 50% of the basic salary' },
                { label: 'Standard Allowance', amount: '4167.00', percent: '16.67', desc: 'A standard allowance is a predetermined, fixed amount provided to employee' },
                { label: 'Performance Bonus', amount: '2082.50', percent: '8.33', desc: 'Variable amount paid during payroll.' },
                { label: 'Leave Travel Allowance', amount: '2082.50', percent: '8.33', desc: 'LTA is paid by the company to employees to cover their travel expenses' },
                { label: 'Fixed Allowance', amount: '2918.00', percent: '11.67', desc: 'Fixed allowance portion of wages is determined after calculating all salary components' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <Label className="w-[150px] text-sm font-medium shrink-0">{item.label}</Label>
                    <div className="flex-1 flex gap-2 items-center">
                      <Input defaultValue={item.amount} className="h-8 text-right font-mono" readOnly />
                      <span className="text-xs text-muted-foreground w-8">₹/mo</span>
                    </div>
                    <div className="w-20 flex gap-1 items-center">
                      <Input defaultValue={item.percent} className="h-8 text-right font-mono bg-muted/30" readOnly />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground pl-[150px] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PF & Deductions */}
          <div className="space-y-8">
            
            {/* Provident Fund */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg border-b pb-2">Provident Fund (PF) Contribution</h3>
              {[
                { label: 'Employee', amount: '3000.00', percent: '12.00' },
                { label: "Employer's", amount: '3000.00', percent: '12.00' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <Label className="w-[100px] text-sm font-medium shrink-0">{item.label}</Label>
                    <div className="flex-1 flex gap-2 items-center">
                      <Input defaultValue={item.amount} className="h-8 text-right font-mono" readOnly />
                      <span className="text-xs text-muted-foreground w-8">₹/mo</span>
                    </div>
                    <div className="w-20 flex gap-1 items-center">
                      <Input defaultValue={item.percent} className="h-8 text-right font-mono bg-muted/30" readOnly />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground pl-[100px]">PF is calculated based on the basic salary</p>
                </div>
              ))}
            </div>

            {/* Tax Deductions */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg border-b pb-2">Tax Deductions</h3>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                    <Label className="w-[100px] text-sm font-medium shrink-0">Professional Tax</Label>
                    <div className="flex-1 flex gap-2 items-center">
                      <Input defaultValue="200.00" className="h-8 text-right font-mono" readOnly />
                      <span className="text-xs text-muted-foreground w-8">₹/mo</span>
                    </div>
                </div>
                <p className="text-[11px] text-muted-foreground pl-[100px]">
                  Professional Tax deducted from the Gross salary
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}