import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { StudentDetailResponse } from "@/lib/api/admin";
import { departmentLabel } from "@/lib/api/student";

export function exportStudentProfileToPdf(data: StudentDetailResponse) {
  const { user, marks, internships, achievements, projects, certificates } = data;
  const doc = new jsPDF();
  let y = 16;

  const section = (title: string) => {
    y += 4;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(title.toUpperCase(), 14, y);
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y + 1.5, 196, y + 1.5);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
  };

  // ── Header ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(user.fullName, 14, y);
  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  const headerMeta = [
    user.emailId,
    user.studentId ?? "",
    user.department ? departmentLabel(user.department) : "",
    user.academicYear?.replace("_", " ") ?? "",
    user.role,
  ]
    .filter(Boolean)
    .join("  ·  ");
  doc.text(headerMeta, 14, y);
  y += 5;
  if (user.avgCgpa != null) {
    doc.text(`Avg CGPA: ${user.avgCgpa.toFixed(2)}`, 14, y);
    y += 5;
  }
  doc.setTextColor(30, 30, 30);
  y += 2;

  // ── Contact ──
  section("Contact");
  const contactRows: [string, string][] = [
    ["Email", user.emailId],
    ["Contact", user.contactNo ?? "—"],
    ["Parent Contact", user.parentsContactNo ?? "—"],
    ["Verified", user.isVerified ? "Yes" : "No"],
    ["Active", user.isActive ? "Yes" : "No"],
  ];
  autoTable(doc, {
    startY: y,
    body: contactRows,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 45 } },
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;

  // ── Skills ──
  if (user.skills && user.skills.length > 0) {
    section("Skills");
    doc.setFontSize(8.5);
    doc.text(user.skills.join(", "), 14, y, { maxWidth: 182 });
    y += Math.ceil(user.skills.join(", ").length / 90) * 5 + 4;
  }

  // ── Academic Marks ──
  if (marks) {
    section("Academic Marks");
    const markRows: [string, string][] = [
      ["SSC %", marks.sscPercentage != null ? String(marks.sscPercentage) : "—"],
      ["HSC %", marks.hscPercentage != null ? String(marks.hscPercentage) : "—"],
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((n): [string, string] => [
        `Sem ${n}`,
        (marks[`sem${n}` as keyof typeof marks] as number | null) != null
          ? String(marks[`sem${n}` as keyof typeof marks])
          : "—",
      ]),
    ];
    autoTable(doc, {
      startY: y,
      head: [["Subject", "Score"]],
      body: markRows,
      theme: "striped",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 30, 30] },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
  }

  // ── Internships ──
  if (internships.length > 0) {
    section(`Internships (${internships.length})`);
    const rows = internships.map((i) => {
      const it = i as Record<string, unknown>;
      return [
        String(it.companyName ?? ""),
        String(it.role ?? ""),
        String(it.duration ?? ""),
        (it as { isVerified?: boolean }).isVerified ? "Verified" : "Pending",
      ];
    });
    autoTable(doc, {
      startY: y,
      head: [["Company", "Role", "Duration", "Status"]],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 30, 30] },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
  }

  // ── Achievements ──
  if (achievements.length > 0) {
    section(`Achievements (${achievements.length})`);
    const rows = achievements.map((a) => {
      const ac = a as Record<string, unknown>;
      return [
        String(ac.title ?? ""),
        String(ac.category ?? ""),
        (ac as { isVerified?: boolean }).isVerified ? "Verified" : "Pending",
      ];
    });
    autoTable(doc, {
      startY: y,
      head: [["Title", "Category", "Status"]],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 30, 30] },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
  }

  // ── Projects ──
  if (projects.length > 0) {
    section(`Projects (${projects.length})`);
    const rows = projects.map((p) => [
      p.title,
      p.techStack.join(", ") || "—",
      p.isVerified ? "Verified" : "Pending",
    ]);
    autoTable(doc, {
      startY: y,
      head: [["Title", "Tech Stack", "Status"]],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 30, 30] },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
  }

  // ── Certificates ──
  if (certificates && certificates.length > 0) {
    section(`Certificates (${certificates.length})`);
    const rows = certificates.map((c) => [
      c.title,
      c.issuingOrg,
      c.issueDate ? new Date(c.issueDate).toLocaleDateString() : "—",
      c.isVerified ? "Verified" : "Pending",
    ]);
    autoTable(doc, {
      startY: y,
      head: [["Title", "Issued By", "Date", "Status"]],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 30, 30] },
    });
  }

  const fileName = `${user.fullName.replace(/\s+/g, "_")}_profile.pdf`;
  doc.save(fileName);
}
