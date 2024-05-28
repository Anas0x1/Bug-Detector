using BugDetectorGP.Dto;
using BugDetectorGP.Models;
using NuGet.Protocol;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace BugDetectorGP.Scans
{
    public class Scan
    {
        protected string folderPath;

        public Scan(string folderPath)
        {
            this.folderPath = folderPath;
        }

        public async Task<string> AddNewFile(string fileName, string content)
        {
            try
            {
                string filePath = Path.Combine(folderPath, fileName);

                File.WriteAllText(filePath, content);
                return ("File added successfully.");
            }
            catch (IOException ex)
            {
                return ($"Error occurred: {ex.Message}");
            }
        }

        public async Task<string> RemoveFile(string fileName)
        {
            try
            {
                string filePath = Path.Combine(folderPath, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                    return ("File removed successfully.");
                }
                else
                {
                    return ("File does not exist.");
                }
            }
            catch (IOException ex)
            {
                return ($"Error occurred: {ex.Message}");
            }
        }

        public async Task<string> _Scan (string targit)
        {
            var files = Directory.GetFiles(folderPath);
            var result = "";
            foreach (var file in files)
            {
                string command = "bash " + file + " " + targit;

                try
                {
                    using (var process = new Process())
                    {
                        var startInfo = new ProcessStartInfo
                        {
                            FileName = "/bin/bash",
                            Arguments = $"-c \"{command}\"",
                            RedirectStandardOutput = true,
                            UseShellExecute = false,
                            CreateNoWindow = true
                        };

                        process.StartInfo = startInfo;
                        process.Start();

                        string output = process.StandardOutput.ReadToEnd();

                        process.WaitForExit();

                        result += output;
                    }
                }
                catch (Exception ex)
                {
                    result += $"Error: {ex.Message}";
                }
            }
            result = result.Replace("\n", "<br>").Replace("\t", "");
            return result;
        }

        public async static Task<List<ReportDto>> ReturnWebOrNetworkReport(string ReportResult)
        {
            List<ReportDto> _output = new List<ReportDto>();

            for (int i = 0; i < ReportResult.Length; i++)
            {
                string title = "", details = "", output = "";

                while (i < ReportResult.Length && ReportResult[i] == '#') { i++; continue; }
                while (i < ReportResult.Length && ReportResult[i] != '#') { title += ReportResult[i]; i++; continue; }    
                while (i < ReportResult.Length && ReportResult[i] == '#') { i++; continue; }
                while (i < ReportResult.Length && ReportResult[i] != '#') { details += ReportResult[i]; i++; continue; }
                while (i < ReportResult.Length && ReportResult[i] == '#') { i++; continue; }
                while (i < ReportResult.Length && ReportResult[i] != '#') { output += ReportResult[i]; i++; continue; }

                _output.Add(new ReportDto 
                { 
                    title=title, 
                    details=details, 
                    output=output 
                });
            }

            return _output;
        }
    }
}
