using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Reflection.Metadata;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
namespace GP.Anylazer
{
    public class Model
    {

        public List<csScanResult> SolutionScanResults { get; set; } = new List<csScanResult>();
        public Model(List<csScanResult> SolutionScanResults) {
            this.SolutionScanResults = SolutionScanResults;
            LoopThroughResults();
        }

        string sqlInjectionPattern = @"(?i)((SELECT[\s\S]+?FROM[\s\S]+?WHERE[\s\S]+?=\s*['""][\s\S]?['""])|(['""][\s\S]?['""]\s*[+\-/]\s['""][\s\S]?['""])|(EXEC[\s\S]+?'[\s\S]?'\b)|(EXEC[\s\S]+?sp_executesql[\s\S]+?'[\s\S]?\b)|(DELETE[\s\S]+?FROM[\s\S]+?WHERE[\s\S]+?=\s['""][\s\S]?['""])|(UPDATE[\s\S]+?SET[\s\S]+?=\s['""][\s\S]?['""])|(INSERT[\s\S]+?INTO[\s\S]+?\([\s\S]+?\)[\s\S]+?VALUES[\s\S]+?\([\s\S]?['""]))(select.*?where.*?\+)";
        string sqlPattern = @"\bSELECT\b[\s\S]*\bWHERE\b[\s\S]*'%[\s\S]*";
        string Pattern = @"Select.*where.*Request\.query.*";
        string pattern = @"SELECT\s+\*\s+FROM\s+\w+\s+WHERE\s+\w+\s*=\s*\{\w+\}";
        
        bool isContain(string method)
        {
        //    Console.WriteLine(method);
            return Regex.IsMatch(method, pattern, RegexOptions.IgnoreCase)|Regex.IsMatch(method, Pattern, RegexOptions.IgnoreCase) | Regex.IsMatch(method, sqlPattern, RegexOptions.IgnoreCase) | Regex.IsMatch(method, sqlInjectionPattern, RegexOptions.IgnoreCase);
        }
        public void LoopThroughResults()
        {

            foreach (csScanResult result in SolutionScanResults)
            {
                result.MethodScanResultEndTime = DateTime.Now;
                result.MethodScanResultTotalTime = result.MethodScanResultEndTime - result.MethodScanResultStartTime;
                result.HasSQLInjection = isContain(result.MethodBody);
            }
        }
        
    } 
}
