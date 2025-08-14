// Google Sheets integration utility
// This would be used in a real application with proper Google Sheets API setup

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  timestamp?: string;
}

export async function submitToGoogleSheets(data: ContactData): Promise<boolean> {
  try {
    // In a real implementation, this would use the Google Sheets API
    // with proper authentication and sheet ID
    
    const response = await fetch('/api/google-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    return false;
  }
}
