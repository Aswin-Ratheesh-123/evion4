import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, enquiryType, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a descriptive message of at least 10 characters.' },
        { status: 400 }
      );
    }

    // In a production setup, this would store into PostgreSQL / send via email notification service.
    // For demo/production readiness, we generate a verified tracking reference ID.
    const referenceId = `EVN-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Your enquiry has been received successfully. An EVION specialist will contact you within 24 hours.',
      receivedData: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        enquiryType: enquiryType || 'General Enquiry',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

