"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionHeader } from "./SectionHeader";
import { FaCheckCircle, FaFire } from "react-icons/fa";
import { z } from "zod";

const COURSE_OPTIONS = [
  {
    value: "Nails & Cluster Lashes — 3 Days (R1 200, 50% deposit)",
    label: "Nails & Cluster Lashes — 3 Days",
    price: "R1 200",
    tag: "50% deposit required",
  },
  {
    value: "Nails & Cluster Lashes — 5 Days (R1 500, 50% deposit)",
    label: "Nails & Cluster Lashes — 5 Days",
    price: "R1 500",
    tag: "50% deposit required",
  },
  {
    value: "Installation Training Basic — 3 Days (R1 500)",
    label: "Installation Training — 3 Days",
    price: "R1 500",
    tag: "Installation",
  },
  {
    value: "Installation Training + Styles (R1 500 + R700 add-on)",
    label: "Installation + Styles Add-on",
    price: "+R700",
    tag: "Add-on to 3-day basic",
  },
  {
    value: "Makeup Training — 3 Days (R1 300)",
    label: "Makeup Training — 3 Days",
    price: "R1 300",
    tag: "Makeup",
  },
  {
    value: "Makeup Training — 5 Days (R1 700)",
    label: "Makeup Training — 5 Days",
    price: "R1 700",
    tag: "Makeup",
  },
  {
    value: "Individual Lashes Training — 5 Days (R2 000)",
    label: "Individual Lashes — 5 Days",
    price: "R2 000",
    tag: "Lashes",
  },
  {
    value: "Hot Special Combo — Installation, Makeup, Nails & Cluster (R2 000)",
    label: "Hot Special Combo",
    price: "R2 000",
    tag: "Until end of June 2026",
    hot: true,
  },
  {
    value: "Nails & Lashes Special — 3 Days (R650)",
    label: "Nails & Lashes Special — 3 Days",
    price: "R650",
    tag: "Until 31 May 2026",
    hot: true,
  },
  {
    value: "Nails & Lashes Special — 5 Days (R850)",
    label: "Nails & Lashes Special — 5 Days",
    price: "R850",
    tag: "Until 31 May 2026",
    hot: true,
  },
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  course_interest: z.string().min(1, { message: "Please select a Course Type" }).max(100),
  preferred_date: z.string().optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState<string>("");
  const [selectedSummary, setSelectedSummary] = useState<{ label: string; price: string } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!courseType) {
      setError("Please select a Course Type before submitting.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      course_interest: courseType,
      preferred_date: String(fd.get("preferred_date") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setLoading(true);
    setLoading(false);
    const opt = COURSE_OPTIONS.find((o) => o.value === courseType);
    setSelectedSummary(opt ? { label: opt.label, price: opt.price } : null);
    setSubmitted(true);
    setError(null);
  }

  return (
    <section id="contact" data-gsap-text className="py-24 px-4 sm:px-6 bg-gradient-soft">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Book Your Spot"
          subtitle="Tell us a little about yourself and we'll be in touch within 24 hours."
        />
        <div className="mt-12 rounded-3xl bg-gradient-soft p-1 shadow-soft">
          <div className="bg-card rounded-[calc(1.5rem-2px)] p-8">
            {submitted ? (
              <div className="text-center py-12">
                <FaCheckCircle className="w-16 h-16 text-primary mx-auto" />
                <h3 className="font-display text-3xl mt-4">Thank you!</h3>
                <p className="text-muted-foreground mt-2">
                  We&apos;ve received your enquiry
                  {selectedSummary
                    ? ` for the ${selectedSummary.label} course (${selectedSummary.price})`
                    : ""}
                  .
                </p>
                <div className="mt-6 mx-auto max-w-md text-left rounded-2xl border bg-background/60 p-5 text-sm space-y-2">
                  <p className="font-semibold">Next steps</p>
                  <p>
                    • Secure your spot with a <strong>50% deposit</strong> (where applicable) or
                    confirm with your trainer.
                  </p>
                  <p>• Pay any remaining balance on the day of class.</p>
                  <p>• Certification included on completion.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                {error && (
                  <p className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                )}
                <Field label="Name">
                  <Input name="name" required maxLength={100} />
                </Field>
                <Field label="Email">
                  <Input name="email" type="email" required maxLength={255} />
                </Field>
                <Field label="Phone">
                  <Input name="phone" type="tel" maxLength={40} />
                </Field>
                <Field label="Preferred Date">
                  <Input name="preferred_date" type="date" />
                </Field>
                <div className="sm:col-span-2">
                  <Label className="text-sm">
                    Course Type <span className="text-primary">*</span>
                  </Label>
                  <RadioGroup
                    value={courseType}
                    onValueChange={setCourseType}
                    className="grid sm:grid-cols-2 gap-3 mt-2"
                    aria-required
                  >
                    {COURSE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        htmlFor={opt.label}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                          courseType === opt.value
                            ? "border-primary bg-gradient-soft shadow-soft"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem id={opt.label} value={opt.value} />
                          {opt.hot && <FaFire className="w-4 h-4 text-rose-500" />}
                          <span className="font-display text-lg">{opt.label}</span>
                        </div>
                        <div className="mt-2 font-semibold text-primary">{opt.price}</div>
                        <div className="text-xs text-muted-foreground">{opt.tag}</div>
                      </label>
                    ))}
                  </RadioGroup>
                  {!courseType && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Required — choose a course to continue.
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message">
                    <Textarea name="message" rows={4} maxLength={1000} />
                  </Field>
                </div>
                <p className="sm:col-span-2 text-xs text-muted-foreground">
                  50% deposit required where applicable. Remaining balance paid in class.
                  Certification included.
                </p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="sm:col-span-2 bg-gradient-pink text-white rounded-full h-12 shadow-soft hover:shadow-glow"
                >
                  {loading ? "Sending…" : "Submit Booking"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
