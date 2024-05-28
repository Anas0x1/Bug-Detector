using SendGrid.Helpers.Mail;
using SendGrid;
using SendGrid.Helpers.Mail.Model;

public class SendGridEmailSender
{
    private static string key = "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"; //change apikey


    public static async Task<string> SendEmail(string email, string subject, string plainTextContent)
    {
        if (string.IsNullOrEmpty(key))
        {
            throw new ArgumentException("Missing SendGrid API key. Please set it before using SendGrid.");
        }

        var client = new SendGridClient(key);

        var from = new EmailAddress("bugdetector8@gmail.com", "BugDetector"); 
        var to = new EmailAddress(email);

        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, null);

        try
        {
            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return "Email sent successfully.";
            }
            else
            {
                return $"Failed to send Email: Status code {response.StatusCode} - {response.Body.ReadAsStringAsync().Result}";
            }
        }
        catch (Exception ex)
        {
            return $"Failed to send Email: {ex.Message}";
        }
    }
}
