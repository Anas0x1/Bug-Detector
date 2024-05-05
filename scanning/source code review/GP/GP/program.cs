using GP.input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GP
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string filePath = "C:\\Users\\zezooo\\Desktop\\test";
            string exportPath = "C:\\Users\\zezooo\\Desktop\\Out";
            CreateInstanceOfAnylazer anylazer = new CreateInstanceOfAnylazer(filePath, exportPath); 
        }
    }
}
