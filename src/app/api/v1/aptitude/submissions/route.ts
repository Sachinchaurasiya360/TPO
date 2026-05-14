import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser, unauthorized, forbidden } from "@/lib/apiAuth";

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();
  if (user.role !== "STUDENT") return forbidden();

  try {
    const { testId, answers } = await request.json();

    const test = await prisma.aptitudeTest.findUnique({
      where: { id: testId },
      include: { questions: true },
    });

    if (!test) return NextResponse.json({ message: "Test not found" }, { status: 404 });

    let score = 0;
    for (const question of test.questions) {
      if (answers[question.id] === question.correctOption) {
        score += question.marks;
      }
    }

    const submission = await prisma.testSubmission.create({
      data: { testId, userId: user.id, answers, score, submittedAt: new Date() },
    });

    return NextResponse.json({ submission, score }, { status: 201 });
  } catch (error) {
    console.error("[aptitude/submissions POST]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  try {
    const where = user.role === "STUDENT" ? { userId: user.id } : {};
    const submissions = await prisma.testSubmission.findMany({
      where,
      include: { test: { select: { title: true } }, user: { select: { fullName: true, studentId: true } } },
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("[aptitude/submissions GET]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
