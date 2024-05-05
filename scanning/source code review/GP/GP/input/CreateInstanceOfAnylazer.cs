using GP.Anylazer;
using GP.output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GP.input
{
    public class CreateInstanceOfAnylazer
    {
        string directoryPath,exportPath;
        static Dictionary<string, int> visitedPath =
                     new Dictionary<string, int>();
        public CreateInstanceOfAnylazer(string FilePath,string exportPath) {
            this.directoryPath = FilePath;
            this.exportPath = exportPath;   
            DoScan(FilePath);
        }
        public void DoScan(string directoryPath)
        {


            try
            {
                visitedPath.Add(directoryPath, 1);
                string[] files = Directory.GetFiles(directoryPath, "*.cs");

                foreach (string file in files)
                {

                    Converter getFile = new Converter(file);
                    List<csScanResult> resultList = getFile.FinalResult();
                    OutputGenerator outputGen = new OutputGenerator(resultList,exportPath);
                }
                // create a recursive function to call all subpaths 
                string[] subDirectories = Directory.GetDirectories(directoryPath);
                foreach (string subDirectory in subDirectories)
                {
                    if (visitedPath.ContainsKey(subDirectory) != true)
                    {
                        DoScan(subDirectory);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
            }
        }
    }
}
