using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection;
using System.Data;
using RazorEngine;
namespace GP.Anylazer
{
    public class Converter
    {
        private string filePath;
        SyntaxTree syntaxTree;
        public List<csScanResult> SolutionToScan = new List<csScanResult>();
        public Converter(string filePath)
        {
            this.filePath = filePath;
            Convert();
        }
        public void Convert()
        {
            string code = File.ReadAllText(filePath);
            this.syntaxTree = CSharpSyntaxTree.ParseText(code);
            convertToListOfMethods();
        }
        private void convertToListOfMethods()
        {
            SyntaxNode root = syntaxTree.GetRoot();
            var methodDeclarations = root.DescendantNodes().OfType<MethodDeclarationSyntax>();
            foreach ( var methodDeclaration in methodDeclarations)
            {
                var methodBody = methodDeclaration.Body;
                
                if (methodBody != null)
                {
                    string blockString = methodBody.ToString();

                    string methodName = methodDeclaration.Identifier.ValueText;
                    var methodLocation = methodDeclaration.GetLocation().GetLineSpan();
                    int startLine = methodLocation.StartLinePosition.Line + 1;
                    int endLine = methodLocation.EndLinePosition.Line + 1;
                    int numLines = endLine - startLine + 1;
                    SolutionToScan.Add(new csScanResult(DateTime.Now, methodName, blockString, false, numLines));
                }
            }
            

        }
        public List<csScanResult> FinalResult()
        {
            Model model = new(SolutionToScan);
            this.SolutionToScan = model.SolutionScanResults;
            return SolutionToScan;
        }
    }
}
