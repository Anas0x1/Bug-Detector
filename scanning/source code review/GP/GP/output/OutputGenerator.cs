using GP.Anylazer;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GP.output
{
    public class OutputGenerator
    {
        private readonly string exportPath;
        public List<csScanResult> SolutionScanResults { get; set; } = new List<csScanResult>();
        public OutputGenerator(List<csScanResult> SolutionScanResults, string exportPath)
        {
            this.SolutionScanResults = SolutionScanResults;
            this.exportPath = exportPath;
            CreateOutPut();
        }
        public OutputGenerator(string exportPath)
        {
            this.exportPath = exportPath;
        }
        // edit this function to getApi mn chatGpt to now which files has to
        public void CreateOutPut()
        {
            CreateHtmlOutput(SolutionScanResults);
        }

        public void CreateHtmlOutput(List<csScanResult> methodDeclarations)
        {
            int methodCounter = 1;
            foreach (var methodDeclaration in methodDeclarations)
            {
                // Create an HTML file for the method
                if (methodDeclaration.HasSQLInjection == true)
                {
                    string htmlFilePath = Path.Combine(exportPath, $"Method_{methodCounter}.html");
                    Console.WriteLine(htmlFilePath);
                    using (StreamWriter htmlFile = new StreamWriter(htmlFilePath))
                    {
                        // Write HTML headers
                        htmlFile.WriteLine("<!DOCTYPE html>");
                        htmlFile.WriteLine("<html>");
                        htmlFile.WriteLine("<head>");
                        htmlFile.WriteLine($"<title>Method {methodCounter}</title>");
                        htmlFile.WriteLine("</head>");
                        htmlFile.WriteLine("<body>");

                        // Write method name as heading
                        string methodName = methodDeclaration.MethodName;
                        htmlFile.WriteLine($"<h2>Method Name: {methodName}</h2>");

                        // Write lines of code for the method
                        string body = methodDeclaration.MethodBody;
                        htmlFile.WriteLine($"<pre>: {System.Net.WebUtility.HtmlEncode(body)}</pre>");

                        // Write HTML footers
                        htmlFile.WriteLine("</body>");
                        htmlFile.WriteLine("</html>");
                    }

                    Console.WriteLine($"HTML file for method {methodCounter} created: {htmlFilePath}");

                    methodCounter++;
                }

            }
        }
    }
}
