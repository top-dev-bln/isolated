import { google } from "googleapis";
import fs from "fs";
import path from "path";
//TODO: import .env
const CLIENT_ID =
  "397112946172-11uf7if7onqpi3b0oefdfolci9kph7hj.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000";

const REFRESH_TOKEN =
  "1//04Uuk35uedISjCgYIARAAGAQSNwF-L9IrMzmyKHZUnLUtn3K1qA9U7mRoIOVaZpLnxdYjriscipyjpa4KzZ6fx4XaFvWTAW5U_Hc";
const ACCESS_TOKEN =
  "ya29.a0AfB_byCH-GQ9zssR2HoY2GM6mr6vPC3Jguts6zQEPyHyDkr1SlQs7ASybuQbKy8fW2olZg5X8CJ5weA5_TAu-xRGfo7gDe-dIyT1ZXUKJULDaE5j3VJYLw0KI-Jeh29DHW-6BSaZn4iQlyQ_WvfnRKGvG1QBXDjUV1wtaCgYKAZoSARISFQHGX2Mii49y3yDTdfPJFh7VFGm2zg0171";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
  access_token: ACCESS_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });
const filePath = path.join(process.cwd(), "pic.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "pic.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
