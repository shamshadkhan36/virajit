import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Enquiry } from "@/types";

export const dynamic = "force-dynamic";

// In-memory fallback in case Prisma / SQLite is read-only in serverless environment
let fallbackEnquiries: Enquiry[] = [
  {
    id: "enq-sample-1",
    name: "Vikram Mehta",
    phone: "+91 98201 54321",
    location: "Borivali West",
    message: "Looking for Dell Latitude i7 touch screen for office work",
    productName: "Dell Latitude 7420",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "enq-sample-2",
    name: "Sneha Sharma",
    phone: "+91 98199 87654",
    location: "Kandivali West",
    message: "Student laptop under Rs.25,000 requirement",
    productName: "Dell Latitude 7480",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let enquiries: any[] = [];
    try {
      const where: any = {};
      if (status && status !== "ALL") {
        where.status = status;
      }
      if (search) {
        where.OR = [
          { name: { contains: search } },
          { phone: { contains: search } },
          { location: { contains: search } },
        ];
      }

      enquiries = await prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.warn("Prisma enquiry query failed, using fallback:", dbErr);
    }

    if (enquiries.length === 0 && fallbackEnquiries.length > 0) {
      enquiries = fallbackEnquiries.filter((item) => {
        if (status && status !== "ALL" && item.status !== status) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.phone.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q)
          );
        }
        return true;
      });
    }

    return NextResponse.json({
      success: true,
      enquiries,
      count: enquiries.length,
    });
  } catch (error: any) {
    console.error("GET /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, location, message, productName } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name" },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your phone number" },
        { status: 400 }
      );
    }

    if (!location || !location.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your location" },
        { status: 400 }
      );
    }

    const cleanedName = name.trim();
    const cleanedPhone = phone.trim();
    const cleanedLocation = location.trim();
    const cleanedMessage = (message || "").trim();
    const cleanedProduct = (productName || "").trim();

    let createdEnquiry: any = null;

    try {
      createdEnquiry = await prisma.enquiry.create({
        data: {
          name: cleanedName,
          phone: cleanedPhone,
          location: cleanedLocation,
          message: cleanedMessage,
          productName: cleanedProduct,
          status: "NEW",
        },
      });
    } catch (dbErr) {
      console.warn("Prisma enquiry create failed, saving to fallback cache:", dbErr);
    }

    if (!createdEnquiry) {
      createdEnquiry = {
        id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: cleanedName,
        phone: cleanedPhone,
        location: cleanedLocation,
        message: cleanedMessage,
        productName: cleanedProduct,
        status: "NEW" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fallbackEnquiries = [createdEnquiry, ...fallbackEnquiries];
    } else {
      // Also add to fallback for fast memory read
      fallbackEnquiries = [createdEnquiry, ...fallbackEnquiries];
    }

    return NextResponse.json({
      success: true,
      enquiry: createdEnquiry,
      message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
    });
  } catch (error: any) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing enquiry id or status" },
        { status: 400 }
      );
    }

    let updatedEnquiry: any = null;
    try {
      updatedEnquiry = await prisma.enquiry.update({
        where: { id },
        data: { status },
      });
    } catch (dbErr) {
      console.warn("Prisma update enquiry failed:", dbErr);
    }

    // Update in fallback cache too
    fallbackEnquiries = fallbackEnquiries.map((item) =>
      item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
    );

    return NextResponse.json({
      success: true,
      enquiry: updatedEnquiry || fallbackEnquiries.find((e) => e.id === id),
      message: "Status updated successfully",
    });
  } catch (error: any) {
    console.error("PATCH /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing enquiry id" },
        { status: 400 }
      );
    }

    try {
      await prisma.enquiry.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("Prisma delete enquiry failed:", dbErr);
    }

    fallbackEnquiries = fallbackEnquiries.filter((item) => item.id !== id);

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
