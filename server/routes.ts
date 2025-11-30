// File: server/routes.ts

import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// These imports are assumed to exist. Make sure you have these files defined.
import { storage } from "./storage";
import { insertReviewSchema } from "@shared/schema";

// --- Google Sheets Initialization ---
const initGoogleSheets = async () => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Important for deploying
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth);
    await doc.loadInfo();
    console.log("✅ Google Sheets initialized successfully.");
    return doc;
  } catch (error) {
    console.error('❌ Failed to initialize Google Sheets:', error);
    return null;
  }
};

/**
 * Registers all the API routes for the application.
 * @param app The Express application instance.
 * @returns An HTTP Server instance.
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // --- Initialize Services ---
  const googleDoc = await initGoogleSheets();

  // If Google Sheets fails to initialize, we might not want to proceed.
  if (!googleDoc) {
    throw new Error("Google Sheets connection failed. Server cannot start.");
  }

  // --- API Routes ---

  // Endpoint for Brochure Form (saves to Google Sheets)
  app.post('/api/submit-brochure', async (req: Request, res: Response) => {
    try {
      const { name, email, phone, course } = req.body;
      if (!name || !email || !phone || !course) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Save to Google Sheets
      try {
        const sheet = googleDoc.sheetsByTitle['Leads']; // Assumes a sheet named 'Leads'
        if (!sheet) {
            console.error("Sheet 'Leads' not found in the Google Doc.");
            return res.status(500).json({ message: 'Server configuration error: Sheet not found.' });
        }
        await sheet.addRow({
          Name: name,
          Email: email,
          Phone: phone,
          Course: course,
          Timestamp: new Date().toISOString(),
        });
        console.log('Brochure lead saved to Google Sheets:', req.body);
      } catch (sheetError) {
        console.error('Failed to save brochure lead to Google Sheets:', sheetError);
        // Avoid sending detailed error to client for security
        return res.status(500).json({ message: 'Failed to record lead.' });
      }
      
      res.status(200).json({ message: 'Lead saved successfully' });
    } catch (error) {
      console.error('Error processing brochure lead:', error);
      res.status(500).json({ message: 'Failed to save lead' });
    }
  });

  // Endpoint for General Contact Form (saves to Google Sheets)
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, service, message } = req.body;
      if (!name || !email || !service || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Save to Google Sheets
      try {
        const sheet = googleDoc.sheetsByTitle['Contacts']; // Assumes a sheet named 'Contacts'
        if (!sheet) {
            console.error("Sheet 'Contacts' not found in the Google Doc.");
            return res.status(500).json({ message: 'Server configuration error: Sheet not found.' });
        }
        await sheet.addRow({
          Name: name,
          Email: email,
          Phone: phone || '', // Handle optional phone number
          Service: service,
          Message: message,
          Timestamp: new Date().toISOString(),
        });
        console.log('Contact form data saved to Google Sheets:', req.body);
      } catch (sheetError) {
        console.error('Failed to save contact to Google Sheets:', sheetError);
        return res.status(500).json({ message: 'Failed to record contact submission.' });
      }

      res.status(201).json({ message: "Contact information submitted successfully." });
    } catch (error: any) {
      console.error('Error processing contact data:', error);
      res.status(500).json({ message: "Failed to process contact data" });
    }
  });

  // Endpoint to get all reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Endpoint to create a new review
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // --- Create and return the HTTP server ---
  const httpServer = createServer(app);
  return httpServer;
}