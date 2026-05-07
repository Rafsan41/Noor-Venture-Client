"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm }   from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { apiPost } from "@/lib/api";
import type { ApiResponse, Proposal, GeneratedProposal } from "@/types";

const CATEGORIES = [
  "Food & Beverage", "Technology", "Retail", "Agriculture",
  "Education", "Healthcare", "Manufacturing", "Services",
  "Real Estate", "Transportation", "Fashion", "Other",
];

const schema = z.object({
  title:              z.string().min(10, "At least 10 characters"),
  description:        z.string().min(100, "At least 100 characters"),
  businessType:       z.string().min(2, "Required"),
  category:           z.string().min(2, "Select a category"),
  location:           z.string().min(2, "Required"),
  fundingGoal:        z.coerce.number().min(10000, "Min ৳10,000"),
  minimumInvestment:  z.coerce.number().min(500, "Min ৳500"),
  profitSharePercent: z.coerce.number().min(5, "Min 5%").max(50, "Max 50%"),
  duration:           z.coerce.number().min(3).max(60),
  deadline:           z.string().min(1, "Required"),
  riskLevel:          z.enum(["LOW", "MEDIUM", "HIGH"]),
});
type FormData = z.infer<typeof schema>;

export default function CreateProposalPage() {
  const router = useRouter();
  const qc     = useQueryClient();
  const [brief, setBrief]           = useState("");
  const [generating, setGenerating] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      riskLevel: "MEDIUM",
      duration:  12,
      profitSharePercent: 20,
      minimumInvestment:  5000,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    },
  });

  // AI: Generate proposal from brief
  const generateProposal = async () => {
    if (!brief.trim()) { toast.error("Enter a brief description first"); return; }
    setGenerating(true);
    try {
      const res = await apiPost<ApiResponse<GeneratedProposal>>("/ai/generate-proposal", { brief });
      if (res.data) {
        setValue("title",       res.data.title);
        setValue("description", res.data.description);
        // tags are stored as aiTags by the backend
        toast.success("AI generated your proposal! Review and fill remaining fields.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "AI generation failed");
    } finally { setGenerating(false); }
  };

  const createMutation = useMutation({
    mutationFn: (data: FormData) =>
      apiPost<ApiResponse<Proposal>>("/proposals", {
        ...data,
        deadline: new Date(data.deadline).toISOString(),
      }),
    onSuccess: (res) => {
      toast.success("Proposal submitted for review!");
      qc.invalidateQueries({ queryKey: ["proposals"] });
      router.push(`/proposals/${res.data.id}`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const Field = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Proposal</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Submit your business for Musharakah funding</p>
      </div>

      {/* AI Generator */}
      <div className="noor-card p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" /> AI Proposal Generator
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Describe your business and Claude AI will draft title & description for you.
        </p>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="e.g. I want to open a halal food delivery service in Dhaka targeting office workers, need 5 lakhs..."
          rows={3}
          className={`${inputCls} resize-none mb-3`}
        />
        <button
          type="button"
          onClick={generateProposal}
          disabled={generating || !brief.trim()}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-60 transition-colors"
        >
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
          {generating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="noor-card p-6 space-y-5">
        <h3 className="font-semibold">Proposal Details</h3>

        <Field label="Title *" error={errors.title?.message}>
          <input {...register("title")} placeholder="Compelling proposal title" className={inputCls} />
        </Field>

        <Field label="Description * (min 100 characters)" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Describe your business, target market, how you'll use the funds, expected impact..."
            className={`${inputCls} resize-none`}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Business Type *" error={errors.businessType?.message}>
            <input {...register("businessType")} placeholder="e.g. Food & Beverage" className={inputCls} />
          </Field>
          <Field label="Category *" error={errors.category?.message}>
            <select {...register("category")} className={inputCls}>
              <option value="">Select...</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location *" error={errors.location?.message}>
            <input {...register("location")} placeholder="e.g. Dhaka, Bangladesh" className={inputCls} />
          </Field>
          <Field label="Risk Level" error={errors.riskLevel?.message}>
            <select {...register("riskLevel")} className={inputCls}>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Funding Goal (৳) *" error={errors.fundingGoal?.message}>
            <input {...register("fundingGoal")} type="number" placeholder="500000" className={inputCls} />
          </Field>
          <Field label="Min Investment (৳) *" error={errors.minimumInvestment?.message}>
            <input {...register("minimumInvestment")} type="number" placeholder="5000" className={inputCls} />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Profit Share (%)" error={errors.profitSharePercent?.message}>
            <input {...register("profitSharePercent")} type="number" placeholder="20" className={inputCls} />
          </Field>
          <Field label="Duration (months)" error={errors.duration?.message}>
            <input {...register("duration")} type="number" placeholder="12" className={inputCls} />
          </Field>
          <Field label="Deadline *" error={errors.deadline?.message}>
            <input {...register("deadline")} type="datetime-local" className={inputCls} />
          </Field>
        </div>

        <div className="rounded-lg bg-emerald-50 p-4 text-xs text-emerald-700 space-y-1">
          <p className="font-semibold">📋 Review Process</p>
          <p>Submitted proposals are reviewed by our admin team for Shariah compliance within 24–48h.</p>
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit Proposal
        </button>
      </form>
    </div>
  );
}
